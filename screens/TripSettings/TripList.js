import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CancelButton from '../../components/Buttons/CancelButton';
import TripListCard from '../../components/Cards/TripListCard';
import { deleteDestination } from '../../redux/user';
import { BlurView } from 'expo-blur';
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

    const handleDelete = (wkndrId) => {
        dispatch(deleteDestination({
            tripId: location.tripId, 
            wkndrId: wkndrId,
        }))
    }

    return (
        <BlurView intensity={100} style={{flex: 1}} tint={'dark'}>
            <SafeAreaView style={styles.container}>
            
                <CancelButton  handleClick={handleCancelClick}/>
                <View style={{flex: 0.1, flexDirection: 'column', justifyContent: 'center'}}>
                    <Text style={styles.header}>Trip List</Text>
                </View>
                <ScrollView style={{flex: 0.9}}>
                    {
                    locationState.destinations.map((destination, index) => <TripListCard destination={destination} handleDelete={handleDelete} key={`morning${index}`}/>)   
                    }
                </ScrollView>
            </SafeAreaView>
        </BlurView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 0.8,
        backgroundColor: 'rgba(0,0,0,0.5)',
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