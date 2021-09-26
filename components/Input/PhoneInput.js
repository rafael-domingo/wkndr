import React from 'react';
import { StyleSheet, View, Pressable, TextInput, Text, Button } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { MaskedTextInput } from 'react-native-mask-text';
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
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>      
            <Text style={{color: 'white', fontSize: 50, fontWeight: '100'}}>
                +1
            </Text>
            <MaskedTextInput
                style={styles.input}
                placeholder='(---) --- ----'
                mask='(999) 999-9999'
                placeholderTextColor="white"
                autoCorrect={false}
                // value={phoneInput}
                autoCompleteType="tel"
                textContentType="telephoneNumber"
                autoFocus={true}
                keyboardAppearance="dark"
                keyboardType="number-pad"
                onChangeText={(text, rawText) =>{
                    console.log(rawText)
                    setPhoneInput(text)
                }}
            />            
            </View>
      
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
                        handlePhoneInput(`+1 ${phoneInput}`, recaptchaVerifier.current)                     
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
        width: '70%',
        color: 'white',
        // borderBottomColor: 'white',
        // borderBottomWidth: 1,
        fontSize: 50,
        fontWeight: '100',
        paddingLeft: 10
 
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