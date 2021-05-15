import React from "react";
import { View, Text,Image } from "react-native";

const NoDataFound = () => {
  return (
    <View style={{ alignItems:'center',justifyContent:'center',backgroundColor:'#fff',height:'100%' }}>
      <Image source={require('../Public/loader.gif')} style={{width:'30%' , height:'30%',resizeMode:'contain'}} />
    </View>
  );
};
export default NoDataFound;
