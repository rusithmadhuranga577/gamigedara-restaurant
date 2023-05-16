/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";

var SharedPreferences = require('react-native-shared-preferences');

console.log(appName)

    PushNotification.configure({
        onRegister: function (token) {
            console.log("TOKEN:", token);
            SharedPreferences.getItem('notifications', notifications => {
                const notificationdata = JSON.stringify(notifications);
            });
        },
    
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
            const notif = JSON.stringify(notification)  
            SharedPreferences.setItem('notifications', notif+'');
        },
    
        onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("Notif:", notification);
        },
    
        onRegistrationError: function(err) {
        console.error(err.message, err);
        },
            permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
    
        popInitialNotification: true,
        requestPermissions: true,
    });

AppRegistry.registerComponent(appName, () => App);
