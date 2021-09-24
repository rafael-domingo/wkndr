import React from 'react';
import { StyleSheet, View, Pressable, TextInput, Text, Button } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

export default function PhoneInput({ toggleInput, toggleLoading, handlePhoneInput }) {
    const recaptchaVerifier = React.useRef(null);
    const [phoneInput, setPhoneInput] = React.useState();

    const firebaseConfig = {
       // firebaseConfig
      };

    return (
        <View style={styles.container}>     
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={true}
            />    
            <TextInput
                style={styles.input}
                placeholder="+1 (---) --- ----"
                placeholderTextColor="white"
                autoCorrect={false}
                value={phoneInput}
                autoCompleteType="tel"
                textContentType="telephoneNumber"
                // autoFocus={true}
                keyboardAppearance="dark"
                keyboardType="number-pad"
                onChangeText={phoneNumber => setPhoneInput(phoneNumber)}
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
                        handlePhoneInput('+1 (650) 555-1234', recaptchaVerifier.current)                     
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