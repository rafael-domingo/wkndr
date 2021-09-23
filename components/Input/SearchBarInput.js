import React from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { Yelp } from '../../util/Yelp';
import Autocomplete from '../Misc/Autocomplete';

export default function SearchBarInput({ location }) {
    const [value, setValue] = React.useState('');
    const [autocomplete, setAutocomplete] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const updateSearch = (search) => {
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
        Yelp.search(event.nativeEvent.text, location.coordinates.lat, location.coordinates.lng)
    }
    // search from selecting from autocomplete
    const autoCompleteSearch = (text) => {
        Yelp.search(text, location.coordinates.lat, location.coordinates.lng)
    }

    return (
        <View style={styles.container}>
            <SearchBar     
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
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 50,
        borderRadius: 10,
        position: 'relative',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
})