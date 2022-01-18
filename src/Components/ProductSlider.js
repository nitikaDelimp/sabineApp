import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Device from '../Layout/Device';
import Swiper from 'react-native-swiper';

const ProductSlider = props => {
  return (
    <View style={styles.container}>
      <Swiper
        height={Device.height * 0.65}
        style={styles.wrapper}
        showsButtons={false}
        showsPagination>
        {props?.images?.length > 0 &&
          props?.images.map((image, index) => {
            return (
              <View style={styles.slider} key={image?.src.toString()}>
                <View style={styles.sliderContent}>
                  <Image
                    key={index}
                    source={{uri: image?.src}}
                    style={styles.image}
                    resizeMode='contain'
                  />
                </View>
              </View>
            );
          })}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  wrapper: {},
  image: {
    width: Device.width * 0.9,
    height: Device.height * 0.65,
  },
  slider: {
    width: Device.width * 0.9,
    height: Device.height * 0.65,
  
  },
  sliderContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ProductSlider;
