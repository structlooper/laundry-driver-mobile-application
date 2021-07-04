import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  capitalizeFirstLetter,
  fetchAuthPostFunction,
  fetchGetFunction,
  mainColor,
  MyButton, MyNumericInput,
  MyTextInput,
} from "../../Utility/MyLib";
import Loader from "../../Utility/Loader";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Modal from "react-native-modal";
import NoDataFound from "../../Utility/NoDataFound";
import { CheckContext } from "../../Utility/CheckContext";
import { IconButton } from 'react-native-paper';
import ProductController from "../../Controller/ProductController";

const AddProducts = ({navigation}) => {
  const {showOrder} = React.useContext(CheckContext);
  const {showServerOrder} = React.useContext(CheckContext);
  let order = showOrder();
  const [search , onChangeSearch] = React.useState(null);
  const [loader , setLoader] = React.useState(true);
  const [activeTab , setActiveTab] = React.useState('men');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState(null)
  const [services, setServices] = React.useState([]);
  const [categoryTab, setCategoryTab] = React.useState([]);
  const [productList , setProductList] = React.useState([]);
  const [orderProducts , setOrderProducts] = React.useState({});

  React.useEffect(() => {
    getAllService().then()
    getOrderProductQty()
  },[])

  const getOrderProductQty = () => {
    let obj = {};
    (order.products).forEach(element => {
      let key = element.product_id
      obj[key] = element.qty;
    });
    setOrderProducts(obj)
  }

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
      const Btn = (productId,setLoader,i,num,qty) => {
        let icon;
        if(num === '++1'){
          icon = 'plus'
        }else if(num === -1){
          icon = 'minus'
        }else{
          icon = 'cross'
        }

        return (
          <IconButton
            icon={icon}
            color={mainColor}
            size={12}
            onPress={() => {
              setLoader(i+icon)
              ProductController(productId, num).then(bool => {
                if (bool){
                  showServerOrder().then(res=>{
                    order=res;
                  })
                }
              })
              let newQty = 0;
              // if (qty > 0){
                if (num === '++1'){
                  newQty = qty+1
                }else if (qty < 2 && num === -1){
                  newQty = 0;
                }else{
                  newQty = qty-1;
                }
              // }
              setOrderProducts({
                ...orderProducts,
                [productId]:newQty

              })
              setLoader(false)
            }}
            style={{borderColor:mainColor,borderWidth:.5, marginTop:1}}
          />
        )
      }
      return (
        <>
          {
            productList.map((data,i)=>{
              let Q = 0;
              if (Object.keys(orderProducts).some(v => v == (data.id).toString())){
                Q = orderProducts[data.id]
              }
              return (
                <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'grey',padding:'5%'}} key={i}>
                  <View style={{width:wp('35'),overflow:'hidden'}}>
                    <Text style={{}}>{data.product_name} ({data.service_name})</Text>
                  </View>
                  <View style={{width:wp('35'),alignItems:'center'}}>
                    <View style={{  flexDirection: 'row',
                              marginLeft:10 }}>
                      <View>
                        { (loader === i+'minus') ? Loader() : Btn(data.id,setLoader,i,-1,Q)}
                      </View>
                      <View style={{}}>
                        {MyNumericInput(
                          (Q === 0)?null:Q.toString(),
                          (qty)=>{
                            ProductController(data.id, qty).then(bool => {
                              if (bool){
                                showServerOrder().then(res=>{
                                  order=res;
                                })
                              }
                            })
                            setOrderProducts({
                              ...orderProducts,
                              [data.id]:qty
                            })
                          },
                          '0',
                          {
                            backgroundColor: '#fff',
                            flex: 1,
                            height: hp(3),
                            justifyContent:"center"
                          }
                        )}
                      </View>
                      <View>
                        { (loader === i+'plus') ? Loader() : Btn(data.id,setLoader,i,'++1',Q)}
                      </View>
                    </View>
                  </View>
                  <Text style={{}}>₹ {data.price}/{data.unit}</Text>
                </View>
              )})
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
    console.log(order)
    return (
      <ScrollView style={{ height:'100%',backgroundColor:'#fff' }}>
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
                'Search cloths',
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
        <View  style={{ height:hp('63') }}>
          <ScrollView>
            {(categoryTab.length > 0)?renderProductList():NoDataFound()}
          </ScrollView>
        </View>
        <View style={{  paddingHorizontal:'5%',borderTopWidth:1,position:'absolute',left:0,right:0,bottom:0 }}>
          <View style={{flexDirection:'row',paddingRight:'2%'}}>
            <Text style={Styles.LabelTitle}>Subtotal</Text>
            <Text style={Styles.LabelPrice}>₹ {order.sub_total}</Text>
          </View>
          <View style={{flexDirection:'row',paddingRight:'2%'}}>
            <Text style={Styles.LabelTitle}>Discount</Text>
            <Text style={Styles.LabelPrice}>₹ {order.discount}</Text>
          </View>
          <View style={{flexDirection:'row',paddingRight:'2%'}}>
            <Text style={Styles.LabelTitle}>Delivery charges</Text>
            <Text style={Styles.LabelPrice}>₹ {order.delivery_changes}</Text>
          </View>
          {(order.delivery_changes_discount > 0)?
            <View style={{flexDirection:'row',paddingRight:'2%'}}>
              <Text style={Styles.LabelTitle}>Delivery free</Text>
              <Text style={Styles.LabelPrice}>₹ -{order.delivery_changes_discount}</Text>
            </View>
            :null
          }
          {(order.mem_total_discount > 0)?
            <View style={{flexDirection:'row',paddingRight:'2%'}}>
              <Text style={Styles.LabelTitle}>Membership discount</Text>
              <Text style={Styles.LabelPrice}>₹ {order.mem_total_discount}</Text>
            </View>
            :null
          }
          <View style={{flexDirection:'row',paddingRight:'2%'}}>
            <Text style={Styles.LabelTitle}>Total</Text>
            <Text style={Styles.LabelPrice}>₹ {order.total}</Text>
          </View>
          <View style={{marginVertical:5,alignItems:'center'}}>
            {MyButton(
              ()=>{navigation.goBack()},
              'Done',
              {},
              'check'
            )}
          </View>
        </View>
      </ScrollView>
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
  text:{ color:'#fff' },
  LabelTitle:{
    fontSize:15,color:'#000',width:wp('73'),marginLeft:wp('1')
  },
  LabelPrice:{fontSize:15,color:'#000'},
})
export default AddProducts;
