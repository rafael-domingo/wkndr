import React from 'react';
import { Animated, View, StyleSheet, Pressable, Dimensions, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function TripViewSettingsButton({ navigation, location, show }) {
    const translation = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        if (!show) {
            Animated.timing(
                translation,
                {
                    toValue: 0,
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
                    toValue: 100,
                    duration: 500,
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        }
    })
    return (
        <Animated.View style={[
            styles.container,
            {
                transform: [{translateX: translation}],
                // opacity: translation.interpolate({
                //     inputRange: [0, 100],
                //     outputRange: [0, 1]
                // })
            }
            ]}>
            <Pressable
                style={({ pressed }) => pressed ? styles.buttonPressed : styles.button }
                onPress={() => {
                    navigation.navigate('TripConfigurator', {location: location})
                }}
            >
                <Ionicons name="ios-build-outline" size={30} color="white" />
            </Pressable>
            <Pressable 
                style={({ pressed }) => pressed ? styles.buttonPressed : styles.button }
                onPress={() => {
                    navigation.navigate('TripList', {location: location})
                }}
            >
                <Ionicons name="ios-list-sharp" size={30} color="white" />
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 5,   
        position: 'relative',
        bottom: 0,        
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width - 40,                
    },  
    button : {
        margin: 5,
        backgroundColor: 'rgb(112,112,112)',
        borderRadius: 27.5,
        padding: 7.5,
    
    },
    buttonPressed: {
        margin: 5,
        borderRadius: 27.5,
        padding: 7.5,
        backgroundColor: 'rgb(51,51,51)',
    }
})