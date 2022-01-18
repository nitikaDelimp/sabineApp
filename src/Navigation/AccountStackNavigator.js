import {createStackNavigator} from '@react-navigation/stack';
import AccountOld from '../Screens/AccountOld';
import React from 'react';

const Stack = createStackNavigator();
const AccountStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Account" component={AccountOld} />
    </Stack.Navigator>
  );
};
export default AccountStackNavigator;
