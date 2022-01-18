import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Logo from '../Assets/img/logo.png';

const Splash = () => {
  return (
    <View style={styles.splash}>
      <View style={styles.logo}>
        <Image source={Logo} style={styles.logoImg} />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
  },
  logoImg: {
    width: '100%',
    height: 70,
    resizeMode: 'contain',
  },
});
