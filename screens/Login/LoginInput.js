import React from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text, Dimensions, Animated, Easing, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import SignupButton from '../../components/Buttons/SignupButton';
import EmailInput from '../../components/Input/EmailInput';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import LoginPhone from '../../components/Input/LoginPhone';
import VerificationInput from '../../components/Input/VerificationInput';
import LoginLoading from '../../components/Misc/LoginLoading';
import { setTripList, setUser } from '../../redux/user';
import { phoneSignIn, phoneVerificationCode } from '../../util/Auth';
import { getFirestore } from '../../util/Firestore';



export default function LoginInput({ navigation }) {
    const [inputType, setInputType] = React.useState('phone')
    const [loading, setLoading] = React.useState(false);
    const [verificationId, setVerificationId] = React.useState();
    const [verificationError, setVerificationError] = React.useState(false)
    const recaptchaVerifier = React.useRef(null);

    const dispatch = useDispatch();
    const opacity = React.useRef(new Animated.Value(1)).current
    const verificationOpacity = React.useRef(new Animated.Value(0)).current
    const loadingOpacity = React.useRef(new Animated.Value(0)).current
    React.useEffect(() => {        
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: 1000,
                delay: 500,
                easing: Easing.inOut(Easing.exp),
                useNativeDriver: true
            }
        ).start()        
    }, [0])


    const firebaseConfig = {
        //firebaseConfig
      };
      

    const handleToggle = (inputType) => {
        
        if(inputType==='phone') {
            Animated.timing(
                verificationOpacity,
                {
                    toValue: 0,
                    duration: 500,
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start(() => {
                setInputType(inputType)
                Animated.timing(
                    opacity,
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
                    setLoading(true)
                    if (response !== 'new user') {                        
                        setInputType('existing account')
                        dispatch(setTripList(response.tripList))
                        Animated.timing(
                            verificationOpacity,
                            {
                                toValue: 0,
                                duration: 500,
                                delay: 0,
                                easing: Easing.out(Easing.exp),
                                useNativeDriver: true
                            }
                        ).start(() => {
                            Animated.timing(
                                loadingOpacity,
                                {
                                    toValue: 1,
                                    duration: 500,
                                    delay: 0,
                                    easing: Easing.out(Easing.exp),
                                    useNativeDriver: true
                                }
                            ).start()
                        })
                        setTimeout(() => {
                            navigation.navigate('User')
                        }, 2000);
                       
                    } else {                                           
                        setInputType('new user')    
                        Animated.timing(
                            verificationOpacity,
                            {
                                toValue: 0,
                                duration: 500,
                                delay: 0,
                                easing: Easing.out(Easing.exp),
                                useNativeDriver: true
                            }
                        ).start(() => {
                            Animated.timing(
                                loadingOpacity,
                                {
                                    toValue: 1,
                                    duration: 500,
                                    delay: 0,
                                    easing: Easing.out(Easing.exp),
                                    useNativeDriver: true
                                }
                            ).start()
                        })
                        setTimeout(() => {
                            navigation.navigate('User')    
                        }, 2000); 
                        
                    }                    
                    
                }).catch(error => console.log(error))  
            }
        })
        .catch(error => console.log(error))
    }

  
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
                            <LoginPhone 
                                toggleInput={handleToggle} 
                                toggleLoading={handleLoading}
                                handlePhoneInput={handlePhoneInput}
                            />
                    </Animated.View>
                )
            }
            {
                (!loading && inputType === 'verification') && (
                    <Animated.View style={{opacity: verificationOpacity, width: '100%', transform: [{
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
                (loading && inputType === 'new user') && (
                    <Animated.View style={{width: '100%', justifyContent: 'center', alignItems: 'center', opacity: loadingOpacity, transform:[{
                        translateX: loadingOpacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [200, 0]
                        })
                    }]}}>
                        <Text style={{textAlign: 'center', width: Dimensions.get('window').width*0.8, color: 'white', fontWeight: 'bold', fontSize: 20}}>
                            Creating your account
                        </Text>
                        <ActivityIndicator/>
                    </Animated.View>
                )
            }        
            {
                (loading && inputType === 'existing account') && (
                    <Animated.View style={{margin: 10, width: '100%', justifyContent: 'center', alignItems: 'center', opacity: loadingOpacity, transform:[{
                        translateX: loadingOpacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [200, 0]
                        })
                    }]}}>
                        <Text style={{margin: 10, textAlign: 'center', width: Dimensions.get('window').width*0.8, color: 'white', fontWeight: 'bold', fontSize: 20}}>
                            Logging you in
                        </Text>
                        <ActivityIndicator/>
                    </Animated.View>
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
        width: Dimensions.get('window').width*0.9
 
    }
})
