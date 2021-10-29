import React from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet, Easing, View } from 'react-native';



export default function AddToTripButton({ show, addLocation, deleteLocation, modalContent, tripDestinations }) {
    const [buttonState, setButtonState] = React.useState(true)    
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

    React.useEffect(() => {
        var tripIds = [];
        tripDestinations.map((destination, index) =>{
            for (var key in destination) {
                tripIds.push(destination[key].id)
            }
        })        
        setButtonState(!tripIds.includes(modalContent.id))
        
    }, [tripDestinations])
    if (buttonState) {
        return (        
            <AnimatedTouchable
                style={[
                    styles.container,
                    {
                        // transform: [{translateY: translation}],
                        opacity: opacity
                    }
                ]}
                onPress={() => {
                    addLocation()
                    setButtonState(false)
                }}
            >
                <Text style={styles.text}>Add To Trip</Text>
            </AnimatedTouchable>        
        )
    } else {
        return (        
            <AnimatedTouchable
                style={[
                    styles.container,
                    {
                        // transform: [{translateY: translation}],
                        opacity: opacity,
                        backgroundColor: 'green'
                    }
                ]}
                onPress={() => {
                    deleteLocation(modalContent.wkndrId)
                    setButtonState(true)
                }}
            >
                <Text style={styles.text}>Added To Trip</Text>
            </AnimatedTouchable>        
        )
    }

    
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        width: 150,
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