import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAuthPostFunction, MyToast } from "../Utility/MyLib";

const ProductController =  (productId,qty) => {
  return new Promise(async resolve => {
    let orderId= await AsyncStorage.getItem('orderId')
    let dom = {};
    dom.product_id = productId;
    dom.qty = qty;
    dom.order_id = orderId
    fetchAuthPostFunction('delivery_partner/order',dom).then(result => {
      // console.log('res',result)
      // MyToast(result.message)
      if (result.status === 1){
        resolve(true)
      }
      resolve(false)
    })
  })
}
export default ProductController;
