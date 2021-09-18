import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import Picture from '../../assets/broad.jpeg';

export default function TripListCard() {

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={Picture}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.locationName}>Poppy + Rose</Text>
                <Text style={styles.address}>221 S Grand Ave</Text>
            </View>
            <View style={styles.buttonContainer}>
                <FontAwesome5 name="trash" size={24} color="white" />
            </View>
        </View>
    )
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