import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import Price from '../Rating/Price';
import Star from '../Rating/Star';
import * as Linking from 'expo-linking';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Modalize } from 'react-native-modalize';
import { Yelp } from '../../util/Yelp';
import Hours from '../Misc/Hours';
import Reviews from '../Misc/Reviews';


export default function TripCard({ location, handleDeleteLocation, modalizeRef, index, cameraAnimation, setCamera, fitMarkers, camera }) {
    const [loading, setLoading] = React.useState(true)
    const [detailState, setDetailState] = React.useState();

    for (var key in location) {
        
        return (
            <Modalize
            key={location[key].wkndrId}
            ref={el => modalizeRef.current[index] = el}
            style={{flex: 1}}
            alwaysOpen={300}
            modalHeight={700}                                            
            snapPoint={450}        
            scrollViewProps={{
                scrollEnabled: false
            }}                                            
            handlePosition={'inside'}                                                    
            overlayStyle={{backgroundColor: 'rgba(0,0,0,0)'}}  
            modalStyle={{backgroundColor: 'rgba(0,0,0,0)', bottom: 0}}                                                                                                                                                    
            onPositionChange={(position) => {                                                  
                if (position === 'top') {                                                                                                                    
                    cameraAnimation(location[key].coordinates)
                    setCamera(true)
                    Yelp.detail(location[key].id)
                    .then(response => {
                        console.log(response)
                        setDetailState(response)
                        setLoading(false)
                    })
                    .catch(error => console.log(error))
                } else if (camera) {
                    fitMarkers()
                    setCamera(false)
                } 
       
              
                                                  
            }}          
                                
        >
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
                    <View style={[styles.subCategory, {flex: 0.35}]}>
                        {/* {
                            location[key].categories !== undefined && (
                                location[key].categories.map((category, index) => {
                                    return <Text key={index} style={[styles.text]}>{category.title}</Text>
                                })
                            )
                        } */}
                        {
                            loading && <ActivityIndicator/>
                        }
                        {
                            !loading && (
                                <View style={styles.subCategory}>
                                {
                                    detailState.detail.hours !== undefined && (
                                        <Hours hours={detailState.detail.hours[0].open}/>
                                    )
                                }
                                {
                                    detailState.detail.hours === undefined && (
                                        <Text style={[styles.text]}>No business hours available</Text>
                                    )
                                }
                                </View>                                                         
                            )
                        }      
                                                 
                    </View>
                    <View style={[styles.subCategory, {alignItems: 'flex-end', flex: 0.65}]}>
                    {
                            !loading && (
                                <View style={styles.subCategory}>
                                {
                                    detailState.reviews !== undefined && (
                                        <Reviews reviews={detailState.reviews} />
                                    )
                                }
                                {
                                    detailState.reviews === undefined && (
                                        <Text style={[styles.text]}>No reviews available</Text>
                                    )
                                }
                                </View>                                                         
                            )
                        }      
                        {/* <Text style={[styles.text, {fontSize: 18, marginBottom: 10}]}>49 reviews</Text>
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
                        }                         */}
                    </View>
                    <View style={{position: 'absolute', bottom: 10, left: 10, alignItems: 'center', justifyContent: 'center', height: 50, width: 50}}>
                        <TouchableOpacity 
                            style={styles.deleteButton}
                            onPress={() => {
                                handleDeleteLocation(location[key].wkndrId)
                            }}
                        >
                            <FontAwesome5 name="trash" size={15} color="rgba(24,28,47,1)" style={{flex: 0.25}}/>
                            {/* <Text style={[styles.text, {color: 'rgba(24,28, 47, 1)', flex: 0.75, textAlign: 'center'}]}>Delete</Text> */}
                        </TouchableOpacity>
                    </View> 
                </View>     
            
            </View>
            </Modalize>

        )
    }
    
}

const styles = StyleSheet.create({
    container: {                
        borderRadius: 20,
        overflow: 'hidden', // needed to show rounded corners for image
        height: 700,
        width: '100%',        
        backgroundColor: 'rgba(24,28,47,1)',           
    },
    header: {
        height: 300                    
    },
    subHeader: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',                
        flexDirection: 'row',
        margin: 10,     
    },  
    subCategory: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',     
        // paddingBottom: 25,        
        
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
        borderRadius: 25,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }
})