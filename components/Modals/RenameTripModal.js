import React from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions, TextInput } from "react-native";
import { BlurView } from "expo-blur";

export default function RenameTripModal({location, setRenameModal, renameModal, setModalConfirm, setNewTripName}) {
    const [text, setText] = React.useState()
    const ref = React.useRef()

    React.useEffect(() => {
        setText('')
        if (renameModal) {
            setTimeout(() => {
                ref.current?.focus()    
            }, 500);            
        }
    }, [renameModal])
    return (
        <Modal
        transparent={true}
        visible={renameModal}    
        animationType={'slide'}                              
        >
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <BlurView intensity={100} tint={'default'} style={{overflow: 'hidden', borderRadius: 20, height: 200, width: Dimensions.get('window').width*0.8, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>What would you like to rename this trip?</Text>
                <TextInput
                    ref={ref}
                    style={{width: '100%', height: 50, color: 'white', fontSize: 40, textAlign: 'center'}}
                    onChangeText={setText}
                    value={text}
                    placeholder={location.tripName}
                />
                <View style={{flexDirection: 'row', bottom: 0, position: 'absolute', width: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
                    <View style={{width: '50%'}}>
                    <TouchableOpacity onPress={() => setRenameModal(false)} style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{width: '50%'}}>
                    <TouchableOpacity onPress={() => {
                        setModalConfirm(true)
                        setRenameModal(false)
                        setNewTripName(text)
                    }} style={{padding: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Save</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </BlurView>
            </View>
        </Modal>    
    )
}