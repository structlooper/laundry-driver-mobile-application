import React, { useEffect } from "react";
import { View, Text ,StyleSheet,Image,ScrollView,RefreshControl,SafeAreaView} from "react-native";
import {logo} from '../Utility/Images'
import { AppName, fetchGetFunction,ImageUrl } from "../Utility/MyLib";
import Loader from "../Utility/Loader";
import NoData from "../Utility/NoData";

const ServiceCard = (data,index) => {
  return (
    <View style={styles.ServiceCard} key={index}>
      <Image source={{ uri: ImageUrl + (data.image) }} style={styles.ServiceImage}/>
      <Text>{data.name}</Text>
    </View>
  )
}
const AboutUs = () => {
  const [aboutUs,setAboutUs] = React.useState(null)
  const [services,setServices] = React.useState([])

  useEffect(() => {
    getAboutUs().then()
  },[])

  const getAboutUs = async () => {
    fetchGetFunction('app_setting').then(response => {
      setAboutUs(response.result.about_us)
    })
    fetchGetFunction('service').then(response => {
      setServices(response)
    })
  }
  if (aboutUs === null){
    return <Loader />
  }else if(aboutUs === {}){
    return NoData('Data')
  }
  return (
    <SafeAreaView>

      <ScrollView style={styles.mainContainer}>
        <View style={styles.AppDetailsContainer}>
          <Image source={logo} style={styles.AppImage} />
          {/*<Text style={styles.AppName}>{AppName}</Text>*/}
        </View>
        <ScrollView style={styles.AppDescription}>
          <Text style={styles.AppDescriptionText}>
            {aboutUs}
          </Text>
          {/*<Text style={styles.AppDescriptionText}>*/}
          {/*  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.*/}


          {/*</Text>*/}
        </ScrollView>
        <View style={{borderTopColor:'#eee',marginTop:5,borderTopWidth:5,paddingHorizontal:20,paddingVertical:30}}>
          <Text style={styles.ServiceHeading}>
            Our Services
          </Text>
          <View style={styles.ServiceCardContainer}>
            <ScrollView horizontal={true}>
              {services.map((data,index) =>
                ServiceCard(data,index)
              )}



            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  mainContainer:{
    height:'100%',
    marginVertical:5,
    backgroundColor:'#fff'
  },
  AppDetailsContainer:{
    alignItems:'center',
    // justifyContent:'center',
    // marginLeft:60,
    justifyContent:'center',
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
