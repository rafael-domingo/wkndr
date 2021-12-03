import React from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import { BlurView } from "expo-blur";
import { useDispatch } from 'react-redux';
import { deleteDestination } from '../../redux/user';

export default function DeleteDestinationModal({showModal, setModal, location, wkndrId, tripId, modalizeRef, markerRef, setCamera}) {
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    console.log({wkndrId})
    const handleDeleteLocation = (wkndrId, tripId) => {
        setTimeout(() => {
            dispatch(deleteDestination({
                tripId: tripId,
                wkndrId: wkndrId
            }))
            if(modalizeRef) {
                modalizeRef.current = []
                setCamera(false)
            }
            if (markerRef) {
                markerRef.current = []
            }
            
            setModal(false)
            setLoading(false)
            
        }, 1000);
      
    }

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
                    <Text style={{fontSize: 30}}>Delete this destination?</Text>                                        
                )
            }
            {
                loading && (
                    <>
                    <Text style={{fontSize: 30}}>Deleting...</Text>
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
                    handleDeleteLocation(wkndrId, tripId)
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