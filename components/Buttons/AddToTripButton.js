import React from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet, Easing, View } from 'react-native';



export default function AddToTripButton({ show, addLocation }) {
    const opacity = React.useRef(new Animated.Value(0)).current
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)
    React.useEffect(() => {    
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: 500,
                delay: 100,
                easing: Easing.inOut(Easing.exp),
                useNativeDriver: true
            }
        ).start()
        
    })

    return (        
        <AnimatedTouchable
            style={[
                styles.container,
                {
                    // transform: [{translateY: translation}],
                    opacity: opacity
                }
            ]}
            onPress={() => addLocation()}
        >
            <Text style={styles.text}>Add To Trip</Text>
        </AnimatedTouchable>        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        padding: 5,  
        position: 'relative',
        bottom: 20,
        zIndex: 10         
    },
    text: {
        color: 'white',
        fontFamily: 'System',
        fontSize: 20
    }
})