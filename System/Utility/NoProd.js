import React from "react";
import { Image } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const NoProd = () => {
  return (
    <Image source={require('../Public/no_prod.gif')} style={{width:wp('90'), height:hp('40'),resizeMode:'contain'}} />
  );
};
export default NoProd;
