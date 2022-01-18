import React from 'react';
import {Image, StyleSheet} from 'react-native';
import BannerImg from '../Assets/img/aguga-banner.jpg';

const Banner = () => {
  return (
    <Image style={styles.BannerStyle} source={BannerImg} resizeMode="stretch" />
  );
};

export default Banner;

const styles = StyleSheet.create({
  BannerStyle: {
    width: '100%',
    height: 130,
  },
});
