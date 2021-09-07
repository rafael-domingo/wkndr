import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Hero({ login }) {
    
    return (
        <View style={login ? smallStyles.container : styles.container}>
            <LottieView              
                style={login ? smallStyles.lottie : styles.lottie} 
                source={require('../../assets/lottie.json')} 
                autoPlay 
                loop
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 100,
        height: 200,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lottie: {
        width: 200,
        height: 200
    }
})

const smallStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 100,
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lottie: {
        width: 100,
        height: 100
    }
})