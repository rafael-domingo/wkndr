import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import TransportButton from '../../components/Buttons/TransportButton';

export default function BuildTripTransport() {
    const [selected, setSelected] = React.useState('');
    
    const handleClick = (state) => {
        setSelected(state)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>How are you getting around?</Text>
            <View style={styles.subContainer}>
                <TransportButton icon="directions-car" text="Driving" selected={selected} handleClick={handleClick}/>
                <TransportButton icon="directions-bike" text="Biking" selected={selected} handleClick={handleClick}/>
                <TransportButton icon="directions-walk" text="Walking" selected={selected} handleClick={handleClick}/>
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