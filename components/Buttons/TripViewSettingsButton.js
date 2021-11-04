import React from 'react';
import { Animated, View, StyleSheet, Pressable, Dimensions, Easing, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux';

export default function TripViewSettingsButton({ navigation, location, show, deleteTrip}) {    
    const translation = React.useRef(new Animated.Value(0)).current
    const opacity = React.useRef(new Animated.Value(0)).current
    const [expand, setExpand] = React.useState()    
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
        if (expand) {
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
        } else {
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
            <TouchableOpacity                
                style={[
                    styles.button,
                    {
                        backgroundColor: 'black',
                        // width: 50,
                        // height: 50,
                        // borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                ]}
                onPress={() => {
                    setExpand(!expand)
                }}
            >
                {
                    !expand && (
                        <Ionicons name="information-circle" size={30} color="white"/>
                    )
                }
                {
                    expand &&  (
                        <MaterialIcons name="cancel" size={30} color="white" />
                    )
                }
                
            </TouchableOpacity>
            <Animated.View
                 style={
                    {
                        opacity: opacity
                    }
                }
            >
                <TouchableOpacity
                    disabled={expand ? false : true}
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('TripConfigurator', {location: location})
                        setExpand(false)
                    }}
                >                 
                    <Ionicons name="ios-build-outline" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                    disabled={expand ? false : true}
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('TripList', {location: location})
                        setExpand(false)
                    }}
                >
                    <Ionicons name="ios-list-sharp" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                    disabled={expand ? false : true}
                    style={styles.button}
                    onPress={() => {                        
                        deleteTrip()                        
                        setExpand(false)
                    }}
                >
                    <FontAwesome5 name="trash" size={25} color="white" />
                </TouchableOpacity>
            </Animated.View>
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
        width: 50,
        height: 50,
        backgroundColor: 'rgb(112,112,112)',
        borderRadius: 27.5,
        padding: 7.5,
        justifyContent: 'center',
        alignItems: 'center'
    
    },
    buttonPressed: {
        margin: 5,
        borderRadius: 27.5,
        padding: 7.5,
        backgroundColor: 'rgb(51,51,51)',
    }
})