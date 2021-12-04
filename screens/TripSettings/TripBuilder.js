import React from 'react';
import { View, StyleSheet, Text, Dimensions, Animated, Easing } from 'react-native';
import TransportButton from '../../components/Buttons/TransportButton';
import ActivityButton from '../../components/Buttons/ActivityButton';
import TimeButtonAlt from '../../components/Buttons/TimeButtonAlt';
import NextButton from '../../components/Buttons/NextButton';
import FlagSelector from '../../components/Misc/FlagSelector';


export default function TripBuilder({ trip, handleActivity, handleTransport, handleTime, handleNextClick }) {
    const [showNext, setShowNext] = React.useState(false)
    const opacity = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        if (trip.time.morning || trip.time.afternoon || trip.time.evening) {
            if (trip.transportation.length > 0) {
                if (trip.activities.coffee || trip.activities.food || trip.activities.shop || trip.activities.drink || trip.activities.thrifting || trip.activities.landmarks || trip.activities.zoos || trip.activities.museums || trip.activities.hiking) {
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
                    setShowNext(true)
                }
            }
        } else {
            Animated.timing(
                opacity,
                {
                    toValue: 0,
                    duration: 250,
                    delay: 0,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
            setShowNext(false)
        }
    }, [trip])
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.header}>Time</Text>
                <View style={styles.buttonContainer}>
                    <TimeButtonAlt icon="sunrise" text="Morning" handleClick={() => handleTime('morning')} state={trip.time.morning}/>
                    <TimeButtonAlt icon="sun" text="Afternoon" handleClick={() => handleTime('afternoon')} state={trip.time.afternoon}/>
                    <TimeButtonAlt icon="sunset" text="Evening" handleClick={() => handleTime('evening')} state={trip.time.evening}/>
                </View>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.header}>Transportation</Text>
                <View style={styles.buttonContainer}>
                    <TransportButton icon="directions-car" text="Driving" selected={trip.transportation === 'Driving'} handleClick={() => handleTransport('Driving')}/>
                    <TransportButton icon="directions-bike" text="Biking" selected={trip.transportation === 'Biking'} handleClick={() => handleTransport('Biking')}/>
                    <TransportButton icon="directions-walk" text="Walking" selected={trip.transportation === 'Walking'} handleClick={() => handleTransport('Walking')}/>
                </View>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.header}>Activities</Text>
                <View style={styles.buttonContainer}>
                    <ActivityButton icon="coffee" text="Coffee" handleClick={() => handleActivity('coffee')} state={trip.activities.coffee}/>
                    <ActivityButton icon="utensils" text="Food" handleClick={() => handleActivity('food')} state={trip.activities.food}/>
                    <ActivityButton icon="shopping-bag" text="Shop" handleClick={() => handleActivity('shop')} state={trip.activities.shop}/>
                    <ActivityButton icon="cocktail" text="Drink" handleClick={() => handleActivity('drink')} state={trip.activities.drink}/>
                    <ActivityButton icon="search-dollar" text="Thrifting" handleClick={() => handleActivity('thrifting')} state={trip.activities.thrifting}/>
                    <ActivityButton icon="landmark" text="Landmarks" handleClick={() => handleActivity('landmarks')} state={trip.activities.landmarks}/>
                    <ActivityButton icon="horse" text="Zoos" handleClick={() => handleActivity('zoos')}  state={trip.activities.zoos}/>
                    <ActivityButton icon="archway" text="Museums" handleClick={() => handleActivity('museums')} state={trip.activities.museums}/>
                    <ActivityButton icon="walking" text="Hiking" handleClick={() => handleActivity('hiking')} state={trip.activities.hiking}/>
                </View>              
            </View>
            <Animated.View style={{opacity: opacity}}>
                <NextButton handleClick={() => handleNextClick()} showNext={showNext}/>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {                
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width - 25
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    header: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'System',
        fontWeight: 'bold'
    }
})