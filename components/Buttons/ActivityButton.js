import React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function ActivityButton({ icon, text, handleClick}) {
    const [selected, setSelected] = React.useState(false);

    return (
        <Pressable
            style={styles.container}
            onPress={() => setSelected(!selected)}
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
                    height: 100,
                    width: 100
                }}
            >
                <FontAwesome5 
                    name={icon} 
                    size={36} 
                    color={selected ? "black" : 'white'} 
                /> 
                <Text
                style={{
                    fontSize: 12,
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
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
})
