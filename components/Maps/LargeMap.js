import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
export default function LargeMap() {

    return (
        <MapView
            style={styles.map}
            userInterfaceStyle={'dark'}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />
    )
}

const styles = StyleSheet.create({
    map: {
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20,
        // width: 300,
        // height: 500
        width: Dimensions.get('window').width - 75,
        height: Dimensions.get('window').height - 300,
    }
})