import React from 'react';
import { Animated, View, StyleSheet, Dimensions, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, PanResponder } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import TripViewSettingsButton from '../../components/Buttons/TripViewSettingsButton';
import SearchBarInput from '../../components/Input/SearchBarInput';
import { addDestination, deleteDestination } from '../../redux/user';
import SearchCarousel from './SearchCarousel';
import TripCarousel from './TripCarousel';
import TripCard from '../../components/Cards/TripCard';
export default function TripView({ route, navigation }) {
    const {location} = route.params
    const [searchResults, setSearchResults] = React.useState([])

 
    let mapAnimation = new Animated.Value(0)
    const mapRef = React.useRef()
    const findTrip = (trip) => {
        return trip.tripId === location.tripId
    }
    const locationState = useSelector(state => state.user.tripList.find(findTrip))

    const dispatch = useDispatch()

    const handleSearch = (searchResults) => {
        setSearchResults(searchResults)
    }

    const handleAddLocation = (newLocation) => {        
        dispatch(addDestination({
            tripId: location.tripId,
            newDestination: newLocation,            
        }))    
    }

    const handleDeleteLocation = (wkndrId) => {
        dispatch(deleteDestination({
            tripId: location.tripId,
            wkndrId: wkndrId
        }))
    }

    React.useEffect(() => {
        if (mapRef.current) {
            mapRef.current.fitToSuppliedMarkers(locationState.destinations.map((destination, index) => {
                for (var key in destination) {
                    return destination[key].id
                }
            }))
        }
        mapAnimation.addListener(({ value }) => {
            console.log(value)
        })
    })

    return (
            <View 
                style={styles.container}
               
            >            
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    scrollEnabled={false}
                    zoomTapEnabled={false}
                    zoomEnabled={false}
                    userInterfaceStyle={'dark'}            
                    initialRegion={{
                        latitude: location.coordinates.lat,
                        longitude: location.coordinates.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >           
                    {
                        locationState.destinations.map((destination, index) => {
                            for (var key in destination ) {
                                return (
                                    <Marker
                                        identifier={destination[key].id}
                                        key={index}
                                        coordinate={destination[key].coordinates}
                                        title={destination[key].name}


                                    />
                                )
                            }
                            
                        })
                    }
                </MapView>

                <SafeAreaView style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', top: 0, flex: 1, zIndex: 10}}>
                    <SearchBarInput location={location} handleSearch={handleSearch}/>
                    <TripViewSettingsButton navigation={navigation} location={location}/>
                    {
                        searchResults.length > 0 && (
                            <SearchCarousel searchResults={searchResults} handleAddLocation={handleAddLocation} handleDeleteLocation={handleDeleteLocation}/>
                        )
                    }
                   

                </SafeAreaView>
                {
                        searchResults.length === 0 && (
   
                            <Animated.ScrollView
                                style={{ 
                                    flex: 1,
                                    position: 'absolute',
                                    bottom: '-60%'
                                }}
                                horizontal
                                // pagingEnabled
                                decelerationRate="fast" // fix for paging enabled bug
                                scrollEventThrottle={1}
                                snapToInterval={Dimensions.get('window').width * 0.8 + 20}
                                snapToAlignment="center"
                                showsHorizontalScrollIndicator={false}    
                                contentInset={{
                                    top: 0,
                                    left: Dimensions.get('window').width * 0.1 -10,
                                    bottom: 0,
                                    right: Dimensions.get('window').width * 0.1 -10
                                  }} 
                                onScroll={Animated.event(
                                    [
                                        {
                                            nativeEvent: {
                                                contentOffset: {
                                                    x: mapAnimation
                                                }
                                            }
                                        }
                                    ],
                                    { useNativeDriver: true }
                                )}
                            >
                                {
                                    locationState.destinations.map((item, index) => {
                                        return (
                                            <View key={item.wkndrId} style={{width: Dimensions.get('window').width * 0.8 , height: Dimensions.get('window').height - 100, margin: 10}}>
                                                <TripCard location={item} handleDeleteLocation={handleDeleteLocation}/>
                                            </View>
                                        )
                                    })
                                }
                            </Animated.ScrollView>

                            // <TripCarousel tripList={locationState.destinations} handleDeleteLocation={handleDeleteLocation}/>
                        )
                    }
                    
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'flex-end',
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
