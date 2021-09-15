import React from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-android';

export default function BuildTripSearchInput() {
    const [value, setValue] = React.useState('');

    const updateSearch = (search) => {
        setValue(search)
    }
    return (
        <View style={styles.container}>
            <SearchBar
                inputContainerStyle={{height: 50}}
                placeholder="Search for a city"
                onChangeText={text => updateSearch(text)}
                value={value}
                cancelButtonProps={{
                    disabled: true,
                    buttonDisabledStyle: {display: 'none'}
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
        
    },

})