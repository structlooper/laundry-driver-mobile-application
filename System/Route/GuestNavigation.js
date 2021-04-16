import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import Register from "../View/Guest/Register";
import Login from "../View/Guest/Login";
import Otp from "../View/Guest/Otp";
import AuthNavigation from '../Route/AuthNavigation'
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
    </Stack.Navigator>
  );
}

export default function GuestNavigation() {
  return (
    <MyStack />
  );
}
