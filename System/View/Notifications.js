import React, { useCallback, useEffect } from "react";
import {View,Text,StyleSheet,Image,ScrollView,TouchableOpacity} from 'react-native';
import { fetchAuthPostFunction, mainColor ,ImageUrl} from "../Utility/MyLib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Loader from "../Utility/Loader";
import NoData from "../Utility/NoData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
const Notifications = ({navigation}) => {
  const isFocused = useIsFocused();
  const [textShown, setTextShown] = React.useState(false);
  const [lengthMore,setLengthMore] = React.useState(false);
  const [notifications , setNotifications] = React.useState(null)
  useEffect(() => {
    getNotifications().then()
  },[isFocused])

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  }
  const onTextLayout = useCallback(e =>{
    setLengthMore(e.nativeEvent.lines.length >=4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  },[]);



  const getNotifications = async () => {
    let driverDetails = JSON.parse(await AsyncStorage.getItem('userDetails'));
    let driverId = driverDetails.id;

    fetchAuthPostFunction('delivery_partner/notifications',{driver_id:driverId}).then(response => {
      setNotifications(response)
    })
  }
  const orderCard = (notification,i) => {

    return (
      <View style={styles.orderCart} key={i}>
        <View style={styles.statusImageContainer}>
          <Image source={{ uri:ImageUrl+notification.status_image}} style={styles.statusImage}/>
        </View>
        <View style={styles.orderLabelContainer}>
          <Text style={styles.orderLabelHeader}>
            {notification.title}
          </Text>

          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 2}
            style={{ lineHeight: 16 ,color:'#000' }}>
            ({notification.order_id})
          </Text>
          <Text>
            {notification.desc}
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
            {notification.created_at}
          </Text>

        </View>
      </View>

    )
  }
  if (notifications === null){
    return <Loader />
  }else if(notifications.status === 0){
    return NoData('notifications')
  }
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        {
          (notifications.data).map((data,i) => {
            return orderCard(data,i)
          })
        }

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
  },
  statusImage:{
    width:70,
    height:70,
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
    color: mainColor
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
