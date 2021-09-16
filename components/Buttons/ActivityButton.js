import React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function ActivityButton({ icon, text, handleClick, state}) {

    return (
        <Pressable
            style={styles.container}
            onPress={() => handleClick()}
        >
            <View
                style={{
                    backgroundColor: state ? 'white' : null,
                    borderRadius: 20,
                    borderColor: 'white',
                    borderWidth: 1,
                    padding: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 100,
                    width: 100
                }}
            >
                <FontAwesome5 
                    name={icon} 
                    size={36} 
                    color={state ? "black" : 'white'} 
                /> 
                <Text
                style={{
                    fontSize: 12,
                    color: state ? 'black' : 'white',
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
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
})
