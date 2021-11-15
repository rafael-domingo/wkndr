import React from 'react';
import { Animated, StyleSheet, View, TouchableOpacity, Text, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';

export default function CardSubHeader({ location, show }) {
    const opacity = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {

        if (!show) {
            Animated.timing(
                opacity,
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
                opacity,
                {
                    toValue: 1,
                    duration: 500,
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        }
    })

    return (        
        <Animated.View style={{
            width: '100%',
            height: '50%',
            opacity: opacity,    
            
        }}>
        <LinearGradient
            colors={['rgba(0,0,0,0.9)','rgba(0,0,0,0.5)','rgba(0,0,0,0.25)','rgba(0,0,0,0)']}          
            style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', padding: 10,}}        
        >
            <View style={{flex: 1, alignItems: 'flex-start'}}>
                {
                    location.categories !== undefined && (
                        location.categories.map((category, index) => {
                            return (
                                <View key={index} style={{backgroundColor: 'white', borderRadius: 10, marginBottom: 5}}>
                                    <Text key={index} style={[styles.text, { color: 'rgb(24,28,47)', margin: 5}]}>{category.title}</Text>
                                </View>
                            )
                    })
                    )
                }   
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>                    
                    <Text style={[styles.text, {fontSize: 18, marginBottom: 10, fontWeight: 'bold'}]}>{location.review_count} reviews</Text>                                      
                {
                    location.display_phone !== undefined && (
                        <TouchableOpacity                            
                            disabled={show ? false : true}
                            onPress={() => {
                                console.log('phone pressed')
                                Linking.openURL(`tel:${location.phone}`)
                            }}
                        >
                            <Text style={[styles.text, {fontSize: 18, fontWeight: 'bold', textAlign: 'right'}]}>{location.display_phone}</Text>
                        </TouchableOpacity>
                        
                    )
                }    
                {
                    location.display_phone.length === 0 && (
                        <Text style={[styles.text, {fontSize: 15, fontWeight: 'bold', textAlign: 'right'}]}>No phone number available</Text>
                    )
                }
            </View>
        </LinearGradient>     
        </Animated.View>                       
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontFamily: 'System',     
    },
})