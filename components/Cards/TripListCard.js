import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function TripListCard({ destination, time, handleDelete }) {

    // for loop to extract key from object
    for (var key in destination) {        
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{uri: destination[key].image_url}}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.locationName}>{destination[key].name}</Text>
                    <Text style={styles.address}>{destination[key].location.display_address[0]}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={() => {
                        handleDelete(destination[key].wkndrId, time)
                    }}
                >
                    <FontAwesome5 name="trash" size={24} color="white" />
                </TouchableOpacity>
            </View>
        )
    }
  
}

const styles = StyleSheet.create({
    container: {        
        flexDirection: 'row',
        marginBottom: 20
    },  
    imageContainer: {
        width: Dimensions.get('window').width /4,
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 20
    },  
    textContainer: {
        width: Dimensions.get('window').width /2,
        justifyContent: 'center',
        paddingLeft: 10
    },
    locationName: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'System'
    },
    address: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'System',
        fontWeight: '200'
    },
    buttonContainer: {
        width: Dimensions.get('window').width/8,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})