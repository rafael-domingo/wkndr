import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { signOut } from '../../util/Auth';
import { resetUserState } from '../../redux/user';
import Picture from '../../assets/account.png';

export default function Account({ route, navigation }) {
    const userState = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', width: '75%'}}>
                <TouchableOpacity 
                    style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => navigation.navigate('User')}
                >
                    <Entypo name="arrow-left" size={24} color="white"/>
                    <Text style={{color: 'white', fontSize: 24, marginLeft: 5}}>back</Text>
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.backgroundImage}>
                    <Image source={Picture}/>      
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
                    <Text style={[styles.accountText, {fontSize: 30, fontWeight: 'bold'}]}>John Doe</Text>  
                    <Text style={[styles.accountText, {fontSize: 25, fontWeight: '200'}]}>{userState.phoneNumber}</Text>  
                </View>

                
            </View>           
            <View style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>    
                <TouchableOpacity 
                    style={styles.logoutButton}
                    onPress={() => {
                        dispatch(resetUserState())
                        signOut()
                        navigation.reset({ index: 0, routes: [{name: 'Home'}]})
                    }}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{margin: 25}}>
                    <Text style={[styles.logoutText, {color: 'white'}]}>Delete my account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgb(24, 28, 47)'     

    },
    accountText: {
        color: 'white',
        fontFamily: 'System', 
        margin: 10       
    },  
    backgroundImage: {
        backgroundColor: 'white',
        borderRadius: 100,
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },  
    logoutButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    logoutText: {
        color: 'rgb(24,28,47)',
        fontFamily: 'System',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    }
})