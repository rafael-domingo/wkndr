import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function BackButton({handleClick, buttonText="Back", text}) {

    return (
        <Pressable 
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.5 : 1
                },
                styles.button
            ]}
            onPress={() => handleClick()}
        >
            <Text style={styles.buttonText}>{buttonText}</Text>
            <Text style={styles.buttonSubText}>to {text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '300'
    },
    buttonSubText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '100'
    },
})