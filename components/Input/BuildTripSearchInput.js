import React from 'react';
import { Dimensions, View, StyleSheet, Text, Pressable, TouchableOpacity, Animated, Easing } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import FlagSelector from '../Misc/FlagSelector';
import CountryFlag from 'react-native-country-flag';
import BackButton from '../Buttons/BackButton';



export default function BuildTripSearchInput({ handleInput, handleClick }) {
    const ref = React.useRef();
    const opacity = React.useRef(new Animated.Value(1)).current
    const [country, setCountry] = React.useState(null)

    React.useEffect(() => {
        setTimeout(() => {
            ref.current?.focus()    
        }, 500);                
    }, [country])

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

    const handleSelectCountry = (country) => {
        setCountry(country)
        Animated.timing(
            opacity,
            {
                toValue: 0, 
                duration: 500,
                delay: 250,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true
            }
        ).start()
    }

    const handleDeleteCountry = () => {
        setCountry(null)
        Animated.timing(
            opacity,
            {
                toValue: 1, 
                duration: 500,
                delay: 250,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true
            }
        ).start()
    }

    return (
        <View style={styles.container}>
            {
                country === null && (
                    <Animated.View 
                        style={{
                            width: '100%', 
                            height: '100%', 
                            justifyContent: 'flex-start', 
                            alignItems: 'center', 
                            opacity: opacity, 
                            transform: [{
                                translateX: opacity.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-200, 0]
                                })
                            }]
                        }}
                    >                    
                    <FlagSelector handleSelectCountry={handleSelectCountry}/>
                    </Animated.View>
                )
            }
            
            {
                country !== null && (
                    <Animated.View 
                        style={{
                            width: '100%', 
                            height: '100%', 
                            justifyContent: 'flex-start', 
                            alignItems: 'center', 
                            opacity: opacity.interpolate({
                                inputRange: [0,1],
                                outputRange: [1,0]
                            }),
                            transform: [{
                                translateX: opacity.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 200]
                                })
                            }]
                        }}
                    >
                    <View style={{justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', width: '100%', margin: 20}}>
                        <TouchableOpacity style={{width: '25%', alignItems: 'center'}} onPress={() => handleDeleteCountry()}>
                            <Entypo name="arrow-left" size={24} color="white" />
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '75%'}}>
                        <CountryFlag style={{borderRadius: 25, width: 50}} size={50} isoCode={country?.code}/>
                        <Text style={{color: 'white', textAlign: 'center', fontSize: 20, marginLeft: 10, fontWeight: 'bold'}}>{country?.name}</Text>                    
                        </View>
                    </View>
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
                     renderDescription={() => console.log('row')}
                     renderRow={(data, index) => {
                         console.log(data)
                         const description = []
                         for (let index = 0; index < data.terms.length - 1; index++) {                                                   
                             if (index !== data.terms.length - 2) {
                                description.push(
                                    <Text key={data.terms[index].value}>{data.terms[index].value}, </Text>
                                )   
                             } else {
                                description.push(
                                    <Text key={data.terms[index].value}>{data.terms[index].value}</Text>
                                )   
                             }
                         }

                         return (
                             <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, width: '100%', height: '100%'}}>
                                 <Text style={{
                                     color: 'white',
                                     fontSize: 20,
                                     fontFamily: 'System',
                                     fontWeight: 'bold'
                                 }}>
                                     {description}
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
                         types: '(cities)',
                         components: `country:${country?.code}`
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
                            //  borderBottomWidth: 1,
                            //  borderBottomColor: 'white',                        
                         },                    
                         row: {
                             backgroundColor: 'rgba(0,0,0,0)',
                             height: 50,
                             alignItems: 'center',
                            //  borderWidth: 1,
                            //  borderColor: 'white',
                            //  borderRadius: 20,
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
                     </Animated.View>
                )
            }
             
                                
                
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        
        // height: Dimensions.get('window').height
    },

})
