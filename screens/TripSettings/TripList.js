import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CancelButton from '../../components/Buttons/CancelButton';
import TripListCard from '../../components/Cards/TripListCard';
import { deleteDestination } from '../../redux/user';

export default function TripList({ route, navigation }) {
    // figure out what the tripId is to pull from state
    const {location} = route.params
    const findTrip = (trip) => {
        return trip.tripId === location.tripId
    }
    // pull from state
    const locationState = useSelector(state => state.user.tripList.find(findTrip))
    console.log(locationState)
    const dispatch = useDispatch()
    console.log(location)
    const handleCancelClick = () => {
        navigation.navigate('Trip', {location: location})
    }

    const handleDelete = (wkndrId, time) => {
        dispatch(deleteDestination({
            tripId: location.tripId, 
            wkndrId: wkndrId,
            time: time
        }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <CancelButton  handleClick={handleCancelClick}/>
            <View style={{flex: 0.1, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={styles.header}>Trip List</Text>
            </View>
            <ScrollView style={{flex: 0.9}}>
                {
                 locationState.destinations.morning.map((destination, index) => <TripListCard destination={destination} time={'morning'} handleDelete={handleDelete} key={`morning${index}`}/>)   
                }
                {
                 locationState.destinations.afternoon.map((destination, index) => <TripListCard destination={destination} time={'afternoon'} handleDelete={handleDelete} key={`afternoon${index}`}/>)   
                }
                {
                 locationState.destinations.evening.map((destination, index) => <TripListCard destination={destination} time={'evening'}  handleDelete={handleDelete} key={`evening${index}`}/>)   
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 0.8,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 36,
        fontFamily: 'System',
        fontWeight: 'bold',
        color: 'white'
    }
})