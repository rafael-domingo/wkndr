import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import TimeButton from '../../components/Buttons/TimeButton';

export default function BuildTripTime() {

    const handleClick = () => {

    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>When are you visiting?</Text>
            <TimeButton icon="sunrise" text="Morning" subText="8AM-12PM" handleClick={handleClick}/>
            <TimeButton icon="sun" text="Afternoon" subText="12PM-6PM" handleClick={handleClick}/>
            <TimeButton icon="sunset" text="Evening" subText="6PM-10PM" handleClick={handleClick}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimensions.get('window').width - 50
    },
    text: {
        color: 'white',
        fontSize: 36
    }
})