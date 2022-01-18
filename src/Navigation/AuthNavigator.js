import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Authentication from '../Screens/Authentication';
import ScreenTransition from './ScreenTransition';
const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      cardOverlayEnabled: true,
      gestureEnabled: true,
      ...ScreenTransition,
    }}>
    <Stack.Screen
      name="Authentication"
      component={Authentication}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
