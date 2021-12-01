import React from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable, TouchableWithoutFeedback, Button, TouchableOpacity, LayoutAnimation, Animated, Easing, requireNativeComponent, ActivityIndicator, ScrollView } from 'react-native';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux';
import { deleteTrip } from '../../redux/user';


export default function MapCard({ location, handleClick, index, activeSlide, navigation, setModal, setModalAll, modalConfirm, setModalConfirm }) {
    const mapRef = React.useRef();
    const [view, setView] = React.useState(true)
    const [show, setShow] = React.useState(false)
    const [deleteId, setDeleteId] = React.useState()
    const [deleteAllTrips, setDeleteAllTrips] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const opacity = React.useRef(new Animated.Value(1)).current
    const editOpacity = React.useRef(new Animated.Value(0)).current
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)
    const dispatch = useDispatch()
    React.useEffect(() => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: 500,
                delay: 0,
                easing: Easing.inOut(Easing.exp),
                useNativeDriver: true
            }
        ).start()
        Animated.timing(
            editOpacity,
            {
                toValue: 0,
                duration: 250, 
                delay: 100, 
                easing: Easing.out(Easing.exp),
                useNativeDriver: false
            }
        ).start()
        if (index !== activeSlide) {
            
            setView(true)
            setShow(false)
            setLoading(false)
        }
    }, [activeSlide])

    React.useEffect(() => {
        if (modalConfirm) {
            if (deleteAllTrips) {
                deleteAll()
                setDeleteAllTrips(false)
            } else {
                deleteTripId(deleteId)
                setDeleteId(null)
            }
            setModalConfirm(false)  
        }  
        
    },[modalConfirm])

    const deleteTripId = (tripId) => {
        console.log(location.data.length)
        if (location.data.length === 1) {
            setLoading(true)
            setTimeout(() => {
                setView(true)
                setShow(false)
                setLoading(false)
                dispatch(deleteTrip({tripId: tripId}))
            }, 2000);
            navigation.setParams({
                city: null
            })
        } else {
            dispatch(deleteTrip({tripId: tripId}))
        }
       
    }

    const deleteAll = () => {
        setLoading(true)
        location.data.map((item, index) => {                        
            if (index === location.data.length - 1) {
                setTimeout(() => {
                    setView(true)
                    setShow(false)
                    setLoading(false)
                    dispatch(deleteTrip({tripId: item.tripId}))
                }, 2000);           
            } else {
                dispatch(deleteTrip({tripId: item.tripId}))
            }
        })
        navigation.setParams({
            city: null
        })
    }

    const handleEdit = (input) => {
        if (input) {
            Animated.timing(
                editOpacity,
                {
                    toValue: 1,
                    duration: 250, 
                    delay: 100, 
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: false
                }
            ).start(() => setShow(input))
        } else {
            Animated.timing(
                editOpacity,
                {
                    toValue: 0,
                    duration: 250, 
                    delay: 100, 
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: false
                }
            ).start(() => setShow(input))
        }        
    }

    if (view) {
        return (
            <Animated.View 
                style={{
                    justifyContent: 'center', 
                    alignItems: 'center',
                    opacity: opacity
                }}
            >
            <Text style={styles.text}>
            {location.title}
            </Text>     
                <MapView 
                    ref={mapRef}
                    style={styles.map}
                    scrollEnabled={false}
                    userInterfaceStyle={"dark"}
                    onPress={() =>  {
                        setView(false)
                        console.log('touched map')
                    }}
                    camera={{
                        center: {
                            latitude: location.data[0].coordinates.lat,
                            longitude: location.data[0].coordinates.lng,
                        },
                        pitch: 0,
                        heading: 0,
                        altitude: 100000,
                        zoom: 12
                    }}
                    // mapType={'mutedStandard'}
                    zoomTapEnabled={false}
                    zoomEnabled={false}
                    initialRegion={{
                        latitude: location.data[0].coordinates.lat,
                        longitude: location.data[0].coordinates.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />  
            </Animated.View>
        )
    } else if (loading) {
        return (
            <Animated.View 
            style={{
                justifyContent: 'center', 
                alignItems: 'center',
                opacity: opacity
            }}
        >
        <Text style={styles.text}>
        {location.title}
        </Text>          
        <View style={[styles.map, {borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center', zIndex: 10}]}>
            <ActivityIndicator/>
        </View>              
        </Animated.View>
        )
    } else {
        return (
            <Animated.View 
                style={{
                    justifyContent: 'center', 
                    alignItems: 'center',
                    opacity: opacity
                }}
            >
            <Text style={styles.text}>
            {location.title}
            </Text>          
            <View style={[styles.map, {borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center', zIndex: 10}]}>
                
                <Text style={[styles.text, {textAlign: 'center', marginTop: 10, fontWeight: 'bold', fontSize: 20}]}>Your Trips</Text>
                <ScrollView style={{width: '100%', margin: 10}}>
                {
                    location.data.map((item, index) => {
                        return (
                            <View key={index} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Animated.View
                                    style={{
                                        transform: [{
                                            translateX: editOpacity.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [10, -10]
                                            })
                                        }]
                                    }}
                                >
                                <TouchableOpacity 
                                    style={{backgroundColor: 'white', width: 200, margin: 5, borderRadius: 10, height: 50, justifyContent: 'center', alignItems: 'center'}}
                                    onPress={() => navigation.navigate('Trip', {location: item})}
                                    disabled={show ? true : false}
                                >
                                    <Text style={[styles.text, {textAlign: 'center', color: 'black', fontWeight: 'bold'}]}>{item.tripName}</Text>
                                </TouchableOpacity>       
                                </Animated.View>
                                <Animated.View 
                                    style={{
                                        opacity: editOpacity,
                                        transform: [{
                                            translateX: editOpacity.interpolate({
                                                inputRange: [0,1],
                                                outputRange: [-10, 0]
                                            })
                                        }]
                                    }}
                                >

                                    <TouchableOpacity                                    
                                        onPress={() => {                                  
                                            setModal(true)
                                            setDeleteId(item.tripId)                                    
                                        }}
                                        disabled={show ? false : true}
                                    >
                                        <FontAwesome5 name='trash' size={25} color="white"/>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                        )
                        
                    })
                }
                </ScrollView>
                <View style={{position: 'absolute', bottom: 0, justifyContent: 'space-around', alignItems: 'center', width: '100%', flexDirection: 'row'}}>
                    <Animated.View style={{
                        width: '50%', 
                        borderWidth: 0, 
                        borderColor: 'white', 
                        height: 50, 
                        justifyContent: 'center',
                        backgroundColor: editOpacity.interpolate({
                            inputRange: [0,1],
                            outputRange: ['white', 'red']
                            })
                        }}
                    >
                        {
                            !show && (
                                <TouchableOpacity 
                                    style={{                                        
                                        height: 50, 
                                        width: '100%', 
                                        justifyContent: 'center',                              
                                    }} 
                                    onPress={() => setView(true)}                                                        
                                >
                                    <Text style={[styles.text, {color: 'rgb(24, 28, 47)', fontWeight: 'bold', textAlign: 'center'}]}>Back</Text>
                                </TouchableOpacity>
                            )
                        }
                        {
                            show && (
                                <TouchableOpacity 
                                    onPress={() => {
                                        setModalAll(true)
                                        setDeleteAllTrips(true)
                                    }}                             
                                    style={{                                                                                                   
                                        height: 50, 
                                        width: '100%', 
                                        justifyContent: 'center'
                                    }}                 
                                >
                                    <Text style={[styles.text, {fontWeight: 'bold', textAlign: 'center'}]}>Delete All</Text>
                                </TouchableOpacity>
                            )
                        }                                            
                    </Animated.View>
                    <Animated.View style={{
                        width: '50%', 
                        borderWidth: 0, 
                        borderColor: 'white', 
                        height: 50, 
                        justifyContent: 'center',
                        backgroundColor: editOpacity.interpolate({
                            inputRange: [0,1],
                            outputRange: ['rgba(255,255,255,0)', 'white']
                        })
                        }}
                    >
                        {
                            !show && (
                                <TouchableOpacity 
                                    onPress={() => handleEdit(true)} 
                                    style={{                                        
                                        height: 50, 
                                        width: '100%', 
                                        justifyContent: 'center',                                    
                                    }}
                                    
                                >
                                    <Text style={[styles.text, {fontWeight: 'bold', textAlign: 'center'}]}>Edit</Text>
                                </TouchableOpacity>
                            )
                        }
                        {
                            show && (
                                <TouchableOpacity 
                                    onPress={() => handleEdit(false)} 
                                    style={{
                                        backgroundColor: 'white', 
                                        height: 50,                                       
                                        justifyContent: 'center',
                                        width: '100%',                                         
                                    }}
                                >
                                    <Text style={[styles.text, {color: 'rgb(24, 28, 47)', fontWeight: 'bold', textAlign: 'center'}]}>Done</Text>
                                </TouchableOpacity>
                            )
                        }
                      
                     
                    </Animated.View>
                </View>                
          
            </View>              
            </Animated.View>
        )
    }
    
}


const styles = StyleSheet.create({
    container: {        
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        // flex: 1,
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').height - 300,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'System'
    },
    paginationText: {
        color: 'white',
        flex: 1
    }
})