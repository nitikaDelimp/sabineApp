import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Header from '../Components/Header';
import BrandName from '../Components/Logo';
import Hamburger from '../Assets/img/hamburger.png';
import ShoppingBag from '../Assets/img/shopping-bag.png';
import DividerLine from '../Components/DividerLine';
import MainProductCard from '../Components/MainProductCard';

const MainScreen = ({navigation}) => {
  return (
    <>
      <Header style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{
            width: 30,
          }}>
          <Image source={Hamburger} style={{width: 25, height: 13}} />
        </TouchableOpacity>
        <View
          style={{
            width: 70,
          }}>
          <BrandName />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ShoppingCart')}
          style={{
            width: 30,
          }}>
          <Image
            source={ShoppingBag}
            style={{width: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Header>
      <ScrollView>
        <DividerLine />
        <View style={styles.Container}>
          <MainProductCard navigation={navigation} />
          <MainProductCard navigation={navigation} />
          <MainProductCard navigation={navigation} />
          <MainProductCard navigation={navigation} />
          <MainProductCard navigation={navigation} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    flex: 1,
    marginTop: 14,
  },
});
export default MainScreen;
