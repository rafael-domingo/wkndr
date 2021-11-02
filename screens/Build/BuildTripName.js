import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, TextInput } from 'react-native';
import { Sae } from 'react-native-textinput-effects';

export default function BuildTripName({ handleInput }) {
    const ref = React.useRef()
    const [value, setValue] = React.useState()
    const suggestions = [
        'Vacation',
        'Honeymoon',
        'Business Trip',
        'Family visit',
        'College Tour',
        'Food Tour',             
        'Weekend Trip',
        'Reunion',
        'Fall Break',
        'Spring Break'   
    ]

    React.useEffect(() => {
        setTimeout(() => {
            ref.current?.focus()
        }, 500);
    }, [0])

    const handleTextInput = (value) => {
        setValue(value)
        handleInput(value)
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.text, {fontSize: 36}]}>What would you like to name this trip?</Text>
            <TextInput
                ref={ref}
                placeholder="Trip name"
                value={value}
                onChangeText={text => handleTextInput(text)}
                style={[styles.inputText, {color: 'rgba(24,28,47,1)', fontSize: 30}]}
                placeholderTextColor={'rgba(24,28,47,0.5)'}
                clearButtonMode={'while-editing'}
            />
            <View style={styles.suggestionsContainer}>          
                <Text style={[styles.text, {fontSize: 25, fontWeight: '300'}]}>Here are some suggestions...</Text>            
                {
                    suggestions.map((item, index) => {
                        return (
                            <TouchableOpacity 
                                style={value === item ? [styles.suggestions, {backgroundColor: 'rgba(24, 28, 47, 1)'}] : styles.suggestions}
                                onPress={() => {
                                    handleTextInput(item)
                                    ref.current?.blur()
                                }}
                            >
                                <Text style={value === item ? [styles.text, styles.suggestionsText, { color: 'white'}] : [styles.text, styles.suggestionsText ]} key={index}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimensions.get('window').width - 50,
    },
    inputText: {
        borderBottomWidth: 1,        
        width: Dimensions.get('window').width - 100,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15
    },  
    text: {
        fontFamily: 'System',
        color: 'white'
    },
    suggestionsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 50,
    },  
    suggestions: {
        width: '30%',
        height: 50,        
        backgroundColor: 'white',
        borderRadius: 10,                     
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    suggestionsText: {
        fontSize: 20, 
        fontWeight: 'bold', 
        padding: 5, 
        color: 'rgba(24, 28, 47, 1)'
    }
})
