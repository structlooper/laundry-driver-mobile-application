import React from "react";
import { View, Text,Image } from "react-native";

const NoDataFound = () => {
  return (
    <View style={{ alignItems:'center',justifyContent:'center',backgroundColor:'#fff',height:'100%' }}>
      <Image source={require('../Public/Images/noData.png')} />
      <Text style={{ fontSize:30 ,fontWeight:'bold' }}>
        No data found!!
      </Text>
    </View>
  );
};
export default NoDataFound;
