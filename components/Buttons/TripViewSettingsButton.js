import React from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function TripViewSettingsButton() {

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => pressed ? styles.buttonPressed : styles.button }
            >
                <Ionicons name="ios-build-outline" size={30} color="white" />
            </Pressable>
            <Pressable 
                style={({ pressed }) => pressed ? styles.buttonPressed : styles.button }
            >
                <Ionicons name="ios-list-sharp" size={30} color="white" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 5,   
        position: 'relative',
        bottom: 0,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width - 40,                
    },  
    button : {
        margin: 5,
        backgroundColor: 'rgb(112,112,112)',
        borderRadius: 27.5,
        padding: 7.5,
    
    },
    buttonPressed: {
        margin: 5,
        borderRadius: 27.5,
        padding: 7.5,
        backgroundColor: 'rgb(51,51,51)',
    }
})