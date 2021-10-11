import React from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable, TouchableWithoutFeedback, Button } from 'react-native';
import MapView from 'react-native-maps';

export default function MapCard({ location, navigation }) {

    return (
        <>
        <Text style={styles.text}>
        {location.cityName}
        </Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Trip', {location: location})}>
        <MapView 
        style={styles.map}
        scrollEnabled={false}
        // userInterfaceSt yle={"dark"}
        camera={{
            center: {
                latitude: location.coordinates.lat,
                longitude: location.coordinates.lng,
            },
            pitch: 0,
            heading: 0,
            altitude: 100000,
            zoom: 12
        }}
        // mapType={'mutedStandard'}
        zoomTapEnabled={false}
        zoomEnabled={false}
        initialRegion={{
            latitude: location.coordinates.lat,
            longitude: location.coordinates.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
    />  
        </TouchableWithoutFeedback>
        </>
    )
}


const styles = StyleSheet.create({
    container: {        
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20,
        // flex: 1,
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').height - 300,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'System'
    },
    paginationText: {
        color: 'white',
        flex: 1
    }
})