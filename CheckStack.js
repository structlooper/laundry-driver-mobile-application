import React, { Component, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import GuestNavigation from "./System/Route/GuestNavigation";
import {NavigationContainer} from "@react-navigation/native";
import AuthNavigation from "./System/Route/AuthNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {  mainColor } from "./System/Utility/MyLib";
import {CheckContext} from "./System/Utility/CheckContext";

const CheckStack =  () =>
{

  const [userLocalDetails,setUserLocalDetails] = React.useState(null)
  const [isLoading,setIsLoading] = React.useState(true)

  const authContext = React.useMemo(() => ({
    logIn:async  () => {
      setUserLocalDetails(JSON.parse(await AsyncStorage.getItem('userDetails')))
      setIsLoading(false)
    },
    logOut: () => {
      setUserLocalDetails(null)
      setIsLoading(false)
    },
    register:async () => {
      setUserLocalDetails(JSON.parse(await AsyncStorage.getItem('userDetails')))
      setIsLoading(false)
    }
  }));

  const setRetrieveUserToken = async () => {
    let UserDetails= JSON.parse(await AsyncStorage.getItem('userDetails'));
    if (UserDetails !== null) {
      setUserLocalDetails(UserDetails)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setRetrieveUserToken().then()
  },[])

  if(isLoading){
    return (
      <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator size="large" color={mainColor} />
      </View>
    )
  }

  return(
    <CheckContext.Provider value={authContext}>
      <NavigationContainer>
        {(userLocalDetails !== null ) ? AuthNavigation():GuestNavigation() }
      </NavigationContainer>
    </CheckContext.Provider>
  )
}

export default CheckStack;
