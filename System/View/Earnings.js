import React from "react";
import { View, Text,StyleSheet,ScrollView } from "react-native";
import {mainColor} from "../Utility/MyLib";

const EarningCard = () => {
  return (
    <View style={styles.childContainer}>
      <View style={styles.EarningDetailContainer}>
        <View style={[styles.EarningDetailContainerRow,{flex:2.5}]}>
          <Text>Order No:22145052</Text>
          <Text style={styles.serviceName}>Laundry Delivered</Text>
        </View>
        <View style={[styles.EarningDetailContainerRow,{flex:1}]}>
          <Text>$ 35.00</Text>
          <Text style={styles.serviceName}>Total</Text>
        </View>
        <View style={[styles.EarningDetailContainerRow,{flex:.7}]}>
          <Text style={{color:mainColor}}>$ 08.00</Text>
          <Text style={styles.serviceName}>Earned</Text>
        </View>

      </View>
    </View>
  )
}

const Earning = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.childOneContainer}>
        <Text style={styles.headingLabel}>
          Earnings
        </Text>
        <Text style={styles.MainEarningLabel}>
          $ 168.50
        </Text>
      </View>
      <ScrollView>

        {EarningCard()}
        {EarningCard()}
        {EarningCard()}
        {EarningCard()}
        {EarningCard()}
        {EarningCard()}
        {EarningCard()}
        {EarningCard()}
        {EarningCard()}


      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'#eee',
  },
  childOneContainer:{
    marginTop:5,
    paddingHorizontal:10,
    paddingVertical:5,
    backgroundColor: '#fff',
    alignItems:'center'
  },
  childContainer:{
    marginTop:5,
    paddingHorizontal:20,
    paddingVertical: 10,
    backgroundColor: '#fff'

  },
  MainEarningLabel:{
    marginVertical:15,
    fontSize:30,
    fontWeight:'bold'
  },
  headingLabel:{
    fontSize: 15,
  },
  EarningDetailContainer:{
    flexDirection:'row',

  },
  EarningDetailContainerRow:{
  },
  serviceName:{
    fontSize:12,
    color:'grey'
  }
})
export default Earning;
