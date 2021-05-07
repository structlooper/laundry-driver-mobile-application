import React, { useEffect } from "react";
import { View, Text,StyleSheet,Image,TouchableOpacity,ScrollView} from "react-native";
import { fetchAuthPostFunction, mainColor, MyButton,ImageUrl } from "../../Utility/MyLib";
import Loader from "../../Utility/Loader";
import NoData from "../../Utility/NoData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";



const CompletedOrders = ({navigation}) => {
  const focus = useIsFocused();
  const [orders,setOrders] = React.useState(null);


  useEffect(() => {
    getOrders().then()
  },[focus])
  const getOrders = async () => {
    let driverDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
    fetchAuthPostFunction('delivery_partner/orders/completed',{driver_id:driverDetails.id}).then(response => {
      setOrders(response)
    })
  }

  const OrderCardCompleted = (order,i) => {
    return (
      <TouchableOpacity onPress={()=>{navigation.navigate('HomeScreenStack',{screen:'OrderDetails',params:{orderId:order.id}})}} key={i}>

        <View style={styles.OrderCardContainer}>
          <View style={styles.OrderCardContainerRows}>
            <View style={styles.Rows}>
              <View style={styles.OrderPlaceHolderImageContainer}>
                <Image source={{ uri:ImageUrl+order.label_image }} style={styles.OrderPlaceHolderImage} />
              </View>
            </View>
            <View style={styles.Rows}>
              <Text style={styles.OrderStatusHeader}>
                Completed
              </Text>
              <Text style={styles.OrderTextStyle}>Order: {order.order_id}</Text>
              <View style={styles.DateAndTimeContainer}>
                <Text style={styles.LabelText}>{(order.status < 4)? "Pickup" : "Delivery"} time</Text>
                <Text>  {moment((order.status < 4)? order.expected_pickup_date : order.expected_delivery_date).format('MMM Do YYYY,')}</Text>
                <Text>  {(order.status < 4)? order.pickup_time : order.drop_time}</Text>
              </View>
            </View>
            <View style={[styles.Rows,{marginLeft:20,marginTop:5}]}>
              <View style={styles.OrderStatusButton} >
                <Text style={styles.OrderStatusButtonText}>
                  Delivered
                </Text>
              </View>
              <View style={[styles.DateAndTimeContainer,{marginTop:22,}]}>
                <Text style={styles.LabelText}>Total amount</Text>
                <Text>₹ {order.total}</Text>
                <Text style={styles.LabelText}>Online</Text>
              </View>
            </View>
          </View>
          <View style={styles.AddressDetailsContainer}>
            <Text style={styles.AddressDetailsLabel}>Address</Text>
            <Text style={{ overflow:'hidden',height:21, width:270, }}>{order.door_no} ...</Text>
          </View>

        </View>
      </TouchableOpacity>


    )
  }
  if (orders === null){
    return <Loader/>
  }else if(orders.length === 0){
    return NoData('Orders')
  }
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        {orders.map((data,i) =>
          OrderCardCompleted(data,i)
        )}

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
    // borderWidth:2,
    // borderRadius: 500/2,
    // padding:5,
    // borderColor:'grey'
  },
  OrderPlaceHolderImage:{
    width: 70,
    height: 70,
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
