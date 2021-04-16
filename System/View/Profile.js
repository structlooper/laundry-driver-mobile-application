import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image } from "react-native";
import {mainColor, MyButton, MyOutlineButton, MyTextInput} from "../Utility/MyLib";

const Profile =   ({ navigation }) => {

  const [username, onChangeUsername] = React.useState('Ashwin');
  const [number, onChangeNumber] = React.useState('9898767654');
  const [email, onChangeEmail] = React.useState('this@gmail');
  const [address, onChangeAddress] = React.useState('street 4 Power house near XYZ Area');


  return (
    <View style={{ flex:1 }}>
      <View style={styles.ProfileDetailsContainer}>
        <View style={styles.ProfileImageContainer}>
          <Image source={require('../Public/Images/machine.jpg')} style={styles.ProfileImage}/>
        </View>
        <View style={styles.ProfileNameContainer}>
          <Text style={styles.ProfileName}>Driver Kumar</Text>
          <TouchableOpacity>
            <Text style={styles.Btn}>Delhi ,India</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex:.6 , backgroundColor:'#eee'}}>
        <SafeAreaView style={styles.signupForm}>
          {MyTextInput(username,onChangeUsername,'Full Name',styles.input) }
          {MyTextInput(number,onChangeNumber,'Phone Number',styles.input) }
          {MyTextInput(email,onChangeEmail,'Email',styles.input) }
          {MyTextInput(address,onChangeAddress,'Address',styles.input) }
          {/*{MyOutlineButton(() => {console.log('upload')},'Select Image',styles.uploadImage,'camera')}*/}
        </SafeAreaView>
        <View style={styles.buttons}>
          {/*{ MyButton(signupController(navigation),'Register') }*/}
          { MyButton(() => navigation.navigate('Home') ,'Update','','account') }
        </View>

      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    height: 30,
    padding:8,
    margin: 5,
    backgroundColor:'#fff'
  },

  signupForm : {
    padding:6,
    marginVertical:40,
    margin:15,

  },
  buttons:{
    padding:6,
    marginHorizontal:20
  },
  uploadImage:{
    borderColor:mainColor,
    borderWidth:1,
    margin:5,
    backgroundColor: '#fff'
  },
  ProfileDetailsContainer:{
    flexDirection:'row',
    backgroundColor:'#fff',
    marginVertical:5,

  },
  ProfileImageContainer:{
    padding:25,
  },
  ProfileImage:{
    width:100,
    height:100,
    borderRadius:150/2,
    borderWidth:.2,
    borderColor:'grey'
  },
  ProfileNameContainer:{
    justifyContent:'center'
  },
  ProfileName:{
    fontSize:18,
  },
  Btn:{
    color:mainColor
  },
})
export default Profile;
