import React from 'react';
import { Animated, View, StyleSheet, Dimensions, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, PanResponder, TouchableOpacity, Easing } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import TripViewSettingsButton from '../../components/Buttons/TripViewSettingsButton';
import SearchBarInput from '../../components/Input/SearchBarInput';
import { addDestination, deleteDestination } from '../../redux/user';
import SearchCarousel from './SearchCarousel';
import { Yelp } from '../../util/Yelp';
import { Entypo } from '@expo/vector-icons';
import TripCarousel from './TripCarousel';
import { Modalize } from 'react-native-modalize';
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
        console.log(searchResults)
        setSearchResults(searchResults)
        if (searchResults.length > 0) {
            fitMarkers()
        }
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
        const markersArray = []
        locationState.destinations.map((destination, index) => {
            for (var key in destination) {
                markersArray.push(destination[key].id)
            }
        })
        searchResults.map((destination, index) => {
            markersArray.push(destination.id)
        })        
        mapRef.current.fitToSuppliedMarkers(markersArray)
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
                                        pinColor={'tomato'}
                                        onPress={() => {
                                            console.log('marker pressed')
                                        }}
                                    />
                                )
                            }                            
                        })
                    }
                    {
                        searchResults.map((destination, index) => {
                            return (
                                <Marker 
                                    identifier={destination.id}
                                    key={destination.id}
                                    pinColor={'indigo'}
                                    coordinate={destination.coordinates}
                                    title={destination.name}                                    
                                />
                            )
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
                    
                </SafeAreaView>
         
                {
                    searchResults.length > 0 && (
                        <SearchCarousel searchResults={searchResults} handleAddLocation={handleAddLocation} handleDeleteLocation={handleDeleteLocation}/>
                    )
                }             
                {
                    searchResults.length === 0 && (
                        <TripCarousel 
                            locationState={locationState} 
                            modalizeRef={modalizeRef} 
                            fitMarkers={fitMarkers} 
                            mapAnimation={mapAnimation} 
                            handleDeleteLocation={handleDeleteLocation} 
                            cameraAnimation={cameraAnimation} 
                            setCamera={setCamera} 
                            camera={camera}
                        />                      
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
