import React from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, View, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import SearchCard from '../../components/Cards/SearchCard';
import SearchCardContainer from '../../components/Misc/SearchCardContainer';

export default function SearchCarousel({ searchResults, handleAddLocation, handleDeleteLocation, cameraAnimation, setCamera, camera, fitMarkers, showCallout, animateToRegion }) {
    const searchContainer = [];
    const [scrollEnabled, setScrollEnabled] = React.useState(true);
    const [scrollPage, setScrollPage] = React.useState(0);
    const scrollValue = new Animated.Value(0);

    const handleCallout = (index) => {
        showCallout('search', index + (scrollPage*4))
    } 
    React.useEffect(() => {
        scrollValue.addListener(({ value}) => {
            let index = Math.floor(value/(Dimensions.get('window').width))
            clearTimeout(calloutTimeout)
            const calloutTimeout = setTimeout(() => {
                setScrollPage(index)  
            }, 100);
            
        })
    })

    const handleScrollEnabled = (value) => {
        setScrollEnabled(value)
    }
    for (let index = 0; index < searchResults.length; index = index + 4) {
        searchContainer.push(
            <SearchCardContainer 
                results={searchResults.slice(index, index+4)} 
                handleScrollEnabled={handleScrollEnabled} 
                handleAddLocation={handleAddLocation}
                handleDeleteLocation={handleDeleteLocation}
                cameraAnimation={cameraAnimation}
                setCamera={setCamera}
                camera={camera}
                fitMarkers={fitMarkers}
                handleCallout={handleCallout}
                animateToRegion={animateToRegion}
            />
        )        
    }
    // if (modal) {
    //     return (
           
    //     )
    // } else {
        return (
            
            <Animated.ScrollView 
                pagingEnabled
                horizontal
                style={styles.container}
                scrollEnabled={scrollEnabled}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollValue
                                }
                            }
                        }
                    ],
                    { useNativeDriver: true }
                )}
            >
                {searchContainer}
             
               {/* {
                   searchResults.map((item, index) => {
                       return (
                        <SearchCard location={item} handleAddLocation={handleAddLocation} handleDeleteLocation={handleDeleteLocation}/>
                       )
                   })
               } */}
            </Animated.ScrollView>
        )
    // }
   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 0
    }
})