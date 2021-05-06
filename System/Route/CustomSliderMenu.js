import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import {logo} from '../Utility/Images'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { mainColor,ImageUrl,UserImagePlaceHolder } from "../Utility/MyLib";
import { CheckContext } from "../Utility/CheckContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserDetails = async () => {
  return await AsyncStorage.getItem('userDetails')
}
const CustomSidebarMenu = (props) => {
  const [userDetails,SetUserDetails] = React.useState("{}")
  React.useEffect(()=>{
    getUserDetails().then(details => {
      SetUserDetails(details);
    })
  },[])
  let dataConverted = JSON.parse(userDetails)
  const {logOut} = React.useContext(CheckContext)
  let dp = (dataConverted.profile_picture !== null) ? {uri:ImageUrl+dataConverted.profile_picture} : UserImagePlaceHolder

  return (
    <SafeAreaView style={{flex: 1, }}>
      {/*Top Large Image */}
      <View style={{ backgroundColor:mainColor,paddingVertical:15,paddingHorizontal:10,flexDirection:'row'}}>
        <Image
          source={dp}
          style={styles.sideMenuProfileIcon}
        />
        <View style={{ justifyContent:'center',marginHorizontal:5}}>
          <Text style={{color:'#fff'}}>
            {dataConverted.delivery_boy_name}
          </Text>
          <Text  style={{color:'#fff',width:150,fontSize:12}}>
            {dataConverted.phone_number}
          </Text>
        </View>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

      </DrawerContentScrollView>

      <View style={{
        flexDirection:'row',
        borderTopColor: 'grey',
        borderTopWidth: .3
      }}>
        <TouchableOpacity
          {...props}
          onPress={ async () => {
            await AsyncStorage.removeItem('userDetails');
            const logout = () => {logOut()}
            logout()
          }}
        >

          <Text
            style={{
              fontSize: 15,
              // textAlign: 'center',
              color: 'black',
              margin:20,
            }}>
            <FontAwesome5 name={'sign-out-alt'} size={18} color={'grey'}   />  Logout
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 80,
    height: 80,
    borderRadius: 500 / 2,
    alignSelf: 'center',

  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
