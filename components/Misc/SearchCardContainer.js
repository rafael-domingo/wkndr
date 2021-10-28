import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View, Text, ImageBackground, ActivityIndicator } from 'react-native';
import SearchCard from '../Cards/SearchCard';
import { Modalize } from 'react-native-modalize';
import { Yelp } from '../../util/Yelp';
import { LinearGradient } from 'expo-linear-gradient';
import CardSubHeader from './CardSubHeader';
import CardHeader from './CardHeader';
import Star from '../Rating/Star';
import Price from '../Rating/Price';
import Reviews from './Reviews';
import Hours from './Hours';
import AddToTripButton from '../Buttons/AddToTripButton';

export default function SearchCardContainer({ results, handleScrollEnabled, handleAddLocation, handleDeleteLocation, cameraAnimation, setCamera, camera, fitMarkers, handleCallout, animateToRegion }) {
    const [modal, setModal] = React.useState(false);
    const [modalContent, setModalContent] = React.useState(null);
    const [detailState, setDetailState] = React.useState();
    const modalizeRef = React.useRef();
    const [loading, setLoading] = React.useState(true);

    const handleModalContent = (content) => {     
        animateToRegion(content.coordinates)
        setModalContent(content)               
        // cameraAnimation(content.coordinates)
        Yelp.detail(content.id)
        .then(response => {
            setDetailState(response)
            setLoading(false)            
        })
        modalizeRef.current?.open('top')        
    }

    const addLocation = () => {
        handleAddLocation(modalContent)
    }

    return (
        <View style={styles.container}>
           
            <View style={{height: 300, bottom: 20, flexWrap: 'wrap', width: Dimensions.get('window').width}}>
            {
                results.map((item, index) => {
                    return (
                        <SearchCard location={item} handleModalContent={handleModalContent} handleCallout={handleCallout} index={index}/>
                    )
                })
            }
            </View>
          
               <Modalize                
                ref={modalizeRef}                
                modalHeight={600}     
                handlePosition={"inside"}
                handleStyle={{top: 115, opacity: 1, backgroundColor: 'white'}}                   
                scrollViewProps={{
                    scrollEnabled: false
                }}   
                withOverlay={false}                                                      
                modalStyle={{padding: 5, backgroundColor: 'rgba(0,0,0,0)',}}    
                onOpen={() => {
                    handleScrollEnabled(false)
                    setModal(true)                    
                    // cameraAnimation(modalContent.coordinates)
                }}
                onClosed={() => {
                    setLoading(true)
                    setDetailState(undefined)
                    handleScrollEnabled(true)
                    setModal(false)
                    setCamera(false)
                    fitMarkers()
                }}
               
            >                  
            {
                modalContent !== null && (               
                    <View style={{height: 600, width: '100%',justifyContent: 'flex-end', alignItems: 'center'}}>
                         <AddToTripButton show={modal} addLocation={addLocation}/>
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
                                        <Text style={[styles.text, styles.addressText]}>{modalContent.location.display_address[0]}</Text>
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
                                <CardSubHeader location={modalContent} show={true}/>
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
                
            </Modalize>
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