import React from 'react';
import { View, StyleSheet, Dimensions, Text, SectionList, ActivityIndicator } from 'react-native';

export default function ListView({ navigation, userTrips }) {

    const renderItem = (item) => {
        return (
            <View style={styles.item}>
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
                
            </View>
        )
    }

    const renderHeader = (header) => {
        return (
            <View style={styles.header}>
                <Text style={[styles.text, {fontSize: 25, color: 'rgba(24,28, 47, 1)'}]}>{header}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SectionList
            sections={userTrips}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => renderItem(item)}
            renderSectionHeader={({ section: { title }}) => renderHeader(title)}
            />           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'System',
        color: 'white'
    },
    header: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        padding: 10
    },
    item: {
        margin: 5,
        padding: 5
    }
})
