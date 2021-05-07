import React, { useEffect } from "react";
import { View, Text,StyleSheet,Image,TouchableOpacity,ScrollView} from "react-native";
import { fetchAuthPostFunction, mainColor, MyButton, ImageUrl, MyToast } from "../../Utility/MyLib";
import Loader from "../../Utility/Loader";
import NoData from "../../Utility/NoData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import OrderStatusChangeController from "../../Controller/OrderStatusChangeController";


const Orders = ({navigation}) => {
  const focus = useIsFocused();
  const [orders,setOrders] = React.useState(null);


  useEffect(() => {
    getOrders().then()
  },[focus])
  const getOrders = async () => {
    let driverDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
    fetchAuthPostFunction('delivery_partner/orders',{driver_id:driverDetails.id}).then(response => {
      setOrders(response)
    })
  }
  const OrderCard = (order,i) => {
    const orderStatusBtn = () => {
      if (order.status === 2){
        return (
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.OrderStatusButton} onPress={() => {OrderStatusChangeController(3,order.id).then(result => {
              MyToast(result.message)
              getOrders().then()
            })
            }}>
              <FontAwesome5 name={'check'} size={18} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.OrderStatusButton,{backgroundColor:'red',marginLeft:2}]} onPress={() => {
              OrderStatusChangeController(0,order.id).then(result => {
                MyToast(result.message)
                getOrders().then()
              })

            }}>
              <FontAwesome5 name={'times'} size={18} color={'white'} style={{width:25,textAlign:'center'}} />
            </TouchableOpacity>
          </View>

        )
      }
      if (order.status < 4){
        return (
          <TouchableOpacity style={styles.OrderStatusButton} onPress={() => {
            OrderStatusChangeController(4,order.id).then(result => {
              MyToast(result.message)
              getOrders().then()
            })

          }}>
            <Text style={styles.OrderStatusButtonText}>
              Mark Pickup
            </Text>
          </TouchableOpacity>
        )
      }return (
        <TouchableOpacity style={[styles.OrderStatusButton,{backgroundColor:'green'}]} onPress={() => {
          OrderStatusChangeController(7,order.id).then(result => {
            MyToast(result.message)
            getOrders().then()
          })

        }}>
          <Text style={[styles.OrderStatusButtonText]}>
            Mark Delivery
          </Text>
        </TouchableOpacity>
      )

    }
    return (
      <TouchableOpacity onPress={()=>{navigation.navigate('HomeScreenStack',{screen:'OrderDetails',params:{orderId:order.id}})}} key={i}>

        <View style={styles.OrderCardContainer}>
          <View style={styles.OrderCardContainerRows}>
            <View style={styles.Rows}>
              <View style={styles.OrderPlaceHolderImageContainer}>
                <Image source={{uri:ImageUrl+order.label_image}} style={styles.OrderPlaceHolderImage} />
              </View>
            </View>
            <View style={styles.Rows}>
              <Text style={styles.OrderStatusHeader}>
                {order.label_for_delivery_boy}
              </Text>
              <Text style={styles.OrderTextStyle}>Order: {order.order_id}</Text>
              <View style={styles.DateAndTimeContainer}>
                <Text style={styles.LabelText}>{(order.status < 4)? "Pickup" : "Delivery"} time</Text>
                <Text>  {moment((order.status < 4)? order.expected_pickup_date : order.expected_delivery_date).format('MMM Do YYYY,')}</Text>
                <Text>  {(order.status < 4)? order.pickup_time : order.drop_time}</Text>
              </View>
            </View>
            <View style={[styles.Rows,{marginLeft:20,marginTop:5}]}>
              {orderStatusBtn()}
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
    return <Loader />
  }else if(orders.length === 0){
    return NoData('Orders')
  }
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        {
          orders.map((data,i) => {
            return OrderCard(data,i)
          })
        }
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
    backgroundColor:mainColor,
    padding:5,
    paddingHorizontal:15,
    borderRadius:10/2
  },
  OrderStatusButtonText:{
    color:'#fff'
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
export default Orders;
