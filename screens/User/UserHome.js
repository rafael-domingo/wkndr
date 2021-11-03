import React from 'react';
import LargeMapList from './LargeMapList';
import { View, StyleSheet, Dimensions, Text, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserState } from '../../redux/user';
import { signOut } from '../../util/Auth';
import ListView from './ListView';
import MapList from './MapList';

export default function UserHome({ navigation }) {
    const userState = useSelector(state => state.user)
    const [mapView, setMapView] = React.useState(false)
    const dispatch = useDispatch();
    const [cityListState, setCityListState] = React.useState()
    React.useEffect(() => {
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
                    <MapList navigation={navigation} userTrips={cityListState}/>        
                   ) 
                }
                {
                    !mapView && (
                        <ListView navigation={navigation} userTrips={cityListState}/>
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
