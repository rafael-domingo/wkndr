import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';
import LoginButton from '../../components/Buttons/LoginButton';
import SignupButton from '../../components/Buttons/SignupButton';
import Hero from '../../components/Misc/Hero';
import Logo from '../../components/Misc/Logo';
import { setTripList, setUser } from '../../redux/user';
import { checkUser } from '../../util/Auth';
import { getFirestore } from '../../util/Firestore';
import LoginInput from './LoginInput';
import firebase from '../../util/Firebase';

export default function Welcome({ navigation }) {
    const [login, setLogin] = React.useState(false);
    const dispatch = useDispatch()

    const handleLogin = () => {
        setLogin(true);
    }

    const handleSignup = () => {
        setLogin(false);
    }

    console.log(`welcome state: ${login}`)
    React.useEffect(() => {
        // Check if user is already authenticated with auth listener
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listener
            if (user) {
                console.log(user)
                const userObject = {
                    displayName: user.displayName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    uid: user.uid,
                    photoURL: user.photoURL
                }
                dispatch(setUser(userObject))
                getFirestore(user.uid).then(response => {
                    console.log(response)
                    if (response !== 'new user') {
                        dispatch(setTripList(response.tripList))
                        navigation.navigate('User', {city: null})
                    } else {                        
                        navigation.navigate('User', {city: null})
                    }                    
                    
                }).catch(error => console.log(error))  
            } else {
                // No user is signed in...code to handle unauthenticated users. 
            }
        });
        return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting. 

        // checkUser().then(response => {
        //     console.log(response)
        //     if (response != null) {
        //         const userObject = {
        //             displayName: response.displayName,
        //             email: response.email,
        //             phoneNumber: response.phoneNumber,
        //             uid: response.uid,
        //             photoURL: response.photoURL
        //         }
        //         dispatch(setUser(userObject))
        //         getFirestore(response.uid).then(response => {
        //             console.log(response)
        //             if (response !== 'new user') {
        //                 dispatch(setTripList(response.tripList))
        //                 navigation.navigate('User')
        //             } else {                        
        //                 navigation.navigate('User')
        //             }                    
                    
        //         }).catch(error => console.log(error))  
        //     }
        // })
        // .catch(error => console.log(error))
        
    })

    return (
        // <KeyboardAvoidingView 
        //     styles={{flex: 1}}
        //     behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        // >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Hero login={login}/>
                        <Logo />
                    </View>
                    {
                        !login && (
                            <View style={styles.login}>
                                <LoginButton handleClick={handleLogin}/>
                                <SignupButton handleClick={handleLogin} text={false}/>
                            </View>  
                        )
                    }
                    {
                        login && (
                            <View style={styles.input}>                   
                                <LoginInput handleSignup={handleSignup} navigation={navigation}/>
                            </View>
                        )
                    }
                </View>
            </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>
       
      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',     
        backgroundColor: 'rgb(24, 28, 47)'     
    },
    header: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    login: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
})
