import React from "react";
import { View, Text,StyleSheet,Image,TouchableOpacity,ScrollView} from "react-native";
import { mainColor, MyButton } from "../../Utility/MyLib";


const OrderCardCompleted = (navi) => {
  return (
    <TouchableOpacity onPress={()=>{navi.navigate('HomeScreenStack',{screen:'OrderDetails'})}}>

      <View style={styles.OrderCardContainer}>
        <View style={styles.OrderCardContainerRows}>
          <View style={styles.Rows}>
            <View style={styles.OrderPlaceHolderImageContainer}>
              <Image source={require('../../Public/Images/machine.jpg')} style={styles.OrderPlaceHolderImage} />
            </View>
          </View>
          <View style={styles.Rows}>
            <Text style={styles.OrderStatusHeader}>
             Completed
            </Text>
            <Text style={styles.OrderTextStyle}>Order No:22145052</Text>
            <View style={styles.DateAndTimeContainer}>
              <Text style={styles.LabelText}>Delivery time</Text>
              <Text>21 June 2020</Text>
              <Text>01:00 pm</Text>
            </View>
          </View>
          <View style={[styles.Rows,{marginLeft:20,marginTop:5}]}>
            <TouchableOpacity style={styles.OrderStatusButton} onPress={() => {console.log('inner')}}>
              <Text style={styles.OrderStatusButtonText}>
                Delivered
              </Text>
            </TouchableOpacity>
            <View style={[styles.DateAndTimeContainer,{marginTop:22,}]}>
              <Text style={styles.LabelText}>Delivery time</Text>
              <Text>$ 78.00</Text>
              <Text>Cash on Delivery</Text>
            </View>
          </View>
        </View>
        <View style={styles.AddressDetailsContainer}>
          <Text style={styles.AddressDetailsLabel}>Address</Text>
          <Text style={{ overflow:'hidden',height:21, width:270, }}>B11 Old Fort Street, Workshop Tower ...</Text>
        </View>

      </View>
    </TouchableOpacity>


  )
}

const CompletedOrders = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        {OrderCardCompleted(navigation)}
        {OrderCardCompleted(navigation)}
        {OrderCardCompleted(navigation)}
        {OrderCardCompleted(navigation)}
        {OrderCardCompleted(navigation)}
        {OrderCardCompleted(navigation)}
        {OrderCardCompleted(navigation)}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'#eee',
    paddingBottom:5,
  },
  OrderCardContainer:{
    marginTop:5,
    width:'100%',
    backgroundColor: '#fff',
    // height:'20%'
  },
  OrderCardContainerRows:{
    flexDirection:'row',
    padding:10
  },
  Rows:{
    marginHorizontal:5,
  },
  OrderPlaceHolderImageContainer:{
    borderWidth:2,
    borderRadius: 500/2,
    padding:5,
    borderColor:'grey'
  },
  OrderPlaceHolderImage:{
    width: 50,
    height: 50,
    resizeMode:'contain',
    borderRadius:500/2,

  },
  OrderStatusHeader:{
    fontSize:18,
    color:mainColor
  },
  OrderTextStyle:{
    marginTop:2,
    fontSize: 14,
  },
  DateAndTimeContainer:{
    marginTop:10,
  },
  LabelText:{
    fontSize:12,
    color:'grey'
  },
  OrderStatusButton:{
    borderWidth: .5,
    backgroundColor:'#eee',
    padding:5,
    paddingHorizontal:15,
    borderRadius:10/2
  },
  OrderStatusButtonText:{
    color:'black'
  },
  AddressDetailsContainer:{
    marginLeft:88,
    overflow:'hidden',

  },
  AddressDetailsLabel:{
    fontSize:12,
    color:'grey',
  }
})
export default CompletedOrders;
