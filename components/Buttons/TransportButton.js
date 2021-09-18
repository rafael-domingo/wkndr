import React from 'react';
import { Dimensions, StyleSheet, Text, Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function TransportButton({ icon, text, selected, handleClick}) {

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
                    height: Dimensions.get('window').width / 4,
                    width: Dimensions.get('window').width / 4
                }}
            >                
                <MaterialIcons 
                    name={icon} 
                    size={36} 
                    color={selected ? 'black' : 'white'}
                />
                <Text 
                    style={{
                        fontSize: 17, 
                        color: selected ? 'black' : 'white',
                        marginTop: 10
                    }}
                >
                    {text}
                </Text>
            </View>
            
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        
    },

})