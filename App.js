import React, { Component } from 'react';
import { Platform, StyleSheet, View,Text } from 'react-native';
import Splash from "./System/Utility/Splash";
import GuestNavigation from "./System/Route/GuestNavigation";
import {NavigationContainer} from "@react-navigation/native";
import AuthNavigation from "./System/Route/AuthNavigation";
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
    setTimeout(function(){
      that.Hide_Splash_Screen();
    }, 2000);
  }
  render()
  {
    if (this.state.isVisible === true){
      return (
        <View style={ styles.MainContainer }>
          {Splash}
        </View>
      )
    }else{
      return (
        <NavigationContainer>
          <GuestNavigation />
          {/*<AuthNavigation/>*/}
        </NavigationContainer>

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
