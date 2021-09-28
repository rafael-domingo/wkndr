import React from 'react';
import { Animated, View, StyleSheet, Dimensions, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, PanResponder } from 'react-native';
import MapView from 'react-native-maps';
import { useDispatch } from 'react-redux';
import TripViewSettingsButton from '../../components/Buttons/TripViewSettingsButton';
import SearchBarInput from '../../components/Input/SearchBarInput';
import { addDestination, deleteDestination } from '../../redux/user';
import SearchCarousel from './SearchCarousel';

export default function TripView({ route, navigation }) {
    const {location} = route.params
    const [searchResults, setSearchResults] = React.useState([])
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

    return (
            <View 
                style={styles.container}
               
            >            
                <MapView
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
                />           
                <SafeAreaView style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', top: 0, flex: 1, zIndex: 10}}>
                    <SearchBarInput location={location} handleSearch={handleSearch}/>
                    <TripViewSettingsButton navigation={navigation} location={location}/>
                    {
                        searchResults.length > 0 && (
                            <SearchCarousel searchResults={searchResults} handleAddLocation={handleAddLocation} handleDeleteLocation={handleDeleteLocation}/>
                        )
                    }
                    

                </SafeAreaView>

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
