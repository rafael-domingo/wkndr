import { BlurView } from 'expo-blur';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, View, Animated, Text, Easing, TouchableOpacity } from 'react-native';
import { fonts } from 'react-native-elements/dist/config';

export default function TripHeader({location, show, navigation }) {
    const translation = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        if (!show) {
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
        } else {
            Animated.timing(
                translation,
                {
                    toValue: -100,
                    duration: 500,
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        }
    }, [show])

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{translateY: translation}]
                }
            ]}
        >            
        
        <BlurView intensity={100} tint={'default'} style={{width: '100%', height: 125,}}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row', marginTop: 50}}>
                <TouchableOpacity
                    style={{width: '20%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}
                    onPress={() => navigation.navigate('User')}
                >
                    <Entypo name="arrow-left" size={30} color="white"/>     
                </TouchableOpacity>
                <View style={{width: '80%', height: '100%', justifyContent: 'center'}}>
                    <Text style={{width: '100%',color: 'white', fontSize: 35, fontWeight: 'bold'}}>{location.tripName}</Text>            
                    <Text style={{width: '100%',color: 'white', fontSize: 15, fontWeight: '300'}}>{location.cityName}</Text>    
                </View>
            </View>
        </BlurView>
      
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {            
        zIndex: 15,
        position: 'absolute',
        width: '100%',
        height: 125,        
        top:-100,
        justifyContent: 'center', 
        alignItems: 'center'
    }
})