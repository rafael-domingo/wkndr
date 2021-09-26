import React from 'react';
import { Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setTripBuilder } from '../../redux/tripBuilder';
import { addTrip } from '../../redux/user';
import { Yelp } from '../../util/Yelp';
export default function BuildTripLoading({ tripState }) {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(setTripBuilder(tripState))
        Yelp.tripBuilder(tripState).then(response => {            
            console.log(response)
            dispatch(addTrip({
                cityName: tripState.cityName,
                coordinates: tripState.coordinates,
                destinations: {
                    morning: response[0],
                    afternoon: response[1],
                    evening: response[2]
                },
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
