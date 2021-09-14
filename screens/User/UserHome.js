import React from 'react';
import LargeMapList from './LargeMapList';
import { View, StyleSheet, Dimensions, Text, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function UserHome({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>   
            <View style={styles.header}>  
                <Pressable 
                    style={({ pressed }) => pressed ? styles.headerNewTripPressed : styles.headerNewTrip}
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
                <LargeMapList navigation={navigation}/>        
            </View>            
        </SafeAreaView>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'     

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
