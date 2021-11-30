import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, Pressable, Dimensions, Animated, Easing } from 'react-native';
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
import BuildTripName from './BuildTripName';

export default function BuildTrip({ navigation }) {
    const [step, setStep] = React.useState(0);
    const tripBuilderState = useSelector(state => state.tripBuilder)    
    const dispatch = useDispatch()
    const [trip, setTrip] = React.useState(tripBuilderState)    
    const opacity = React.useRef(new Animated.Value(0)).current
    const handleTripName = (value) => {        
        setTrip(prevState => ({
            ...prevState,
            tripName: value
        }))
    }

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
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration: 250,
                delay: 0,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true
            }
        ).start(() => {            
            setTimeout(() => {
                switch (operation) {
                    case 'next':                    
                        setStep(step + 1);
                        break;
                    case 'back':
                        setStep(step - 1);
                        break;
                    case 'skip':
                        handleAutoBuild(false) // turn off autobuild if skipping step
                        setStep(5);
                        break;
                    default:
                        break;
                }
            }, 250);
        })
        
      
     
    
    }

    React.useEffect(() => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: 250,
                delay: 0,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true
            }
        ).start()
    }, [step])
    const handleCancelClick = () => {
        navigation.navigate('User')
        dispatch(resetTripBuilder())        

    }

    return (
        <SafeAreaView style={styles.container}> 
        {
            step !== 5 && (
                <CancelButton handleClick={handleCancelClick}/>
            )
        }
        
            <View style={{flex: 0.1, flexDirection: 'column', justifyContent: 'center'}}>           
                <Text style={styles.header}>Create a Trip</Text>
            </View>
            <View style={{flex: 0.9}}>
                {
                    step === 0 && (
                        <Animated.View style={[styles.subContainer, {opacity: opacity}]}>                         
                            <BuildTripSearch handleInput={handleCity} handleClick={handleStepClick}/>
                            <View style={styles.buttonContainer}>
                                {/* <NextButton handleClick={() => handleStepClick('next')}/>                                                      */}
                            </View>
                        </Animated.View>
                    )
                }               
                {
                    step === 1 && (
                        <Animated.View style={[styles.subContainer, {opacity: opacity}]}>
                            <BuildTripName handleInput={handleTripName}/>
                            <View style={styles.buttonContainer}>
                                <View style={styles.nextButtonContainer}>
                                    <NextButton handleClick={() => handleStepClick('next')}/>
                                </View>
                                <BackButton handleClick={() => handleStepClick('back')} text="Where do you want to go?"/>
                            </View>
                        </Animated.View>
                    )
                }
                {
                    step === 2 && (
                        <Animated.View style={[styles.subContainer, {opacity: opacity}]}>
                            <BuildTripTime trip={trip} handleClick={handleTime}/>
                            <View style={styles.buttonContainer}>
                                <View style={styles.nextButtonContainer}>
                                    <NextButton handleClick={() => handleStepClick('next')}/>
                                </View>                                
                                {/* <BackButton handleClick={() => handleStepClick('back')} text="Name this trip"/> */}
                                <BackButton handleClick={() => handleStepClick('skip')} buttonText="Skip this step" text="I already have an itinerary in mind"/>                                
                            </View>
                        </Animated.View>
                    )
                }                
                {
                    step === 3 && (
                        <Animated.View style={[styles.subContainer, {opacity: opacity}]}>
                            <BuildTripTransport trip={trip} handleClick={handleTransport}/>
                            <View style={styles.buttonContainer}>
                                <View style={styles.nextButtonContainer}>
                                   <NextButton handleClick={() => handleStepClick('next')}/>
                                </View>
                                <BackButton handleClick={() => handleStepClick('back')} text="When are you visiting?"/>
                            </View>
                        </Animated.View>
                    )
                }
                {
                    step === 4 && (
                        <Animated.View style={[styles.subContainer, {opacity: opacity}]}> 
                            <BuildTripActivity trip={trip} handleClick={handleActivity}/>
                            <View style={styles.buttonContainer}>
                                <View style={styles.nextButtonContainer}>
                                    <NextButton handleClick={() => handleStepClick('next')}/>                                
                                </View>
                                <BackButton handleClick={() => handleStepClick('back')} text="How are you getting around?"/>
                            </View>
                        </Animated.View>
                    )
                }     
                {
                    step === 5 && (
                        <Animated.View style={{opacity: opacity}}>
                            <BuildTripLoading tripState={trip} navigation={navigation} handleCancelClick={handleCancelClick}/>
                        </Animated.View>
                    )
                }           
            </View>
       
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
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
        // flex: 1,
        height: '90%',
        justifyContent: 'space-around',
        marginTop: 50
    },  
    buttonContainer:{
        justifyContent: 'space-between', 
        // flex: 1
    },  
    nextButtonContainer: {
        marginTop: 40,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',               
    },  

})
