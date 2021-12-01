import React from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import { BlurView } from "expo-blur";

export default function DeleteAccountModal({showModal, setModal, handleDeleteAccount}) {
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
                    <Text style={{fontSize: 30}}>Delete your account?</Text>
                )
            }
            {
                loading && (
                    <>
                    <Text style={{fontSize: 30}}>Deleting your account</Text>
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
                    handleDeleteAccount()
                    setLoading(true)
                }} style={{padding: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Delete</Text>
                </TouchableOpacity>
                </View>
            </View>
        </BlurView>
        </View>
    </Modal>    
    )
}