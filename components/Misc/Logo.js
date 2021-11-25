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
        color: 'rgb(24, 28, 47)',
        height: 200,
        width: 200,
        fontWeight: '200',
        zIndex: 10
 
    }
})