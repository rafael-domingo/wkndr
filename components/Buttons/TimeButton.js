import React from 'react';
import { Dimensions, StyleSheet, Text, Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';


export default function TimeButton({ icon, text, subText, handleClick, state}) {

    return (
        <Pressable 
            style={styles.container}
            onPress={() => handleClick()}
        >
            <View
                style={{
                    backgroundColor: state ? 'white' : null,
                    borderRadius: 48,
                    borderColor: 'white',
                    borderWidth: 1,
                    padding: 15,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Feather 
                    name={icon} 
                    size={36} 
                    color={state ? 'black' : 'white'}            
                />
            </View>
            <View style={styles.subContainer}>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.subText}>{subText}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width - 150,
        height: 100,

        margin: 20
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },  
    text: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'System',
        fontWeight: '200'
    },
    subText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'System',
        fontWeight: '200'
    },

})