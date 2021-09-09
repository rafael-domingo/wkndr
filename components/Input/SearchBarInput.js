import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';


export default function SearchBarInput() {
    const [value, setValue] = React.useState('');

    const updateSearch = (search) => {
        setValue(search)
    }

    return (
        <View style={styles.container}>
            <SearchBar     
                inputContainerStyle={{height: 50}}         
                placeholder="Search"
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
        backgroundColor: 'white',
        borderRadius: 20,
        height: 50,
        position: 'relative',
        top: 0,
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
})