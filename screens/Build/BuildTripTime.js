import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import TimeButton from '../../components/Buttons/TimeButton';

export default function BuildTripTime({ trip, handleClick }) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>When are you visiting</Text>
            <Text style={styles.text}>{trip.cityName}?</Text>
            <TimeButton icon="sunrise" text="Morning" subText="8AM-12PM" handleClick={() => handleClick('morning')} state={trip.time.morning}/>
            <TimeButton icon="sun" text="Afternoon" subText="12PM-6PM" handleClick={() => handleClick('afternoon')} state={trip.time.afternoon}/>
            <TimeButton icon="sunset" text="Evening" subText="6PM-10PM" handleClick={() => handleClick('evening')} state={trip.time.evening}/>
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