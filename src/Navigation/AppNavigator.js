import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import AppDrawer from '../Components/AppDrawer';
import HomeNavigator from './HomeNavigator';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}
      drawerContent={props => <AppDrawer {...props} />}>
      <Drawer.Screen name="Home" component={HomeNavigator} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
