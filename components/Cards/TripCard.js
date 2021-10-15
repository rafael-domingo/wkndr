import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Pressable, TouchableOpacity } from 'react-native';
import Price from '../Rating/Price';
import Star from '../Rating/Star';
import * as Linking from 'expo-linking';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function TripCard({ location, handleDeleteLocation }) {
    for (var key in location) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ImageBackground
                        style={styles.image}
                        source={{uri: location[key].image_url}}
                        resizeMode="cover"
                    >
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['rgba(0,0,0,0)','rgba(0,0,0,0.25)','rgba(0,0,0,0.5)','rgba(0,0,0,0.9)']}  
                            style={{flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'flex-start'}}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'flex-end', flex: 1}}>
                                <View style={{margin: 15, paddingBottom: 25, justifyContent: 'flex-end', flex: 1}}>
                                    <Text style={[styles.text, styles.headerText]}>{location[key].name}</Text>
                                    <Text style={[styles.text, styles.addressText]}>{location[key].location.display_address[0]}</Text>
                                </View>
                                <View style={{justifyContent: 'flex-end', margin: 15, flex: 0.5}}>
                                    <Text style={[styles.text, styles.timeText]}>10 min</Text>
                                    {
                                        location[key].rating !== undefined && (
                                            <Star rating={location[key].rating} size={16}/>
                                        )
                                    }
                                    {
                                        location[key].price !== undefined && (
                                            <Price rating={location[key].price} size={24}/>
                                        )
                                    }
                                    {
                                        location[key].price === undefined && (
                                            <Text style={[styles.text, styles.pricingText]}>No pricing information</Text>
                                        )
                                    }
                                </View>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </View>
                <View style={styles.subHeader}>
                    <View style={styles.subCategory}>
                        {
                            location[key].categories !== undefined && (
                                location[key].categories.map((category, index) => {
                                    return <Text key={index} style={[styles.text]}>{category.title}</Text>
                                })
                            )
                        }
                        <View style={styles.subCategory}>
                            <Text style={[styles.text]}>Mon 7AM-10PM</Text>
                            <Text style={[styles.text]}>Tues 7AM-10PM</Text>
                            <Text style={[styles.text]}>Wed 7AM-10PM</Text>
                            <Text style={[styles.text]}>Thurs 7AM-10PM</Text>
                            <Text style={[styles.text]}>Fri 7AM-10PM</Text>
                            <Text style={[styles.text]}>Sat 7AM-10PM</Text>
                            <Text style={[styles.text]}>Sun 7AM-10PM</Text>
                        </View>              
                    </View>
                    <View style={[styles.subCategory, {alignItems: 'flex-end'}]}>
                        <Text style={[styles.text, {fontSize: 18, marginBottom: 10}]}>49 reviews</Text>
                        {
                            location[key].display_phone !== undefined && (
                                <TouchableOpacity
                                    onPress={() => {
                                        Linking.openURL(`tel:${location[key].phone}`)
                                    }}
                                >
                                    <Text style={[styles.text, {fontSize: 18}]}>{location[key].display_phone}</Text>
                                </TouchableOpacity>
                                
                            )
                        }                        
                    </View>
                    <View style={{position: 'absolute', bottom: 20, alignItems: 'center', width: '100%', justifyContent: 'center'}}>
                        <TouchableOpacity 
                            style={styles.deleteButton}
                            onPress={() => {
                                handleDeleteLocation(location[key].wkndrId)
                            }}
                        >
                            <FontAwesome5 name="trash" size={18} color="rgba(24,28,47,1)" style={{flex: 0.25}}/>
                            <Text style={[styles.text, {color: 'rgba(24,28, 47, 1)', flex: 0.75, textAlign: 'center'}]}>Delete</Text>
                        </TouchableOpacity>
                    </View> 
                </View>     
            
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {                
        borderRadius: 20,
        overflow: 'hidden', // needed to show rounded corners for image
        height: 600,
        width: '100%',        
        backgroundColor: 'rgba(24,28,47,1)',           
    },
    header: {
        height: '50%'                    
    },
    subHeader: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',                
        flexDirection: 'row',
        margin: 10
    },  
    subCategory: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',        
        
    },  
    image: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        width: '100%',                
    },  
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
    deleteButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }
})