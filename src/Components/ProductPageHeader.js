import React, { useEffect, useState } from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import BrandName from './Logo';
import Header from './Header';
import Back from '../Assets/img/back.png';
import ShoppingBag from '../Assets/img/shopping-bag.png';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Colors from '../Layout/Colors';
import { getCartItems } from '../Reducers/Cart.slice';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import Font from '../Layout/Font';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


function ProductPageHeader() {
  const navigation = useNavigation();

  const {cart} = useSelector((state) => state.cart)

  return (
      <Header>
      <View  style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: wp(20),
        }}>
            <Image
          source={Back}
          style={{width: 20, height: 20}}
          resizeMode={'contain'}
        />
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
      <View style={{marginHorizontal:wp(6), height:hp(.1), backgroundColor:'#848484'}}/>

    </Header>

  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal:wp(5),
    paddingVertical:hp(.8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  headingText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 16,
  },
});

export default ProductPageHeader;
