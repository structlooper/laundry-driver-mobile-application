import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Loader from "../../Utility/Loader";
import NoData from "../../Utility/NoData";
import { fetchAuthPostFunction, ImageUrl } from "../../Utility/MyLib";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Barcodes = () => {
  const [barcodes,setBarcodes] = React.useState(null);
  React.useEffect(() => {
    getBarcodes().then()
  },[]);
  const getBarcodes = async () =>{
    let driverDetails = JSON.parse(await AsyncStorage.getItem('userDetails'));
    fetchAuthPostFunction('delivery_partner/bar-codes',{driver_id:driverDetails.id}).then(response => {
      setBarcodes(response)
    })
  }
  const barCodeCard = (barcode,i) => {
    return (
      <View style={{ justifyContent:'center',alignItems:'center',borderWidth:1,borderRadius:20/2,margin:'2%' }} key={i}>
        <Text style={{ fontSize:widthPercentageToDP(6),color:'grey' }}>{barcode.title}</Text>
        <Image source={{ uri:ImageUrl+barcode.barcode_image }}
               style={{ marginTop:heightPercentageToDP(1),width:widthPercentageToDP(70),height:heightPercentageToDP(40),resizeMode:'contain' }}
        />
        <Text style={{
          textAlign:'center',
          width:widthPercentageToDP(80)
        }}>
          {barcode.description}
           </Text>
      </View>
    )
  }
  if (!barcodes){
    return Loader()
  }else if(barcodes.length === 0){
    return NoData('Barcodes');
  }
  return (
    <View style={{ flex:1,backgroundColor:'#fff',marginTop:heightPercentageToDP(.5) }}>
      <ScrollView>
        {barcodes.map((data,i) =>
          barCodeCard(data,i)
        )}
      </ScrollView>
    </View>
  );
};

export default Barcodes;
