import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, Pressable } from 'react-native';
import CancelButton from '../../components/Buttons/CancelButton';
import NextButton from '../../components/Buttons/NextButton';
import BuildTripLoading from '../Build/BuildTripLoading';
import TripBuilder from './TripBuilder';
import TripBuilderConfirm from './TripBuilderConfirm';
import TripBuilderEnable from './TripBuilderEnable';
import TripBuilderLoading from './TripBuilderLoading';

export default function TripConfigurator({ route, navigation }) {
    const {location} = route.params
    const [locationState, setLocationState] = React.useState(location)    
    const [confirmation, setConfirmation] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [trip, setTrip] = React.useState(location.tripBuilder)

    const handleCancelClick = () => {
        navigation.navigate('Trip', {location: locationState})
    }

    const handleEnableClick = () => {
        setTrip(prevState => ({
            ...prevState,
            autoBuild: true
        }))
    }

    const handleNextClick = () => {
        setConfirmation(true)
        setLocationState(prevState => ({
            ...prevState,
            tripBuilder: trip
        }))
    }

    const handleConfirmClick = () => {
        setLoading(true)
    }

    const handleTime = (key) => {
        setTrip(prevState => ({
            ...prevState,
            time: {
                ...prevState.time,
                [key]: !trip.time[key]
            }
        }))
    }

    const handleTransport = (value) => {
        setTrip(prevState => ({
            ...prevState,
            transportation: value
        }))
    }

    const handleActivity = (key) => {
        setTrip(prevState => ({
            ...prevState,
            activities: {
                ...prevState.activities,
                [key]: !trip.activities[key]
            }
        }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <CancelButton handleClick={handleCancelClick}/>
            <View style={{flex: 0.1, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={styles.header}>Trip Configurator</Text>
            </View>
            <View style={{flex: 0.9}}>
                {
                    !trip.autoBuild && (
                        <TripBuilderEnable handleClick={handleEnableClick}/>
                    )
                }
                {
                    trip.autoBuild && !confirmation && !loading && (
                        <View>
                            <TripBuilder trip={trip} handleActivity={handleActivity} handleTransport={handleTransport} handleTime={handleTime}/>
                            <NextButton handleClick={() => handleNextClick()}/>
                        </View>

                    )
                }
                {
                    trip.autoBuild && confirmation && !loading && (
                        <TripBuilderConfirm handleClick={() => handleConfirmClick()} handleCancel={() => handleCancelClick()}/>
                    )
                }
                {
                    trip.autoBuild && confirmation && loading && (
                        <TripBuilderLoading tripState={trip} location={location}/>
                    )
                }
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
    },
   
})