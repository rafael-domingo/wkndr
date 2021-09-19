import React from 'react';
import { Dimensions, View, StyleSheet, Text, Pressable } from 'react-native';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-android';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Feather } from '@expo/vector-icons'; 
import NextButton from '../Buttons/NextButton';

export default function BuildTripSearchInput({ handleInput, handleClick }) {
    const [location, setLocation] = React.useState();
    const ref = React.useRef();

    React.useEffect(() => {
        setTimeout(() => {
            ref.current?.focus()    
        }, 500);        
    })

    const handleChange = (string) => {
        setLocation()
    }

    const handleClear = () => {
        ref.current?.setAddressText('')
        ref.current?.focus()
        setLocation()
    }

    const handleSelect = (data, details) => {
        setLocation({
            cityName: details.formatted_address,
            coordinates: details.geometry.location
        })
        // handleInput({
        //     cityName: details.formatted_address,
        //     coordinates: details.geometry.location
        // })
    }

    const handleNextClick = () => {
        handleClick('next')
        console.log(location)
        handleInput(location)
    }
    return (
        <View style={styles.container}>
            <NextButton handleClick={() => handleNextClick()}/>  

              <GooglePlacesAutocomplete
                ref={ref}
                placeholder='Search for a city'                
                minLength={2}
                autoFocus={true}
                returnKeyType={'default'}
                fetchDetails={true}
                keepResultsAfterBlur={true}
                enablePoweredByContainer={false}
                isRowScrollable={false}       
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
                    onChangeText: (string) => handleChange(string),
                    returnKeyType: 'search'
                }}
                onPress={(data, details = null) => {
                    handleSelect(data, details)
                }}
                query={{
                    key: 'api key',
                    language: 'en',
                    types: '(cities)'
                }}
                styles={{
                    
                    container: {
                        width: Dimensions.get('window').width - 100,
                        height: Dimensions.get('window').height / 2,                        
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