import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import SearchCard from '../../components/Cards/SearchCard';
import SearchCardContainer from '../../components/Misc/SearchCardContainer';

export default function SearchCarousel({ searchResults, handleAddLocation, handleDeleteLocation }) {
    const searchContainer = [];
    const [scrollEnabled, setScrollEnabled] = React.useState(true);
    const handleScrollEnabled = (value) => {
        setScrollEnabled(value)
    }
    for (let index = 0; index < searchResults.length; index = index + 4) {
        searchContainer.push(<SearchCardContainer results={searchResults.slice(index, index+4)} handleScrollEnabled={handleScrollEnabled}/>)        
    }
    // if (modal) {
    //     return (
           
    //     )
    // } else {
        return (
            
            <ScrollView 
                pagingEnabled
                horizontal
                style={styles.container}
                scrollEnabled={scrollEnabled}
            >
                {searchContainer}
             
               {/* {
                   searchResults.map((item, index) => {
                       return (
                        <SearchCard location={item} handleAddLocation={handleAddLocation} handleDeleteLocation={handleDeleteLocation}/>
                       )
                   })
               } */}
            </ScrollView>
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