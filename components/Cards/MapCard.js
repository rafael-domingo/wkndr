import React from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable, TouchableWithoutFeedback, Button } from 'react-native';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';

export default function MapCard({ location, navigation }) {
    const mapRef = React.useRef();
    return (
        <>
        <Text style={styles.text}>
        {location.cityName}
        </Text>     
            <MapView 
                ref={mapRef}
                style={styles.map}
                scrollEnabled={false}
                userInterfaceStyle={"dark"}
                onPress={() =>  navigation.navigate('Trip', {location: location})}
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