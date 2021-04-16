import React from 'react';
import {View , StyleSheet,Text} from "react-native";
import TopLogo from "../../Utility/TopLogo";
import { MyButton, MyNumericInput, MyTextInput } from "../../Utility/MyLib";


const Otp =   ({ navigation }) => {

  const [pin, onChangePin] = React.useState(null);


  return (
    <View style={{ flex:1, backgroundColor:'#fff' }}>
      <View style={{alignItems:'center',borderBottomWidth:.5,padding:10}}><Text
      style={{fontSize: 17}}
      >
        Enter OTP
      </Text></View>
      {/*<TopLogo />*/}

      <View style={{ padding:50  }}>

        <Text style={{textAlign: 'center' , }}>
          Let us Know One time password (OTP)
          We have sent you OTP on your entered mobile number
        </Text>
        <View style={{}}>
          { MyNumericInput(pin,onChangePin,'',Styles.otpInput) }

        </View>
        <View style={Styles.buttons}>
          { MyButton( () => navigation.navigate('AuthNavigation')
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
