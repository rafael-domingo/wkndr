import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableHighlight, Keyboard, Animated, Easing } from 'react-native';

export default function Autocomplete({ autocomplete, setValue, setAutocomplete, autoCompleteSearch }) {
    const opacity = React.useRef(new Animated.Value(0)).current

    const renderItem = ({ item, index, separators }) => {
        Animated.timing(
            opacity,{
                toValue: 1,
                duration: 250,
                delay: 500,
                easing: Easing.inOut(Easing.exp),
                useNativeDriver: true
            }
        ).start()
        return (
            <Animated.View style={{opacity: opacity}}>
                <TouchableHighlight
                    key={index}
                    style={styles.button}
                    activeOpacity={0.65}
                    underlayColor={'gray'}
                    onPress={() => {
                        console.log('pressed')
                        Keyboard.dismiss()
                        setValue(item.text)
                        autoCompleteSearch(item.text)
                        setTimeout(() => {
                            setAutocomplete([])
                        }, 250);                    
                    }}
                >
                    <Text style={styles.text}>
                        {item.text}
                    </Text>
                </TouchableHighlight>  
            </Animated.View>
                         
        )
    }

    const renderSeparator = () => {
        return (
          <View
            style={{
                height: 1,
                width: '90%',
                backgroundColor: "#CED0CE",
                marginLeft: '10%'
            
            }}
          />
        );
      }

    return (
     
        <FlatList
        keyboardShouldPersistTaps={'handled'} // allow for autocomplete to be tapped while keyboard is visible
        style={{backgroundColor: 'white',borderRadius: 10, width: '95%'}}
        data={autocomplete}
        renderItem={renderItem}
        keyExtractor={item => item.text}
        ItemSeparatorComponent={renderSeparator}
        scrollEnabled={false}
        />       
             
    )
}

const styles = StyleSheet.create({   
    button: {
        height: 50,
        flex: 1,        
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',        
        
    },
    text: {
        fontSize: 20,
        marginLeft: '10%',
        width: '100%',
        fontFamily: 'System',
        fontWeight: '300'
    }
})