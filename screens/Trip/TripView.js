import React from 'react';
import { Animated, View, StyleSheet, Dimensions, Text, Modal, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, PanResponder, TouchableOpacity, Easing, LayoutAnimation } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import TripViewSettingsButton from '../../components/Buttons/TripViewSettingsButton';
import SearchBarInput from '../../components/Input/SearchBarInput';
import { addDestination, deleteDestination, deleteTrip, updateTripName } from '../../redux/user';
import SearchCarousel from './SearchCarousel';
import { Yelp } from '../../util/Yelp';
import { Entypo } from '@expo/vector-icons';
import TripCarousel from './TripCarousel';
import { Modalize } from 'react-native-modalize';
import { BlurView } from 'expo-blur';
import { FontAwesome5 } from '@expo/vector-icons'; 
import TripHeader from '../../components/Misc/TripHeader';
import DeleteTripModal from '../../components/Modals/DeleteTripModal';
import RenameTripModal from '../../components/Modals/RenameTripModal';
import DeleteDestinationModal from '../../components/Modals/DeleteDestinationModal';
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
    const dispatch = useDispatch()

    // modal states
    const [modal, setModal] = React.useState(false)    
    const [modalConfirm, setModalConfirm] = React.useState(false)
    const [renameModal, setRenameModal] = React.useState(false)
    const [modalAction, setModalAction] = React.useState()
    const [newTripName, setNewTripName] = React.useState()
    const [modalDelete, setModalDelete] = React.useState(false)

    const [deleteId, setDeleteId] = React.useState()
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
        setModalDelete(true)
        setDeleteId(wkndrId)
        // dispatch(deleteDestination({
        //     tripId: location.tripId,
        //     wkndrId: wkndrId
        // }))
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        // modalizeRef.current = []; // reset modal refs, will repopulate on render
        // markerRef.current = [];
    }

    const handleDeleteSearch = (wkndrId) => {
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
        setModalAction('delete')
    }

    const handleRenameTrip = () => {
        setRenameModal(true)
        setModalAction('rename')
        
    }

    React.useEffect(() => {
        if (modalConfirm) {
            if (modalAction === 'delete') {
                setModalConfirm(false)
                dispatch(deleteTrip({tripId: location.tripId}))
                setModalAction(null)
                navigation.navigate('User')
            } else if (modalAction === 'rename') {
                // console.log({newTripName})
                setModalConfirm(false)
                dispatch(updateTripName({tripName: newTripName, tripId: location.tripId}))
                setModalAction(null)
            }
           
        }
    }, [modalConfirm])

    React.useEffect(() => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    })

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
                latitude: center.latitude -0.005,
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
            setTimeout(() => {
                markerRef?.current[0]?.showCallout()    
            }, 1000);
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
                                            // console.log('marker pressed')
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
                <TripHeader location={locationState} show={camera} search={search} navigation={navigation}/>
                <SafeAreaView style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', flex: 1, top: 0, zIndex: 10}}>                
                
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: Dimensions.get('window').width}}>
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
                    
                    <SearchBarInput location={locationState} handleSearch={handleSearch} show={search}/>   
                    
                    </View>
                             
                    <TripViewSettingsButton navigation={navigation} location={locationState} setSearch={setSearch} search={search} show={camera} deleteTrip={handleDeleteTrip} renameTrip={handleRenameTrip} setSearchResults={setSearchResults}/>
                   
                    <DeleteTripModal setModal={setModal} setModalConfirm={setModalConfirm} modal={modal}/>
                    <RenameTripModal location={locationState} setRenameModal={setRenameModal} renameModal={renameModal} setModalConfirm={setModalConfirm} setNewTripName={setNewTripName}/>
                    {/* <TouchableOpacity 
                        onPress={() => setSearch(!search)}
                        style={{
                            zIndex: 15,
                            margin: 5,
                            width: 50,
                            height: 50,
                            backgroundColor: 'rgb(112,112,112)',
                            borderRadius: 27.5,
                            padding: 7.5,
                            bottom: 100,
                            right:10,                            
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <FontAwesome5 name="search" size={24} color="white" />
                    </TouchableOpacity> */}
                </SafeAreaView>
                
                {
                    searchResults.length > 0 && (
                        <SearchCarousel 
                            searchResults={searchResults} 
                            handleAddLocation={handleAddLocation} 
                            handleDeleteLocation={handleDeleteSearch}
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
                <DeleteDestinationModal 
                    showModal={modalDelete} 
                    setModal={setModalDelete} 
                    location={locationState.destinations[mapIndex]} 
                    wkndrId={deleteId}
                    tripId={location.tripId}
                    modalizeRef={modalizeRef}
                    markerRef={markerRef}
                    setCamera={setCamera}
                />   
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
