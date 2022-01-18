import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Header from '../Components/Header';
import BrandName from '../Components/Logo';
import Hamburger from '../Assets/img/hamburger.png';
import ShoppingBag from '../Assets/img/shopping-bag.png';
import Banner from '../Components/Banner';
import DividerLine from '../Components/DividerLine';
import OfferCard from '../Components/OfferCard';
import CategoryOne from '../Assets/img/ctgr1.jpg';
import CategoryTwo from '../Assets/img/ctgr2.jpg';
import {DrawerActions} from '@react-navigation/routers';
import ProImg3 from '../Assets/img/product3.png';
const New = ({navigation}) => {
  const OfferData = [
    {
      id: '',
      label: 'Aurora',
      price: '2,530.00 SAR',
      image: CategoryOne,
    },
    {
      id: '',
      label: 'Giselle',
      price: '2,530.00 SAR',
      image: CategoryTwo,
    },
  ];
  return (
    <>
      <Header style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
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

      <ScrollView style={{marginBottom: 50}}>
        <DividerLine />

        <View style={styles.bannerBox}>
          <Banner />
        </View>

        <View style={styles.Container}>
          <OfferCard navigation={navigation} OfferData={OfferData} />
        </View>

        <View style={{padding: 20}}>
          <Text style={{textAlign: 'center', fontSize: 18}}>
            Modern Simplicity
          </Text>
          <Text style={{textAlign: 'center', marginHorizontal: 10}}>
            Don’t miss the labes’s effortless stylish new arrivals
          </Text>
        </View>

        <View style={styles.Container}>
          <View style={styles.ItemBox}>
            <TouchableOpacity
              style={styles.InnerBox}
              onPress={() => navigation.navigate('ProductPage')}>
              <View style={styles.ImgBox}>
                <Image source={ProImg3} style={styles.image} />
              </View>
              <Text style={{textAlign: 'center', marginVertical: 14}}>
                {'Colorwow'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ItemBox}>
            <TouchableOpacity
              style={styles.InnerBox}
              onPress={() => navigation.navigate('ProductPage')}>
              <View style={styles.ImgBox}>
                <Image source={ProImg3} style={styles.image} />
              </View>
              <Text style={{textAlign: 'center', marginVertical: 14}}>
                {'Colorwow'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ItemBox}>
            <TouchableOpacity
              style={styles.InnerBox}
              onPress={() => navigation.navigate('ProductPage')}>
              <View style={styles.ImgBox}>
                <Image source={ProImg3} style={styles.image} />
              </View>
              <Text style={{textAlign: 'center', marginVertical: 14}}>
                {'Colorwow'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ItemBox}>
            <TouchableOpacity
              style={styles.InnerBox}
              onPress={() => navigation.navigate('ProductPage')}>
              <View style={styles.ImgBox}>
                <Image source={ProImg3} style={styles.image} />
              </View>
              <Text style={{textAlign: 'center', marginVertical: 14}}>
                {'Colorwow'}
              </Text>
            </TouchableOpacity>
          </View>
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
  logoImg: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
  },
  border: {
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  bannerBox: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },

  ItemBox: {
    width: '50%',
    padding: 5,
    height: 270,
    marginBottom: 20,
  },
  ImgBox: {
    height: 220,
    backgroundColor: '#e3e3e3',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    height: '100%',
  },
  InnerBox: {
    height: '100%',
  },
});

export default New;
