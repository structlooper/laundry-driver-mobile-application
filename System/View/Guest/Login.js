import React from 'react';
import { SafeAreaView, StyleSheet, Text,   View } from "react-native";
import TopLogo from "../../Utility/TopLogo";
import { MyNumericInput, MyButton, MyOutlineButton, mainColor, fetchPostFunction, MyToast } from "../../Utility/MyLib";
import AsyncStorage from "@react-native-async-storage/async-storage";

const submitLoginFrom = async (number,navi,onLoginLoading) => {
  let dom = {};
  dom.phone_number = number;
  dom.fcm_token = await AsyncStorage.getItem('fcmToken');
  console.log('login_data',dom)
  let result = await fetchPostFunction('delivery_partner/login',dom);
  onLoginLoading(false)
  if (result.status == 0) {
    MyToast(result.message);
  } else if (result.status == 1) {
    MyToast(result.message);
    navi.navigate('Otp', {mobile: number});
  } else {
    MyToast('Server error please contact admin');
    console.log(result);
  }
}

const Login = ({ navigation }) => {
  const [number, onChangeNumber] = React.useState(null);
  const [loginLoading, onLoginLoading] = React.useState(false);

  return (

    <View style={{ flex:1 , backgroundColor:'#fff'}}>
      <View style={{alignItems:'center',borderBottomWidth:.5,padding:10}}><Text
        style={{fontSize: 17}}
      >
        Login
      </Text></View>
      <TopLogo />
      <View style={{ flex:.6 }}>
        <SafeAreaView style={styles.signupForm}>
          {MyNumericInput(number,onChangeNumber,'Phone Number',styles.input,'cellphone',true) }

        </SafeAreaView>
        <View style={styles.buttons}>
          { MyButton( ()=>{
            onLoginLoading(true)
            submitLoginFrom(number, navigation,onLoginLoading)
          },'Login',styles.loginBtn,'',loginLoading) }
        </View>
        <View style={{ alignItems:'center' ,marginVertical: 10}}>

          <Text style={{ color:'#000' , fontSize:16 }}>
            Oh! Not Registered yet?
          </Text>
        </View>
        <View style={styles.buttons}>
          { MyOutlineButton(() => navigation.navigate('Register'),'Register Now',styles.loginBtnOut,) }
        </View>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    margin: 5,
    backgroundColor:'#fff'
  },

  signupForm : {
    padding:6,
    marginVertical:20,
    margin:15,

  },
  buttons:{
    padding:6,
    marginHorizontal:20,

  },
  loginBtn:{
    // paddingVertical:5
  },
  loginBtnOut:{
    // paddingVertical:5,
    borderWidth:1.5,
    borderColor:mainColor
  }
});

export default Login;
