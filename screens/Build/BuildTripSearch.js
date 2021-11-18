import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import BuildTripSearchInput from '../../components/Input/BuildTripSearchInput';
export default function BuildTripSearch({ handleInput, handleClick }) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Where do you want to go?</Text>
            <BuildTripSearchInput handleInput={handleInput} handleClick={handleClick}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width - 50,
        flex: 1,
    },
    text: {
        color: 'white',
        fontSize: 36
    }
})