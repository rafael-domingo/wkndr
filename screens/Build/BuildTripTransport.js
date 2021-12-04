import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import TransportButton from '../../components/Buttons/TransportButton';

export default function BuildTripTransport({ trip, handleClick, setShowNext }) {
    const [transport, setTransport] = React.useState(trip.transportation)

    React.useEffect(() => {
        if (transport.length > 0) {
            setShowNext(true)
        } else {
            setShowNext(false)
        }
    }, [transport])
    return (
        <View style={styles.container}>
            <Text style={styles.text}>How are you getting around?</Text>
            <View style={styles.subContainer}>
                <TransportButton 
                    icon="directions-car" 
                    text="Driving" 
                    selected={trip.transportation === 'Driving'} 
                    handleClick={() => {
                        handleClick('Driving')
                        setTransport('Driving')
                    }}
                />
                <TransportButton 
                    icon="directions-bike" 
                    text="Biking" 
                    selected={trip.transportation === 'Biking'} 
                    handleClick={() => {
                        handleClick('Biking')
                        setTransport('Biking')
                    }}
                />
                <TransportButton 
                    icon="directions-walk" 
                    text="Walking" 
                    selected={trip.transportation === 'Walking'} 
                    handleClick={() => {
                        handleClick('Walking')
                        setTransport('Walking')
                    }}
                />
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