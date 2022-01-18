import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../Layout/Colors';
import {Card} from 'react-native-elements';
import Font from '../Layout/Font';
import Device from '../Layout/Device';
import ImageCollage from '../Components/ImageCollage';
import MainNavbar from '../Components/MainNavbar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../Reducers/Cart.slice';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems())
  }, [])
  const collageSetOne = [
    {
      image: require('../Assets/img/collage/one.jpg'),
    },
    {
      image: require('../Assets/img/collage/two.jpg'),
    },
    {
      image: require('../Assets/img/collage/three.jpg'),
    },
    {
      image: require('../Assets/img/collage/four.jpg'),
    },
    {
      image: require('../Assets/img/collage/five.jpg'),
    },
  ];
  const collageSetTwo = [
    {
      image: require('../Assets/img/collage/six.jpg'),
    },
    {
      image: require('../Assets/img/collage/seven.jpg'),
    },
    {
      image: require('../Assets/img/collage/eight.jpg'),
    },
    {
      image: require('../Assets/img/collage/nine.jpg'),
    },
    {
      image: require('../Assets/img/collage/ten.jpg'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <MainNavbar navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          <Card containerStyle={styles.card}>
            <View style={styles.center}>
              <Text style={styles.cardTitle}>Whats New</Text>
            </View>
            <View style={[styles.center,{ marginVertical:.5}]}>
              <Text style={styles.cardSubTitle}>
                Don't miss the Labes's effortless stylish
              </Text>
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={styles.shopNowButtonText}>Shop Now</Text>
            </View>
            <View style={{marginVertical: 10}}>
              <Image
                style={{width: 250, height: 150}}
                source={require('../Assets/img/banner.png')}
              />
            </View>
          </Card>
          <View style={styles.bannerWrapper}>
            <ImageCollage images={collageSetOne} />
          </View>
          <View style={styles.bannerWrapper}>
            <ImageCollage images={collageSetTwo} />
          </View>
          <View style={styles.bannerWrapper}>
            <ImageCollage images={collageSetOne} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 15,
    paddingTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(10)
  },
  contentWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  card: {
    width: Device.width * 0.92,
    alignItems: 'center',
    backgroundColor: Colors.invertBackground,
  },
  imageCard: {
    width: Device.width * 0.98,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mutedText,
  },
  cardTitle: {
    fontFamily: Font.LatoRegular,
    fontSize: 16,
    color: Colors.black
  },
  cardSubTitle: {
    fontFamily: Font.LatoRegular,
    fontSize: 12,
    alignSelf: 'center',
    color: '#8c8c8c',
  },
  shopNowButtonText: {
    fontFamily: Font.LatoRegular,
    fontSize: 12,
    alignSelf: 'center',
    color: '#8c8c8c',
    textDecorationLine:'underline'
  },
  imageCollageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collageImage: {
    width: Device.width * 0.98 * 0.2,
    height: 250,
  },
  bannerWrapper:{marginVertical: 10,width: Device.width * 0.92,elevation: 2, backgroundColor: Colors.white}
});
