import React from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable, TouchableWithoutFeedback, Button, TouchableOpacity, LayoutAnimation, Animated, Easing, requireNativeComponent, ActivityIndicator } from 'react-native';
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
    const dispatch = useDispatch()
    React.useEffect(() => {
        // Animated.timing(
        //     opacity,
        //     {
        //         toValue: 1,
        //         duration: 500,
        //         delay: 0,
        //         easing: Easing.inOut(Easing.exp),
        //         useNativeDriver: true
        //     }
        // ).start()
        if (index !== activeSlide) {
            setView(true)
            setShow(false)
            setLoading(false)
        }
    }, [activeSlide])

    // React.useEffect(() => {
    //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    // })

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
            <TouchableOpacity onPress={() => setShow(true)} style={show ? {display: 'none'} : {top: 0, position: 'absolute', marginBottom: 20}}>
                <Text style={[styles.text, {fontWeight: 'bold', textAlign: 'center'}]}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShow(false)} style={show ? {top: 0, position: 'absolute', marginBottom: 20} : {display: 'none'}}>
                <Text style={[styles.text, {fontWeight: 'bold', textAlign: 'center'}]}>Done</Text>
            </TouchableOpacity>
            <Text style={[styles.text, {textAlign: 'center'}]}>Select a trip</Text>
            {
                location.data.map((item, index) => {
                    return (
                        <View key={index} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity 
                                style={{backgroundColor: 'white', width: 200, margin: 5, borderRadius: 10, height: 30, justifyContent: 'center', alignItems: 'center'}}
                                onPress={() => navigation.navigate('Trip', {location: item})}
                            >
                                <Text style={[styles.text, {textAlign: 'center', color: 'black'}]}>{item.tripName}</Text>
                            </TouchableOpacity>                        
                            <TouchableOpacity
                                style={show ? {} : {display: 'none'} }
                                onPress={() => {                                  
                                    setModal(true)
                                    setDeleteId(item.tripId)                                    
                                }}
                            >
                                <FontAwesome5 name='trash' size={25} color="white"/>
                            </TouchableOpacity>
                        </View>
                    )
                    
                })
            }
            <TouchableOpacity onPress={() => setView(true)} style={{bottom: 0, position: 'absolute', marginBottom: 20}}>
                <Text style={[styles.text, {fontWeight: 'bold', textAlign: 'center'}]}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {
                    setModalAll(true)
                    setDeleteAllTrips(true)
                }} 
                style={show ? {bottom: 0, position: 'absolute', marginBottom: 40, backgroundColor: 'red', padding: 10, borderRadius: 20} : {display: 'none'}}
            >
                <Text style={[styles.text, {fontWeight: 'bold', textAlign: 'center'}]}>Delete All</Text>
            </TouchableOpacity>
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