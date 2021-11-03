import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

export default function TripSelection({trips}) {
    console.log({trips})
    return (
        // <View style={{justifyContent: 'center', alignItems: 'center', elevation: 1, height: 200,}}>
        <Modal
            animationType="slide"
            transparent={true}             
            visible={true}
        >
            <View style={{backgroundColor: 'rgba(255,255,255,0.5)', flex: 1, marginTop: 200, justifyContent: 'center', alignItems: 'center'}}>                
                {
                    trips.map((item, index) => {
                        return (
                            <Text key={index} style={{color: 'black'}}>{item.tripId}</Text>    
                        )                        
                    })
                }
            </View>
        </Modal>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})