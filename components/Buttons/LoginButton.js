import React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';

export default function LoginButton({ text="Login", handleClick }) {

    return (        
        <Pressable
            style={({pressed}) => pressed ? styles.pressedButton : styles.button}
            onPress={handleClick}
        >
            <Text style={styles.text}>
                {text}
            </Text>
        </Pressable>            
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'rgb(24,28,47)',
        fontFamily: 'System',
        fontWeight: '600'
    }, 
    button: {
        width: 160,
        height: 42,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,        
    },
    pressedButton: {
        width: 160,
        height: 42,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,    
        opacity: 0.5
    }
})