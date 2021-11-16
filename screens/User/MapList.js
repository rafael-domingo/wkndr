import React from 'react';
import { Animated, View, StyleSheet, Dimensions, Text, LayoutAnimation } from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { useDispatch } from 'react-redux';
import MapCard from '../../components/Cards/MapCard';
import { deleteTrip } from '../../redux/user';
export default function MapList({ mapView, city, navigation, userTrips, setModal, setModalAll, modalConfirm, setModalConfirm }) {
    const [activeSlide, setActiveSlide] = React.useState('0');
    const [activeIndex, setActiveIndex] = React.useState(0);

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
    const selectMap = (index) => {
        navigation.navigate('Trip', {trip: userTrips[index]})
    }  

    const renderItem = ({item, index}) => {

        return (
            <View style={styles.container}>
                <MapCard key={index} location={item} handleClick={selectMap} index={index} activeSlide={activeSlide} navigation={navigation} setModal={setModal} setModalAll={setModalAll} modalConfirm={modalConfirm} setModalConfirm={setModalConfirm}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
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
                        userTrips.length > 10 ? (activeIndex, total, context) => {                        
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
        // flex: 1
    }
})