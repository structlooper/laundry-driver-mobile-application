import React from 'react';
import {Image, View,Text} from "react-native";
import {logo} from "./Images";

const TopLogo = () => {
  return (
    <View  style={{flex:.5 ,width:'100%',alignItems:'center',justifyContent:'center'}}>
      <Image source={logo}
             style={{width:'50%', height: '70%' }} />
             <View style={{ alignItems:'center'}}>
               <Text style={{fontSize:20}}>
                 Sign in Now
               </Text>
             </View>
    </View>
  );
}
export default TopLogo;
