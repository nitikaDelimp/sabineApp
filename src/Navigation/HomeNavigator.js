import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import MainTabNavigator from './MainTabNavigator';
import ShoppingCart from '../Screens/ShoppingCart';
import ProductPage from '../Screens/ProductPage';
import Checkout from '../Screens/Checkout';
import MyOrder from '../Screens/MyOrder';
import OrderDetails from '../Screens/OrderDetails';
import PaymentWebView from '../Screens/PaymentWebView';

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeTabScreens"
      component={MainTabNavigator}
      options={{headerShown: false}}
    />
    <Stack.Screen
      options={{headerShown: false}}
      name="ShoppingCart"
      component={ShoppingCart}
    />
    <Stack.Screen
      options={{headerShown: false}}
      name="Checkout"
      component={Checkout}
    />
    <Stack.Screen
      name="PaymentWebView"
      component={PaymentWebView}
      options={{headerShown: false}}
    />
    <Stack.Screen
      options={{headerShown: false}}
      name="OrderHistory"
      component={MyOrder}
    />
    <Stack.Screen
      options={{headerShown: false}}
      name="OrderDetails"
      component={OrderDetails}
    />
    <Stack.Screen
      options={{headerShown: false}}
      name="ProductPage"
      component={ProductPage}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
