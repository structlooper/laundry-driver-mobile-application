import React from "react";
import { View, Text,Image } from "react-native";

const NoDataFound = () => {
  return (
    <View style={{ alignItems:'center',justifyContent:'center',backgroundColor:'#fff' }}>
      <Image source={require('../Public/Images/noData.png')} />
      <Text style={{ fontSize:20 ,fontWeight:'bold' }}>
        No product found!!
      </Text>
    </View>
  );
};
export default NoDataFound;
