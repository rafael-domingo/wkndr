import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import TransportButton from '../../components/Buttons/TransportButton';

export default function BuildTripTransport({ trip, handleClick }) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>How are you getting around?</Text>
            <View style={styles.subContainer}>
                <TransportButton icon="directions-car" text="Driving" selected={trip.transportation === 'Driving'} handleClick={() => handleClick('Driving')}/>
                <TransportButton icon="directions-bike" text="Biking" selected={trip.transportation === 'Biking'} handleClick={() => handleClick('Biking')}/>
                <TransportButton icon="directions-walk" text="Walking" selected={trip.transportation === 'Walking'} handleClick={() => handleClick('Walking')}/>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimensions.get('window').width - 50
    },
    text: {
        color: 'white',
        fontSize: 36
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50
    }
})