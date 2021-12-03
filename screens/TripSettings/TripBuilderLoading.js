import React from 'react';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateDestinationsList } from '../../redux/user';
import { Yelp } from '../../util/Yelp';

export default function TripBuilderLoading({ tripState, location, handleCancelClick }) {
    const dispatch = useDispatch()
    const [complete, setComplete] = React.useState(false)
    
    React.useEffect(() => {
        Yelp.tripBuilder(tripState).then(response => {
            console.log({response})
            dispatch(updateDestinationsList({
                tripId: location.tripId,
                newList: response,
                tripBuilder: tripState
            }))
            setComplete(true)
            setTimeout(() => {
                handleCancelClick()
            }, 2000);
            
        })
    }, [0])

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