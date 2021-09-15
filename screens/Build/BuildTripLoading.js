import React from 'react';
import { Text, ActivityIndicator, View, StyleSheet } from 'react-native';

export default function BuildTripLoading() {

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
