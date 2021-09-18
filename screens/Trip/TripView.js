import React, { useRef } from 'react';
import { Animated, View, StyleSheet, Dimensions, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, PanResponder } from 'react-native';
import MapView from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import TripViewSettingsButton from '../../components/Buttons/TripViewSettingsButton';
import LocationCard from '../../components/Cards/LocationCard';
import SearchBarInput from '../../components/Input/SearchBarInput';

export default function TripView({ navigation }) {
    const [carouselHeight, setCarouselHeight] = React.useState(new Animated.Value(Dimensions.get('window').height))
    const scale = React.useRef(new Animated.Value(1)).current
    const pan = useRef(new Animated.ValueXY()).current
    const [isDocked, setIsDocked] = React.useState(false)
    const panState = React.useState(pan)
    let AnimatedFlatView = Animated.createAnimatedComponent(FlatList, { useNativeDriver: true })
    const [dockAnimation, setDockAnimation] = React.useState(pan.y.interpolate({
        inputRange: [-240, 0],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    }))

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: () => {},
        onPanResponderMove: (Animated.event([null, {dx: pan.x, dy: pan.y}], { useNativeDriver: false })),
        onPanResponderRelease: (evt, gestureState) => {
            let shouldToggle = isDocked ? (gestureState.dy < (-200)) : (gestureState.dy > (200))
            if (!shouldToggle) {
                Animated.spring(pan.y, {
                    toValue: isDocked ? 0 : 0,
                    useNativeDriver: false
                }).start()
            } else {
                Animated.spring(pan.y, {
                    toValue: isDocked ? -100 : 100,
                    useNativeDriver: false
                }).start(() => {
                    setIsDocked(!isDocked)
                    setDockAnimation( isDocked ? pan.y.interpolate({
                        inputRange: [-100, 0],
                        outputRange: [0, 1],
                        extrapolate: 'clamp'
                    }) : pan.y.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, 1],
                        extrapolate: 'clamp'
                    }))
                })
            }
        }
    }) 

    const array = [
        {
            name: 'Verve Coffee',
            id: 0

        },
        {
            name: 'The Broad',
            id: 1
        },
        {
            name: 'Verve Coffee',
            id: 2
        },
        {
            name: 'The Broad',
            id: 3
        },
        {
            name: 'Verve Coffee',
            id: 4
        },
        {
            name: 'The Broad',
            id: 5
        },
        {
            name: 'The Broad',
            id: 6
        }
    ]

    const handlePress = () => {
        console.log(scale)
        // if (scale.current !== 1) {
            Animated.spring(scale, {
                toValue: 1.5,
                duration: 1000,
                useNativeDriver: true
            }).start()
        // } else {
            // Animated.spring(scale, {
            //     toValue: 1,
            //     duration: 1000,
            //     useNativeDriver: true
            // }).start()
        // }
       
    }
    const renderItem = ({item, index}) => {
        return (
            <LocationCard handlePress={handlePress} name={item.name}/>    
            // <View style={{flex: 1, width: 150, height: 300, backgroundColor: 'white'}}>
            //     <Text>{item.name}</Text>
            // </View>
        )
    }

    const getListViewStyle = () => {
        return (
            [
                {
                    width: dockAnimation.interpolate({
                        inputRange: [0,1],
                        outputRange: [Dimensions.get('window').width * 1, Dimensions.get('window').width * 2]
                    })
                },
                {
                    transform: [
                        {
                            scale: dockAnimation.interpolate({
                                inputRange: [0,1],
                                outputRange: [1,0.5]
                            })
                        },
                        {
                            translateY: dockAnimation.interpolate({
                                inputRange: [0,1],
                                outputRange: [0, (Dimensions.get('window').height / 2)]
                            })
                        }
                    ]
                }
            ]
        )
    }

    return (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View 
                style={styles.container}
               
            >            
                <MapView
                    style={styles.map}
                    scrollEnabled={false}
                    zoomTapEnabled={false}
                    zoomEnabled={false}
                    initialRegion={{
                        latitude: 34.0203996,
                        longitude: -118.5518137,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />           
                <SafeAreaView style={{position: 'absolute', top: 0, flex: 1, zIndex: 10}}>
                    <SearchBarInput/>
                    <TripViewSettingsButton navigation={navigation}/>                                     
                </SafeAreaView>
                <Animated.View 
                    style={{ transform: [{translateY: 0}], height: 800, bottom: 0, position: 'absolute', alignItems: 'flex-end', justifyContent: 'flex-start', }}
                    // style={{flex: 1}}
                    
                >
                    {/* <Carousel
                        data={array}
                        renderItem={renderItem}
                        directionalLockEnabled={false}
                        layout={'default'}      
                        inactiveSlideOpacity={0.7}                  
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={Dimensions.get('window').width - 150}                                               
                        // slideStyle={{width: Dimensions.get('window').width - 50, justifyContent: 'center', alignItems: 'center'}}
                        containerCustomStyle={{transform: [{scale: 1}]}}
                       
                        
      
                    />          */}
                    <AnimatedFlatView
                        data={array}
                        horizontal={true}
                        pagingEnabled={isDocked}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        style={getListViewStyle()}
                        {...panResponder.panHandlers}
                        
                    />
                </Animated.View>                      
            </View>
        // </TouchableWithoutFeedback>

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
