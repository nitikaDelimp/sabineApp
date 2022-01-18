import React from 'react';
import {StyleSheet, Image} from 'react-native';
import Logo from '../Assets/img/logo.png';

const BrandName = () => {
  return <Image source={Logo} style={styles.logoImg} />;
};

export default BrandName;

const styles = StyleSheet.create({
  logoImg: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
  },
});
