import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Price from '../Rating/Price';
import Star from '../Rating/Star';

export default function CardHeader({ location }) {

    return (
        <View style={{flexDirection: 'row', alignItems: 'flex-end', flex: 1}}>            
            <View style={{margin: 15, paddingBottom: 25, justifyContent: 'flex-end', flex: 1}}>
                <Text style={[styles.text, styles.headerText]}>{location.name}</Text>
                <Text style={[styles.text, styles.addressText]}>{location.location.display_address[0]}</Text>
            </View>
            <View style={{justifyContent: 'flex-end', margin: 15, flex: 0.5}}>
                <Text style={[styles.text, styles.timeText]}>10 min</Text>
                {
                    location.rating !== undefined && (
                        <Star rating={location.rating} size={16}/>
                    )
                }
                {
                    location.price !== undefined && (
                        <Price rating={location.price} size={24}/>
                    )
                }
                {
                    location.price === undefined && (
                        <Text style={[styles.text, styles.pricingText]}>No pricing information</Text>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontFamily: 'System',     
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 30
    },
    addressText: {
        fontWeight: '300',
        fontSize: 18,
    },
    timeText: {
        textAlign: 'right',
        fontSize: 18
    },
    pricingText: {
        textAlign: 'right',
        fontSize: 12
    },
})