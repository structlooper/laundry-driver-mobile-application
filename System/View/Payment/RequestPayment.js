import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { CheckContext } from "../../Utility/CheckContext";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fetchAuthPostFunction, mainColor } from "../../Utility/MyLib";
import Loader from "../../Utility/Loader";
const RequestPayment = () => {
  const {showServerOrder} = React.useContext(CheckContext);
  const [orderDetails,setOrderDetails] = React.useState(null)
  const [paymentDetails,setPaymentDetails] = React.useState(null)

  React.useEffect(()=>{
    getOrder()
    getPaymentMethod().then()
  },[]);
  const getOrder = () => {
    showServerOrder().then(order => {
      setOrderDetails(order)
    })
  }
  const getPaymentMethod = async () =>{
    await fetchAuthPostFunction('payment',{lang:'en'}).then(response => {
      setPaymentDetails(response)
    })
  }
  if (!orderDetails){
    return Loader();
  }
  return (
    <View style={{ flex:1,backgroundColor:'#eee' }}>
      <View style={{margin:hp('2'),padding:wp('3'),backgroundColor:'#fff',borderRadius:40/2 }}>
        <View style={{flexDirection:'row',paddingRight:'2%'}}>
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
          :null}
        <View style={{flexDirection:'row',paddingRight:'2%'}}>
          <Text style={Style.LabelTitle}>Total</Text>
          <Text style={Style.LabelPrice}>₹ {orderDetails.total}</Text>
        </View>
      </View>
      <View style={{ flex:1 }}>
        <ScrollView>
          <View style={{ flexDirection:'row',marginHorizontal:'3%' }}>
            <TouchableOpacity style={{ flex:1 , paddingHorizontal:wp('5') ,paddingVertical:hp('3'), margin:'1%' , borderRadius:40/2 ,
              alignItems:'center' ,backgroundColor:'#fff'}}>
              <Image source={{ uri:'http://covidvaccination.co.in/uploads/images/8342ffc12c9bb743950331a337714210.png' }}
                     style={{ width:wp('40') , height:hp('11.5') , resizeMode:'center',marginBottom:hp(1.5) }}
              />
              <Text style={{ fontWeight:'bold',fontSize:wp(4.5) }} >Cash</Text>
              <Text style={{ fontSize:wp(3) }}>Get cash in hand</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex:1 , paddingHorizontal:wp('5') ,paddingVertical:hp('3'), margin:'1%' , borderRadius:40/2 ,
              alignItems:'center' ,backgroundColor:'#fff'}}>
              <Image source={{ uri:'https://img.freepik.com/free-vector/paid-by-credit-card_41910-370.jpg?size=626&ext=jpg' }}
                     style={{ width:wp('40') , height:hp('13')  , resizeMode:'center' }}
              />
              <Text style={{ fontWeight:'bold',fontSize:wp(4.5) }} >Online</Text>
              <Text style={{ fontSize:wp(3) }}>Get payment with razorpay</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection:'row',marginHorizontal:'3%' }}>
            <TouchableOpacity style={{ flex:1 , paddingHorizontal:wp('5') ,paddingVertical:hp('3'), margin:'1%' , borderRadius:40/2 ,
              alignItems:'center' ,backgroundColor:'#fff'}}>
              <Image source={{ uri:'http://covidvaccination.co.in/uploads/images/e4dda52778b4d10b4fb138f7ee3628f0.jpg' }}
                     style={{ width:wp('40') , height:hp('12')  , resizeMode:'center' }}
              />
              <Text style={{ fontWeight:'bold',fontSize:wp(4.5) }} >Wallet</Text>
              <Text style={{ fontSize:wp(3),textAlign:'center' }}>Pay with wallet available amount: $50,20.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex:1 , paddingHorizontal:wp('5') ,paddingVertical:hp('3'), margin:'1%' , borderRadius:40/2 ,
              alignItems:'center' ,backgroundColor:'#fff'}}>
              <Image source={{ uri:'http://covidvaccination.co.in/uploads/images/37eabac2539aca54d47150a53d1ec36f.jpg' }}
                     style={{ width:wp('40') , height:hp(12) , resizeMode:'center',marginBottom:hp(.5) }}
              />
              <Text style={{ fontWeight:'bold',fontSize:wp(4.5) }} >Other</Text>
              <Text style={{ fontSize:wp(3) }}>Paid with Other method</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>

      </View>
    </View>
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
    fontSize:18,color:'grey',width:wp('72'),marginLeft:5
  },
  LabelPrice:{
    fontSize:18,color:'#312e2e'
  },
})
export default RequestPayment;
