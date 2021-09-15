import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, Pressable, Dimensions } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import BuildTripActivity from './BuildTripActivity';
import BuildTripSearch from './BuildTripSearch';
import BuildTripTime from './BuildTripTime';
import BuildTripTransport from './BuildTripTransport';
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import BuildTripLoading from './BuildTripLoading';

export default function BuildTrip({ navigation }) {
    const [step, setStep] = React.useState(0);

    return (
        <SafeAreaView style={styles.container}> 
            <Pressable 
                onPress={() => navigation.navigate('User')} 
                style={({ pressed }) => [
                    {
                        opacity: pressed ? 0.5 : 1
                    },
                    styles.cancelButton
                ]}
            >
                <Ionicons name="close-sharp" size={36} color="white" />
            </Pressable>
            <View style={{flex: 0.1, flexDirection: 'column', justifyContent: 'center'}}>           
                <Text style={styles.header}>Create a Trip</Text>
            </View>
            <View style={{flex: 0.9}}>
                {
                    step === 0 && (
                        <View style={styles.subContainer}>
                            <BuildTripSearch/>
                            <View style={styles.buttonContainer}>
                                <Pressable
                                    style={({ pressed }) => [
                                        {
                                            opacity: pressed ? 0.5 : 1
                                        },
                                        styles.nextButton
                                    ]}
                                    onPress={() => setStep(step + 1)}

                                >
                                    <Text style={styles.nextButtonText}>Next</Text>
                                    <Entypo name="arrow-right" size={24} color="white" />
                                </Pressable>
                                <Pressable 
                                    style={({ pressed }) => [
                                        {
                                            opacity: pressed ? 0.5 : 1
                                        },
                                        styles.button
                                    ]}
                                    onPress={() => setStep(3)}
                                >
                                    {/* <Text style={styles.buttonText}>Skip this step</Text>
                                    <Text style={styles.buttonSubText}>I already have an intinerary in mind</Text> */}
                                </Pressable>
                            </View>
                        </View>
                    )
                }
                {
                    step === 1 && (
                        <View style={styles.subContainer}>
                            <BuildTripTime/>
                            <View style={styles.buttonContainer}>
                                <View style={styles.nextButtonContainer}>
                                    <Pressable
                                        style={({ pressed }) => [
                                            {
                                                opacity: pressed ? 0.5 : 1
                                            },
                                            styles.nextButton
                                        ]}
                                        onPress={() => setStep(step + 1)}
                                    >
                                        <Text style={styles.nextButtonText}>Next</Text>
                                        <Entypo name="arrow-right" size={24} color="white" />
                                    </Pressable>
                                </View>
                                <Pressable 
                                    style={({ pressed }) => [
                                        {
                                            opacity: pressed ? 0.5 : 1
                                        },
                                        styles.button
                                    ]}
                                    onPress={() => setStep(3)}
                                >
                                    {/* <Text style={styles.buttonText}>Back</Text>
                                    <Text style={styles.buttonSubText}>to Where do you want to go?</Text> */}
                                    <Text style={styles.buttonText}>Skip this step</Text>
                                    <Text style={styles.buttonSubText}>I already have an intinerary in mind</Text>
                                </Pressable>
                            </View>
                        </View>
                    )
                }                
                {
                    step === 2 && (
                        <View style={styles.subContainer}>
                            <BuildTripTransport/>
                            <View style={styles.buttonContainer}>
                                <View style={styles.nextButtonContainer}>
                                    <Pressable
                                        style={({ pressed }) => [
                                            {
                                                opacity: pressed ? 0.5 : 1
                                            },
                                            styles.nextButton
                                        ]}
                                        onPress={() => setStep(step + 1)}
                                    >
                                        <Text style={styles.nextButtonText}>Next</Text>
                                        <Entypo name="arrow-right" size={24} color="white" />
                                    </Pressable>
                                </View>
                                <Pressable 
                                    style={({ pressed }) => [
                                        {
                                            opacity: pressed ? 0.5 : 1
                                        },
                                        styles.button
                                    ]}
                                    onPress={() => setStep(step - 1)}
                                >
                                    <Text style={styles.buttonText}>Back</Text>
                                    <Text style={styles.buttonSubText}>to When are you visiting?</Text>
                                </Pressable>
                            </View>
                        </View>
                    )
                }
                {
                    step === 3 && (
                        <View style={styles.subContainer}>
                            <BuildTripActivity/>
                            <View style={styles.buttonContainer}>
                                <View style={styles.nextButtonContainer}>
                                    <Pressable
                                        style={({ pressed }) => [
                                            {
                                                opacity: pressed ? 0.5 : 1
                                            },
                                            styles.nextButton
                                        ]}
                                        onPress={() => setStep(step + 1)}
                                    >
                                        <Text style={styles.nextButtonText}>Next</Text>
                                        <Entypo name="arrow-right" size={24} color="white" />
                                    </Pressable>
                                </View>
                                <Pressable 
                                    style={({ pressed }) => [
                                        {
                                            opacity: pressed ? 0.5 : 1
                                        },
                                        styles.button
                                    ]}
                                    onPress={() => setStep(step - 1)}
                                >
                                    <Text style={styles.buttonText}>Back</Text>
                                    <Text style={styles.buttonSubText}>to How are you getting around?</Text>
                                </Pressable>
                            </View>
                        </View>
                    )
                }     
                {
                    step === 4 && (
                        <View>
                            <BuildTripLoading/>
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
        backgroundColor: 'rgb(24, 28, 47)',
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
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextButtonContainer: {
        marginTop: 40,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',       
        
    },  
    nextButton: {
        flexDirection: 'row'
    },  
    nextButtonText: {
        color: 'white',
        fontSize: 24,
        marginRight: 10
    },  
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '300'
    },
    buttonSubText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '100'
    },
    cancelButton: {
        position: 'absolute', 
        left: 36, 
        top: 72
    }
})
