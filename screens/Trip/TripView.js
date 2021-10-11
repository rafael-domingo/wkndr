import React from 'react';
import { Animated, View, StyleSheet, Dimensions, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, PanResponder, TouchableOpacity, Easing } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import TripViewSettingsButton from '../../components/Buttons/TripViewSettingsButton';
import SearchBarInput from '../../components/Input/SearchBarInput';
import { addDestination, deleteDestination } from '../../redux/user';
import SearchCarousel from './SearchCarousel';
import TripCarousel from './TripCarousel';
import TripCard from '../../components/Cards/TripCard';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { State as GestureState } from 'react-native-gesture-handler'
import { snapPoint } from 'react-native-redash';
import { Modalize } from 'react-native-modalize';

export default function TripView({ route, navigation }) {
    const {location} = route.params
    const [searchResults, setSearchResults] = React.useState([])
    const [camera, setCamera] = React.useState(false)
    let mapIndex = 0
    let mapAnimation = new Animated.Value(0)
    const mapRef = React.useRef()
    const modalizeRef = React.useRef([])
    const findTrip = (trip) => {
        return trip.tripId === location.tripId
    }
    const locationState = useSelector(state => state.user.tripList.find(findTrip))

    const dispatch = useDispatch()


    const panState = React.useRef(new Animated.Value(0)); 
    const [docked, setDocked] = React.useState(true);
    // const [panState, setPanState] = React.useState(pan);
    // const [dockAnimation, setDockAnimation] = React.useState(
    //     panState.current.interpolate({
    //         inputRange: [-240, 0],
    //         outputRange: [0, 1],                      
    //         extrapolate: 'clamp'
    //     })
    // )
    const onGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationY: panState.current
                }
            }
        ],
        {
            useNativeDriver: true
        }
    )

    const snapPoints = [0, Dimensions.get('window').height]
    const onHandlerStateChange = (event) => {
        // panState.current.extractOffset()
        console.log(`panState: ${JSON.stringify(panState.current)}`)
        console.log(`event : ${JSON.stringify(event.nativeEvent.translationY)}`)
        // if (event.nativeEvent.state == GestureState.BEGAN) {
        //     event.nativeEvent.y = panState.current
        // }
        // if (event.nativeEvent.state == GestureState.ACTIVE) {
        //     panState.current = event.nativeEvent.y + event.nativeEvent.translationY
        // }
        if (event.nativeEvent.state === GestureState.END) {
            // const snapPointY = snapPoint(event.nativeEvent.translationY, event.nativeEvent.velocityY, snapPoints)
            // panState.current = snapPointY
            
            // let shouldToggle = docked ? (event.nativeEvent.translationY < -80) : (event.nativeEvent.translationY > 80)
            // console.log(`translationY: ${event.nativeEvent.translationY}`)
            // console.log(`shouldtoggle: ${shouldToggle}`)
            // console.log(`panState: ${JSON.stringify(panState.current)}`)
            // console.log(`docked: ${docked}`)
            // if (!shouldToggle) {
            //     Animated.spring(panState.current, {
            //         toValue: docked ? 0 : 0,
            //         useNativeDriver: true
            //     }).start()
            // } else {
            //     console.log('else')
            //     Animated.spring(panState.current, {
            //         toValue: docked ? (-240) : (240),
            //         useNativeDriver: true
            //     }).start(() => {
               

            //         if (docked) {
            //             setDockAnimation(
            //                 panState.current.interpolate({
            //                 inputRange: [-240, 0],
            //                 outputRange: [0, 1],
            //                 extrapolate: 'clamp'
            //             })
            //             )
            //         } 
            //         else {
            //             setDockAnimation(
            //                 panState.current.interpolate({
            //                     inputRange: [0, 240],
            //                     outputRange: [0, 1],
            //                     extrapolate: 'clamp'
            //                 })
            //             )
            //         }
            //         setDocked(!docked)

            //     })
            // }
          
        }
       
    }

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
        if (camera) {
            mapRef.current.animateCamera({
                pitch: 60,
                heading: 0,
                altitude: 750
            }, {duration: 1000})
        }
        else {
            mapRef.current.fitToSuppliedMarkers(locationState.destinations.map((destination, index) => {
                for (var key in destination) {
                    
                    return destination[key].id
                }
            }))
        }
       
    }, [camera])

    React.useEffect(() => {
        // fit mapview to markers
        if (mapRef.current) {       
            mapRef.current.fitToSuppliedMarkers(locationState.destinations.map((destination, index) => {
                for (var key in destination) {
                    return destination[key].id
                }
            }))
          
        }
        
    }, [locationState.destinations])

    React.useEffect(() => {
   
        // listen for which card is being shown in carousel
        mapAnimation.addListener(({ value }) => {
            console.log(Dimensions.get('window').width * 0.8)
            console.log(value)
            console.log(value / ((Dimensions.get('window').width * 0.8)) + 0.3)
            console.log(Math.floor(value / ((Dimensions.get('window').width * 0.8)) + 0.3))

            let index = Math.floor(Math.floor(value / ((Dimensions.get('window').width * 0.8)) + 0.3))
            console.log(`index: ${index}`)
            console.log(locationState.destinations.length)
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
                        const destination = locationState.destinations[mapIndex]
                        for (var key in destination) {                       
                            mapRef.current.animateToRegion(
                                {
                                    longitude: destination[key].coordinates.longitude,
                                    latitude: destination[key].coordinates.latitude * 0.99992,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.001,
                                },
                                350
                            )
                            
                        }
                    }
                }
                
            }, 10);
            // console.log(Math.floor(value/ (Dimensions.get('window').width * 0.8) + 0.3))
            
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
                    mapType={'mutedStandard'}
                    // userInterfaceStyle={'dark'}                            
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
                    <TouchableOpacity style={{backgroundColor: 'white'}} onPress={() => setCamera(!camera)}><Text>Button</Text></TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'white'}} onPress={() => modalizeRef.current?.close('alwaysOpen')}><Text>Close</Text></TouchableOpacity>

                    <TripViewSettingsButton navigation={navigation} location={location}/>
                    {
                        searchResults.length > 0 && (
                            <SearchCarousel searchResults={searchResults} handleAddLocation={handleAddLocation} handleDeleteLocation={handleDeleteLocation}/>
                        )
                    }
                   

                </SafeAreaView>
                {/* <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}> */}
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
                                    {
                                        transform: [
                                           
                                            {
                                                translateY: panState.current
                                            }
                                        ]
                                    }
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
                                      setCamera(false)
                                      console.log(modalizeRef.current?.length)
                                      modalizeRef.current?.forEach(element => {
                                          element.close('alwaysOpen')
                                      });
                                    //   modalizeRef.current[mapIndex]?.close('alwaysOpen')
                                    //   modalizeRef.current[mapIndex+1]?.close('alwaysOpen')
                                    //   modalizeRef.current[mapIndex-1]?.close('alwaysOpen')
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
                                            <View 
                                                key={item.wkndrId} 
                                                style={{
                                                    width: Dimensions.get('window').width * 0.8,
                                                    height: Dimensions.get('window').height,
                                                    margin: 10,
                                                    // bottom: -Dimensions.get('window').height / 2,
                                                    // transform: [{translateY: -Dimensions.get('window').height / 2}]
                                                }}
                                            >
                                                <Modalize
                                                    key={item.wkndrId}
                                                    ref={el => modalizeRef.current[index] = el}
                                                    style={{flex: 1}}
                                                    alwaysOpen={150}
                                                    modalHeight={600}
                                               
                                                    snapPoint={450}
                                                    handlePosition={'inside'}
                                                    overlayStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
                                                    onPositionChange={(position) => {
                                                        console.log(position)

                                                        if (position === 'top') {
                                                            setCamera(true)
                                                        }
                                                        else {
                                                            setCamera(false)
                                                        }
                                                        
                                                    }}
                                                    
                                                >

                                                <TripCard key={item.wkndrId} location={item} handleDeleteLocation={handleDeleteLocation}/>
                                                </Modalize>
                                            </View>
                                            
                                        )
                                    })
                                }
                            </Animated.ScrollView>

                            // <TripCarousel tripList={locationState.destinations} handleDeleteLocation={handleDeleteLocation}/>
                        )
                    }
                {/* </PanGestureHandler> */}
                    
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
