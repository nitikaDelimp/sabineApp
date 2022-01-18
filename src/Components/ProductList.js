import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ProImg3 from '../Assets/img/product3.png';

const ProductList = ({navigation}) => {
  return (
    <>
      <View style={styles.ItemBox}>
        <TouchableOpacity
          style={styles.InnerBox}
          onPress={() => navigation.navigate('MainScreen')}>
          <View style={styles.ImgBox}>
            <Image source={ProImg3} style={styles.image} />
          </View>
          <Text style={{textAlign: 'center', marginVertical: 14}}>
            {'Colorwow'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
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
export default ProductList;
