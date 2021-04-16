import React, {useState} from 'react';
import {Button, Text, View,ScrollView,TouchableOpacity} from 'react-native';
import {MyButton} from "../../Utility/MyLib";
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const faqCard = (toggleModal,question) => {
    return (
        <TouchableOpacity style={{padding:10,marginVertical:1,paddingHorizontal:20,backgroundColor:'#fff'}}
                          onPress={toggleModal}
        >
            <View style={{flexDirection:'row'}}>
                <Text style={{flex:.9}}>

                    {question}
                </Text>
                <FontAwesome5 name={'arrow-circle-right'} size={20} color={'black'} />

            </View>
        </TouchableOpacity>
    )
}

function Faqs() {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={{flex: 1,paddingVertical:5}}>
            <ScrollView style={{backgroundColor:'#eee'}}>
                {faqCard(toggleModal,'How do i book my pickup?')}
                {faqCard(toggleModal,'How will I know that my laundry has been picked-up?')}
                {faqCard(toggleModal,'My concierge doesn\'t accept laundry. What shall I do?')}
                {faqCard(toggleModal,'Do I need to count the items in my order?')}
                {faqCard(toggleModal,'What happens to my laundry bag?')}
                {faqCard(toggleModal,'What happens if driver attempts to pick-up or drop-off and fails?')}
                {faqCard(toggleModal,'How do I know if the driver is coming to pick my order?')}
                {faqCard(toggleModal,'What happens if I don’t sort my order between Dry Clean and Wash & Fold?')}

            </ScrollView>
            <Modal isVisible={isModalVisible} >
                <View style={{flex: .7,borderWidth:.2,backgroundColor:'#eee',}}>
                        <View style={{borderBottomWidth:.5,paddingBottom:10,padding:10}}>
                            <View style={{}}>
                                {MyButton(toggleModal,'Back','','arrow-left')}
                            </View>
                        </View>
                    <View style={{ backgroundColor:'#fff',height:'88%',paddingVertical:20,alignItems:'center'}}>
                        <ScrollView style={{width:'80%',}} >
                            <Text style={{fontSize:20}}>
                                How will I know that my laundry has been picked-up?
                            </Text>
                            <Text style={{marginTop:10}}>
                                We most certainly can sort your items on your behalf for an extra charge of $20. Also, you would be agreeing that if we added any item to either service, its not our responsibility. For example, if you wanted your sweaters to be wash and folded, but we chose the Dry Clean service as we were worried about shrinkage of the item, then its the customer responsibility, as we tried to sort the order to the best of our ability
                                We most certainly can sort your items on your behalf for an extra charge of $20. Also, you would be agreeing that if we added any item to either service, its not our responsibility. For example, if you wanted your sweaters to be wash and folded, but we chose the Dry Clean service as we were worried about shrinkage of the item, then its the customer responsibility, as we tried to sort the order to the best of our ability
                                We most certainly can sort your items on your behalf for an extra charge of $20. Also, you would be agreeing that if we added any item to either service, its not our responsibility. For example, if you wanted your sweaters to be wash and folded, but we chose the Dry Clean service as we were worried about shrinkage of the item, then its the customer responsibility, as we tried to sort the order to the best of our ability
                            </Text>
                        </ScrollView>
                    </View>



                    {/*<Button title="Hide modal" onPress={toggleModal} />*/}

                </View>

            </Modal>
        </View>
    );
}

export default Faqs;
