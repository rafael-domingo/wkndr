import React from 'react';
import { StyleSheet, View, Button, Text, Pressable } from 'react-native';

export default function SignupButton({ handleClick, text=true }) {

    return (
        <View style={styles.container}>
            {
                text && (
                    <Text style={styles.text}>
                        don't have an account?
                    </Text>
                )
            }           
            <Pressable
                style={({pressed}) => pressed ? styles.pressedButton : styles.button}
                onPress={handleClick}
            >
                <Text style={styles.buttonText}>
                    Sign Up
                </Text>

            </Pressable>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50
    },
    buttonText: {
        color: 'white',
        fontFamily: 'System',
        fontWeight: 'bold'
    },
    text: {
        color: 'white',
        fontFamily: 'System',
        fontWeight: '200'
    },
    button: {
        width: 160,
        height: 42,
        // borderColor: 'white',
        // borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        // margin: 20        
    },
    pressedButton: {
        width: 160,
        height: 42,
        // borderColor: 'white',
        // borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        // margin: 20        
        opacity: 0.5
    }
    
})