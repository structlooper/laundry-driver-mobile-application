import React, { useEffect } from "react";
import { View, Text,StyleSheet,ScrollView ,RefreshControl} from "react-native";
import { fetchAuthPostFunction, mainColor, wait } from "../Utility/MyLib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../Utility/Loader";
import NoData from "../Utility/NoData";
const EarningCard = (data,i) => {
  return (
    <View style={styles.childContainer} key={i}>
      <View style={styles.EarningDetailContainer}>
        <View style={[styles.EarningDetailContainerRow,{flex:2.5}]}>
          <Text>Order No: {data.order_id}</Text>
          <Text style={styles.serviceName}>Laundry Delivered</Text>
        </View>
        <View style={[styles.EarningDetailContainerRow,{flex:1}]}>
          <Text>₹ {data.total_amt}</Text>
          <Text style={styles.serviceName}>Total</Text>
        </View>
        <View style={[styles.EarningDetailContainerRow,{flex:.7}]}>
          <Text style={{color:mainColor}}>₹ {data.earn_amt}</Text>
          <Text style={styles.serviceName}>Earned</Text>
        </View>
      </View>
    </View>
  )
}

const Earning = () => {
  const focus = useIsFocused();
  const [walletAmount,setWalletAmount] = React.useState(0);
  const [earningStatements,setEarningStatements] = React.useState(null);
  const [userDetails,setUserDetails] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getEarningDetails().then()
  },[refreshing,focus])
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const getEarningDetails = async () => {
    let userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'));
    setUserDetails(userDetails)
    setWalletAmount(userDetails.wallet)
    fetchAuthPostFunction('delivery_partner/earnings',{driver_id: userDetails.id}).then(response => {
      setEarningStatements(response);
    })
  }

  const Earning_statements = () => {
    if (earningStatements === null){
      return Loader();
    }else if (earningStatements.length === 0){
      return (<View style={{ borderTopColor:'#eee',borderTopWidth:5 }}>
        {NoData("Earning statements")}
      </View>)
    }
    return (
      <ScrollView>
        {earningStatements.map((data,i) => {
          return EarningCard(data,i)
        })}
      </ScrollView>
      )
  }
if (userDetails === null){
  return Loader();
}
  return (
    <ScrollView style={styles.mainContainer}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
    >
      <View style={styles.childOneContainer}>
        <View style={{ flex:1 }}>
          <View style={{ marginVertical:5 }}>
          <Text style={styles.headingLabel}>
            Delivery boy type:
          </Text>
          <Text >{(userDetails.delivery_boy_type === 1 )?'Delivery based':'Salary based'}</Text>
          </View>

          <View style={{ marginVertical:5 }}>
          <Text style={styles.headingLabel}>
            {(userDetails.delivery_boy_type === 1)?'Commission':'Salary'}:
          </Text>
          <Text >{(userDetails.delivery_boy_type === 1 )?userDetails.commission+' %':userDetails.salary+' ₹'}</Text>
          </View>
        </View>
      <View>
        <Text style={styles.headingLabel}>
          Wallet amount
        </Text>
        <Text style={styles.MainEarningLabel}>
          ₹ {walletAmount}
        </Text>
      </View>

      </View>
        {Earning_statements()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'#eee',
  },
  childOneContainer:{
    flexDirection: 'row',
    marginTop:5,
    paddingHorizontal:20,
    paddingVertical:15,
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
    marginVertical:10,
    fontSize:30,
    fontWeight:'bold'
  },
  headingLabel:{
    fontSize: 18,
    fontWeight: 'bold'
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
