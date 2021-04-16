import React from 'react';
import {
  TouchableOpacity,
  Button,
  Text,
  View,
  ToastAndroid,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import TopLogo from "../../Utility/TopLogo";
import {MyButton,MyTextInput} from "../../Utility/MyLib";
import { logo } from "../../Utility/Images";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const Register = ({ navigation }) => {
  const [username, onChangeUsername] = React.useState(null);
  const [number, onChangeNumber] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);

  let submitSignupFrom = async () => {
    let dom = {}
    dom.customer_name = username
    dom.email = email
    dom.phone_number = number

  }
  return (
    <View style={{ flex:1, backgroundColor:'#fff',}}>
      <View style={{alignItems:'center',borderBottomWidth:.5,padding:10}}><Text
        style={{fontSize: 17}}
      >
        Register
      </Text></View>
      <View style={{padding:20}}>
      <View  style={{width:'100%',alignItems:'center',justifyContent:'center', marginVertical:30}}>
        <View style={{borderWidth:1,borderColor:'grey',borderRadius:100/2 , padding:20,backgroundColor: 'grey'}}>
          <FontAwesome5 name={'camera'} size={28} color={'white'}  />

        </View>
        <View style={{ alignItems:'center',marginTop:20}}>
          <Text style={{fontSize:15}}>
            Add Photo
          </Text>
        </View>
      </View>
      <View style={{ marginTop:25 }}>
        <SafeAreaView style={styles.signupForm}>
          {MyTextInput(username,onChangeUsername,'Enter Full Name',styles.input,'account') }
          {MyTextInput(email,onChangeEmail,'Email Address',styles.input,'email') }
          {MyTextInput(number,onChangeNumber,'Phone Number',styles.input,'cellphone') }

        </SafeAreaView>
        <View style={styles.buttons}>
          {/*{ MyButton(signupController(navigation),'Register') }*/}
          { MyButton(() => navigation.navigate('Otp') ,'Register Now','',) }
        </View>
        <View style={{ alignItems:'center' ,marginTop:3}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{ color:'#3c1d73' , fontSize:16 }}>
              Already i have an account
            </Text>

          </TouchableOpacity>
        </View>

      </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginVertical:5,
    backgroundColor:'#fff'
  },

  signupForm : {


  },
  buttons:{
  marginTop: 40
  }
});

export default Register;
