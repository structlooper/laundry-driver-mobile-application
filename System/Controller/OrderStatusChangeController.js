import React from "react";
import { View, Text } from "react-native";
import { fetchAuthPostFunction } from "../Utility/MyLib";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderStatusChangeController = async (status,order_id) => {
  let res;
  let driverDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
   await fetchAuthPostFunction('delivery_partner/orders/status',{
     driver_id:driverDetails.id,
     order_id:order_id,
     status:status
   }).then(response => {
     res = response;
   })
  return res;
};
export default OrderStatusChangeController;
