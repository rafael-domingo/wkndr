import React from 'react';
import LargeMapList from './LargeMapList';
import { View, StyleSheet } from 'react-native';
export default function UserHome() {

    return (
        <View style={styles.container}>
            <LargeMapList />        
        </View>

        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
