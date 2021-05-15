import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { logo } from "../Utility/Images";
import { AppName, capitalizeFirstLetter, fetchAuthPostFunction } from "../Utility/MyLib";
import Loader from "../Utility/Loader";
import NoData from "../Utility/NoData";
const TermsAndConditions = () => {
  const [policy , setPolicy] = React.useState(null)

  useEffect(() => {
    getPolicy().then()
  },[])
  const getPolicy = async () => {
    fetchAuthPostFunction('privacy_policy',{lang:'en'}).then(response => {
      setPolicy(response.result)
    })
  }
  if (policy === null){
    return <Loader />
  }else if(policy.length === 0){
    return NoData('Data');
  }

  const designCard = (data,i) =>{
    return (
      <View style={styles.childContainer} key={i}>
        <Text style={{color:'gray',fontSize:18,marginVertical:10,borderBottomWidth:.2}}>{capitalizeFirstLetter(data.title)}</Text>
        <View >
          <Text style={styles.AppDescriptionText}>
            {data.description}
          </Text>

        </View>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView>

        <View style={styles.childContainer}>
          <View style={styles.AppDetailsContainer}>
            <Image source={logo} style={styles.AppImage} />
            <Text style={styles.AppName}>{AppName}</Text>
          </View>
        </View>
        {
          policy.map((data,i) => {
            return designCard(data,i)
          })
        }
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
