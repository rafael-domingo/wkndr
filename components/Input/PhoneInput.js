import React from 'react';
import { StyleSheet, View, Pressable, TextInput, Text, Button } from 'react-native';

export default function PhoneInput({ toggleInput, toggleLoading }) {

    return (
        <View style={styles.container}>         
            <TextInput
                style={styles.input}
                placeholder="Phone number"
                placeholderTextColor="white"
                autoCorrect={false}
                autoCompleteType="tel"
                // autoFocus={true}
                keyboardAppearance="dark"
                keyboardType="number-pad"
            />       
            <View
                style={styles.submit}
            >
                <Pressable
                    style={({ pressed }) => 
                        pressed ? styles.pressedButton : styles.button
                    }
                    onPress={() => toggleInput('email')}
                >
                    <Text style={styles.buttonText}>
                        login with email
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
        color: 'white'
    },
    pressedButton: {
        opacity: 0.5
    },  
    buttonText: {
        color: 'white'
    }
})