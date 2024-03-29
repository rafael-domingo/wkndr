import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Star from '../Rating/Star';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import * as WebBrowser from 'expo-web-browser';


export default function Reviews({ reviews }) {
    var reviewsJSX = [];

    reviews.forEach((element, index) => {    
        console.log({element})    
        var image;
        if (element.user.image_url === null) {
            image = <FontAwesome name="user-circle" size={45} color="white" />
        } else {
            image = <Image style={styles.image} source={{uri: element.user.image_url}} resizeMode="cover"/>
        }
        reviewsJSX.push(
            <TouchableOpacity 
                key={index} 
                style={{marginBottom: 20, flex: 1}}
                onPress={() => {
                    console.log(element.url)
                    WebBrowser.openBrowserAsync(element.url)
                }}
            >
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        {image}
                    </View>
                    <Text style={[styles.text, {marginLeft: 5, fontWeight: 'bold', fontSize: 12}]}>{element.user.name}</Text>

                    </View>                  
                    <Star rating={element.rating} size={10}/>                    
                </View>
     
                <Text style={[styles.text]}>{element.text}</Text>
            </TouchableOpacity>
        )       
    });
    return (
        <View style={styles.container}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>Reviews</Text>
            <ScrollView style={{marginTop: 10, width: '100%'}}>
                {reviewsJSX}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    text: {
        color: 'white',
        fontFamily: 'System',
        fontSize: 12
    },
    image: {
        minWidth: 50,
        flex: 1,
        minHeight: 50,
        borderRadius: 25
    }
})