import React from 'react';
import { Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setTripBuilder } from '../../redux/tripBuilder';
import { addTrip } from '../../redux/user';
import { Yelp } from '../../util/Yelp';
import { v4 as uuidv4 } from 'uuid';

export default function BuildTripLoading({ tripState }) {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(setTripBuilder(tripState))
        Yelp.tripBuilder(tripState).then(response => {            
            // Assign unique Id to help with handling deletion later on
            // const morning = response[0].map(object => {
            //     for (var key in object) {
            //         object[key].wkndrId = uuidv4()
            //     }
            //     return object
            // })
            // const afternoon = response[1].map(object => {
            //     for (var key in object) {
            //         object[key].wkndrId = uuidv4()
            //     }
            //     return object
            // })
            // const evening = response[2].map(object => {
            //     for (var key in object) {
            //         object[key].wkndrId = uuidv4()
            //     }
            //     return object
            // })
            console.log(response) 
            dispatch(addTrip({
                tripId: uuidv4(),
                cityName: tripState.cityName,
                coordinates: tripState.coordinates,
                destinations: response,
                tripName: tripState.tripName,
                tripBuilder: tripState
            }))
        })
    }, [])
    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Building your trip</Text>
            <ActivityIndicator/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    text: {
        color: 'white',
        fontFamily: 'System',
        fontSize: 24,
        margin: 20
    }
})
