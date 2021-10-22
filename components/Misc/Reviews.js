import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import Star from '../Rating/Star';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 

export default function Reviews({ reviews }) {
    var reviewsJSX = [];
    reviews.forEach((element, index) => {
        var image;
        if (element.user.image_url === null) {
            image = <FontAwesome name="user-circle" size={45} color="white" />
        } else {
            image = <Image style={styles.image} source={{uri: element.user.image_url}} resizeMode="cover"/>
        }
        reviewsJSX.push(
            <View key={index} style={{marginBottom: 20, flex: 1}}>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        {image}
                    </View>
                    <Text style={[styles.text, {marginLeft: 5, fontWeight: 'bold', fontSize: 15}]}>{element.user.name}</Text>

                    </View>                  
                    <Star rating={element.rating} size={10}/>                    
                </View>
     
                <Text style={[styles.text]}>{element.text}</Text>
            </View>
        )       
    });
    return (
        <View style={styles.container}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>Reviews</Text>
            <ScrollView style={{marginTop: 10}}>
                {reviewsJSX}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    text: {
        color: 'white',
        fontFamily: 'System'
    },
    image: {
        minWidth: 50,
        flex: 1,
        minHeight: 50,
        borderRadius: 25
    }
})