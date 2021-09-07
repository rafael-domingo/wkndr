import React from 'react';
import { Text, ActivityIndicator, View, StyleSheet } from 'react-native';

export default function LoginLoading({ login=true }) {

    return (
        <View style={styles.container}>
            {
                login && (
                    <Text style={styles.text}>                
                        Logging you in
                    </Text>
                )
            }
            {
                !login && (
                    <Text style={styles.text}>                
                        Creating your account
                    </Text>
                )
            }
           
            <ActivityIndicator />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'normal',
        margin: 20
    }
})