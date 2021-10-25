import React from 'react';
import { Animated, View, StyleSheet, Dimensions, Easing, ScrollView } from 'react-native';
import TripCard from '../../components/Cards/TripCard';

export default function TripCarousel({ locationState, modalizeRef, fitMarkers, mapAnimation, handleDeleteLocation, cameraAnimation, setCamera, camera }) {

    return (
        <Animated.ScrollView
            style={
                [
                { 
                    flex: 1,
                    position: 'absolute',
                    bottom: 0                                    
                },                                    
                ]
            }
            horizontal
            // pagingEnabled
            decelerationRate="fast" // fix for paging enabled bug
            scrollEventThrottle={1}
            snapToInterval={Dimensions.get('window').width * 0.8 + 20}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}    
            contentInset={{
                top: 0,
                left: Dimensions.get('window').width * 0.1 + 10,
                bottom: 0,
                right: Dimensions.get('window').width * 0.1 + 10
                }} 
                onScrollBeginDrag={() => {                                                                     
                    console.log(modalizeRef.current?.length)
                    modalizeRef.current?.forEach(element => {
                        element?.close('alwaysOpen')
                    });                                     
                    fitMarkers()                                                                                               
                }}                                
            onScroll={Animated.event(
                [
                    {
                        nativeEvent: {
                            contentOffset: {
                                x: mapAnimation
                            }
                        }
                    }
                ],
                { useNativeDriver: true }
            )}
        >
            {
                locationState.destinations.map((item, index) => {
                    for (var key in item) {                                        
                        return (
                            <View 
                                key={item[key].wkndrId} 
                                style={{
                                    width: Dimensions.get('window').width * 0.8,
                                    height: Dimensions.get('window').height,
                                    margin: 10,                                                               
                                }}
                            >                                              
                                <TripCard 
                                    key={item.wkndrId} 
                                    location={item} 
                                    modalizeRef={modalizeRef} 
                                    index={index} 
                                    handleDeleteLocation={handleDeleteLocation}
                                    cameraAnimation={cameraAnimation}
                                    setCamera={setCamera}
                                    fitMarkers={fitMarkers}
                                    camera={camera} 
                                />                                              
                            </View>                                        
                        )
                    }
                    
                })
            }
        </Animated.ScrollView>    

    )
}
