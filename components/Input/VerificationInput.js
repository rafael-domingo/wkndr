import React from 'react';
import { StyleSheet, View, Pressable, TextInput, Text, Button, Animated, Easing, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';



export default function VerificationInput({ toggleInput, toggleLoading, handleVerificationInput, verificationError, setVerificationError }) {

    const [value, setValue] = React.useState('');
    const ref = useBlurOnFulfill({value, cellCount: 6});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({value,setValue,});
    const opacity = React.useRef(new Animated.Value(0)).current
    React.useEffect(() => {
        if (verificationError) {                  
            setValue('')
            setVerificationError(false)
        }
    }, [verificationError])

    React.useEffect(() => {
        if(value.length === 6) {
            Animated.timing(
                opacity,
                {
                    toValue: 1,
                    duration: 250,
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        } else {
            Animated.timing(
                opacity,
                {
                    toValue: 0,
                    duration: 250,
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        }
    }, [value])
    return (
        <View style={styles.container}>  
        <View style={{flexDirection: 'row'}}>
      
        <CodeField
                ref={ref}
                {...props}
                autoFocus={true}
                value={value}
                onChangeText={setValue}
                cellCount={6}
                rootStyle={{padding: 20}}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                <View
                    // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                    onLayout={getCellOnLayoutHandler(index)}
                    key={index}
                    style={[{color: 'white',height: 40, width: 40, margin: 5, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.2)'}, isFocused && {height: 40, width: 40, margin: 5, borderBottomWidth: 2, borderBottomColor: 'white'}]}>
                    <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                </View>
                )}
            />               
            {/* <Animated.View
                style={[styles.submit, {opacity: opacity}]}
            > */}          
                <Animated.View style={{height: '100%',justifyContent: 'center',opacity: opacity}}>                
                    <TouchableOpacity                        
                        onPress={() => handleVerificationInput(value)}
                    >
                        <Ionicons name="arrow-forward-circle-outline" size={36} color="white" />
                    </TouchableOpacity>
                </Animated.View>
            {/* </Animated.View>       */}
        </View>
              
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1
    },
})