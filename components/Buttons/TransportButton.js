import React from 'react';
import { Dimensions, StyleSheet, Text, Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function TransportButton({ icon, text, selected, handleClick}) {
    console.log(selected)
    return (
        <Pressable 
            style={styles.container}
            onPress={() => handleClick()}
        >
            <View
                style={{
                    backgroundColor: selected ? 'white' : null,
                    borderRadius: 20,
                    borderColor: 'white',
                    borderWidth: 1,
                    padding: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20
                }}
            >                
                <MaterialIcons 
                    name={icon} 
                    size={36} 
                    color={selected ? 'black' : 'white'}
                />
            </View>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        color: 'white'        
    }
})