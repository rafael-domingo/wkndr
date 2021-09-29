import React from 'react';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateDestinationsList } from '../../redux/user';
import { Yelp } from '../../util/Yelp';

export default function TripBuilderLoading({ tripState, location }) {
    const dispatch = useDispatch()
    console.log(tripState)
    React.useEffect(() => {
        Yelp.tripBuilder(tripState).then(response => {
            dispatch(updateDestinationsList({
                tripId: location.tripId,
                newList: response,
                tripBuilder: tripState
            }))
            
        })
    })

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