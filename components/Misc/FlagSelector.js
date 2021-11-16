import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import CountryFlag from "react-native-country-flag";

export default function FlagSelector() {
    const flagCodes = [
        {
            code: 'cz',
            name: 'Czech Republic'
        },
        {
            code: 'dk',
            name: 'Denmark'
        },
        {
            code: 'at',
            name: 'Austria'
        },
        {
            code: 'ch',
            name: 'Switzerland'
        },
        {
            code: 'de',
            name: 'Germany'
        },
        {
            code: 'au',
            name: 'Australia'
        },
        {
            code: 'be',
            name: 'Belgium'
        },
        {
            code: 'ca',
            name: 'Canada'
        },  
        {
            code: 'gb',
            name: 'United Kingdom'
        },
        {
            code: 'hk',
            name: 'Hong Kong'
        },
        {
            code: 'ie',
            name: 'Republic of Ireland'
        },
        {
            code: 'my',
            name: 'Malaysia'
        },
        {
            code: 'nz',
            name: 'New Zealand'
        },
        {
            code: 'ph',
            name: 'Philippines'
        },
        {
            code: 'sg',
            name: 'Singapore'
        },
        {
            code: 'us',
            name: 'United States'
        },
        {
            code: 'ar',
            name: 'Argentina'
        },
        {
            code: 'cl',
            name: 'Chile'
        },
        {
            code: 'es',
            name: 'Spain'
        },
        {
            code: 'mx',
            name: 'Mexico'
        },
        {
            code: 'fi',
            name: 'Finland'
        },
        {
            code: 'fr',
            name: 'France'
        },
        {
            code: 'it',
            name: 'Italy'
        },
        {
            code: 'jp',
            name: 'Japan'
        },
        {
            code: 'no',
            name: 'Norway'
        },
        {
            code: 'nl',
            name: 'The Netherlands'
        },
        {
            code: 'pl',
            name: 'Poland'
        },
        {
            code: 'se',
            name: 'Sweden'
        },
        {
            code: 'tr',
            name: 'Turkey'
        },
        {
            code: 'tw',
            name: 'Taiwan'
        }
    ]

    // alphabetize by name
    flagCodes.sort((a, b) => (a.name > b.name ? 1 : -1))

    const searchContainer = []
    for (let index = 0; index < flagCodes.length; index = index + 1) {
        searchContainer.push
            (
            <View key={index} style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <TouchableOpacity key={flagCodes[index].code} style={{flexDirection: 'row', margin: 10, width: '100%', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <CountryFlag style={{borderRadius: 25, width: 50}} isoCode={flagCodes[index].code} size={50} />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 15}}>{flagCodes[index].name}</Text>
                </TouchableOpacity>
                {/* <View key={flagCodes[index+1].code} style={{margin: 10, width: '33%', justifyContent: 'center', alignItems: 'center'}}>
                    <CountryFlag style={{borderRadius: 25, width: 50}} isoCode={flagCodes[index+1].code} size={50} />
                    <Text style={{color: 'white'}}>{flagCodes[index+1].name}</Text>
                </View>
                <View key={flagCodes[index+2].code} style={{margin: 10, width: '33%', justifyContent: 'center', alignItems: 'center'}}>
                    <CountryFlag style={{borderRadius: 25, width: 50}} isoCode={flagCodes[index+2].code} size={50} />
                    <Text style={{color: 'white'}}>{flagCodes[index+2].name}</Text>
                </View> */}
            </View>
          
            )
    }
    return (
        <ScrollView style={{height: '100%', width: '100%'}} >
            {searchContainer}
        </ScrollView>
    )
}
