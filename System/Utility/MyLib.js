import React from "react";
import { TextInput,Button } from 'react-native-paper';
import {
  View,  Text, ToastAndroid, Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const mainColor = '#5414b3';
export const AppName = 'KRYCHE';
export const Url = 'http://covidvaccination.co.in/';
//local//server//
// export const Url ='http://192.168.43.39:8000/'
export const ImageUrl = Url+'uploads/';
export const BaseUrl = Url+'api/';
export const HERE_API_KEY = 'AIzaSyAhJW0BL0uuVzXfhkhiQb3ZXF8f4pQ0vYQ';
export const razorpay_key = 'rzp_test_CdseL953bSWnYB'
export const UserImagePlaceHolder = require('../Public/Images/user_placeholder.jpg');
export const MyTextInput = (name,onChangeFunction,placeHolder,style,icon) => {
  return (
    <View>

    <TextInput
      left={ icon ? <TextInput.Icon name={icon} size={20} color={mainColor}  /> : ''
      }
        name='IconSource'
        style={style}
        onChangeText={onChangeFunction}
        value={name}
        placeholder={placeHolder}
      />
    </View>

  )
}
export const MyNumericInput = (name,onChangeFunction,placeHolder,style,icon) => {
  return (
    <View>

    <TextInput
      left={ icon ? <TextInput.Icon name={icon} size={20} color={mainColor}  /> : ''
      }
        name='IconSource'
        style={style}
        onChangeText={onChangeFunction}
        value={name}
        placeholder={placeHolder}
      maxLength={10}
      keyboardType='numeric'
      />
    </View>

  )
}
export const MyButton = (onPress,TextOnIt,style,icon,loading) => {
  return (
    <Button
      mode="contained"
      style={style}
      onPress={onPress}
      loading={loading?true:false}
      uppercase={false}
      contentStyle={{ height: hp('6') }}
      icon={icon}
    >
      {TextOnIt}
    </Button>
  )
}
export const MyOutlineButton = (onPress,TextOnIt,style,icon,loading) => {
  return (
    <Button
      mode="Outlined"
      style={style}
      onPress={onPress}
      loading={loading?true:false}
      uppercase={false}
      contentStyle={{ height: hp('6') }}
      icon={icon}
    >
      <Text>
        {TextOnIt}

      </Text>
    </Button>
  )
}

export const MyOptField = (name,onChangeFunction,placeHolder,style,icon,autofocus) => {
  return (
    <View>

      <TextInput
        left={ icon ? <TextInput.Icon name={icon} size={20} color={mainColor}  /> : ''
        }
        name='IconSource'
        style={style}
        onChangeText={onChangeFunction}
        value={name}
        placeholder={placeHolder}
        keyboardType='numeric'
        maxLength={6}
        autoFocus={autofocus ? autofocus :false}
      />
    </View>
  )
}
export const MyToast = (message) => {
  return ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG,ToastAndroid.BOTTOM,0,150);
}
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const fetchPostFunction = async (route,dom) => {
  let res;
  await fetch(BaseUrl + route, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dom),
  })
    .then(response => response.json())
    .then(json => {
      res = json;
    })
    .catch(error => {
      ToastAndroid.show('Server connection error', ToastAndroid.SHORT);
      console.error(error);
      res = error;
    });
  return res;
}

export const fetchAuthPostFunction = async (route,dom) => {
  let res;
  let token = await AsyncStorage.getItem('token')
  await fetch(BaseUrl + route, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+token
    },
    body: JSON.stringify(dom),
  })
    .then(response => response.json())
    .then(json => {
      res = json;
    })
    .catch(error => {
      ToastAndroid.show('Server connection error', ToastAndroid.SHORT);
      console.error(error);
      res = error;
    });
  return res;
}
export const fetchImagePostFunction = async (route,dom,profile_image) => {
  const createFormData = (photo, body) => {
    const data = new FormData();

    data.append('profile_picture', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    return data;
  };
  let res;
  let token = await AsyncStorage.getItem('token')
  await fetch(BaseUrl + route, {
    method: 'post',
    headers: {
      'Authorization':'Bearer '+token
    },
    body: createFormData(profile_image,dom),
  })
    .then(response => response.json())
    .then(json => {
      res = json;
    })
    .catch(error => {
      ToastAndroid.show('Server connection error', ToastAndroid.SHORT);
      console.error(error);
      res = error;
    });
  return res;
}

export const fetchGetFunction = async (route) => {
  let res;
  let token = await AsyncStorage.getItem('token')

  await fetch(BaseUrl + route, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+token
    },
  })
    .then(response => response.json())
    .then(json => {
      res = json;
    })
    .catch(error => {
      ToastAndroid.show('Server connection error', ToastAndroid.SHORT);
      console.error(error);
      res = error;
    });
  return res;
}
export const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



