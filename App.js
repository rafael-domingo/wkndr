import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import Welcome from './screens/Login/Welcome';
import TripView from './screens/Trip/TripView';
import UserHome from './screens/User/UserHome';
import { NavigationContainer} from '@react-navigation/native'
import {  createNativeStackNavigator} from "@react-navigation/native-stack";
import BuildTrip from './screens/Build/BuildTrip';
import TripList from './screens/TripSettings/TripList';
import TripConfigurator from './screens/TripSettings/TripConfigurator';
import { Provider, useSelector } from 'react-redux'
import store from './redux/store';
import { updateFirestore } from './util/Firestore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Account from './screens/Account/Account';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>


    <View style={styles.container}>
    <GestureHandlerRootView style={{flex : 1}}>
  
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen name="Home" component={Welcome} />
          <Stack.Screen name='User' component={UserHome} options={{animation: 'fade'}}/>
          <Stack.Screen name="Trip" component={TripView} options={{presentation: 'fade'}}/>
          <Stack.Screen name="Account" component={Account} options={{presentation: 'fade'}}/>
          <Stack.Screen name="Build" component={BuildTrip} options={{presentation: 'fullScreenModal'}}/>
          <Stack.Screen name="TripList" component={TripList} options={{presentation: 'transparentModal'}}/>
          <Stack.Screen name="TripConfigurator" component={TripConfigurator} options={{presentation: 'transparentModal'}}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>

    </View>
    </Provider>
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
