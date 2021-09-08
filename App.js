import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import Welcome from './screens/Login/Welcome';
import UserHome from './screens/User/UserHome';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="inverted" />
      {/* <Welcome /> */}
      <UserHome />
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(24,28,47)'
  },
  
});
