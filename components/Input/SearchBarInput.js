import React from 'react';
import { Animated, View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Easing } from 'react-native';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { Yelp } from '../../util/Yelp';
import Autocomplete from '../Misc/Autocomplete';

export default function SearchBarInput({ location, handleSearch, show }) {
    const ref = React.useRef();
    const [value, setValue] = React.useState('');
    const [autocomplete, setAutocomplete] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const translation = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        if (show)  {
            
            Animated.timing(
                translation,
                {
                    toValue: 100,
                    duration: 500,
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start(()=> ref.current?.focus())
        } else {
            ref.current?.blur()
            Animated.timing(
                translation,
                {
                    toValue: -100,
                    duration: 500,
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        }
      
    }, [show])

    const updateSearch = (search) => {
        ref.current?.focus()
        handleSearch([])
        setValue(search)
        if (search.length > 2) {
            setLoading(true)
            Yelp.autoComplete(search).then(response => {
                setLoading(false)
                setAutocomplete(response)
            })
        } else {
            setAutocomplete([])
        }
        
    }

    // search from keyboard input
    const submitSearch = (event) => {
        setAutocomplete([])
        Yelp.search(event.nativeEvent.text, location.coordinates.lat, location.coordinates.lng).then(response => {
            handleSearch(response)
        }).catch(error => console.log(error))
    }
    // search from selecting from autocomplete
    const autoCompleteSearch = (text) => {
        Yelp.search(text, location.coordinates.lat, location.coordinates.lng).then(response => {
            handleSearch(response)
            setAutocomplete([])
        }).catch(error => console.log(error))
    }

    return (
        <Animated.View 
            style={[
                styles.container, 
                {
                    transform: [{translateY: translation}],
                    opacity: translation.interpolate({
                        inputRange: [0,100],
                        outputRange: [0,1]
                    })
                }
            ]}
        >
            <SearchBar     
                ref={ref}
                inputContainerStyle={{height: 50, backgroundColor: 'white'}}         
                placeholder="Search"
                onChangeText={text => updateSearch(text)}
                value={value}
                showLoading={loading}
                round={true}
                returnKeyType={'search'}
                onSubmitEditing={submitSearch}                
                cancelButtonProps={{
                    disabled: true,
                    buttonDisabledStyle: {display: 'none'}
                }}
            />
            <Autocomplete autocomplete={autocomplete} setValue={setValue} setAutocomplete={setAutocomplete} autoCompleteSearch={autoCompleteSearch}/>
        </Animated.View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        // width: Dimensions.get('window').width - 50,
        width: '90%',
        // paddingRight: 75,
        // paddingLeft: 25,
        borderRadius: 10,
        position: 'relative',
        top: -100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2
        
    }
})