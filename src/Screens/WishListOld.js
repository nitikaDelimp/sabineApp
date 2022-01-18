import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Header from '../Components/Header';
import BrandName from '../Components/Logo';
import Hamburger from '../Assets/img/hamburger.png';
import ShoppingBag from '../Assets/img/shopping-bag.png';
import Ctge1 from '../Assets/img/ctgr1.jpg';
import OfferCard from '../Components/OfferCard';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getWishlist} from '../Services/Storage';
import Colors from '../Layout/Colors';
const WishListOld = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        let list = await getWishlist();
        setWishlist(list);
      })();
    }
  }, [isFocused]);

  const OfferData = [
    {
      id: '',
      label: 'Giselle',
      price: '2,530.00 SAR',
      image: Ctge1,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Header style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Account')}
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
        <View style={{paddingHorizontal: 16}}>
          <TextInput style={styles.input} placeholder={'Search for...'} />
        </View>
        <View style={{paddingVertical: 40}}>
          <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 10}}>
            My Wishlist
          </Text>
          <Text style={{textAlign: 'center', color: '#8c8c8c'}}>
            Register to save your wishlist
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productCountWrapper}>
          <Text style={{color: '#8c8c8c'}}>1 item (s)</Text>
        </View>
        <View style={{paddingHorizontal: 10, paddingTop: 30}}>
          <OfferCard OfferData={OfferData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  productCountWrapper: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#d7d7d7',
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  header: {
    padding: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 28,
    marginBottom: 28,
    marginHorizontal: 40,
    backgroundColor: 'black',
    padding: 13,
    borderRadius: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  input: {
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
});
export default WishListOld;
