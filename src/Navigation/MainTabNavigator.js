import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../Components/TabBar';
import React from 'react';
import Home from '../Screens/Home';
import AtoZ from '../Screens/AtoZ';
import Search from '../Screens/Search';
import Wishlist from '../Screens/Wishlist';

import Setting from '../Screens/Setting';
import About from '../Screens/About';
import Profile from '../Screens/Profile';
import Notification from '../Screens/Notification';
import Appearance from '../Screens/Appearance';
import Security from '../Screens/Security';
import Support from '../Screens/Support';
import {createStackNavigator} from '@react-navigation/stack';
import Products from '../Screens/Products';
import MyAccount from '../Screens/MyAccount';
import MyOrder from '../Screens/MyOrder';
import Address from '../Screens/Address';
import SavedCards from '../Screens/SavedCards';
import Designer from '../Screens/Designer';
import MyAddress from '../Screens/MyAddress';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const NewStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="New" component={Home} />
    </Stack.Navigator>
  );
};
const AtoZStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AtoZ" component={AtoZ} />
      <Stack.Screen name="Designer" component={Designer} />
    </Stack.Navigator>
  );
};
const SearchStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen
        options={{headerShown: false}}
        name="Products"
        component={Products}
      />
    </Stack.Navigator>
  );
};
const WishlistStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Wishlist" component={Wishlist} />
    </Stack.Navigator>
  );
};

const SettingStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="MyOrder" component={MyOrder} />
      <Stack.Screen name="SavedCards" component={SavedCards} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Appearance" component={Appearance} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="MyAddress" component={MyAddress} />

      
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="New" component={NewStackNavigator} />
      <Tab.Screen name="AtoZ" component={AtoZStackNavigator} />
      <Tab.Screen name="Search" component={SearchStackNavigator} />
      <Tab.Screen name="Wishlist" component={WishlistStackNavigator} />
      <Tab.Screen name="Setting" component={SettingStackNavigator} />
    </Tab.Navigator>
  );
};
export default MainTabNavigator;
