import React from "react";
import { View, Text,Image } from "react-native";

const NoDataFound = () => {
  return (
    <View style={{ alignItems:'center',justifyContent:'center',backgroundColor:'#fff',height:'100%' }}>
      <Image source={require('../Public/loader.gif')} style={{width:'50%' , height:'50%',resizeMode:'contain'}} />
    </View>
  );
};
export default NoDataFound;
