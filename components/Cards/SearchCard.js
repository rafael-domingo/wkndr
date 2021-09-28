import React from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarRating from 'react-native-star-rating';
import { v4 as uuidv4 } from 'uuid';


export default function SearchCard({ location, handleAddLocation, handleDeleteLocation }) {
    const [selected, setSelected] = React.useState(false)
    const [locationState, setLocationState] = React.useState(location) 
    const [wkndrId, setWkndrId] = React.useState(uuidv4())
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {
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
            
            <View style={styles.container}>
                
                <View style={styles.header}>
                    
                    <ImageBackground
                        style={styles.image}
                        source={{uri: location.image_url}}
                        resizeMode="cover"
                    >
                        <LinearGradient
                        // Background Linear Gradient
                        colors={['rgba(0,0,0,0)','rgba(0,0,0,0.25)','rgba(0,0,0,0.5)','rgba(0,0,0,0.9)']}  
                        style={{flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'flex-start'}}
                    >
                    <View style={{margin: 25}}>
                        <Text style={[styles.text, styles.headerText]}>{location.name}</Text>
                        <Text style={[styles.text, styles.addressText]}>{location.location.display_address[0]}</Text>
                    </View>
                    </LinearGradient>

                    </ImageBackground>

                </View>
                <View style={styles.subHeader}>
                    <View style={{width: '50%'}}>
                        {
                            location.rating !== undefined && (
                                <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={location.rating}
                                emptyStarColor={'white'}
                                fullStarColor={'white'}
                                fullStar={'ios-star-sharp'}
                                halfStar={'ios-star-half-sharp'}
                                emptyStar={'ios-star-outline'}
                                halfStarColor={'white'}
                                iconSet={'Ionicons'}
                                starSize={24}
                                containerStyle={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}
                            />
                            )
                        }
                        {
                            location.rating === undefined && (
                                <Text style={[styles.text, styles.subHeaderText]}>No rating information</Text>
                            )
                        }
                        {
                            location.price !== undefined && (
                                <StarRating
                                    disabled={true}
                                    maxStars={4}
                                    rating={location.price.length}
                                    emptyStarColor={'white'}
                                    fullStarColor={'white'}
                                    fullStar={'cash-usd'}
                                    halfStar={'ios-star-half-sharp'}
                                    emptyStar={'cash-usd-outline'}
                                    halfStarColor={'white'}
                                    halfStarEnabled={false}
                                    iconSet={'MaterialCommunityIcons'}
                                    starSize={30}
                                    containerStyle={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}
                                />
                            )
                        }
                        {
                            location.price === undefined && (
                                <Text style={[styles.text, styles.subHeaderText]}>No price information</Text>
                            )
                        }
                        
                    </View>
                    <View style={{width: '50%'}}>
                        <Text style={[styles.text, styles.subHeaderText, {textAlign: 'right'}]}>{location.review_count} ratings</Text>
                        <Text style={[styles.text, styles.subHeaderText, {textAlign: 'right'}]}>{location.display_phone}</Text>
                    </View>
                    
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        flex: 0.8,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',   
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
    subHeaderText: {
        fontSize: 18,        
    }
})