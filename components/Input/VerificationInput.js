import React from 'react';
import { StyleSheet, View, Pressable, TextInput, Text, Button } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

export default function VerificationInput({ toggleInput, toggleLoading, handleVerificationInput }) {
    const [verificationInput, setVerificationInput] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();
    return (
        <View style={styles.container}>         
            <MaskedTextInput
                style={styles.input}
                placeholder=" - - - - - "
                placeholderTextColor="white"
                mask='9-9-9-9-9-9'
                autoCorrect={false}
                autoFocus={true}
                keyboardAppearance="dark"
                keyboardType="number-pad"
                onChangeText={(text, rawText) => {
                    setVerificationInput(text)
                    setVerificationCode(rawText)
                }}
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
                        handleVerificationInput(verificationCode)
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
        // borderBottomColor: 'white',
        // borderBottomWidth: 1,
        fontSize: 50,
        fontWeight: '300',
        paddingLeft: 10,
        textAlign: 'center'
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