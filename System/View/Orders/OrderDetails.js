import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  RefreshControl,
  SafeAreaView, Image,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  fetchAuthPostFunction,
  mainColor,
  MyButton, MyNumericInput,
  MyOutlineButton,
  MyTextInput,
  MyToast,
  wait,
} from "../../Utility/MyLib";
import Loader from "../../Utility/Loader";
import NoData from "../../Utility/NoData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import OrderStatusChangeController from "../../Controller/OrderStatusChangeController";
import NoProd from "../../Utility/NoProd";
import { CheckContext } from "../../Utility/CheckContext";
import { useIsFocused } from "@react-navigation/native";
import Modal from "react-native-modal";

const OrderDetails = ({route,navigation}) => {
  const focus = useIsFocused();
  const {showServerOrder} = React.useContext(CheckContext);
  const [activeSlide, onChangeActiveSlide] = React.useState(1);
  const {orderId} = route.params
  const [orderDetails,setOrderDetails] = React.useState(null)
  const [refreshing, setRefreshing] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [itemCount, setItemCount] = React.useState(null);
  const [itemProduct, setItemProduct] = React.useState(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
   getOrderDetails()
  },[refreshing,focus])
  const getOrderDetails  = async => {
    showServerOrder().then(order => {
      setOrderDetails(order)
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
      <View style={{ minHeight:hp('90') }}>
        <View style={[Style.RowsContainer,{marginTop:'5%'}]}>
          <View style={Style.Row}>
            <Text>
              Selected services
            </Text>
            <Text style={Style.TimeDetails}>
              {orderDetails.selected_services}
            </Text>
          </View>
        </View>
        <View style={[Style.RowsContainer,{marginTop:'5%'}]}>
          <View style={Style.Row}>
            <View>
              <Text>
                Estimated cloths
              </Text>
              <Text style={Style.TimeDetails}>
                {orderDetails.estimated_cloths}
              </Text>

            </View>

          </View>
          {(orderDetails.additional_item_ids !== null)?
            (orderDetails.additional_item_ids !== '')?
            <View style={Style.Row}>
              <Text>
                Added items
              </Text>
              <Text style={Style.TimeDetails}>
                {orderDetails.additional_item_ids}
              </Text>
            </View>: null :
            null
          }

        </View>
        <View style={[Style.RowsContainer,{marginTop:'5%'}]}>
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
        <View style={{marginTop:'10%',paddingHorizontal:'5%'}}>
          <View style={{ marginBottom:hp('5') }}>
            <Text>Address</Text>
            <Text style={Style.TimeDetails}>{orderDetails.address_id.door_no}</Text>
            <Text style={Style.TimeDetails}>{orderDetails.address_id.address}</Text>
          </View>
          {MyButton(() => {(orderDetails.status === 7) ? MyToast('Order already delivered'):Linking.openURL(googleMapOpenUrl({ latitude: orderDetails.address_id.latitude, longitude: orderDetails.address_id.longitude }));},'Navigate',{marginTop:5},'near-me')}
        </View>
        <View style={{marginTop:'5%',paddingHorizontal:'5%'}}>
          <View>
            <Text>Payment</Text>
            <Text style={Style.TimeDetails}>₹ {orderDetails.total} ({ (orderDetails.payment_status === 2)?'Paid':'Due'})</Text>
            <Text>{(orderDetails.payment_mode === 3)?'Not selected':(orderDetails.payment_mode===1)?'cash':'online'}</Text>
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
                getOrderDetails()
              })
            }}>
              <FontAwesome5 name={'check'} size={20} color={'white'} style={{textAlign:'center'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={[Style.OrderStatusButton,{backgroundColor:'red'}]} onPress={() => {
              OrderStatusChangeController(0,orderId).then(result => {
                MyToast(result.message)
                getOrderDetails()
              })
            }}>
              <FontAwesome5 name={'times'} size={20} color={'white'} style={{textAlign:'center'}} />
            </TouchableOpacity>
          </View>
        )
      }else if(orderDetails.status < 4){
        return MyButton(() => {
          if (orderDetails.products.length > 0){
            OrderStatusChangeController(4,orderId).then(result => {
              MyToast(result.message)
              getOrderDetails()
            })
          }else{
            MyToast('Please add cloths!!')
          }
        },'Mark Picked','','truck-check')
      }else if(orderDetails.status === 5){
        return MyButton(() => {
          OrderStatusChangeController(6,orderId).then(result => {
            MyToast(result.message)
            getOrderDetails()
          })
        },'Out for Delivery',{borderWidth:1,borderColor:mainColor},'check')

      } else if (orderDetails.status === 7){
        return MyOutlineButton(() => {console.log('Delivered')},'Delivered',{borderWidth:1,borderColor:mainColor},'check')
      }else if (orderDetails.status === 6){
        return  MyButton(() => {
          OrderStatusChangeController(7,orderId).then(result => {
            MyToast(result.message)
            getOrderDetails()
          })
        },'Mark Delivered','','truck-check')
      }else{
        return MyOutlineButton(() => {console.log('Delivered')},'Processing',{borderWidth:1,borderColor:mainColor},)
      }

    }
    const product = (data,i) => {
      return (
        <View style={{ paddingHorizontal:10}} key={i}>
          <View style={{flexDirection:'row' ,paddingVertical:12 }}>
            <View style={{flex:.2}}>
              <Text style={{ fontSize:15,color: mainColor,fontWeight: 'bold'}}>
                {data.qty} {data.unit}
              </Text>
            </View>
            <View style={{flex:.8,marginHorizontal:wp('5')}}>
              <View style={{ flexDirection:'row' }}>
                <Text style={{ fontSize:15,color: 'black'}}>
                  {data.product_name}  ({data.service_name})
                </Text>
                <TouchableOpacity
                onPress={() => {
                  setItemProduct(data.product_id)
                  setItemCount(data.item_count?data.item_count.toString():null)
                  setIsModalVisible(!isModalVisible)
                }}
                >
                  <Text style={{ color:mainColor }}> ({data.item_count ?? 'add item count'})</Text>
                </TouchableOpacity>
              </View>

            </View>
            <View style={{ flex:.2 }}>
              <Text style={{ fontSize:15,color: 'black',}}>
                ₹ {data.price}
              </Text>
            </View>
          </View>
        </View>
      )
    }
    const productRenderList = () => {
      if ((orderDetails.products).length > 0){
        return (orderDetails.products).map((data,i) =>
          product(data,i)
        )
      }
      return NoProd();
    }
    const addItemCountModal = () => {
      return (
        <Modal isVisible={isModalVisible} >
          <View style={{flex: .4,borderWidth:.2,backgroundColor:'#eee',}}>
            <View style={{borderBottomWidth:.5,paddingBottom:10,padding:10}}>
              <View>
                {MyButton(() => {setIsModalVisible(!isModalVisible)},'Back','','arrow-left')}
              </View>
            </View>
            <View style={{ backgroundColor:'#fff',flex:1,paddingVertical:hp('5'),alignItems:'center'}}>
              <View style={{ flexDirection:'row' }}>
                {MyNumericInput(
                  itemCount,
                  setItemCount,
                  'Enter item count here',
                  {
                    backgroundColor:'#fff',
                    width: wp('60')
                  }
                )}
              </View>
              <View style={{ flexDirection:'row',marginTop:hp(5) }}>
                {MyButton(
                  ()=>{
                    let dom = {
                      order_id: orderId,
                      product_id: itemProduct,
                      item_count: itemCount,
                    }
                      if (itemCount){
                      fetchAuthPostFunction('delivery_partner/order/update_count',dom).then(res=>{
                        if (res.status === 0){
                          MyToast(res.message)
                        }else{
                          getOrderDetails()
                          setIsModalVisible(!isModalVisible)
                          setItemCount(null)
                        }
                      })
                    }else{
                      MyToast('Enter count first!!')
                    }

                  },
                  'Save',
                  {width: wp('60')},
                )}
              </View>

            </View>
          </View>
        </Modal>
      )
    }
    return (
      <View style={{paddingVertical: 20,paddingHorizontal:20 , minHeight:hp('70')}}>
        {addItemCountModal()}
        <View style={{  }}>
          {(orderDetails.status === 3)?MyButton(()=>{navigation.navigate('OrderDetailsAddProducts')},'Add cloths',{marginHorizontal:20},'plus'):null}
          {(orderDetails.status > 3)? (orderDetails.status < 7)? MyButton(()=>{console.log('request_pay')},'Request payment',{marginHorizontal:20},'currency-inr'):null:null}
          {productRenderList()}
        </View>
        <View style={{  paddingHorizontal:'5%',borderTopWidth:1,position:'absolute',left:0,right:0,bottom:0 }}>
          <View style={{flexDirection:'row',marginTop:20,paddingRight:'2%'}}>
            <Text style={Style.LabelTitle}>Subtotal</Text>
            <Text style={Style.LabelPrice}>₹ {orderDetails.sub_total}</Text>
          </View>
          <View style={{flexDirection:'row',paddingRight:'2%'}}>
            <Text style={Style.LabelTitle}>Discount</Text>
            <Text style={Style.LabelPrice}>₹ {orderDetails.discount}</Text>
          </View>
          <View style={{flexDirection:'row',paddingRight:'2%'}}>
            <Text style={Style.LabelTitle}>Delivery charges</Text>
            <Text style={Style.LabelPrice}>₹ {orderDetails.delivery_changes}</Text>
          </View>
          {(orderDetails.mem_total_discount > 0)?
            <View style={{flexDirection:'row',paddingRight:'2%'}}>
              <Text style={Style.LabelTitle}>Membership discount</Text>
              <Text style={Style.LabelPrice}>₹ {orderDetails.mem_total_discount}</Text>
            </View>
            :null
          }
          <View style={{flexDirection:'row',paddingRight:'2%'}}>
            <Text style={Style.LabelTitle}>Total</Text>
            <Text style={Style.LabelPrice}>₹ {orderDetails.total}</Text>
          </View>
          <View style={{marginTop:10}}>
            {orderBtn()}
          </View>
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

      <View style={[Style.ChildContainer]}>
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
    height:hp('10')
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
    fontSize:18,color:'#000',width:wp('72'),marginLeft:5
  },
  LabelPrice:{fontSize:18,color:'#000'},
})
export default OrderDetails;
