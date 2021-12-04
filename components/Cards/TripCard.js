import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Modalize } from 'react-native-modalize';
import { Yelp } from '../../util/Yelp';
import Hours from '../Misc/Hours';
import Reviews from '../Misc/Reviews';
import CardHeader from '../Misc/CardHeader';
import CardSubHeader from '../Misc/CardSubHeader';
import { BlurView } from 'expo-blur';
import { showLocation } from 'react-native-map-link'


export default function TripCard({ location, handleDeleteLocation, modalizeRef, index, cameraAnimation, setCamera, fitMarkers, camera }) {
    const [loading, setLoading] = React.useState(true)
    const [detailState, setDetailState] = React.useState();
    const [open, setOpen] = React.useState(false);    
    
    for (var key in location) {        
        const options = {
            latitude: location[key].coordinates.latitude,
            longitude: location[key].coordinates.longitude,
            title: location[key].name,
            directionsMode: 'walk',
        }
        
        const openMap = () => {
            showLocation(options)
        }
        
        return (
            <Modalize
            key={location[key].wkndrId}
            ref={el => modalizeRef.current[index] = el}
            style={{flex: 1}}
            alwaysOpen={300}
            modalHeight={700}                     
            withOverlay={false}    
            tapGestureEnabled={false}                               
            snapPoint={450}        
            scrollViewProps={{
                scrollEnabled: false
            }}                                            
            handlePosition={'inside'}                                                                 
            modalStyle={{backgroundColor: 'rgba(0,0,0,0)', bottom: 0,  shadowOffset: {
                width: 2,
                height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 3 }}                                                                                                                                                    
            onPositionChange={(position) => {                                                  
                if (position === 'top') {                                                                                                                    
                    cameraAnimation(location[key].coordinates)
                    setCamera(true)
                    setOpen(true)
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
                    setOpen(false)
                } 
       
              
                                                  
            }}          
                                
        >
            <View style={styles.container}>
            <BlurView intensity={90} style={{flex: 1}} tint={'default'}>
                <View style={[styles.header]}>
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
                            <CardSubHeader location={location[key]} show={open}/>
                            <CardHeader location={location[key]} openMap={openMap}/>                       
                        </LinearGradient>
                    </ImageBackground>
                </View>
                
                <View style={styles.subHeader}>
                    <View style={[styles.subCategory, {flex: 0.4}]}>
                     
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
                    <View style={[styles.subCategory, {alignItems: 'flex-end', flex: 0.6}]}>
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
                </BlurView>
            
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
        backgroundColor: 'rgba(24,28,47,0.5)',  
       
     
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