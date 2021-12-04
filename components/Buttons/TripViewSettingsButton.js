import React from 'react';
import { Animated, View, StyleSheet, Pressable, Dimensions, Easing, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux';
import { Entypo } from '@expo/vector-icons'; 

export default function TripViewSettingsButton({ navigation, location, show, deleteTrip, renameTrip, setSearch, search, setSearchResults}) {    
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
                zIndex: search ? -1 : 5,
                transform: [{translateX: translation}],
                // opacity: translation.interpolate({
                //     inputRange: [0, 100],
                //     outputRange: [0, 1]
                // })
            }
            ]}>
                <TouchableOpacity 
                onPress={() => {
                    setSearch(!search)
                    if (search) {
                        setSearchResults([])
                    }
                }}
                style={{
                    zIndex: 10,
                    margin: 5,
                    width: 50,
                    height: 50,
                    backgroundColor: 'rgb(112,112,112)',
                    borderRadius: 27.5,
                    padding: 7.5,
                    // bottom: 100,
                    // right:10,                            
                    // position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {
                        !search && (
                            <FontAwesome5 name="search" size={24} color="white" />
                        )
                    }
                    {
                        search && (
                            <MaterialIcons name="cancel" size={24} color="white" />
                        )
                    }
                
            </TouchableOpacity>
            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
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
                <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Trip Builder</Text>
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
                </View>
                <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Trip List</Text>
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
                </View>
                <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Delete Trip</Text>
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
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Edit Trip Name</Text>
                    <TouchableOpacity 
                        disabled={expand ? false : true}
                        style={styles.button}
                        onPress={() => {                        
                            renameTrip()
                            setExpand(false)
                        }}
                    >
                        
                        <Entypo name="edit" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </Animated.View>
            </View>
            
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {        
        flex: 1,         
        position: 'absolute',
        top: 125,        
        height: 400,
        alignItems: 'flex-end',
        marginTop: 50,
        justifyContent: 'space-between',                
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
    },
    buttonText: {
        color: 'white'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        alignItems: 'center'
    }
})