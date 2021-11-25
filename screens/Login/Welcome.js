import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ActivityIndicator, Text, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Hero from '../../components/Misc/Hero';
import { setTripList, setUser } from '../../redux/user';
import { Ionicons } from '@expo/vector-icons'; 

import { getFirestore } from '../../util/Firestore';
import LoginInput from './LoginInput';
import firebase from '../../util/Firebase';

export default function Welcome({ navigation }) {
    const [login, setLogin] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch()
 
    React.useEffect(() => {
        
        
        // Check if user is already authenticated with auth listener
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listener
            if (user) {                             
                
                setLoggedIn(true)   
                setLoading(false)
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
                        setTimeout(() => {
                            dispatch(setTripList(response.tripList))
                            // navigation.navigate('User', {city: null})
                        }, 2000);
                  
                    } else {                     
                        setTimeout(() => {
                            // navigation.navigate('User', {city: null})    
                        }, 2000);   
                        
                    }                    
                    
                }).catch(error => console.log(error))  
            } else {
                setLoggedIn(false)
                setLoading(false)                
                // setTimeout(() => {
                //     setLoading(false)    
                // }, 2000);
                
                // No user is signed in...code to handle unauthenticated users. 
            }
        });
        return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting. 
        
    })

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.header}>    
                            
                    <Hero login={login} setLogin={setLogin} loggedIn={loggedIn} navigation={navigation} loading={loading}/>                        
                </View>
                
                {
                    login && (
                        <View style={styles.input}>      
                         {/* <TouchableOpacity                        
                        onPress={() => handleVerificationInput(value)}
                    >
                        <Ionicons name="arrow-forward-circle-outline" size={36} color="white" />
                    </TouchableOpacity>                               */}
                            <LoginInput navigation={navigation}/>
                        </View>
                    )
                }
                
            </View>
        </TouchableWithoutFeedback>
    
       
      
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
        flex: 1,            
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
})
