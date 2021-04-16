import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { logo } from "../Utility/Images";
import { AppName } from "../Utility/MyLib";

const TermsAndConditions = () => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView>

      <View style={styles.childContainer}>
        <View style={styles.AppDetailsContainer}>
          <Image source={logo} style={styles.AppImage} />
          <Text style={styles.AppName}>{AppName}</Text>
        </View>
        </View>

        <View style={styles.childContainer}>
            <Text style={{color:'gray',fontSize:18,marginVertical:10,borderBottomWidth:.2}}>Terms of use</Text>
            <View >
              <Text style={styles.AppDescriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

              </Text>
              <Text style={styles.AppDescriptionText}>
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.

              </Text>
            </View>
         </View>
        <View style={styles.childContainer}>
            <Text style={{color:'gray',fontSize:18,marginVertical:10,borderBottomWidth:.2}}>Privacy Policy</Text>
            <View >
              <Text style={styles.AppDescriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

              </Text>

            </View>
         </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor:'#eee',
    height:'100%',
    width:'100%'
  },
  childContainer:{
    marginTop:5,
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor: '#fff'
  },
  AppDetailsContainer:{
    alignItems:'center',
    // justifyContent:'center',
    marginLeft:60,
    flexDirection:'row',

  },
  AppImage:{
    width:150,
    height:150,
    resizeMode:'contain'
  },
  AppName:{
    fontSize:20,
  },
  AppDescription:{
    height:300
  },
  AppDescriptionText:{
    fontSize: 16,
    lineHeight: 25,
    textAlign:'justify'
  },

})
export default TermsAndConditions;
