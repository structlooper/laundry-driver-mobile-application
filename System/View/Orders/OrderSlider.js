import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Orders from "./Orders";
import CompletedOrders from "./CompletedOrders";
import { mainColor } from "../../Utility/MyLib";


const Tab = createMaterialTopTabNavigator();

export default function OrderSlider() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: mainColor,
          padding:4,
        },
        indicatorStyle: { backgroundColor: '#fff'},
      }}
    >
      <Tab.Screen name="Assigned" component={Orders}  />
      <Tab.Screen name="Completed" component={CompletedOrders} />
    </Tab.Navigator>
  );
}
