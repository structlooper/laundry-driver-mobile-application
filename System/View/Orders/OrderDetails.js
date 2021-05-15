import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { fetchAuthPostFunction, mainColor, MyButton, MyOutlineButton, MyToast ,wait} from "../../Utility/MyLib";
import Loader from "../../Utility/Loader";
import NoData from "../../Utility/NoData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
// import Geolocation from 'react-native-geolocation-service';
import OrderStatusChangeController from "../../Controller/OrderStatusChangeController";

const OrderDetails = ({route}) => {
  const [activeSlide, onChangeActiveSlide] = React.useState(1);
  const {orderId} = route.params
  const [orderDetails,setOrderDetails] = React.useState(null)
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [location,setLocation] = React.useState({
    lat:null,
    lng:null
  })
  useEffect(() => {
      // Geolocation.getCurrentPosition(
      //   (position) => {
      //     setLocation({
      //       lat:position.coords.latitude,
      //       lng:position.coords.longitude
      //     })
      //   },
      //   (error) => {
      //     // See error code charts below.
      //     console.log(error.code, error.message);
      //   },
      //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      // );
    getOrderDetails().then()
  },[refreshing])
  const getOrderDetails = async () => {
    let driverDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
    fetchAuthPostFunction('delivery_partner/orders/details',{driver_id:driverDetails.id,order_id:orderId}).then(response => {
      setOrderDetails(response)
    })
  }

  if (orderDetails === null){
    return <Loader/>
  }else if (Object.keys(orderDetails).length === 0 && orderDetails.constructor === Object){
    return NoData('details')
  }

  const OrderInfo = () => {
    const googleMapOpenUrl = ({ latitude, longitude }) => {
      const latLng = `${latitude},${longitude}`;
      return `google.navigation:q=${latLng}`;
    }
    return (
      <View style={{ paddingVertical:20 }}>
        <View style={Style.RowsContainer}>
          <View style={Style.Row}>
            <Text>
              pickup time
            </Text>
            <Text style={Style.TimeDetails}>
              {moment(orderDetails.expected_pickup_date).format('MMM Do YYYY,')}
            </Text>
            <Text>
              {orderDetails.pickup_time}
            </Text>
          </View>
          <View style={Style.Row}>
            <Text>
              Drop time
            </Text>
            <Text style={Style.TimeDetails}>
              {moment(orderDetails.expected_delivery_date).format('MMM Do YYYY,')}
            </Text>
            <Text>
              {orderDetails.drop_time}
            </Text>
          </View>
        </View>
        <View style={{marginTop:10,paddingHorizontal:20}}>
          <View>
            <Text>Address</Text>
            <Text style={Style.TimeDetails}>{orderDetails.address_id.door_no}</Text>
            <Text style={Style.TimeDetails}>{orderDetails.address_id.address}</Text>
          </View>
          {MyButton(() => {(orderDetails.status === 7) ? MyToast('Order already delivered'):Linking.openURL(googleMapOpenUrl({ latitude: orderDetails.address_id.latitude, longitude: orderDetails.address_id.longitude }));},'Navigate',{marginTop:5},'near-me')}
        </View>
        <View style={{marginTop:10,paddingHorizontal:20}}>
          <View>
            <Text>Payment</Text>
            <Text style={Style.TimeDetails}>₹ {orderDetails.total}</Text>
            <Text>Online</Text>
          </View>
           {/*{MyButton(() => {console.log('navigation')},'View Bill',{marginTop:10},'file-document')}*/}
        </View>

      </View>
    );
  };


  const ClothList = () => {
    const orderBtn = () => {
      if (orderDetails.status === 2){
        return (
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={Style.OrderStatusButton} onPress={() => {
              OrderStatusChangeController(3,orderId).then(result => {
                MyToast(result.message)
                getOrderDetails().then()
              })
            }}>
              <FontAwesome5 name={'check'} size={20} color={'white'} style={{textAlign:'center'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={[Style.OrderStatusButton,{backgroundColor:'red'}]} onPress={() => {
              OrderStatusChangeController(0,orderId).then(result => {
                MyToast(result.message)
                getOrderDetails().then()
              })
            }}>
              <FontAwesome5 name={'times'} size={20} color={'white'} style={{textAlign:'center'}} />
            </TouchableOpacity>
          </View>
        )
      }else if(orderDetails.status < 4){
        return MyButton(() => {
          OrderStatusChangeController(4,orderId).then(result => {
            MyToast(result.message)
            getOrderDetails().then()
          })
        },'Mark Picked','','truck-check')
      }else if(orderDetails.status === 5){
        return MyButton(() => {
          OrderStatusChangeController(6,orderId).then(result => {
            MyToast(result.message)
            getOrderDetails().then()
          })
        },'Out for Delivery',{borderWidth:1,borderColor:mainColor},'check')

      } else if (orderDetails.status === 7){
        return MyOutlineButton(() => {console.log('Delivered')},'Delivered',{borderWidth:1,borderColor:mainColor},'check')
      }else{
        return  MyButton(() => {
          OrderStatusChangeController(7,orderId).then(result => {
            MyToast(result.message)
            getOrderDetails().then()
          })
        },'Mark Delivered','','truck-check')
      }
    }
    const product = (data,i) => {
      return (
        <View style={{ paddingHorizontal:10}} key={i}>
          <View style={{flexDirection:'row' ,paddingVertical:12 }}>
            <View style={{flex:.5}}>
              <Text style={{ fontSize:15,color: mainColor,fontWeight: 'bold'}}>
                {data.qty}
              </Text>
            </View>
            <View style={{flex:2.5}}>
              <Text style={{ fontSize:15,color: 'black'}}>
                {data.product_name}({data.service_name})
              </Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{ fontSize:15,color: 'black',marginLeft:40}}>
                ₹ {data.price}
              </Text>
            </View>
          </View>
        </View>
      )
    }

    return (
      <View style={{paddingVertical: 20,paddingHorizontal:20, height:'85%'}}>
        <View>
          {(orderDetails.products).map((data,i) =>
              product(data,i)
            )}

        </View>
        <View style={{flexDirection:'row',marginTop:20}}>
          <Text style={Style.LabelTitle}>Subtotal</Text>
          <Text style={Style.LabelPrice}>₹ {orderDetails.sub_total}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={Style.LabelTitle}>Discount</Text>
          <Text style={Style.LabelPrice}>₹ {orderDetails.discount}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={Style.LabelTitle}>Total</Text>
          <Text style={Style.LabelPrice}>₹ {orderDetails.total}</Text>
        </View>
        <View style={{marginTop:10}}>
          {orderBtn()}
        </View>
      </View>

    )
  }
  return (

    // <ScrollView  refreshControl={
    //   <RefreshControl
    //     refreshing={refreshing}
    //     onRefresh={onRefresh}
    //   />
    // } style={{ height:'100%' }}>
    <SafeAreaView style={Style.MainContainer}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>

      <View style={Style.ChildContainer}>
        <View style={Style.RowsContainer}>
          <View style={Style.Row}>
            <Text>
              Ordered by
            </Text>
            <Text style={{fontSize:18}}>
              {orderDetails.customer_id.customer_name} ({orderDetails.customer_id.phone_number})
            </Text>
          </View>
          <View style={{ marginRight:10,padding:5 }} >
            <FontAwesome5 name={'phone-alt'} size={25} color={mainColor}/>
          </View>
        </View>
        <View style={Style.RowsContainer}>
          <View style={Style.Row}>
            <Text>
              Ordered status
            </Text>
            <Text style={{fontSize:18,color:mainColor}}>
              {orderDetails.label_for_delivery_boy}
            </Text>
          </View>
          <View style={{ marginRight:10,padding:5 }} >
            <FontAwesome5 name={'truck'} size={25} color={mainColor}/>
          </View>
        </View>
      </View>
      <View style={[Style.ChildContainer]}>
        <View style={{backgroundColor:'#eee',flexDirection:'row'}}>
          <TouchableOpacity
            style={(activeSlide === 1 ) ? Style.activeSlide : Style.nonActiveSlide}
            onPress={() => {onChangeActiveSlide(1)}}
          >
          <View   >
            <Text>Order Info</Text>
          </View>
        </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {onChangeActiveSlide(2)}}
            style={(activeSlide === 2 ) ? Style.activeSlide : Style.nonActiveSlide}
          >
          <View   >
            <Text >Cloth List</Text>
          </View>
          </TouchableOpacity>

        </View>
        <View>
          {(activeSlide === 1) ? OrderInfo() : ClothList()  }
        </View>
      </View>
      </ScrollView>

    </SafeAreaView>
// {/*</ScrollView>*/}

);
};

const Style = StyleSheet.create({
  MainContainer:{
    flex:1,

    backgroundColor:'#eee',
  },
  ChildContainer:{
    marginTop:5,
    backgroundColor: '#fff'
  },
  RowsContainer:{
    flexDirection:'row',
    paddingVertical:10,
    paddingHorizontal:20,
  },
  Row:{
    flex:1
  },
  activeSlide:{
    flex:1,
    alignItems:'center', backgroundColor:'#fff',padding:10
  },
  nonActiveSlide:{
    flex:1,
    alignItems:'center',padding:10
  },
  TimeDetails:{
    fontSize:16,marginTop:2,fontWeight:'bold'
  },
  OrderStatusButton:{
    flex:1,
    borderWidth: .5,
    backgroundColor:mainColor,
    padding:8,
    paddingHorizontal:15,
    borderRadius:10/2
  },
  OrderStatusButtonText:{
    color:'#fff'
  },
  LabelTitle:{
    fontSize:18,color:'#000',flex:1,marginLeft:5
  },
  LabelPrice:{fontSize:18,color:'#000',marginRight:30},
})
export default OrderDetails;
