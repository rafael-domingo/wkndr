import React from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable, TouchableWithoutFeedback, Button } from 'react-native';
import MapView from 'react-native-maps';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MapCard from '../../components/Cards/MapCard';

export default function LargeMapList({ navigation, userTrips }) {
    const [activeSlide, setActiveSlide] = React.useState('0');

    const renderItem = ({item, index}) => {
        return (
            <View style={styles.container}>
                <MapCard location={item} navigation={navigation}/>           
            </View>
        )
    }
    if (userTrips.length > 0) {
        return (
            <View style={styles.container}>
                <Carousel
                    // ref={(c) => { this._carousel = c }}
                    data={userTrips}
                    renderItem={renderItem}
                    layout={'default'}
                    sliderWidth={600}
                    itemWidth={Dimensions.get('window').width - 100}
                    sliderHeight={Dimensions.get('window').height - 350}
                    itemHeight={Dimensions.get('window').height - 350}
                    onSnapToItem={(index) => setActiveSlide(index)}              
                />
                <View style={{height: 100}}>
                <Pagination
                    dotsLength={userTrips.length}
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
                        userTrips.length > 7 ? (activeIndex, total, context) => {                        
                        return (
                            <Text style={styles.paginationText}>
                                {activeIndex  + 1} / {total}
                            </Text>
                        )    
                    } : undefined }
                />          
                </View>
            </View>          
        )
    } else {
        return (
            <View>

            </View>
        )
    }
   
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