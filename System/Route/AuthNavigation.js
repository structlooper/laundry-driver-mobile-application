import React from "react";
import { View, Text ,TouchableOpacity,Image} from "react-native";

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSidebarMenu from "./CustomSliderMenu";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {mainColor} from "../Utility/MyLib";

import Test from '../View/Test'
import OrderSlider from "../View/Orders/OrderSlider";
import Earnings from "../View/Earnings";
import Profile from "../View/Profile";
import AboutUs from "../View/AboutUs";
import Contact from "../View/Contact";
import TermsAndConditions from "../View/TermsAndConditions";
import Faq from "../View/Faq/Faq";
import Notifications from "../View/Notifications";
import OrderDetails from "../View/Orders/OrderDetails";
import AddProducts from "../View/Orders/AddProducts";
import PriceList from "../View/Price/PriceList";
import RequestPayment from "../View/Payment/RequestPayment";
import Barcodes from "../View/PayBarcodes/Barcodes";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const iconsSize = 20;

const NavigationDrawerStructure = (props) => {


  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => props.navigationProps.toggleDrawer()}>
        <Image
          source={require('../Public/Images/menu.png')}
          style={{width: 28, height: 28, marginLeft: 18}}
        />

      </TouchableOpacity>
    </View>
  );
};

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'HomeTab':
      return 'Pickup & Deliveries';
    case 'Profile':
      return 'Account';
    case 'Notification':
      return 'Notifications';
    case 'Earnings':
      return 'Earnings';
    case 'Service':
      return 'Home';
  }
};
const BottomStack = () => {

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      tabBarOptions={{
        activeTintColor: mainColor,
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: 'white',
          padding:4,
        },
        indicatorStyle: { backgroundColor: 'black'},
        // showLabel: false,
      }}>

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',

          tabBarIcon:({color , size}) => (
            <FontAwesome5 name={'user-edit'} size={iconsSize} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="HomeTab"
        component={OrderSlider}
        options={{
          tabBarLabel: 'Pickup & Deliveries',

          tabBarIcon:({color , size}) => (
            <FontAwesome5 name={'truck'} size={iconsSize} color={color} />
          ),

        }}

      />

      <Tab.Screen
        name="Earnings"
        component={Earnings}
        options={{
          tabBarLabel: 'Earnings',

          tabBarIcon:({color , size}) => (
            <FontAwesome5 name={'hand-holding-usd'} size={iconsSize+4} color={color} />
          )
        }}
      />



    </Tab.Navigator>
  );
};
const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName='Pickup & Deliveries'
                     screenOptions={({route}) => ({
                       headerTitle: getHeaderTitle(route),

                       headerRight: () => (
                         <TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>
                           <FontAwesome5 name={'bell'} size={iconsSize} color={mainColor} style={{marginRight:15}} />
                         </TouchableOpacity>
                       ),
                       headerStyle: {
                         backgroundColor: '#fff',
                       },
                       headerTintColor: '#000',
                       headerTitleStyle: {
                         // fontWeight: 'bold',
                       },
                     })}
    >
      <Stack.Screen
        name='Pickup & Deliveries'
        component={BottomStack}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure
              navigationProps={navigation}
            />
          ),
        }}
      />

      <Stack.Screen
        name="TimeBar"
        component={Test}

        options={({route}) => ({
          title: 'Time Slot',
        })}


      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}

        options={({route}) => ({
          title: 'Notifications',
        })}


      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}

        options={({route}) => ({
          title: 'Order Details',
        })}


      />
      <Stack.Screen
        name="OrderDetailsAddProducts"
        component={ AddProducts }

        options={({route}) => ({
          title: 'Add Products',
        })}


      />
      <Stack.Screen
        name="requestPayment"
        component={ RequestPayment }

        options={({route}) => ({
          title: 'Payment',
        })}


      />
    </Stack.Navigator>
  );
};

const FaqScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Faqs"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>
            <FontAwesome5 name={'bell'} size={iconsSize} color={mainColor} style={{marginRight:15}} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
      }}>
      <Stack.Screen
        name="Faqs"
        component={Faq}
        options={{
          title: 'Faqs',
        }}
      />


    </Stack.Navigator>
  );
};

const AboutScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="AboutUs"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>
            <FontAwesome5 name={'bell'} size={iconsSize} color={mainColor} style={{marginRight:15}} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
      }}>
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: 'About us',
        }}
      />


    </Stack.Navigator>
  );
};
const ContactScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Contact"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>
            <FontAwesome5 name={'bell'} size={iconsSize} color={mainColor} style={{marginRight:15}} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
      }}>
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          title: 'Contact us',
        }}
      />


    </Stack.Navigator>
  );
};
const TermsAndConditionsScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="TermsAndCondition"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>
            <FontAwesome5 name={'bell'} size={iconsSize} color={mainColor} style={{marginRight:15}} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
      }}>
      <Stack.Screen
        name="TermsAndCondition"
        component={TermsAndConditions}
        options={{
          title: 'Contact us',
        }}
      />


    </Stack.Navigator>
  );
};
const PriceListScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="PriceList"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>
            <FontAwesome5 name={'bell'} size={iconsSize} color={mainColor} style={{marginRight:15}} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
      }}>
      <Stack.Screen
        name="PriceList"
        component={ PriceList }
        options={{
          title: 'Price list',
        }}
      />


    </Stack.Navigator>
  );
};
const BarcodesScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Barcode"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>
            <FontAwesome5 name={'bell'} size={iconsSize} color={mainColor} style={{marginRight:15}} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
      }}>
      <Stack.Screen
        name="Barcode"
        component={ Barcodes }
        options={{
          title: 'Barcodes',
        }}
      />


    </Stack.Navigator>
  );
};
const MainNavigator = () => {
  return (
    // <NavigationContainer>
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: mainColor,
        itemStyle: {marginVertical: 5},
      }}
      drawerStyle={{
        backgroundColor: '#eee',
        width: 240,
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >

      <Drawer.Screen
        name="HomeScreenStack"
        options={{
          drawerLabel: 'Pickup & Deliveries',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'bus'} size={iconsSize} color={color} style={{marginRight:-20}} />
          ),
        }}

        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="PriceListScreenStack"
        options={{
          drawerLabel: 'Price list',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'tag'} size={size - 2} color={color} style={{marginRight:-20,marginLeft:4}} />
          )

        }}
        component={PriceListScreenStack}
      />
      <Drawer.Screen
        name="BarcodesScreenStack"
        options={{
          drawerLabel: 'Barcodes',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'barcode'} size={size - 2} color={color} style={{marginRight:-20,marginLeft:4}} />
          )

        }}
        component={BarcodesScreenStack}
      />
      <Drawer.Screen
        name="aboutUs"
        options={{
          drawerLabel: 'About us',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'scroll'} size={size - 8} color={color} style={{marginRight:-20,marginLeft:4}} />
          )

        }}
        component={AboutScreenStack}
      />
      {/*<Drawer.Screen*/}
      {/*  name="contactUs"*/}
      {/*  options={{*/}
      {/*    drawerLabel: 'Contact us',*/}
      {/*    drawerIcon:({color , size}) => (*/}
      {/*      <FontAwesome5 name={'inbox'} size={size - 8} color={color} style={{marginRight:-20,marginLeft:4}} />*/}
      {/*    )*/}

      {/*  }}*/}
      {/*  component={ContactScreenStack}*/}
      {/*/>*/}
      <Drawer.Screen
        name="TermsAndConditions"
        options={{
          drawerLabel: 'Terms & Conditions',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'file-alt'} size={size - 6} color={color} style={{marginRight:-20,marginLeft:4}} />
          )

        }}
        component={TermsAndConditionsScreenStack}
      />
      <Drawer.Screen
        name="FaqScreenStack"
        options={{
          drawerLabel: 'Faqs',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'question-circle'} size={size - 6} color={color} style={{marginRight:-20,marginLeft:4}} />
          )

        }}
        component={FaqScreenStack}
      />


    </Drawer.Navigator>
    // </NavigationContainer>
  );
};
const AuthNavigation = () => {
  return (
    <MainNavigator />
  );
};
export default AuthNavigation;

