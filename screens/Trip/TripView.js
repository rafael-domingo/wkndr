import React from 'react';
import { Animated, View, StyleSheet, Dimensions, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, PanResponder, TouchableOpacity, Easing } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import TripViewSettingsButton from '../../components/Buttons/TripViewSettingsButton';
import SearchBarInput from '../../components/Input/SearchBarInput';
import { addDestination, deleteDestination } from '../../redux/user';
import SearchCarousel from './SearchCarousel';
import TripCard from '../../components/Cards/TripCard';
import { Modalize } from 'react-native-modalize';
import { Yelp } from '../../util/Yelp';
import { Entypo } from '@expo/vector-icons';

export default function TripView({ route, navigation }) {

    // state and value management
    const {location} = route.params
    const [searchResults, setSearchResults] = React.useState([])
    const [camera, setCamera] = React.useState(false)
    const mapRef = React.useRef(null)
    const modalizeRef = React.useRef([])
    const markerRef = React.useRef([])
    const dispatch = useDispatch()
    let mapIndex = 0
    let mapAnimation = new Animated.Value(0)
    const findTrip = (trip) => {
        return trip.tripId === location.tripId
    }
    const locationState = useSelector(state => state.user.tripList.find(findTrip))

    // state methods
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
        modalizeRef.current = []; // reset modal refs, will repopulate on render
        markerRef.current = [];
    }

    // camera methods
    const fitMarkers = () => {   
        mapRef.current.fitToSuppliedMarkers(locationState.destinations.map((destination, index) => {
            for (var key in destination) {
                
                return destination[key].id
            }
        }))
    }

    const cameraAnimation = (center) => {
        mapRef.current.animateCamera({                
            center: {
                latitude: center.latitude * 0.99985,
                longitude: center.longitude
            },
            pitch: 60,
            heading: 0,
            altitude: 800
        }, {duration: 1000})              
        setTimeout(() => {
            markerRef.current[mapIndex].showCallout()      
        }, 500);  
        
    }
    
    // useEffects
    React.useEffect(() => {
        if (mapRef.current) {   
            setTimeout(() => {
                fitMarkers()        
            }, 500);                
           
        }        
    }, [locationState.destinations])

    React.useEffect(() => {
        // listen for which card is being shown in carousel
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(Math.floor(value / ((Dimensions.get('window').width * 0.8)) + 0.3))
            if (index >= locationState.destinations.length) {
                index = locationState.destinations.length - 1                
            }
            if (index <= 0) {
                index = 0
            } 
            clearTimeout(regionTimeout)         
            
            const regionTimeout = setTimeout(() => {
                console.log(`mapindex: ${mapIndex}`)
                console.log(`index: ${index}`)
                if (mapRef.current) {
                    if (mapIndex !== index) {
                        mapIndex = index                        
                        markerRef.current[mapIndex].showCallout()   
                        const destination = locationState.destinations[mapIndex]
                        for (var key in destination) {         
                                                                 
                            mapRef.current.animateToRegion(
                                {
                                    longitude: destination[key].coordinates.longitude,
                                    latitude: destination[key].coordinates.latitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.001,
                                },
                                350
                            )                                  
                        }
                    }
                    
                }                
            }, 100);            
        })
    })
    return (
            <View style={styles.container}>            
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    scrollEnabled={false}
                    zoomTapEnabled={false}
                    zoomEnabled={false}
                    mapType={'mutedStandard'}
                    // userInterfaceStyle={'dark'}    
                    mapPadding={{
                        bottom: 300,
                        top: 50                        
                    }}
                    initialRegion={{
                        latitude: location.coordinates.lat,
                        longitude: location.coordinates.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.421,
                    }}
                >           
                    {
                        locationState.destinations.map((destination, index) => {
                            for (var key in destination ) {
                                return (
                                    <Marker
                                        ref={el => markerRef.current[index] = el}
                                        identifier={destination[key].id}
                                        key={index}
                                        coordinate={destination[key].coordinates}
                                        title={destination[key].name}
                                        onPress={() => {
                                            console.log('marker pressed')
                                        }}
                                    />
                                )
                            }                            
                        })
                    }
                </MapView>

                <SafeAreaView style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', top: 0, flex: 1, zIndex: 10}}>                
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: Dimensions.get('window').width}}>
                    <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', width: '10%'}}>
                        <TouchableOpacity 
                            style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginLeft: 25,   shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 2}}
                            onPress={() => navigation.navigate('User')}
                        >
                            <Entypo name="arrow-left" size={30} color="white"/>                            
                        </TouchableOpacity>
                    </View> 
                    <SearchBarInput location={location} handleSearch={handleSearch} show={camera}/>   
                  
                    </View>
                             
                    <TripViewSettingsButton navigation={navigation} location={location} show={camera}/>
                    {
                        searchResults.length > 0 && (
                            <SearchCarousel searchResults={searchResults} handleAddLocation={handleAddLocation} handleDeleteLocation={handleDeleteLocation}/>
                        )
                    }                   
                </SafeAreaView>
                {
                    searchResults.length === 0 && (
                        <Animated.ScrollView
                            style={
                                [
                                { 
                                    flex: 1,
                                    position: 'absolute',
                                    bottom: 0                                    
                                },                                    
                                ]
                            }
                            horizontal
                            // pagingEnabled
                            decelerationRate="fast" // fix for paging enabled bug
                            scrollEventThrottle={1}
                            snapToInterval={Dimensions.get('window').width * 0.8 + 20}
                            snapToAlignment="center"
                            showsHorizontalScrollIndicator={false}    
                            contentInset={{
                                top: 0,
                                left: Dimensions.get('window').width * 0.1 + 10,
                                bottom: 0,
                                right: Dimensions.get('window').width * 0.1 + 10
                                }} 
                                onScrollBeginDrag={() => {                                                                     
                                    console.log(modalizeRef.current?.length)
                                    modalizeRef.current?.forEach(element => {
                                        element?.close('alwaysOpen')
                                    });                                     
                                    fitMarkers()                                                                                               
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
                                    for (var key in item) {                                        
                                        return (
                                            <View 
                                                key={item[key].wkndrId} 
                                                style={{
                                                    width: Dimensions.get('window').width * 0.8,
                                                    height: Dimensions.get('window').height,
                                                    margin: 10,                                                               
                                                }}
                                            >                                              
                                                <TripCard 
                                                    key={item.wkndrId} 
                                                    location={item} 
                                                    modalizeRef={modalizeRef} 
                                                    index={index} 
                                                    handleDeleteLocation={handleDeleteLocation}
                                                    cameraAnimation={cameraAnimation}
                                                    setCamera={setCamera}
                                                    fitMarkers={fitMarkers}
                                                    camera={camera} 
                                                />                                              
                                            </View>                                        
                                        )
                                    }
                                    
                                })
                            }
                        </Animated.ScrollView>                        
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
