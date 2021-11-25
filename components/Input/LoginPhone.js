import React from 'react';
import { StyleSheet, View, Pressable, TextInput, Text, Button, TouchableOpacity, Animated, Easing } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { MaskedTextInput } from 'react-native-mask-text';
import PhoneInput from "react-native-phone-number-input";
import { Ionicons } from '@expo/vector-icons'; 

export default function LoginPhone({ toggleInput, toggleLoading, handlePhoneInput }) {
    const recaptchaVerifier = React.useRef(null);
    const [formattedValue, setFormattedValue] = React.useState("");
    const [valid, setValid] = React.useState(false);
    const [value, setValue] = React.useState("");
    const phoneInput = React.useRef(null);
    const opacity = React.useRef(new Animated.Value(0)).current
    const firebaseConfig = {
        apiKey: "AIzaSyAxcJj0TolkzAhY0cT-a6ejr8dJs3QGKb8",
        authDomain: "wkndr-326514.firebaseapp.com",
        projectId: "wkndr-326514",
        storageBucket: "wkndr-326514.appspot.com",
        messagingSenderId: "428911834730",
        appId: "1:428911834730:web:7118039ec38bec96f13c13",
        measurementId: "G-3XYYPWL3W1"
      };
    
    React.useEffect(() => {
        const isValid = phoneInput.current?.isValidNumber(value)
        setValid(isValid ? isValid : false)
        console.log(isValid)
        if (isValid) {
            Animated.timing(
                opacity,
                {
                    toValue: 1,
                    duration: 250, 
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        } else {
            Animated.timing(
                opacity,
                {
                    toValue: 0,
                    duration: 250, 
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        }
    }, [value])

    return (
        <View style={styles.container}>     
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={true}
            />    
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>                 
            <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                disableArrowIcon={true}                            
                defaultCode="US"
                layout="second"
                onChangeText={(text) => {
                setValue(text);
                }}
                onChangeFormattedText={(text) => {
                setFormattedValue(text);
                console.log(formattedValue)
                }} 
                containerStyle={{backgroundColor:'rgba(255,255,255,0)', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}                                                       
                textContainerStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
                codeTextStyle={{color: 'white', fontSize: 36, fontWeight: '200'}}
                textInputStyle={{color: 'white', fontSize: 36, fontWeight: 'bold'}}
                countryPickerButtonStyle={{color:'white'}}
                autoFocus
            />
            <Animated.View style={{justifyContent: 'center',opacity: opacity}}>
                <TouchableOpacity                
                    onPress={() => handlePhoneInput(formattedValue, recaptchaVerifier.current)}
                >
                    <Ionicons name="arrow-forward-circle-outline" size={36} color="white" />
                </TouchableOpacity>
            </Animated.View>                       
                      
            </View>          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',                
        width: '100%'
    },
   
})