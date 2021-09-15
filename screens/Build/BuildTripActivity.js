import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import ActivityButton from '../../components/Buttons/ActivityButton';

export default function BuildTripActivity() {
    
    const handleClick = () => {
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>What are you interested in?</Text>
            <View style={styles.subContainer}>
                <ActivityButton icon="coffee" text="Coffee" handleClick={handleClick}/>
                <ActivityButton icon="utensils" text="Food" handleClick={handleClick}/>
                <ActivityButton icon="shopping-bag" text="Shop" handleClick={handleClick}/>
                <ActivityButton icon="cocktail" text="Drink" handleClick={handleClick}/>
                <ActivityButton icon="search-dollar" text="Thrifting" handleClick={handleClick}/>
                <ActivityButton icon="landmark" text="Landmarks" handleClick={handleClick}/>
                <ActivityButton icon="horse" text="Zoos" handleClick={handleClick}/>
                <ActivityButton icon="archway" text="Museums" handleClick={handleClick}/>
                <ActivityButton icon="walking" text="Hiking" handleClick={handleClick}/>
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