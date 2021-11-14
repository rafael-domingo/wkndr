import React from 'react';
import { Animated, View, StyleSheet, Dimensions, Text, Modal, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, PanResponder, TouchableOpacity, Easing, LayoutAnimation } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import TripViewSettingsButton from '../../components/Buttons/TripViewSettingsButton';
import SearchBarInput from '../../components/Input/SearchBarInput';
import { addDestination, deleteDestination, deleteTrip } from '../../redux/user';
import SearchCarousel from './SearchCarousel';
import { Yelp } from '../../util/Yelp';
import { Entypo } from '@expo/vector-icons';
import TripCarousel from './TripCarousel';
import { Modalize } from 'react-native-modalize';
import { BlurView } from 'expo-blur';
import TripHeader from '../../components/Misc/TripHeader';
export default function TripView({ route, navigation }) {

    // state and value management
    const {location} = route.params
    const [searchResults, setSearchResults] = React.useState([])
    const [camera, setCamera] = React.useState(false)
    const [search, setSearch] = React.useState(false)
    const mapRef = React.useRef(null)
    const modalizeRef = React.useRef([])
    const markerRef = React.useRef([])
    const searchMarkerRef = React.useRef([])
    const [modal, setModal] = React.useState(false)    
    const [modalConfirm, setModalConfirm] = React.useState(false)
    const dispatch = useDispatch()
    let mapIndex = 0
    let mapAnimation = new Animated.Value(0)
    const findTrip = (trip) => {
        console.log(location)
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
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        modalizeRef.current = []; // reset modal refs, will repopulate on render
        markerRef.current = [];
    }

    const handleDeleteTrip = () => {        
        setModal(true)        
    }

    React.useEffect(() => {
        if (modalConfirm) {
            setModalConfirm(false)
            dispatch(deleteTrip({tripId: location.tripId}))
            navigation.navigate('User')
        }
    }, [modalConfirm])

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
                latitude: center.latitude * 0.99989,
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
                <TripHeader location={locationState} show={camera} navigation={navigation}/>
                <SafeAreaView style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', flex: 1, top: 0, zIndex: 10}}>                
                
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: Dimensions.get('window').width}}>
                    {/* <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', width: '10%', zIndex: 10}}>
                    
                        <TouchableOpacity 
                            style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginLeft: 25, shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 2}}
                            onPress={() => navigation.navigate('User')}
                        >
                            <Entypo name="arrow-left" size={30} color="white"/>                            
                        </TouchableOpacity>
                    </View>  */}
                    
                    {/* <SearchBarInput location={locationState} handleSearch={handleSearch} show={search}/>    */}
                    
                    </View>
                             
                    <TripViewSettingsButton navigation={navigation} location={locationState} show={camera} deleteTrip={handleDeleteTrip}/>
                    <Modal
                        transparent={true}
                        visible={modal}    
                        animationType={'slide'}                      
                        
                    >
                        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                        <BlurView intensity={100} tint={'default'} style={{overflow: 'hidden', borderRadius: 20, height: 200, width: Dimensions.get('window').width*0.8, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 30}}>Delete this trip?</Text>
                            <View style={{flexDirection: 'row', bottom: 0, position: 'absolute', width: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
                                <View style={{width: '50%'}}>
                                <TouchableOpacity onPress={() => setModal(false)} style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cancel</Text>
                                </TouchableOpacity>
                                </View>
                                <View style={{width: '50%'}}>
                                <TouchableOpacity onPress={() => {
                                    setModalConfirm(true)
                                    setModal(false)
                                }} style={{padding: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Delete</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        </BlurView>
                        </View>
                    </Modal>    
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
