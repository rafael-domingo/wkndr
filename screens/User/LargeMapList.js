import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView from 'react-native-maps';
import Carousel, { Pagination } from 'react-native-snap-carousel';

export default function LargeMapList({ list }) {
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
                <Text style={styles.text}>
                    {item.name}
                </Text>
                <MapView 
                    style={styles.map}
                    scrollEnabled={false}
                    zoomTapEnabled={false}
                    zoomEnabled={false}
                    initialRegion={{
                        latitude: item.location.latitude,
                        longitude: item.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
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
                itemWidth={300}
                sliderHeight={800}
                itemHeight={600}
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
        flex: 0.75,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    map: {
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20,
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').height - 300,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'System'
    },
    paginationText: {
        color: 'white'
    }
})