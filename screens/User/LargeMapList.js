import React from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable, TouchableWithoutFeedback, Button } from 'react-native';
import MapView from 'react-native-maps';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MapCard from '../../components/Cards/MapCard';

export default function LargeMapList({ navigation }) {
    const [activeSlide, setActiveSlide] = React.useState('0');
    const array = [
        {
            name: 'Los Angeles, CA, USA',
            location: {
                latitude: 34.0203996,
                longitude: -118.5518137,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        },
        {
            name: 'San Francisco, CA, USA',
            location: {
                latitude: 37.7576948,
                longitude: -122.4726192,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        },
        {
            name: 'New York City, NY, USA',
            location: {
                latitude: 40.6974034,
                longitude: -74.1197617,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        },
        {
            name: 'Los Angeles, CA, USA',
            location: {
                latitude: 34.0203996,
                longitude: -118.5518137,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        },
        {
            name: 'San Francisco, CA, USA',
            location: {
                latitude: 37.7576948,
                longitude: -122.4726192,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        },
        {
            name: 'New York City, NY, USA',
            location: {
                latitude: 40.6974034,
                longitude: -74.1197617,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        },
    
        
    ];

    const renderItem = ({item, index}) => {
        return (
            <View style={styles.container}>
                <MapCard location={item} navigation={navigation}/>           
            </View>
        )
    }
    
    return (
        <View style={styles.container}>
            <Carousel
                // ref={(c) => { this._carousel = c }}
                data={array}
                renderItem={renderItem}
                layout={'default'}
                sliderWidth={600}
                itemWidth={Dimensions.get('window').width - 100}
                sliderHeight={Dimensions.get('window').height - 350}
                itemHeight={Dimensions.get('window').height - 350}
                onSnapToItem={(index) => setActiveSlide(index)}              
            />
            <Pagination
                dotsLength={array.length}
                activeDotIndex={parseInt(activeSlide)}
                containerStyle={styles.pagination}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                renderDots={ 
                    array.length > 7 ? (activeIndex, total, context) => {                        
                    return (
                        <Text style={styles.paginationText}>
                            {activeIndex  + 1} / {total}
                        </Text>
                    )    
                } : undefined }
            />          
        </View>          
    )
}

const styles = StyleSheet.create({
    container: {        
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20,
        // flex: 1,
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').height - 300,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'System'
    },
    paginationText: {
        color: 'white',
        flex: 1
    }
})