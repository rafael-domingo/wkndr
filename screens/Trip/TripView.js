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
    const searchMarkerRef = React.useRef([])
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

        // parse through current trip to help check for existing destinations
        var tripIds = [];
        var wkndrIds = [];
        locationState.destinations.map((destination, index) => {
            for (var key in destination) {
                tripIds.push(destination[key].id)
                wkndrIds.push(destination[key].wkndrId)                                
            }
        })

        // check if search result is already in the trip and adjust selected & wkndrId as needed
        const updatedSearchResults = searchResults.map((item, index) => {
            if (tripIds.includes(item.id)) {
                const wkndrIdIndex = tripIds.indexOf(item.id)
                return  ({
                    ...item,
                    selected: true,
                    wkndrId: wkndrIds[wkndrIdIndex]
                })
            } else {
                return item
            }
        })

        setSearchResults(updatedSearchResults)
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
    }

    const animateToRegion = (center) => {
        if (mapRef.current) {
            mapRef.current.animateToRegion(
                {
                    longitude: center.longitude,
                    latitude: center.latitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.001,
                },
                350
            )
        }
    }

    const showCallout = (type, index) => {
        if (type === 'search') {
            searchMarkerRef.current[index].showCallout()
         
        } else if (type === 'trip') {

        }
    }

    const changeMarker = (type, selectedIndex) => {
        // change the marker color if it was selected/unselected in search
        if (type === 'selected') {
            const newSearchResults = searchResults.map((item, index) => {
                if (index === selectedIndex) {                    
                    return ({
                        ...item,
                        selected: true
                    })
                } else {
                    return ({
                        ...item,                        
                    })
                }                   
            })            
            setSearchResults(newSearchResults)      
        } else if (type === 'unselected') {
            const newSearchResults = searchResults.map((item, index) => {
                if (index === selectedIndex) {                    
                    return ({
                        ...item,
                        selected: false
                    })
                } else {
                    return ({
                        ...item,                        
                    })
                }                   
            })            
            setSearchResults(newSearchResults)      
        }
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
                           animateToRegion(destination[key].coordinates)                                                             
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
                    userInterfaceStyle={'dark'}    
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
                                    ref={el => searchMarkerRef.current[index] = el}
                                    identifier={destination.id}
                                    key={destination.id}
                                    pinColor={destination.selected ? 'tomato' : 'indigo'}
                                    coordinate={destination.coordinates}
                                    title={destination.name}                                    
                                />
                            )
                        })
                    }
                </MapView>

                <SafeAreaView style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', flex: 1, top: 0, zIndex: 10}}>                
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: Dimensions.get('window').width}}>
                    <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', width: '10%', zIndex: 10}}>
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
                        <SearchCarousel 
                            searchResults={searchResults} 
                            handleAddLocation={handleAddLocation} 
                            handleDeleteLocation={handleDeleteLocation}
                            cameraAnimation={cameraAnimation}
                            setCamera={setCamera}
                            camera={camera}
                            fitMarkers={fitMarkers}
                            showCallout={showCallout}
                            animateToRegion={animateToRegion}
                            changeMarker={changeMarker}
                            tripDestinations={locationState.destinations}
                        />
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
