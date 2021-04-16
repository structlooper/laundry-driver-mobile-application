import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import TopLogo from "../../Utility/TopLogo";
import { MyTextInput, MyButton, MyOutlineButton ,mainColor } from "../../Utility/MyLib";


const Login = ({ navigation }) => {
  const [number, onChangeNumber] = React.useState(null);

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
          {MyTextInput(number,onChangeNumber,'Phone Number',styles.input,'email') }

        </SafeAreaView>
        <View style={styles.buttons}>
          { MyButton(() => navigation.navigate('Otp'),'Login',styles.loginBtn,) }
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
