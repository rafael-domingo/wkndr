import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, Pressable, Dimensions } from 'react-native';
import BuildTripActivity from './BuildTripActivity';
import BuildTripSearch from './BuildTripSearch';
import BuildTripTime from './BuildTripTime';
import BuildTripTransport from './BuildTripTransport';
import BuildTripLoading from './BuildTripLoading';
import NextButton from '../../components/Buttons/NextButton';
import BackButton from '../../components/Buttons/BackButton';
import CancelButton from '../../components/Buttons/CancelButton';
import { useSelector, useDispatch } from 'react-redux';
import { resetTripBuilder } from '../../redux/tripBuilder';

export default function BuildTrip({ navigation }) {
    const [step, setStep] = React.useState(0);
    const tripBuilderState = useSelector(state => state.tripBuilder)
    const dispatch = useDispatch()
    const [trip, setTrip] = React.useState(tripBuilderState)
    
    const handleCity = (value) => {
        setTrip(prevState => ({
            ...prevState,
            cityName: value.cityName,
            coordinates: {
                ...prevState.coordinates,
                lat: value.coordinates.lat,
                lng: value.coordinates.lng
            },
            utcOffset: value.utcOffset
        }))
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

    const handleAutoBuild = (value) => {
        setTrip(prevState => ({
            ...prevState,
            autoBuild: value
        }))
    }

    const handleStepClick = (operation) => {
        switch (operation) {
            case 'next':
                setStep(step + 1);
                break;
            case 'back':
                setStep(step - 1);
                break;
            case 'skip':
                handleAutoBuild(false) // turn off autobuild if skipping step
                setStep(4);
                break;
            default:
                break;
        }
    
    }

    const handleCancelClick = () => {
        navigation.navigate('User')
        dispatch(resetTripBuilder())

    }

    return (
        <SafeAreaView style={styles.container}> 
            <CancelButton handleClick={handleCancelClick}/>
            <View style={{flex: 0.1, flexDirection: 'column', justifyContent: 'center'}}>           
                <Text style={styles.header}>Create a Trip</Text>
            </View>
            <View style={{flex: 0.9}}>
                {
                    step === 0 && (
                        <View style={styles.subContainer}>
                            <BuildTripSearch handleInput={handleCity} handleClick={handleStepClick}/>
                            <View style={styles.buttonContainer}>
                                {/* <NextButton handleClick={() => handleStepClick('next')}/>                                                      */}
                            </View>
                        </View>
                    )
                }
                {
                    step === 1 && (
                        <View style={styles.subContainer}>
                            <BuildTripTime trip={trip} handleClick={handleTime}/>
                            <View style={styles.buttonContainer}>
                                <View style={styles.nextButtonContainer}>
                                    <NextButton handleClick={() => handleStepClick('next')}/>
                                </View>
                                <BackButton handleClick={() => handleStepClick('skip')} buttonText="Skip this step" text="I already have an itinerary in mind"/>
                            </View>
                        </View>
                    )
                }                
                {
                    step === 2 && (
                        <View style={styles.subContainer}>
                            <BuildTripTransport trip={trip} handleClick={handleTransport}/>
                            <View style={styles.buttonContainer}>
                                <View style={styles.nextButtonContainer}>
                                   <NextButton handleClick={() => handleStepClick('next')}/>
                                </View>
                                <BackButton handleClick={() => handleStepClick('back')} text="When are you visiting?"/>
                            </View>
                        </View>
                    )
                }
                {
                    step === 3 && (
                        <View style={styles.subContainer}>
                            <BuildTripActivity trip={trip} handleClick={handleActivity}/>
                            <View style={styles.buttonContainer}>
                                <View style={styles.nextButtonContainer}>
                                    <NextButton handleClick={() => handleStepClick('next')}/>                                
                                </View>
                                <BackButton handleClick={() => handleStepClick('back')} text="How are you getting around?"/>
                            </View>
                        </View>
                    )
                }     
                {
                    step === 4 && (
                        <View>
                            <BuildTripLoading tripState={trip}/>
                        </View>
                    )
                }           
            </View>
       
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(24, 28, 47, 1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 36,
        fontFamily: 'System',
        fontWeight: 'bold',
        color: 'white'
    },
    subContainer: {
        flex: 1,
        justifyContent: 'space-around',
        marginTop: 50
    },  
    buttonContainer:{
        justifyContent: 'space-between', 
        flex: 1
    },  
    nextButtonContainer: {
        marginTop: 40,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',               
    },  

})
