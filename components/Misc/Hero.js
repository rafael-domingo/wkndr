import React from 'react';
import { Dimensions, StyleSheet, View, Text, Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Hero({ login, setLogin, loggedIn, navigation}) {
    const opacity = React.useRef(new Animated.Value(1)).current
    const textOpacity = React.useRef(new Animated.Value(1)).current
    const welcomeOpacity = React.useRef(new Animated.Value(0)).current
    React.useEffect(() => {
        if (loggedIn === false) {
            Animated.timing(
                textOpacity,
                {
                    toValue: 0,
                    duration: 1000,
                    delay: 2000,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true
                }
            ).start(() => {
                Animated.timing(
                    opacity,
                    {
                        toValue: 0,
                        duration: 1000,
                        delay: 0,
                        easing: Easing.out(Easing.exp),
                        useNativeDriver: false
                    }
                ).start(() => setLogin(true))
            })
        } else if (loggedIn === true) {
            Animated.timing(
                textOpacity,
                {
                    toValue: 0,
                    duration: 1000,
                    delay: 2000,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true
                }
            ).start(() => {
                Animated.timing(
                    welcomeOpacity,
                    {
                        toValue: 1,
                        duration: 1000,
                        delay: 0,
                        easing: Easing.out(Easing.exp),
                        useNativeDriver: true
                    }
                ).start(() => setTimeout(() => {
                    navigation.navigate('User', {city: null})
                }, 1000))
            }) 
        }
       
    })


    return (
        <Animated.View style={[styles.container, {
            transform: [{
            scale: opacity.interpolate({
                inputRange: [0,1],
                outputRange: [0.5,1]
            })
            }],
            borderRadius: opacity.interpolate({
                inputRange: [0,1],
                outputRange: [200,0]
            }),
            backgroundColor: opacity.interpolate({
                inputRange: [0,1],
                outputRange: ['rgb(255,255,255)', 'rgb(24,28,47)']
            }),
            height: opacity.interpolate({
                inputRange: [0,1],
                outputRange: [400, Dimensions.get('window').height]
            }),
            width: opacity.interpolate({
                inputRange: [0,1],
                outputRange: [400, Dimensions.get('window').width]
            })
        }]}>
            <Animated.Text style={[
                styles.text, {
                    opacity: textOpacity,
                    transform: [{
                        translateX: textOpacity.interpolate({
                            inputRange: [0, 1] ,
                            outputRange: [-200, 0]
                        })
                    }]
                }
            ]}>
                wkndr
            </Animated.Text>                 
            <Animated.Text style={[
                styles.text, {
                    fontWeight: '200',
                    opacity: welcomeOpacity,
                    transform: [{
                        translateX: welcomeOpacity.interpolate({
                            inputRange: [0,1],
                            outputRange: [200, 0]
                        })
                    }]
                }
            ]}>
                welcome back
            </Animated.Text>        
            
            <LottieView              
                style={styles.lottie} 
                source={require('../../assets/lottie.json')} 
                resizeMode='cover'
                autoPlay 
                loop
            />
          
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        borderWidth: 1,        
        // borderRadius: 100,
        flex: 1,                
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        top: 0,
        zIndex: -1
    },
    lottie: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,     
    },
    text: {
        fontFamily: 'System',
        fontSize: 65,
        // marginTop: 50,
        letterSpacing: 10,
        color: 'white',
        // height: 200,
        width:  Dimensions.get('window').width,
        fontWeight: 'bold',
        zIndex: 10,
        textAlign: 'center'
 
    }
})