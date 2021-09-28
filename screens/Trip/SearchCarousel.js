import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import SearchCard from '../../components/Cards/SearchCard';

export default function SearchCarousel({ searchResults, handleAddLocation, handleDeleteLocation }) {

    const renderItem = ({ item, index}) => {
        return (
            <View style={{height: Dimensions.get('window').height/2}}>
                <SearchCard location={item} handleAddLocation={handleAddLocation} handleDeleteLocation={handleDeleteLocation}/>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Carousel
                data={searchResults}
                renderItem={renderItem}
                layout={'default'}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width - 50}                
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})