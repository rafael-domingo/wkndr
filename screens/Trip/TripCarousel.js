import React from 'react';
import { Animated, View, StyleSheet, Dimensions, Easing } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import TripCard from '../../components/Cards/TripCard';

export default function TripCarousel({ tripList, handleDeleteLocation }) {
    const translation = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        Animated.timing(
            translation,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.inOut(Easing.exp),
                useNativeDriver: true
            }
        ).start()
    }, [translation])

    const renderItem = ({ item, index}) => {
        
        return (
            <View style={{height: Dimensions.get('window').height - 100, margin: 10}}>
                <TripCard location={item} handleDeleteLocation={handleDeleteLocation}/>
            </View>
        )
    }

    return (
        <Animated.View 
            style={[
                styles.container,
                {
                    opacity: translation
                }
            ]}
        >
            <Carousel
                data={tripList}
                renderItem={renderItem}
                layout={'default'}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width-200}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: '-60%',
        // bottom: 0
    }
})