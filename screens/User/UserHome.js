import React from 'react';
import LargeMapList from './LargeMapList';
import { View, StyleSheet, Dimensions, Text, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
export default function UserHome({ navigation }) {
    const userState = useSelector(state => state.user)
    const [userProfile, setUserProfile] = React.useState(userState)
    return (
        <SafeAreaView style={styles.container}>   
            <View style={styles.header}>  
                <Pressable 
                    style={({ pressed }) => pressed ? styles.headerNewTripPressed : styles.headerNewTrip}
                    onPress={() => navigation.navigate('Build')}
                >
                    <Ionicons name="ios-add-circle-outline" size={24} color="white" />
                    <Text style={styles.text}>New Trip</Text>
                </Pressable>              
               
                <Ionicons 
                    name="ios-settings-outline" 
                    size={24} 
                    color="white" 
                    onPress={() => console.log('pressed')}
                />
            </View>                   
            <View style={{flex: 1}}>
                <LargeMapList navigation={navigation} userTrips={userProfile.tripList}/>        
            </View>            
        </SafeAreaView>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(24, 28, 47)'     

    },
    header: {
        flex: 0.1,        
        width: Dimensions.get('window').width - 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerNewTrip: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },  
    headerNewTripPressed: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5
    },  
    text: {
        color: 'white',
        fontFamily: 'System',
        marginLeft: 10
    }
})
