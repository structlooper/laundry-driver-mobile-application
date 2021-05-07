import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Splash from "./System/Utility/Splash";
import CheckStack from "./CheckStack";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {MyToast} from "./System/Utility/MyLib";
import Firebase  from "@react-native-firebase/app";
export default class App extends Component
{
  constructor(){
    super();
    this.state={
      isVisible : true,
      navigationVar : false,
    }
  }
  Hide_Splash_Screen=()=>{
    this.setState({
      isVisible : false
    });
  }
  componentDidMount = async () =>{
    const that = this;
    // Firebase.initializeApp(this)
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async function  (token) {
        await AsyncStorage.setItem('fcmToken',(token.token).toString())
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        if (notification.foreground) {
          PushNotification.localNotification({
            title:notification.title,
            message:notification.message
          });
        }
        MyToast(notification.title)
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
        MyToast(notification.title)
        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
    setTimeout(function(){
      that.Hide_Splash_Screen();
    }, 2000);
  }
  render()
  {
    if (this.state.isVisible === true){
      return (
        <View style={ styles.MainContainer }>
          <Splash/>
        </View>
      )
    }else{
      return (
        <CheckStack />
      )
    }
  }
}
const styles = StyleSheet.create({
  MainContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },

})
