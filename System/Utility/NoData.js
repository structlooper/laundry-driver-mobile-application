import React from "react";
import { View, Text,Image } from "react-native";

const NoDataFound = (label) => {
  return (
    <View style={{ alignItems:'center',justifyContent:'center',backgroundColor:'#fff',height:'100%' }}>
      <Image source={require('../Public/no-data.gif')} style={{width:'50%' , height:'50%',resizeMode:'contain'}} />
      <Text style={{ fontSize:30 ,fontWeight:'bold' }}>
        No {label} found!!
      </Text>
    </View>
  );
};
export default NoDataFound;
