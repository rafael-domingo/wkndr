import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';


export default function TimeButtonAlt({ icon, text, subText, handleClick, state}) {

    return (
        <Pressable
            style={styles.container}
            onPress={() => handleClick()}
        >
            <View
                style={{
                    backgroundColor: state ? 'white' : null,
                    borderRadius: Dimensions.get('window').width / 8,
                    borderColor: 'white',
                    borderWidth: 1,
                    padding: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: Dimensions.get('window').width / 4,
                    width: Dimensions.get('window').width / 4
                }}
            >
                <Feather
                    name={icon}
                    size={36}
                    color={state ? 'black' : 'white'}
                />
                <Text
                    style={{
                        fontSize: 17,
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
        margin: 5,
    },

})