import React from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable, TouchableWithoutFeedback, Button } from 'react-native';
import MapView from 'react-native-maps';

export default function MapCard({ location, navigation }) {

    return (
        <>
        <Text style={styles.text}>
        {location.name}
        </Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Trip')}>
        <MapView 
        style={styles.map}
        scrollEnabled={false}
        zoomTapEnabled={false}
        zoomEnabled={false}
        initialRegion={{
            latitude: location.location.latitude,
            longitude: location.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
    />  
        </TouchableWithoutFeedback>
        <Button onPress={() => navigation.navigate('Trip')} title="Open"/>
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