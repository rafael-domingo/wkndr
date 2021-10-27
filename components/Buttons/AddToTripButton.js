import React from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet, Easing, View } from 'react-native';



export default function AddToTripButton({ show, addLocation }) {
    const translation = React.useRef(new Animated.Value(0)).current
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)
    React.useEffect(() => {
        if (!show) {
            Animated.timing(
                translation,
                {
                    toValue: 300,
                    duration: 500,
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        } else {
            Animated.timing(
                translation,
                {
                    toValue: 0,
                    duration: 500,
                    delay: 100,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        }
    })

    return (        
        <AnimatedTouchable
            style={[
                styles.container,
                {
                    transform: [{translateY: translation}],
                    opacity: translation.interpolate({
                        inputRange: [0, 300],
                        outputRange: [1, 0]
                    })
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
        bottom: 10,         
    },
    text: {
        color: 'white',
        fontFamily: 'System',
        fontSize: 20
    }
})