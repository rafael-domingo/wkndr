import React from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import { BlurView } from "expo-blur";

export default function LogoutModal({showModal, setModal, handleLogout}) {
    const [loading, setLoading] = React.useState(false)
    return (
        <Modal
        transparent={true}
        visible={showModal}    
        animationType={'slide'}                              
        >
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <BlurView intensity={100} tint={'default'} style={{overflow: 'hidden', borderRadius: 20, height: 200, width: Dimensions.get('window').width*0.8, justifyContent: 'center', alignItems: 'center'}}>
            {
                !loading && (
                    <Text style={{fontSize: 30}}>Logout of wkndr?</Text>
                )
            }
            {
                loading && (
                    <>
                    <Text style={{fontSize: 30}}>Logging out</Text>
                    <ActivityIndicator/>
                    </>
                )
            }
            <View style={{flexDirection: 'row', bottom: 0, position: 'absolute', width: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
                <View style={{width: '50%'}}>
                <TouchableOpacity onPress={() => setModal(false)} style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cancel</Text>
                </TouchableOpacity>
                </View>
                <View style={{width: '50%'}}>
                <TouchableOpacity onPress={() => {
                    handleLogout()
                    setLoading(true)
                }} style={{padding: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'rgb(24,28,47)'}}>Logout</Text>
                </TouchableOpacity>
                </View>
            </View>
        </BlurView>
        </View>
    </Modal>    
    )
}