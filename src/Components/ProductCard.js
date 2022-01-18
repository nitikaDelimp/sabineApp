import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ProImg3 from '../Assets/img/product3.png';

const ProductCard = ({navigation}) => {
  return (
    <TouchableOpacity
      style={styles.ItemBox}
      onPress={() => navigation.navigate('ProductPage')}>
      <View style={styles.InnerBox}>
        <View style={styles.ImgBox}>
          <Image source={ProImg3} style={styles.image} />
        </View>
        <Text style={{textAlign: 'center', marginVertical: 14}}>
          {'Colorwow'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
export default ProductCard;
