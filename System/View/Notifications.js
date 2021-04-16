import React, { useCallback } from "react";
import {View,Text,StyleSheet,Image,ScrollView,TouchableOpacity} from 'react-native';
import {mainColor} from "../Utility/MyLib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const orderCard = (nav) => {
  const [textShown, setTextShown] = React.useState(false); //To show ur remaining Text
  const [lengthMore,setLengthMore] = React.useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => { //To toggle the show text or hide it
    setTextShown(!textShown);
  }

  const onTextLayout = useCallback(e =>{
    setLengthMore(e.nativeEvent.lines.length >=4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  },[]);
  return (
    <View style={styles.orderCart}>
      <View style={styles.statusImageContainer}>
        <Image source={require('../Public/Images/machine.jpg')} style={styles.statusImage}/>
      </View>
      <View style={styles.orderLabelContainer}>
        <Text style={styles.orderLabelHeader}>
          Order Confirmed
        </Text>

        <Text
          onTextLayout={onTextLayout}
          numberOfLines={textShown ? undefined : 2}
          style={{ lineHeight: 16 ,color:'#000' }}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
        </Text>

        {
          lengthMore ? <Text
              onPress={toggleNumberOfLines}
              style={{ lineHeight: 16, marginTop: 10 }}>{textShown ? 'Read less...' : 'Read more...'}</Text>
            :null
        }
      </View>
      <View style={styles.priceContainer}>
        <FontAwesome5 name={'clock'} size={15} color={'black'}  />

        <Text style={{fontSize:10,color:'black'}}>
          12:05
        </Text>

      </View>
    </View>

  )
}

const Notifications = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        {orderCard(navigation)}
        {orderCard(navigation)}
        {orderCard(navigation)}
        {orderCard(navigation)}
        {orderCard(navigation)}
        {orderCard(navigation)}
        {orderCard(navigation)}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor:'#eee',
    height:'100%',
    marginHorizontal:10,
    marginVertical:5,
  },
  orderCart:{
    padding:5,
    backgroundColor: '#fff',
    marginVertical: 5,
    flexDirection:'row',
    borderRadius:20/2
  },
  statusImageContainer:{
    height:65,
    borderWidth:3,
    borderRadius: 100/2,
    padding:5,
    borderColor:'grey'
  },
  statusImage:{
    width:50,
    height:50,
    borderRadius: 50/ 2
  },
  orderLabelContainer : {
    flex:.9,
    marginLeft:10,
    justifyContent:'center'
  },
  orderLabelHeader:{
    fontSize:18,
    fontWeight:'bold',
  },
  orderStatusLabel:{
    height:30,
    fontSize: 13,
  },
  priceContainer:{
    marginTop:20,
    // justifyContent: 'center',
    marginLeft:10
  },
  priceLabel:{
    textAlign:'right',
    fontSize:20,
    fontWeight: 'bold',
    color: 'black'
  }
})
export default Notifications;
