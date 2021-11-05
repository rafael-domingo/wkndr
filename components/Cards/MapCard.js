import React from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable, TouchableWithoutFeedback, Button, TouchableOpacity } from 'react-native';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';

export default function MapCard({ location, handleClick, index, activeSlide, navigation, deleteTrip }) {
    const mapRef = React.useRef();
    const [view, setView] = React.useState(true)
    const [show, setShow] = React.useState(false)
    React.useEffect(() => {
        if (index !== activeSlide) {
            setView(true)
            setShow(false)
        }
    }, [activeSlide])
    if (view) {
        return (
            <>
            <Text style={styles.text}>
            {location.title}
            </Text>     
                <MapView 
                    ref={mapRef}
                    style={styles.map}
                    scrollEnabled={false}
                    userInterfaceStyle={"dark"}
                    onPress={() =>  {
                        setView(false)
                        console.log('touched map')
                    }}
                    camera={{
                        center: {
                            latitude: location.data[0].coordinates.lat,
                            longitude: location.data[0].coordinates.lng,
                        },
                        pitch: 0,
                        heading: 0,
                        altitude: 100000,
                        zoom: 12
                    }}
                    // mapType={'mutedStandard'}
                    zoomTapEnabled={false}
                    zoomEnabled={false}
                    initialRegion={{
                        latitude: location.data[0].coordinates.lat,
                        longitude: location.data[0].coordinates.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />  
            </>
        )
    } else {
        return (
            <>
            <Text style={styles.text}>
            {location.title}
            </Text>          
            <View style={[styles.map, {borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center', zIndex: 10}]}>
            <TouchableOpacity onPress={() => setShow(true)} style={show ? {display: 'none'} : {top: 0, position: 'absolute', marginBottom: 20}}>
                <Text style={[styles.text, {fontWeight: 'bold', textAlign: 'center'}]}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShow(false)} style={show ? {top: 0, position: 'absolute', marginBottom: 20} : {display: 'none'}}>
                <Text style={[styles.text, {fontWeight: 'bold', textAlign: 'center'}]}>Done</Text>
            </TouchableOpacity>
            <Text style={[styles.text, {textAlign: 'center'}]}>Select a trip</Text>
            {
                location.data.map((item, index) => {
                    return (
                        <TouchableOpacity 
                            style={{backgroundColor: 'white', width: 200, margin: 5, borderRadius: 10, height: 30, justifyContent: 'center', alignItems: 'center'}}
                            onPress={() => navigation.navigate('Trip', {location: item})}
                        >
                            <Text style={[styles.text, {textAlign: 'center', color: 'black'}]}>{item.tripName}</Text>
                        </TouchableOpacity>
                    )
                    
                })
            }
            <TouchableOpacity onPress={() => setView(true)} style={{bottom: 0, position: 'absolute', marginBottom: 20}}>
                <Text style={[styles.text, {fontWeight: 'bold', textAlign: 'center'}]}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setView(true)} style={show ? {bottom: 0, position: 'absolute', marginBottom: 40, backgroundColor: 'red'} : {display: 'none'}}>
                <Text style={[styles.text, {fontWeight: 'bold', textAlign: 'center'}]}>Delete All</Text>
            </TouchableOpacity>
            </View>              
            </>
        )
    }
    
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
        flex: 1
    }
})