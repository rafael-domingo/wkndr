import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ActivityIndicator, ImageBackground, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { showLocation } from 'react-native-map-link'
import AddToTripButton from '../Buttons/AddToTripButton'
import CardSubHeader from '../Misc/CardSubHeader'
import Hours from '../Misc/Hours'
import Reviews from '../Misc/Reviews'
import Price from '../Rating/Price'
import Star from '../Rating/Star'

export default function SearchDetailCard({addLocation, deleteLocation, modal, modalContent, loading, detailState, tripDestinations}) {
    console.log({modalContent})
    const options = {
        latitude: modalContent.coordinates.latitude,
        longitude: modalContent.coordinates.longitude,
        title: modalContent.name,        
    }
    return (
        <View style={{height: 600, width: '100%',justifyContent: 'flex-end', alignItems: 'center'}}>
        <AddToTripButton show={modal} addLocation={addLocation} deleteLocation={deleteLocation} modalContent={modalContent} tripDestinations={tripDestinations}/>
        <ImageBackground
            style={styles.image}
            source={{uri: modalContent.image_url}}
            resizeMode="cover"
        >
           <LinearGradient
               // Background Linear Gradient
               colors={['rgba(0,0,0,0.4)','rgba(0,0,0,0.6)','rgba(0,0,0,0.7)','rgba(0,0,0,1)']}  
               style={{flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'flex-start'}}
           >
               <View style={{flex: 1, padding: 20}}>
                   <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                   <View style={{width: '50%', height: '100%',}}>
                       <Text style={[styles.text, styles.headerText]}>{modalContent.name}</Text>       
                       <TouchableOpacity onPress={() => showLocation(options)}>
                        <Text style={[styles.text, styles.addressText]}>{modalContent.location.display_address[0]}</Text>
                       </TouchableOpacity>
                   </View>
                   <View style={{width: '50%', height: '100%'}}>
                   {
                       modalContent.rating !== undefined && (
                           <Star rating={modalContent.rating} size={16}/>
                       )
                   }
                   {
                       modalContent.price !== undefined && (
                           <Price rating={modalContent.price} size={16}/>
                       )
                   }
                   {
                       modalContent.price === undefined && (
                           <Text style={[styles.text, styles.pricingText]}>No pricing information</Text>
                       )
                   }
               {/* <CardSubHeader location={modalContent} show={true}/> */}
                   </View>
                  </View>
               </View>
               <View style={{height: '80%', width: '100%', padding: 5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                   {
                       loading && <ActivityIndicator/>
                   }
                   {
                       !loading && (
                           <>
                           <View style={{width: '35%'}}>
                           {
                                   detailState.detail.hours !== undefined && (
                                       <Hours hours={detailState.detail.hours[0].open}/>
                                   )
                               }
                               </View>
                               <View style={{width: '65%'}}>
                               {
                                   detailState.reviews !== undefined && (
                                       <Reviews reviews={detailState.reviews}/>
                                   )
                               }
                               </View>
                               </>
                       )
                   }
        
                </View>
           </LinearGradient>
        </ImageBackground>
        </View>                    
    )
}

const styles = StyleSheet.create({
    container: {     
        height: 600,
        width: Dimensions.get('window').width,
        flexWrap: 'wrap',        
        justifyContent: 'flex-end',
        alignItems: 'center',
        // position: 'absolute',
        // bottom: 20,
        // justifyContent: 'center',
        // alignItems: 'center',
        
    },
    image: {
        // flex: 1,
        height: 500,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',      
        borderRadius: 20, 
        overflow: 'hidden',           

        
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
})