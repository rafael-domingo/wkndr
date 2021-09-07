import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Logo() {

    return (
        <Text style={styles.text}>
            wkndr
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'System',
        fontSize: 65,
        // marginTop: 50,
        letterSpacing: 10,
        color: 'white',
        fontWeight: '200'
    }
})