import React from 'react';
import { StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
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
                    height: Dimensions.get('window').width / 4,
                    width: Dimensions.get('window').width / 4
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
                    fontWeight: 'bold',
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
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
})
