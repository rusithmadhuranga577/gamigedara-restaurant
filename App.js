import React, {useEffect, useState} from 'react';
import {
  LogBox,
  SafeAreaView,
  PermissionsAndroid
} from 'react-native';
import Router from './src/router/Router';
import FlashMessage from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";
import Geolocation from 'react-native-geolocation-service';

const App= () => {

  useEffect(()=>{
    const unsubscribe = NetInfo.addEventListener(state => {
      if(state.isConnected == false){
        alert('No network connection')
      }
    });
    if(Platform.OS === "ios"){
      Geolocation.requestAuthorization('whenInUse')
    }else{
      requestAndroidPermission();
    }
    unsubscribe();
    LogBox.ignoreAllLogs();
  })

  const requestAndroidPermission = async () => {
    console.log("----------------------------------------");
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Gamigedara Restaurant',
          'message': 'Gamigedara Restaurant need access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <Router/>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}

export default App;