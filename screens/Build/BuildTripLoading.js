import React from 'react';
import { Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetTripBuilder, setTripBuilder } from '../../redux/tripBuilder';
import { addTrip } from '../../redux/user';
import { Yelp } from '../../util/Yelp';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function BuildTripLoading({ tripState, navigation }) {
    const dispatch = useDispatch()
    const [complete, setComplete] = React.useState(false)
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
            const trip = {
                tripId: uuidv4(),
                cityName: tripState.cityName,
                coordinates: tripState.coordinates,
                destinations: response,
                tripName: tripState.tripName,
                tripBuilder: tripState
            }
            dispatch(addTrip(trip))
            setComplete(true)
            setTimeout(() => {
                dispatch(resetTripBuilder())
                navigation.replace('Trip', {location: trip})
            }, 2000);
        })
    }, [])
    

    return (
        <View style={styles.container}>
            {
                !complete && (
                    <Text style={styles.text}>Building your trip</Text>
                )
            }
            {
                complete && (
                    <Text style={styles.text}>Finishing up...</Text>
                )
            }
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
