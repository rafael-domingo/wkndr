import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

export default function LocationCard({ handlePress }) {

    return (
        <Pressable 
            style={styles.container}
            onPress={handlePress}
        >
            <Text>Verve Coffee</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 20,
        backgroundColor: 'white'
    }
})