import React from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text, Dimensions, Animated, Easing } from 'react-native';
import { useDispatch } from 'react-redux';
import SignupButton from '../../components/Buttons/SignupButton';
import EmailInput from '../../components/Input/EmailInput';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
// import PhoneInput from '../../components/Input/PhoneInput';
import VerificationInput from '../../components/Input/VerificationInput';
import LoginLoading from '../../components/Misc/LoginLoading';
import { setTripList, setUser } from '../../redux/user';
import { phoneSignIn, phoneVerificationCode } from '../../util/Auth';
import { getFirestore } from '../../util/Firestore';
import PhoneInput from "react-native-phone-number-input";


export default function LoginInput({ navigation }) {
    const [inputType, setInputType] = React.useState('phone')
    const [loading, setLoading] = React.useState(false);
    const [verificationId, setVerificationId] = React.useState();
    const [verificationError, setVerificationError] = React.useState(false)
    const recaptchaVerifier = React.useRef(null);
    const [value, setValue] = React.useState("");
    const [formattedValue, setFormattedValue] = React.useState("");
    const [valid, setValid] = React.useState(false);
    const [showMessage, setShowMessage] = React.useState(false);
    const phoneInput = React.useRef(null);
    const dispatch = useDispatch();
    const opacity = React.useRef(new Animated.Value(1)).current
    const verificationOpacity = React.useRef(new Animated.Value(0)).current
    React.useEffect(() => {
        if(inputType === 'verification') {
        
        } else {
            Animated.timing(
                opacity,
                {
                    toValue: 1,
                    duration: 500,
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        }
        
    }, [inputType])


    const firebaseConfig = {
        //firebaseConfig
      };
      

    const handleToggle = (inputType) => {
        setInputType(inputType)
    }


    const handleLoading = () => {
        setLoading(!loading)       
        navigation.navigate('User') 
    }

    const handlePhoneInput = (phoneNumber, recaptcha) => {
        phoneSignIn(phoneNumber, recaptcha)
        .then(response => {
            
            if (response === 'error') {
                console.log('error')
                return
            } else {                
                Animated.timing(
                    opacity,
                    {
                        toValue: 0,
                        duration: 500,
                        delay: 0,
                        easing: Easing.inOut(Easing.exp),
                        useNativeDriver: true
                    }
                ).start(() => {
                    setInputType('verification')
                    setVerificationId(response)
                    Animated.timing(
                        verificationOpacity,
                        {
                            toValue: 1,
                            duration: 500,
                            delay: 0,
                            easing: Easing.out(Easing.exp),
                            useNativeDriver: true
                        }
                    ).start()
                })                              
            }
        })  
        .catch(error => console.log(error))
    }

    const handleVerificationInput = (code) => {
        phoneVerificationCode(code, verificationId)
        .then(response => {
            if (response === 'error') {
                setVerificationError(true)
            
                console.log('error')
                return
            } else {
                const userObject = {
                    displayName: response.user.displayName,
                    email: response.user.email,
                    phoneNumber: response.user.phoneNumber,
                    uid: response.user.uid,
                    photoURL: response.user.photoURL
                }
                dispatch(setUser(userObject))              
                getFirestore(response.user.uid).then(response => {
                    console.log(response)
                    if (response !== 'new user') {
                        dispatch(setTripList(response.tripList))
                        navigation.navigate('User')
                    } else {                        
                        navigation.navigate('User')
                    }                    
                    
                }).catch(error => console.log(error))  
            }
        })
        .catch(error => console.log(error))
    }

    React.useEffect(() => {
        const isValid = phoneInput.current?.isValidNumber(value)
        setValid(isValid ? isValid : false)
    }, [value])

    return (
        <Animated.View style={styles.container}>            
            {
                (!loading && inputType === 'phone') && (
                    <Animated.View 
                        style={{
                            width: '100%',
                            opacity: opacity,
                            transform: [
                                {translateX: opacity.interpolate({
                                    inputRange: [0,1],
                                    outputRange: [-200, 0]
                                })}
                            ]
                        }}
                    >
                        <FirebaseRecaptchaVerifierModal
                            ref={recaptchaVerifier}
                            firebaseConfig={firebaseConfig}
                            attemptInvisibleVerification={true}
                        />   
                        <Text style={{textAlign: 'left', width: Dimensions.get('window').width*0.8, color: 'white', fontWeight: 'bold', fontSize: 20}}>Enter your phone number</Text>                  
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
                            containerStyle={{backgroundColor:'rgba(255,255,255,0)', borderRadius: 20}}                                                       
                            textContainerStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
                            codeTextStyle={{color: 'white', fontSize: 36, fontWeight: '200'}}
                            textInputStyle={{color: 'white', fontSize: 36, fontWeight: 'bold'}}
                            countryPickerButtonStyle={{color:'white'}}
                            autoFocus
                        />
                       
                        {
                            valid && (
                                <Button
                                title="next"
                                color="white"
                                disabled={valid ? false : true}
                                onPress={() => handlePhoneInput(formattedValue, recaptchaVerifier.current)}
                            />
                            )
                        }
                      
                    {/* <PhoneInput 
                        toggleInput={handleToggle} 
                        toggleLoading={handleLoading}
                        handlePhoneInput={handlePhoneInput}
                    /> */}
                    </Animated.View>
                )
            }
            {
                (!loading && inputType === 'verification') && (
                    <Animated.View style={{opacity: verificationOpacity, transform: [{
                        translateX: verificationOpacity.interpolate({
                            inputRange: [0,1],
                            outputRange: [200, 0]
                        })
                    }]}}>
                    <Text style={{textAlign: 'left', width: Dimensions.get('window').width*0.8, color: 'white', fontWeight: 'bold', fontSize: 20}}>
                        Enter your verification code
                    </Text>                  

                    <VerificationInput 
                        toggleInput={handleToggle} 
                        toggleLoading={handleLoading} 
                        handleVerificationInput={handleVerificationInput}
                        verificationError={verificationError}
                        setVerificationError={setVerificationError}
                    />
                    </Animated.View>
                )
            }      
            {
                loading && (
                    <LoginLoading />
                )
            }          

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
 
    }
})
