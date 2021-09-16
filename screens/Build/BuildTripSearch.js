import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import BuildTripSearchInput from '../../components/Input/BuildTripSearchInput';
export default function BuildTripSearch() {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Where do you want to go?</Text>
            <BuildTripSearchInput/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimensions.get('window').width - 50,
        flex: 1
    },
    text: {
        color: 'white',
        fontSize: 36
    }
})