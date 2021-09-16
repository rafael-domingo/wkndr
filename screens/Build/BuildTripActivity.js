import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import ActivityButton from '../../components/Buttons/ActivityButton';

export default function BuildTripActivity({ trip, handleClick }) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>What are you interested in?</Text>
            <View style={styles.subContainer}>
                <ActivityButton icon="coffee" text="Coffee" handleClick={() => handleClick('coffee')} state={trip.activities.coffee}/>
                <ActivityButton icon="utensils" text="Food" handleClick={() => handleClick('food')} state={trip.activities.food}/>
                <ActivityButton icon="shopping-bag" text="Shop" handleClick={() => handleClick('shop')} state={trip.activities.shop}/>
                <ActivityButton icon="cocktail" text="Drink" handleClick={() => handleClick('drink')} state={trip.activities.drink}/>
                <ActivityButton icon="search-dollar" text="Thrifting" handleClick={() => handleClick('thrifting')} state={trip.activities.thrifting}/>
                <ActivityButton icon="landmark" text="Landmarks" handleClick={() => handleClick('landmarks')} state={trip.activities.landmarks}/>
                <ActivityButton icon="horse" text="Zoos" handleClick={() => handleClick('zoos')} state={trip.activities.zoos}/>
                <ActivityButton icon="archway" text="Museums" handleClick={() => handleClick('museums')} state={trip.activities.museums}/>
                <ActivityButton icon="walking" text="Hiking" handleClick={() => handleClick('hiking')} state={trip.activities.hiking}/>
            </View> 
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
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 50
    }
})