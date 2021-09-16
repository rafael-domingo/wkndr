import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function CancelButton({handleClick}) {
    return (
        <Pressable 
            onPress={() => handleClick()} 
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.5 : 1
                },
                styles.cancelButton
            ]}
        >
            <Ionicons name="close-sharp" size={36} color="white" />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cancelButton: {
        position: 'absolute', 
        left: 36, 
        top: 72
    }
})