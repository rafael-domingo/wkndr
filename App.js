import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import Welcome from './screens/Login/Welcome';
import TripView from './screens/Trip/TripView';
import UserHome from './screens/User/UserHome';
import { NavigationContainer} from '@react-navigation/native'
import {  createNativeStackNavigator} from "@react-navigation/native-stack";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Welcome}/>
        <Stack.Screen name='User' component={UserHome}/>
        <Stack.Screen name="Trip" component={TripView}/>
        </Stack.Navigator>
    
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'rgb(24,28,47)',    
  },
  
});
