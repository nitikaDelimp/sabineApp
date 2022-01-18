import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import BottomTabContent from './navigation/BottomTabContent';

import Authentication from './Screens/Authentication';
import HomeNavigator from './Navigation/HomeNavigator';
import ProductPage from './Screens/ProductPage';
import OrderDetails from './Screens/OrderDetails';
import MyOrder from './Screens/MyOrder';
import PaymentWebView from './Screens/PaymentWebView';
import Checkout from './Screens/Checkout';
import ShoppingCart from './Screens/ShoppingCart';
import Home from './Screens/Home';
import AtoZ from './Screens/AtoZ';
import Designer from './Screens/Designer';
import Search from './Screens/Search';
import Products from './Screens/Products';
import Wishlist from './Screens/Wishlist';
import Setting from './Screens/Setting';
import MyAccount from './Screens/MyAccount';
import Profile from './Screens/Profile';
import Address from './Screens/Address';
import SavedCards from './Screens/SavedCards';
import Notification from './Screens/Notification';
import Appearance from './Screens/Appearance';
import Security from './Screens/Security';
import Support from './Screens/Support';
import About from './Screens/About';
import MyAddress from './Screens/MyAddress';
import SplashScreen from './SplashScreen';
import AppDrawer from './Components/AppDrawer';
import TabBar from './Components/TabBar';



const Stack = createStackNavigator();

function StackNavigator({ navigation, route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false, animationEnabled: false }}
            />
            <Stack.Screen
                name="Authentication"
                component={Authentication}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="HomeTabScreens"
                component={SideDrawer}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="AtoZ" component={AtoZ} />
            <Stack.Screen name="Designer" component={Designer} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Products"
                component={Products}
            />
            <Stack.Screen name="Wishlist" component={Wishlist} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="MyAccount" component={MyAccount} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="Address" component={Address} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="MyOrder" component={MyOrder} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="SavedCards" component={SavedCards} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="Appearance" component={Appearance} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="Security" component={Security} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="Support" component={Support} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="About" component={About} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="MyAddress" component={MyAddress} options={{ headerShown: false, animationEnabled: false }} />
            {/* <Stack.Screen
      name="HomeTabScreens"
      component={MainTabNavigator}
      options={{headerShown: false}}
    /> */}
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
}

const Drawer = createDrawerNavigator();
function SideDrawer({ navigation, route }) {
    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: '#e91e63',
                itemStyle: { marginVertical: 5 },
            }}
            drawerContent={props => <AppDrawer {...props} />}>
            <Drawer.Screen name="Home" component={MainTabNavigator} />
        </Drawer.Navigator>

    );
}


const Tab = createBottomTabNavigator();

function MainTabNavigator({ navigation, route }) {
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
            <Tab.Screen name="New" component={Home} />
            <Tab.Screen name="AtoZ" component={AtoZ} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Wishlist" component={Wishlist} />
            <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
    );
};


export default function AuthToHome() {
    return (
        <NavigationContainer independent={true}>
            <StackNavigator />
        </NavigationContainer>
    );
}
