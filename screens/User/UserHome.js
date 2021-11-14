import React from 'react';
import LargeMapList from './LargeMapList';
import { View, StyleSheet, Dimensions, Text, Pressable, SafeAreaView, LayoutAnimation, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrip, resetUserState } from '../../redux/user';
import { signOut } from '../../util/Auth';
import ListView from './ListView';
import MapList from './MapList';
import { Modalize } from 'react-native-modalize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
export default function UserHome({ route, navigation }) {
    
    const userState = useSelector(state => state.user)
    const [mapView, setMapView] = React.useState(false)
    const dispatch = useDispatch();
    const [cityListState, setCityListState] = React.useState()
    const [modal, setModal] = React.useState(false)
    const [modalAll, setModalAll] = React.useState(false)
    const [modalConfirm, setModalConfirm] = React.useState(false)
    // const [deleteId, setDeleteId] = React.useState()
    React.useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        extractData(userState.tripList)
        
    }, [userState])

    // React.useEffect(() => {
    //     if (modalConfirm) {
    //         dispatch(deleteTrip({tripId: deleteId}))
    //         setDeleteId(null)
    //     }
    // }, [modalConfirm])
    const deleteTripId = (tripId) => {
        setModal(true)
        setDeleteId(tripId)
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        
        
    }

    const extractData = (tripList) => {            
        const cityList = []
        tripList.map((trip, index) => {
            if (!cityList.some(item => item.title == trip.cityName)) {
                const object = {
                    'title': trip.cityName,
                    'data': [{
                        'tripName': trip.tripName,
                        'tripId': trip.tripId,
                        'coordinates': trip.coordinates,
                        'trip': trip
                    }]                 
                }
                cityList.push(object)                
            } else {
                const index = cityList.findIndex(item => item.title == trip.cityName)
                console.log(index)
                cityList[index].data.push({
                    'tripName': trip.tripName,
                    'tripId': trip.tripId,
                    'coordinates': trip.coordinates,
                    'trip': trip
                })
            }
            
        })
        // alphabetize by title
        cityList.sort((a, b) => (a.title > b.title ? 1 : -1))
        console.log(cityList)
        setCityListState(cityList)                
        setMapView(true)
    }


    return (
        <SafeAreaView style={styles.container}>   
            <View style={styles.header}>  
                <Pressable 
                    style={({ pressed }) => pressed ? styles.headerNewTripPressed : styles.headerNewTrip}
                    onPress={() => navigation.navigate('Build')}
                >
                    <Ionicons name="ios-add-circle-outline" size={24} color="white" />
                    <Text style={styles.text}>New Trip</Text>
                </Pressable>              
               
                <Ionicons 
                    name="ios-settings-outline" 
                    size={24} 
                    color="white" 
                    onPress={() => navigation.navigate('Account')}
                />
                <Ionicons 
                    name="ios-settings-outline" 
                    size={24} 
                    color="white" 
                    onPress={() => setMapView(!mapView)}
                />
            </View>                   
            <View style={{flex: 1}}>
                {
                   mapView && (
                    <MapList navigation={navigation} userTrips={cityListState} deleteTripId={deleteTripId} setModal={setModal} setModalAll={setModalAll} modalConfirm={modalConfirm} setModalConfirm={setModalConfirm}/>        
                   ) 
                }
                {
                    !mapView && (
                        <ListView navigation={navigation} userTrips={cityListState}/>
                    )
                }
            
             <Modal
                transparent={true}
                visible={modal}    
                animationType={'slide'}                      
                
            >
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <BlurView intensity={100} tint={'default'} style={{overflow: 'hidden', borderRadius: 20, height: 200, width: Dimensions.get('window').width*0.8, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 30}}>Delete this trip?</Text>
                    <View style={{flexDirection: 'row', bottom: 0, position: 'absolute', width: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
                        <View style={{width: '50%'}}>
                        <TouchableOpacity onPress={() => setModal(false)} style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cancel</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{width: '50%'}}>
                        <TouchableOpacity onPress={() => {
                            setModalConfirm(true)
                            setModal(false)
                        }} style={{padding: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Delete</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
                </View>
            </Modal>    
                  
             <Modal
                transparent={true}
                visible={modalAll}    
                animationType={'slide'}                      
                
            >
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <BlurView intensity={100} tint={'default'} style={{overflow: 'hidden', borderRadius: 20, height: 200, width: Dimensions.get('window').width*0.8, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 30}}>Delete all trips for this city?</Text>
                    <View style={{flexDirection: 'row', bottom: 0, position: 'absolute', width: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
                        <View style={{width: '50%'}}>
                        <TouchableOpacity onPress={() => setModalAll(false)} style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cancel</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{width: '50%'}}>
                        <TouchableOpacity onPress={() => {
                            setModalConfirm(true)
                            setModalAll(false)
                        }} style={{padding: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Delete</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
                </View>
            </Modal>    
            </View>       
            
            
            
        </SafeAreaView>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(24, 28, 47)'     

    },
    header: {
        flex: 0.1,        
        width: Dimensions.get('window').width - 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerNewTrip: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },  
    headerNewTripPressed: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5
    },  
    text: {
        color: 'white',
        fontFamily: 'System',
        marginLeft: 10
    }
})
