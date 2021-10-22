import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
export default function Hours({ hours }) {
    const days = {
        'Monday': [],
        'Tuesday': [],
        'Wednesday': [],
        'Thursday': [],
        'Friday': [],
        'Saturday': [],
        'Sunday': []
    }

    hours.map((item, index) => {
        switch (item.day) {
            case 0:
                days.Monday.push(item)
                break;
            case 1: 
                days.Tuesday.push(item)
                break;
            case 2: 
                days.Wednesday.push(item)
                break;
            case 3: 
                days.Thursday.push(item)
                break;
            case 4: 
                days.Friday.push(item)
                break;
            case 5: 
                days.Saturday.push(item)
                break;
            case 6: 
                days.Sunday.push(item)
                break;
            default:
                break;
        }
    })


    console.log(days)
    var businessHours = [];
    for (var key in days) {
        if (days[key].length === 0) {
            businessHours.push(
                <View style={styles.subContainer}>
                    <Text style={[styles.text, {width: '100%', fontWeight: 'bold'}]}>{key}</Text>   
                    <View><Text style={[styles.text, {fontSize: 12}]}>Closed</Text></View>
                </View>
            )
        } else {
            var hours = days[key].map((item, index) => {
                var startHour = parseInt(item.start.substring(0,2))
                var startMin = item.start.substring(2,4)
                var endHour = parseInt(item.end.substring(0,2))
                var endMin = item.end.substring(2,4)
                var startDescription = '';
                var endDescription = '';
                if (startHour < 12 && startHour > 0) {
                    startDescription = 'AM'
                }  else if (startHour === 12) {
                    startDescription = 'PM'
                } else if (startHour === 0) {
                    startHour = 12
                    startDescription = 'AM'
                } else {
                    startDescription = 'PM'
                    startHour = startHour - 12
                }
                if (endHour < 12 && endHour > 0) {
                    endDescription = 'AM'
                } else if (endHour === 12) {
                    endDescription = 'PM'
                } else if (endHour === 0) {
                    endHour = 12
                    endDescription = 'AM'
                } else {
                    endDescription = 'PM'
                    endHour = endHour - 12
                }
                return (
                    <Text key={index} style={[styles.text, {fontSize: 12}]}>{startHour}:{startMin}{startDescription} - {endHour}:{endMin}{endDescription}</Text>
                )
            })
            businessHours.push(
                <View style={styles.subContainer}>                    
                    <Text style={[styles.text, {width: '100%', fontWeight: 'bold'}]}>{key}</Text>                    
                    <View style={{}}>{hours}</View>
                </View>
            )
        }
      
    }
    return (
        <View style={styles.container}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>Hours</Text>
            <ScrollView 
                style={{marginTop: 10}}
                contentInset={{
                    bottom: 50
                }}
            >
                {businessHours}             
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
    subContainer: {        
        flexDirection: 'row',
        // width: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderColor: 'white',
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 10
        // margin: 2,        
        // flex: 1,
        // borderWidth: 2
    },  
    text: {
        color: 'white',
        fontFamily: 'System',
        // flex: 1,
    }
})