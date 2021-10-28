import React from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarRating from 'react-native-star-rating';
import { v4 as uuidv4 } from 'uuid';
import Star from '../Rating/Star';
import Price from '../Rating/Price';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


export default function SearchCard({ location, handleAddLocation, handleDeleteLocation, handleModalContent, handleCallout, index }) {
    const [selected, setSelected] = React.useState(false)
    const [locationState, setLocationState] = React.useState(location) 
    const [wkndrId, setWkndrId] = React.useState(uuidv4())
    return (
        <TouchableOpacity 
            style={{height: '50%', width: '50%', justifyContent: 'center', alignItems: 'center', padding: 5}}
            onPress={() => {
                handleModalContent(location)
                handleCallout(index)
            }}
        >
            {/* {
                !selected && (
                <Pressable 
                    style={styles.addButton}
                    onPress={() => {                    
                        locationState.wkndrId = wkndrId
                        handleAddLocation(locationState)
                        setSelected(true)
                        
                    }}
                >
                    <Text style={[styles.text, styles.addText]}>Add To Trip</Text>
                </Pressable>
                )
            }
            {
                selected && (
                    <Pressable 
                        style={styles.selected}
                        onPress={() => {
                            handleDeleteLocation(wkndrId)
                            setSelected(false)
                            setLocationState(location)
                        }}
                    >
                        <Text style={[styles.text, styles.addText]}>Added</Text>
                    </Pressable>
                    )
            }
             */}
            <View style={styles.container}>
                <View style={styles.header}>
                    
                    <ImageBackground
                        style={styles.image}
                        source={{uri: location.image_url}}
                        resizeMode="cover"
                    >
                        <LinearGradient
                        // Background Linear Gradient
                        colors={['rgba(0,0,0,0.2)','rgba(0,0,0,0.3)','rgba(0,0,0,0.5)','rgba(0,0,0,0.9)']}  
                        style={{flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'flex-start'}}
                    >
                    <View style={{margin: 5, width: '100%', height: '50%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <Text style={[styles.text, styles.headerText]}>{location.name}</Text>
                        <Text style={[styles.text, styles.addressText]}>{location.location.display_address[0]}</Text>
                    </View>
                    <View style={{width: '100%', alignItems: 'flex-end', padding: 5}}>
                        {
                            location.rating !== undefined && (
                                <Star rating={location.rating} size={15}/>
                            )
                        }
                        {
                            location.rating === undefined && (
                                <Text style={[styles.text, styles.subHeaderText]}>No rating information</Text>
                            )
                        }
                        {
                            location.price !== undefined && (
                                <Price rating={location.price} size={15}/>
                            )
                        }
                        {
                            location.price === undefined && (
                                <Text style={[styles.text, styles.subHeaderText]}>No price information</Text>
                            )
                        }
                        
                     </View>
                    </LinearGradient>

                    </ImageBackground>

                </View>
                {/* <View style={styles.subHeader}> */}
                    
                    {/* <View style={{width: '50%'}}>
                        <Text style={[styles.text, styles.subHeaderText, {textAlign: 'right'}]}>{location.review_count} ratings</Text>
                        <Text style={[styles.text, styles.subHeaderText, {textAlign: 'right'}]}>{location.display_phone}</Text>
                    </View> */}
                    
                {/* </View> */}
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden', // needed to show rounded corners for image
        height: '100%',
        width: '100%'
    },
    addButton: {
        backgroundColor: 'rgba(24, 28, 47, 1)',
        width: '33%',
        borderRadius: 20,
        marginBottom: 20
    }, 
    selected: {
        backgroundColor: 'rgba(0, 142, 78, 1)',
        width: '33%',
        borderRadius: 20,
        marginBottom: 20
    },   
    addText: {
        fontSize: 18,
        textAlign: 'center',
        padding: 5
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',   
    },
    subHeader: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'rgba(24,28,47,1)'
    },
    image: {
        flex: 1,
        // height: '100%',
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
        fontSize: 20
    },
    addressText: {
        fontWeight: '300',
        fontSize: 15,
    },
    subHeaderText: {
        fontSize: 12,        
    }
})