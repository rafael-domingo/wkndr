import React from 'react';
import { Button, Pressable, StyleSheet, TextInput, Text, View } from 'react-native';

export default function EmailInput({ toggleInput, toggleLoading }) {

    return (
        <View style={styles.container}>         
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="white"
                autoCorrect={false}
                autoCompleteType="email"
                // autoFocus={true}
                keyboardAppearance="dark"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry={true}
                autoCompleteType="password"
                keyboardAppearance="dark"    
            />
            <View
                style={styles.submit}
            >
                <Pressable
                     style={({ pressed }) => 
                         pressed ? styles.pressedButton : styles.button
                    }
                    onPress={() => toggleInput('phone')}
                >
                    <Text style={styles.buttonText}>
                        login with phone
                    </Text>
                </Pressable>

                <Button
                    title="next"
                    color="white"
                    onPress={toggleLoading}
                >

                </Button>
            </View>          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },
    submit: {
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    input: {
        height: 50,        
        width: 300,
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        fontSize: 30,
        fontWeight: '100',
        margin: 10
    },
    button: {
        color: 'white',
    },
    pressedButton: {
        opacity: 0.5
    }, 
    buttonText: {
        color: 'white'
    }
})