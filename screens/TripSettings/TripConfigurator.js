import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, Pressable } from 'react-native';
import CancelButton from '../../components/Buttons/CancelButton';
import NextButton from '../../components/Buttons/NextButton';
import BuildTripLoading from '../Build/BuildTripLoading';
import TripBuilder from './TripBuilder';
import TripBuilderConfirm from './TripBuilderConfirm';
import TripBuilderEnable from './TripBuilderEnable';

export default function TripConfigurator({ navigation }) {
    const [builderEnabled, setBuilderEnabled] = React.useState(false);
    const [confirmation, setConfirmation] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [trip, setTrip] = React.useState({
        city: '',
        time: {
            morning: false,
            afternoon: false,
            evening: false,
        },
        transportation: '',
        activities: {
            coffee: false,
            food: false,
            shop: false, 
            drink: false, 
            thrifting: false, 
            landmarks: false, 
            zoos: false, 
            museums: false,
            hiking: false
        }
    })

    const handleCancelClick = () => {
        navigation.navigate('Trip')
    }

    const handleEnableClick = () => {
        setBuilderEnabled(true)
    }

    const handleNextClick = () => {
        setConfirmation(true)
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
                    !builderEnabled && (
                        <TripBuilderEnable handleClick={handleEnableClick}/>
                    )
                }
                {
                    builderEnabled && !confirmation && !loading && (
                        <View>
                            <TripBuilder trip={trip} handleActivity={handleActivity} handleTransport={handleTransport} handleTime={handleTime}/>
                            <NextButton handleClick={() => handleNextClick()}/>
                        </View>

                    )
                }
                {
                    builderEnabled && confirmation && !loading && (
                        <TripBuilderConfirm handleClick={() => handleConfirmClick()} handleCancel={() => handleCancelClick()}/>
                    )
                }
                {
                    builderEnabled && confirmation && loading && (
                        <BuildTripLoading />
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