import React from 'react';
import { StyleSheet, View, Pressable, TextInput, Text, Button } from 'react-native';
import { phoneVerificationCode } from '../../util/Firebase';

export default function VerificationInput({ toggleInput, toggleLoading, handleVerificationInput }) {
    const [verificationInput, setVerificationInput] = React.useState();
    return (
        <View style={styles.container}>         
            <TextInput
                style={styles.input}
                placeholder="- - - - - -"
                placeholderTextColor="white"
                autoCorrect={false}
                value={verificationInput}                                
                // autoFocus={true}
                keyboardAppearance="dark"
                keyboardType="number-pad"
                onChangeText={verificationCode => setVerificationInput(verificationCode)}
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
                    onPress={() => {
                        handleVerificationInput('123456')
                    }}
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