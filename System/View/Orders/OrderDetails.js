import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { mainColor, MyButton } from "../../Utility/MyLib";
// import ClothList from "./ClothList";


const OrderInfo = () => {
  return (
    <View style={{ paddingVertical:20 }}>
      <View style={Style.RowsContainer}>
        <View style={Style.Row}>
          <Text>
            pickup time
          </Text>
          <Text style={Style.TimeDetails}>
            21 JUNE, 21:00
          </Text>
        </View>
        <View style={Style.Row}>
          <Text>
            Drop time
          </Text>
          <Text style={Style.TimeDetails}>
            22 JUNE, 20:00
          </Text>
        </View>
      </View>
      <View style={{marginTop:10,paddingHorizontal:20}}>
       <View>
         <Text>Address</Text>
         <Text style={Style.TimeDetails}>Street no 4 Main market Area, Near Test Area ,New Delhi</Text>
       </View>
        {MyButton(() => {console.log('navigation')},'Navigate',{marginTop:5},'near-me')}
      </View>
  <View style={{marginTop:10,paddingHorizontal:20}}>
        <Text>Payment</Text>
        <Text style={Style.TimeDetails}>$ 78.00</Text>
        <Text>Cash on Delivery</Text>
        {MyButton(() => {console.log('navigation')},'View Bill',{marginTop:10},'file-document')}
      </View>

    </View>
  );
};


const ClothList = () => {
  const product = (name,qty,price) => {
    return (
      <View style={{ paddingHorizontal:10}}>
        <View style={{flexDirection:'row' ,paddingVertical:12 }}>
          <View style={{flex:.5}}>
            <Text style={{ fontSize:15,color: mainColor,fontWeight: 'bold'}}>
              {qty}
            </Text>
          </View>
          <View style={{flex:2}}>
            <Text style={{ fontSize:15,color: 'black'}}>
              {name}
            </Text>
          </View>
          <View style={{flex:1}}>
            <Text style={{ fontSize:15,color: 'black',marginLeft:40}}>
              {price}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{paddingVertical: 20,paddingHorizontal:20}}>
      <ScrollView style={{ height:350}}>
        {product('Blazer (Dry Cleaning)','2x','₹ 4')}
        {product('Jens (Dry Cleaning)','3x','₹ 3')}
        {product('Shirt (Dry Cleaning)','5x','₹ 8')}
        {product('Mens Kurta (Dry Cleaning)','1x','₹ 10')}
        {product('Mens Kurta (Dry Cleaning)','1x','₹ 10')}
        {product('Mens Kurta (Dry Cleaning)','1x','₹ 10')}
        {product('Mens Kurta (Dry Cleaning)','1x','₹ 10')}
        {product('Mens Kurta (Dry Cleaning)','1x','₹ 10')}
        {product('Mens Kurta (Dry Cleaning)','1x','₹ 10')}
        {product('Mens Kurta (Dry Cleaning)','1x','₹ 10')}
        {product('Mens Kurta (Dry Cleaning)','1x','₹ 10')}
        {product('Mens Kurta (Dry Cleaning)','1x','₹ 10')}
        {product('Mens Kurta (Dry Cleaning)','1x','₹ 10')}
        {product('Mens Kurta (Dry Cleaning)','1x','₹ 10')}
      </ScrollView>
      <View style={{flexDirection:'row',marginTop:20}}>
        <Text style={{fontSize:18,color:mainColor,flex:1}}>Cash on Delivery</Text>
        <Text style={{fontSize:18,color:mainColor,marginRight:30}}>$ 78</Text>
      </View>
      <View style={{marginTop:10}}>
        {MyButton(() => {console.log('marked as delivery')},'Mark Delivered','','truck-check')}
      </View>
    </View>

  )
}
const OrderDetails = () => {
  const [activeSlide, onChangeActiveSlide] = React.useState(1);
  return (
    <View style={Style.MainContainer}>
      <View style={Style.ChildContainer}>
        <View style={Style.RowsContainer}>
          <View style={Style.Row}>
            <Text>
              Ordered by
            </Text>
            <Text style={{fontSize:18}}>
              Samantha Akhil
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
              Ready to Deliver
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
        {(activeSlide === 1) ? OrderInfo() : ClothList()  }
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
  }
})
export default OrderDetails;
