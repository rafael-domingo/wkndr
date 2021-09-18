import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
export default function TripBuilderEnable({handleClick}) {

    return (
        <View style={styles.disabledContainer}>
            <Text style={styles.disabledHeader}>Trip Builder is disabled</Text>
            <Pressable
                style={({pressed}) => pressed ? styles.disabledButtonPressed : styles.disabledButton}
                onPress={() => handleClick()}
            >
                <Text style={styles.disabledButtonText}>Enable</Text>
            </Pressable>
    </View>
    )
}

const styles = StyleSheet.create({
    disabledContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    disabledHeader: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'System',
        fontWeight: '200',
        margin: 30
    },
    disabledButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    disabledButtonPressed: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        padding: 10
    },
    disabledButtonText: {
        fontSize: 24
    }
})