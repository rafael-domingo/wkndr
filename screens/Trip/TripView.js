import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import LocationCard from '../../components/Cards/LocationCard';

export default function TripView() {
    const [carouselHeight, setCarouselHeight] = React.useState(200)
    const [carouselWidth, setCarouselWidth] = React.useState(300)
    const array = [
        {
            name: 'Verve Coffee',

        },
        {
            name: 'The Broad',
        }
    ]

    const handlePress = () => {
        console.log(carouselHeight)
        if (carouselHeight === 200) {
            setCarouselHeight(500)
            setCarouselWidth(Dimensions.get('window').width-50)
        } else if (carouselHeight === 500) {
            setCarouselHeight(Dimensions.get('window').height - 10)            
        } else {
            setCarouselHeight(200)
            setCarouselWidth(300)
        }     
    }
    const renderItem = ({item, index}) => {
        return (
            <LocationCard handlePress={handlePress}/>    
        )
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                scrollEnabled={false}
                zoomTapEnabled={false}
                zoomEnabled={false}
                initialRegion={{
                    latitude: 34.0203996,
                    longitude: -118.5518137,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />            
            <Carousel
                data={array}
                renderItem={renderItem}
                layout={'default'}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={carouselWidth}
                sliderHeight={carouselHeight}
                itemHeight={carouselHeight}
                // containerCustomStyle={styles.carousel}
                containerCustomStyle={{
                    position: 'absolute',        
                    bottom: -50,
                    zIndex: 5,
                    height: carouselHeight,
                    width: 500,
                }}
            />                      
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        justifyContent: 'center',
        alignContent: 'center',        
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: -1
    },
})
