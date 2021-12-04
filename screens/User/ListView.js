import React from 'react';
import { View, StyleSheet, Dimensions, Text, SectionList, ActivityIndicator, TouchableOpacity, Animated, Easing } from 'react-native';

export default function ListView({ navigation, userTrips }) {    
    const translation = React.useRef(new Animated.Value(-200)).current
    
    React.useEffect(() => {
        Animated.timing(
            translation,
            {
                toValue: 0,
                duration: 1000,
                delay: 0,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true
            }
        ).start()
    })

    const renderItem = (item) => {
        return (
            
            <TouchableOpacity 
                style={styles.item}
                onPress={() => navigation.navigate('Trip', {location: item})}
            >
                {
                    item.tripName !== undefined && (
                        <Text style={[styles.text, {fontSize: 20}]}>{item.tripName}</Text>
                    )
                }
                {
                    item.tripName === undefined && (
                        <Text style={[styles.text, {fontSize: 20}]}>{item.tripId}</Text>
                    )
                }
                
            </TouchableOpacity>
        )
    }

    const renderHeader = (header) => {
        return (
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.header}>
                <Text style={[styles.text, {fontSize: 20, color: 'rgba(24,28, 47, 1)'}]}>{header}</Text>
            </View>
            </View>
        )
    }

    return (
        <Animated.View 
            style={[
                styles.container, 
                {
                    opacity: translation.interpolate({
                        inputRange: [-200, 0],
                        outputRange: [0, 1]
                    }),
                    transform: [{translateX: translation}]
                }
            ]}
        >
          

            
            <SectionList
            style={{width: '100%'}}
            sections={userTrips}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => renderItem(item)}
            renderSectionHeader={({ section: { title }}) => renderHeader(title)}
            />           
            
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,     
        // width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    text: {
        fontFamily: 'System',
        color: 'white',
        width: '80%'
    },
    header: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 10,
        padding: 10,
        width: '80%',
        
    },
    item: {
        margin: 5,
        padding: 10,
        width: '100%', 
        justifyContent: 'center',
        alignItems: 'center'
    }
})
