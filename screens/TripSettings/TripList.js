import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import CancelButton from '../../components/Buttons/CancelButton';
import TripListCard from '../../components/Cards/TripListCard';

export default function TripList({ route, navigation }) {
    const {location} = route.params
    const handleCancelClick = () => {
        navigation.navigate('Trip', {location: location})
    }

    return (
        <SafeAreaView style={styles.container}>
            <CancelButton  handleClick={handleCancelClick}/>
            <View style={{flex: 0.1, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={styles.header}>Trip List</Text>
            </View>
            <View style={{flex: 0.9}}>
                <TripListCard />
                <TripListCard />
                <TripListCard />
                <TripListCard />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 0.8,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 36,
        fontFamily: 'System',
        fontWeight: 'bold',
        color: 'white'
    }
})