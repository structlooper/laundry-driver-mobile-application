import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ToastAndroid,
  SafeAreaView,
  StyleSheet,
  ScrollView
} from 'react-native';
import {
  MyButton,
  MyTextInput,
  BaseUrl,
  MyToast,
  MyNumericInput,
  fetchPostFunction
} from '../../Utility/MyLib';
import {logo} from '../../Utility/Images';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";

const submitSignupFrom = async (data , navi,loginLoading) => {
  let dom = {};
  dom.customer_name = data.userName;
  dom.email = data.email;
  dom.phone_number = data.number;
  dom.fcm_token = await AsyncStorage.getItem('fcmToken');

  let result = await fetchPostFunction('delivery_partner',dom);
  loginLoading(false)
  if (result.status === 0) {
    MyToast(result.message);
  } else if (result.status === 1) {
    MyToast(result.message);
    navi.navigate('Otp', {mobile: data.number});
  } else {
    ToastAndroid.show('Server error', ToastAndroid.SHORT);
    console.log(result);
  }
};

const Register = ({navigation}) => {
    const [loginLoading, onLoginLoading] = React.useState(false);
    const [username, onChangeUsername] = React.useState(null);
    const [number, onChangeNumber] = React.useState(null);
    const [email, onChangeEmail] = React.useState(null);
    return (
      <ScrollView>

      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{alignItems: 'center', borderBottomWidth: 0.5, padding: 10}}>
          <Text style={{fontSize: 17}}>Register</Text>
        </View>
        <View style={{padding: 20}}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 30,
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: 100 / 2,
                padding: 20,
                backgroundColor: 'grey',
              }}>
              <FontAwesome5 name={'camera'} size={28} color={'white'} />
            </View>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Text style={{fontSize: 15}}>Add Photo</Text>
            </View>
          </View>

          <View style={{marginTop: 25}}>

            <SafeAreaView style={styles.signupForm}>
              {MyTextInput(
                username,
                onChangeUsername,
                'Enter Full Name',
                styles.input,
                'account',
              )}
              {MyTextInput(
                email,
                onChangeEmail,
                'Email Address',
                styles.input,
                'email',
              )}
              {MyNumericInput(
                number,
                onChangeNumber,
                'Phone Number',
                styles.input,
                'cellphone',
              )}
            </SafeAreaView>
            <View style={styles.buttons}>
              {MyButton(
                () => {
                  onLoginLoading(true)
                  submitSignupFrom({userName:username, email:email, number:number}, navigation,onLoginLoading).then();
                },
                'Register Now',
                '',
                '',
                loginLoading
              )}
            </View>
            <View style={{alignItems: 'center', marginTop: 3}}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{color: '#3c1d73', fontSize: 16}}>
                  Already i have an account
                </Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>
      </View>
</ScrollView>

);
  };

const styles = StyleSheet.create({
  input: {
    marginVertical: 5,
    backgroundColor: '#fff',
  },

  signupForm: {},
  buttons: {
    marginTop: 40,
  },
});

export default Register;
