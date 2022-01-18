import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Hamburger from '../Assets/img/hamburger.png';
import BrandName from './Logo';
import ShoppingBag from '../Assets/img/shopping-bag.png';
import Header from './Header';
import {useNavigation} from '@react-navigation/native';
import Colors from '../Layout/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import Font from '../Layout/Font';

const MainNavbar = () => {
  const navigation = useNavigation();

  const {cart} = useSelector((state) => state.cart)
  
  return (
    <Header>
      <View  style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation?.openDrawer()}
        style={{
          width: wp(20),
        }}>
        <Image source={Hamburger} style={{width: 25, height: 14}} />
      </TouchableOpacity>
      <View
        style={{
          width: wp(50),
        }}>
        <BrandName />
      </View>
      <View  style={{position:'relative'}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ShoppingCart')}
        style={{
          width: wp(20),paddingLeft:wp(10)
        }}>
        <View style={{position:'absolute', right:-4, top:0, backgroundColor: Colors.black, width:wp(5),alignItems:'center',justifyContent:'center', height:hp(3), borderRadius:10}}>
            <Text style={{fontFamily:Font.LatoBold, color: '#fff', fontSize: 12}}>{cart?.length}</Text>
            </View>
        <Image
          source={ShoppingBag}
          style={{width: wp(8),}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      </View>
    
      </View>
      <View style={{marginHorizontal:wp(4), height:hp(.1), backgroundColor:'#848484'}}/>

    </Header>

  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal:wp(5),
    paddingVertical:hp(.8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
});

export default MainNavbar;
