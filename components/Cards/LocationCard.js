import React from 'react';
import { Animated, View, StyleSheet, Text, Pressable, Dimensions } from 'react-native';

class LocationCard extends React.PureComponent {
    
    
    render() {
        const { handlePress, name } = this.props
        return (
            <Pressable 
            style={styles.container}
            onPress={handlePress}
        >
            <View 
                style={styles.subContainer}
                // onStartShouldSetResponder={() => true}
                // onMoveShouldSetResponder={() => true}
                // onResponderMove={(evt) => {
                //     console.log(evt.nativeEvent)
                // }}    
            >
                <Text>{name}</Text>
            </View>
        </Pressable>
        )
    } 
    
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white',       
        width: Dimensions.get('window').width - 150,
        // paddingHorizontal: 50,
        transform: [{scale: 1}]
    },
    subContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        
        borderRadius: 20,
        width: Dimensions.get('window').width - 150

    }
})

export default LocationCard