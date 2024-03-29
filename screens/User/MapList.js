import React from 'react';
import { Animated, View, StyleSheet, Dimensions, Text, LayoutAnimation, Easing } from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { useDispatch } from 'react-redux';
import MapCard from '../../components/Cards/MapCard';
import { deleteTrip } from '../../redux/user';
export default function MapList({ mapView, city, navigation, userTrips, setModal, setModalAll, modalConfirm, setModalConfirm }) {
    const [activeSlide, setActiveSlide] = React.useState('0');
    const [activeIndex, setActiveIndex] = React.useState(0);
    const opacity = React.useRef(new Animated.Value(0)).current
    React.useEffect(() => {
        console.log(city)
        if (city !== null) {
            userTrips.map((item, index) => {
                if (city === item.title) {
                    console.log(index)
                    setActiveSlide(index.toString())
                    setActiveIndex(index)
                }
            })
        } else if (activeIndex >= userTrips.length) {
            setActiveIndex(userTrips.length - 1)
            setActiveSlide((userTrips.length - 1).toString())
        }
    }, [city, userTrips])

    React.useEffect(() => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: 500,
                delay: 0,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true
            }
        ).start()
    }, [mapView])
    const selectMap = (index) => {
        navigation.navigate('Trip', {trip: userTrips[index]})
    }      

    const renderItem = ({item, index}) => {

        return (
            <View style={styles.container} key={index}>
                <MapCard key={index} location={item} handleClick={selectMap} index={index} activeSlide={activeSlide} navigation={navigation} setModal={setModal} setModalAll={setModalAll} modalConfirm={modalConfirm} setModalConfirm={setModalConfirm}/>
            </View>
        )
    }

    return (
        <Animated.View 
            style={[
                styles.container, 
                {
                    opacity: opacity,
                    transform: [{translateX: opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [200, 0]
                    })}]
                }
            ]}
        >
            <Carousel
                data={userTrips}                
                renderItem={renderItem}
                layout={'default'}
                sliderWidth={600}
                itemWidth={Dimensions.get('window').width - 100}
                sliderHeight={Dimensions.get('window').height - 350}
                itemHeight={Dimensions.get('window').height - 350}
                onSnapToItem={(index) => {
                    setActiveSlide(index)
                    setActiveIndex(index)
                }}         
                getItemLayout={(userTrips, index) => (
                    {length: Dimensions.get('window').height - 350, offset: Dimensions.get('window').height - 350 * index, index}
                  )}
                firstItem={activeIndex}
                initialScrollIndex={activeIndex}                    
            />
            
            <Pagination
                    dotsLength={userTrips.length >= 2 ? userTrips.length : 2}
                    activeDotIndex={parseInt(activeSlide)}                    
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 0,
                        backgroundColor: userTrips.length >= 2 ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255,255,255,0)'
                    }}
                    inactiveDotStyle={{
                        // Define styles for inactive dots here
                    }}
                    inactiveDotOpacity={userTrips.length >= 2 ? 0.4 : 0.0}
                    inactiveDotScale={0.6}
                    renderDots={ 
                        userTrips.length > 10 ? (activeIndex, total, context) => {                        
                        return (
                            <Text style={styles.paginationText}>
                                {activeIndex  + 1} / {total}
                            </Text>
                        )    
                    } : undefined }
                />          
            
        </Animated.View>
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
        // flex: 1
    }
})