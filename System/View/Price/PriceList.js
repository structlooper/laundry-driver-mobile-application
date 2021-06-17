import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  capitalizeFirstLetter,
  fetchAuthPostFunction,
  fetchGetFunction,
  mainColor,
  MyButton,
  MyTextInput,
} from "../../Utility/MyLib";
import Loader from "../../Utility/Loader";
import NoDataFound from "../../Utility/NoDataFound";

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Modal from "react-native-modal";

const PriceList = () => {
  const [search , onChangeSearch] = React.useState(null);
  const [loader , setLoader] = React.useState(true);
  const [activeTab , setActiveTab] = React.useState('men');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState(null)
  const [services, setServices] = React.useState([]);
  const [categoryTab, setCategoryTab] = React.useState([]);
  const [productList , setProductList] = React.useState([]);

  React.useEffect(() => {
    getAllService().then()
  },[])

  const getAllService = async ()=>{
    fetchGetFunction('service').then(re=>{
      setServices(re)
      setSelectedService(re[0])
      getCategoryByService(re[0]).then()
    })
  }

  const  getCategoryByService = async (service) => {
    fetchGetFunction('category/'+service.id).then(cat=>{
      if (cat.length > 0){
        setCategoryTab(cat)
        setActiveTab(cat[0])
        getProductsByCategoryId(cat[0],service)
      }else{
        setCategoryTab([])
      }
    })
  }
  const getProductsByCategoryId = async (category,service) => {
    fetchGetFunction('product/'+category.id+'/'+service.id).then(prod=>{
      if (prod.length > 0){
        setProductList(prod)
      }else{
        setProductList([])
      }
      setLoader(false)
    })
  }
  const renderProductList = () => {
    if (!productList){
      return Loader();
    }else if (productList.length > 0){
      return (
        <>
          {
            productList.map((data,i)=>
              <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'grey',padding:'5%'}} key={i}>
                <Text style={{flex:1}}>{data.product_name} ({data.service_name})</Text>
                <Text style={{}}>₹ {data.price}/{data.unit}</Text>
              </View>
            )
          }
        </>
      )
    }
    return NoDataFound();

  }
  const openSelectService = () => {
    const serviceListRender = () => {
      if (services.length === 0){
        return NoDataFound();
      }
      return (
        services.map((data,i) => {

          return (
            <TouchableOpacity key={i} style={{ borderBottomWidth:1,borderBottomRadius:10/2 ,height:hp('8')
              ,alignItems:'center',justifyContent:'center',borderBottomColor:'#000'
            }} onPress={()=>{setSelectedService(data)
              getCategoryByService(data).then()
              setModalVisible(!isModalVisible)
            }}>
              <Text style={{ fontSize:18,color:mainColor }}>{capitalizeFirstLetter(data.name)}</Text>
            </TouchableOpacity>
          )
        })
      )
    }
    return (
      <Modal isVisible={isModalVisible} >
        <View style={{flex: .7,borderWidth:.2,backgroundColor:'#eee',}}>
          <View style={{borderBottomWidth:.5,paddingBottom:10,padding:10}}>
            <View>
              {MyButton(() => {setModalVisible(!isModalVisible)},'Back','','arrow-left')}
            </View>
          </View>
          <View style={{ backgroundColor:'#fff',height:'88%',alignItems:'center'}}>
            <ScrollView style={{width:wp('90'),}} >
              {serviceListRender()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    )
  }

  const renderBottomList =()=>{
    if (categoryTab.length > 0){
      return (
        <View >
          <ScrollView style={{ flexDirection:'row' }} horizontal={true}>
            {
              categoryTab.map((data,i)=>
                <TouchableOpacity style={(activeTab.category_name === data.category_name)?Styles.activeTab:Styles.tab} onPress={() => {
                  getProductsByCategoryId(data,selectedService).then()
                  setActiveTab(data)
                }} key={i}>
                  <Text style={(activeTab.category_name === data.category_name)?Styles.activeText:Styles.text}>{data.category_name}</Text>
                </TouchableOpacity>
              )
            }

          </ScrollView>
        </View>
      )
    }else{
      return null;
    }
  }
  const searchFunction = async (key) => {
    await fetchAuthPostFunction('search_product',{key:key}).then(res=>{
      setProductList(res)
    })
  }
  if (loader){
    return Loader();
  }else if (services.length > 0){
    return (
      <View style={{ height:'100%',backgroundColor:'#fff' }}>
        {openSelectService()}
        <View style={{ height:hp('30'),backgroundColor:mainColor }}>
          <View style={{padding:'5%', height:'84%'}}>
            <TouchableOpacity style={{ borderWidth:1, borderRadius:10/2,padding:'5%',backgroundColor:'#fff' }}
                              onPress={()=>{setModalVisible(!isModalVisible)}}
            >
              <Text>{(selectedService !== null)?selectedService.name:'select service'}</Text>
            </TouchableOpacity>
            <View style={{ borderWidth:1,marginTop:'2%' ,borderRadius:10/2,backgroundColor:'#fff' }}>
              {MyTextInput(
                search,
                (text)=>{
                  onChangeSearch(text)
                  if (text === ''){
                    getAllService().then()
                  }else{
                    searchFunction(text).then()
                  }
                },
                'Search',
                {
                  backgroundColor:'#fff',
                }
                ,
                'file-search'
              )}
            </View>
          </View>
          {renderBottomList()}
        </View>
        <ScrollView>
          {(categoryTab.length > 0)?renderProductList():NoDataFound()}
        </ScrollView>
      </View>
    );
  }
  return NoDataFound();
}

const Styles = StyleSheet.create({
  activeTab:{ backgroundColor:'#fff',width:wp('34'),height:hp('5'),alignItems:'center',justifyContent:'center' },
  tab:{
    // flex:1,
    width: wp('33'),
    height: hp('5'),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:'#fff'
  },
  activeText:{ color:'#000' },
  text:{ color:'#fff' }
})
export default PriceList;
