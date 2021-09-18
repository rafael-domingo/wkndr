import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
export default function TripBuilderConfirm({ handleClick, handleCancel }) {

    return (
        <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationHeader}>
                Would you like to generate new recommendations?
            </Text>
            <Text style={styles.confirmationSubHeader}>
                This will overwrite your existing trip
            </Text>
            <Pressable
                style={({ pressed }) => pressed ? styles.confirmationButtonPressed : styles.confirmationButton }
                onPress={() => handleClick()}
            >
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>Yes</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => pressed ? styles.noButtonPressed : styles.noButton }
                onPress={() => handleCancel()}
            >
                <Text style={styles.buttonText}>No, keep my existing trip</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    confirmationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    confirmationHeader: {
        color: 'white',
        fontSize: 32,
        textAlign: 'center',
        fontWeight: '400',
        fontFamily: 'System'
    },
    confirmationSubHeader: {
        color: 'white',
        fontFamily: 'System',
        fontSize: 24,
        fontWeight: '200',
        marginTop: 50,
        marginBottom: 50
    },
    confirmationButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10
    },
    confirmationButtonPressed: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        opacity: 0.5,
        margin: 10
    },
    noButton: {
        color: 'white',
        margin: 20
    },
    noButtonPressed: {
        color: 'white',
        opacity: 0.5,
        margin: 20
    },
    buttonText: {
        color: 'white',   
        fontSize: 24     
    }
})