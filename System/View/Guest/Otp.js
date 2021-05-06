import React from 'react';
import { View, StyleSheet, Text, ToastAndroid } from "react-native";
import {  MyButton, MyOptField,  MyToast,fetchPostFunction } from "../../Utility/MyLib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CheckContext} from "../../Utility/CheckContext";

const submitOtpFrom =  async (number,pin) => {
  let dom = {}
  dom.phone_number = number
  dom.otp = pin

  let result = await fetchPostFunction('delivery_partner/otp',dom)
  if (result.status === 0){
    MyToast(result.message)
  }else if(result.status === 1){
    MyToast(result.message)
    await AsyncStorage.setItem('userDetails',JSON.stringify(result.result))
  }else{
    MyToast('Server error');
    console.log(result);
  }
}



const Otp =   ({ route, navigation }) => {
  const {logIn} = React.useContext(CheckContext)
  const {mobile} = route.params;
  const [pin, onChangePin] = React.useState(null);

  return (
    <View style={{ flex:1, backgroundColor:'#fff' }}>
      <View style={{alignItems:'center',borderBottomWidth:.5,padding:10}}><Text
        style={{fontSize: 17}}
      >
        Enter OTP
      </Text></View>

      <View style={{ padding:50  }}>

        <Text style={{textAlign: 'center' , }}>
          Let us Know One time password (OTP)
          We have sent you OTP on your entered mobile number
        </Text>
        <View style={{}}>
          { MyOptField(pin,onChangePin,'',Styles.otpInput,'',true) }

        </View>
        <View style={Styles.buttons}>
          { MyButton( async ()  => {
              await submitOtpFrom(mobile,pin)
              logIn()
            }
            ,'Submit','',)  }
        </View>
      </View>
    </View>
  )
}
const Styles = StyleSheet.create({
  otpInput : {
    fontSize:18,
    textAlign:'center',
    backgroundColor:'#fff',

  },
  buttons:{
    marginVertical:30
  }
})
export default Otp;
