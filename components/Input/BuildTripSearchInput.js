import React from 'react';
import { Dimensions, View, StyleSheet, Text, Pressable } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

export default function BuildTripSearchInput({ handleInput, handleClick }) {
    const ref = React.useRef();

    React.useEffect(() => {
        setTimeout(() => {
            ref.current?.focus()    
        }, 500);        
    }, [0])

    const handleClear = () => {
        ref.current?.setAddressText('')
        ref.current?.focus()        
    }

    const handleSelect = (data, details) => {
        console.log(data)
        console.log(details)
        handleClick('next')    
        handleInput({
            cityName: details.formatted_address,
            coordinates: details.geometry.location,
            utcOffset: details.utc_offset
        })
    }

    return (
        <View style={styles.container}>
              <GooglePlacesAutocomplete
                ref={ref}
                placeholder='Search for a city'                
                minLength={2}
                autoFocus={true}
                returnKeyType={'default'}
                fetchDetails={true}                
                enablePoweredByContainer={false}
                isRowScrollable={false}   
                listUnderlayColor={'rgba(255,255,255,0)'}
                renderRow={(data, index) => {
                    return (
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                                fontFamily: 'System',
                                fontWeight: 'bold'
                            }}>
                                {data.description}
                            </Text>
                            <Entypo name="arrow-right" size={24} color="white" />
                        </View>
                    )                    
                }}    
                renderRightButton={() => {
                    return (
                        <Pressable 
                            style={({ pressed }) => pressed ? {justifyContent: 'center', opacity: 0.5} : {justifyContent: 'center'}}
                            onPress={() => handleClear()}
                        >
                            <Feather name="delete" size={24} color="white" />
                        </Pressable>
                    )                    
                }}
                textInputProps={{
                    clearButtonMode: 'never',
                    placeholderTextColor: 'rgba(255,255,255,0.25)',                                        
                    returnKeyType: 'search'
                }}
                onPress={(data, details = null) => {
                    handleSelect(data, details)
                }}
                query={{
                    key: 'AIzaSyAxcJj0TolkzAhY0cT-a6ejr8dJs3QGKb8',
                    language: 'en',
                    types: '(cities)'
                }}
                styles={{                    
                    container: {
                        width: Dimensions.get('window').width - 100,
                        height: Dimensions.get('window').height / 2,   
                        flex: 0.5,           
                        justifyContent: 'flex-start',                                                                           
                    },
                    textInput: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        color: 'white',
                        fontSize: 24,
                        fontFamily: 'System',                        
                        borderBottomWidth: 1,
                        borderBottomColor: 'white',                        
                    },                    
                    row: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        height: 50,
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: 'white',
                        borderRadius: 20,
                        margin: 5
                    },
                    description: {
                        color: 'white',
                        fontSize: 20,
                        fontFamily: 'System',
                        fontWeight: 'bold'
                    },    
                    separator: {
                        display: 'none'
                    },           
                }}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Dimensions.get('window').height
    },

})
