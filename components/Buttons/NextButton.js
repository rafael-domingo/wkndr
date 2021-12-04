import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

export default function NextButton({handleClick, showNext = true}) {

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.5 : 1
                },
                styles.nextButton
            ]}
            onPress={() => handleClick('next')}
            disabled={showNext ? false : true}
        >
            <Text style={styles.nextButtonText}>Next</Text>
            <Entypo name="arrow-right" size={24} color="white" />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    nextButton: {
        flexDirection: 'row'
    }, 
    nextButtonText: {
        color: 'white',
        fontSize: 24,
        marginRight: 10
    },   
})
