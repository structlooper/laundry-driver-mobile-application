import React from "react";
import { View, Text ,StyleSheet,Image,ScrollView} from "react-native";
import {logo} from '../Utility/Images'
import {AppName} from '../Utility/MyLib'

const ServiceCard = (data,index) => {
  return (
    <View style={styles.ServiceCard} key={index}>
      <Image source={data.image} style={styles.ServiceImage}/>
      <Text>Wash & Fold</Text>
    </View>
  )
}
const AboutUs = () => {
  let dates = [
    {
      image: require("../Public/Images/services/washAndFold1.jpg"),
      name: 'Wash & Fold',
      description: 'Min 12 Hours'
    },
    {
      image: require("../Public/Images/services/HomeCleaning.jpg"),
      name: 'Wash only',
      description: 'Min 2 Hours'
    }, {
      image: require("../Public/Images/services/shirt_iron_5.jpg"),
      name: 'Wash & Iron',
      description: 'Min 2 Hours'
    },
    {
      image: require("../Public/Images/services/dryCleaning.jpg"),
      name: 'Dry Cleaning',
      description: 'Min 12 Hours'
    },
  ];
  return (
    <View style={styles.mainContainer}>
      <View style={styles.AppDetailsContainer}>
        <Image source={logo} style={styles.AppImage} />
        <Text style={styles.AppName}>{AppName}</Text>
      </View>
      <ScrollView style={styles.AppDescription}>
        <Text style={styles.AppDescriptionText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        </Text>
        <Text style={styles.AppDescriptionText}>
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.


        </Text>
      </ScrollView>
      <View style={{borderTopColor:'#eee',marginTop:5,borderTopWidth:5,paddingHorizontal:20,paddingVertical:30}}>
        <Text style={styles.ServiceHeading}>
          Our Services
        </Text>
        <View style={styles.ServiceCardContainer}>
          <ScrollView horizontal={true}>
            {dates.map((data,index) =>
              ServiceCard(data,index)
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    marginVertical:5,
    backgroundColor:'#fff'
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
    // paddingVertical:10,
    paddingHorizontal:20,
    height:300
  },
  AppDescriptionText:{
    fontSize: 16,
    lineHeight: 25,
    textAlign:'justify'
  },
  ServiceHeading:{
    fontSize:18
  },
  ServiceCardContainer:{
    flexDirection: 'row',
    marginTop:5,
  },
  ServiceImage:{
    width:110,
    height:100,
    resizeMode: 'contain'
  },
  ServiceCard:{
    // borderWidth:.2,
    padding:5,
    // borderRadius:10/2,
    alignItems: 'center'
  }
})
export default AboutUs;
