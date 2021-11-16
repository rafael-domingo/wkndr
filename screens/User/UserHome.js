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
import DeleteTripModal from '../../components/Modals/DeleteTripModal';
import DeleteAllTripsModal from '../../components/Modals/DeleteAllTripsModal';
export default function UserHome({ route, navigation }) {
    const {city} = route.params
    // user data states
    const userState = useSelector(state => state.user)
    const [mapView, setMapView] = React.useState(false)    
    const [cityListState, setCityListState] = React.useState()
    // modal states
    const [modal, setModal] = React.useState(false)
    const [modalAll, setModalAll] = React.useState(false)
    const [modalConfirm, setModalConfirm] = React.useState(false)
    
    React.useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        extractData(userState.tripList)
        
    }, [userState])

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
               <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>
                   wkndr
               </Text>
           
            </View>                   
            <View style={{flex: 1, margin: 10}}>
                {
                   mapView && (
                    <MapList mapView={mapView} city={city} navigation={navigation} userTrips={cityListState} setModal={setModal} setModalAll={setModalAll} modalConfirm={modalConfirm} setModalConfirm={setModalConfirm}/>        
                   ) 
                }
                {
                    !mapView && (
                        <ListView navigation={navigation} userTrips={cityListState}/>
                    )
                }
            
            <DeleteTripModal setModal={setModal} setModalConfirm={setModalConfirm} modal={modal}/>
            <DeleteAllTripsModal setModalAll={setModalAll} setModalConfirm={setModalConfirm} modalAll={modalAll}/>
            </View>       
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%'}}>
                <Ionicons 
                    name="ios-settings-outline" 
                    size={24} 
                    color="white" 
                    onPress={() => navigation.navigate('Account')}
                />
                {
                    mapView && (
                        <Ionicons 
                        name="md-list" 
                        size={24} 
                        color="white" 
                        onPress={() => {
                            setMapView(!mapView)
                            navigation.setParams({
                                city: null
                            })
                        }}
                    />
                    )
                }
                {
                    !mapView && (
                        <Ionicons 
                        name="md-map-outline" 
                        size={24} 
                        color="white" 
                        onPress={() => {
                            setMapView(!mapView)
                            navigation.setParams({
                                city: null
                            })
                        }}
                    />
                    )
                }
              
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
