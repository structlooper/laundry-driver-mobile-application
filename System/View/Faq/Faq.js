import React, { useEffect, useState } from "react";
import { Text, View,ScrollView,TouchableOpacity} from 'react-native';
import { fetchAuthPostFunction, MyButton } from "../../Utility/MyLib";
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Loader from "../../Utility/Loader";
import NoData from "../../Utility/NoData";

function Faqs() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [faqs,setFaqs] = useState(null)
    const [QuestAnswer,onChangeQuestAnswer] = useState({
        question:null,
        answer:null
    })

    useEffect(() => {
        getFaqs().then()
    },[])
    const getFaqs = async () => {
        fetchAuthPostFunction('faq',{lang:'en'}).then(response => {
            setFaqs(response.result)
        })
    }
    const toggleModal = (fa) => {
        onChangeQuestAnswer({
            question: fa.question,
            answer:fa.answer,
        })
        setModalVisible(!isModalVisible);
    };
    const faqCard = (faq,i) => {
        return (
          <TouchableOpacity style={{padding:10,marginVertical:1,paddingHorizontal:20,backgroundColor:'#fff'}}
                            onPress={() => {toggleModal(faq)}} key={i}
          >
              <View style={{flexDirection:'row'}}>
                  <Text style={{flex:.9}}>
                      {faq.question}
                  </Text>
                  <FontAwesome5 name={'arrow-circle-right'} size={20} color={'black'} />

              </View>
          </TouchableOpacity>
        )
    }
    if (faqs === null){
        return < Loader />
    }else if(faqs.length === 0){
        return NoData('questions');
    }
    return (
      <View style={{flex: 1,paddingVertical:5}}>
          <ScrollView style={{backgroundColor:'#eee'}}>
              {
                  faqs.map((data,i) => {
                      return  faqCard(data,i)
                  })
              }
          </ScrollView>
          <Modal isVisible={isModalVisible} >
              <View style={{flex: .7,borderWidth:.2,backgroundColor:'#eee',}}>
                  <View style={{borderBottomWidth:.5,paddingBottom:10,padding:10}}>
                      <View>
                          {MyButton(() => {toggleModal({question:null,answer:null})},'Back','','arrow-left')}
                      </View>
                  </View>
                  <View style={{ backgroundColor:'#fff',height:'88%',paddingVertical:20,alignItems:'center'}}>
                      <ScrollView style={{width:'80%',}} >
                          <Text style={{fontSize:20}}>
                              {QuestAnswer.question}
                          </Text>
                          <Text style={{marginTop:10}}>
                              {QuestAnswer.answer}</Text>
                      </ScrollView>
                  </View>
              </View>

          </Modal>
      </View>
    );
}

export default Faqs;
