import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AtoZIcon from '../Assets/img/right.png';
import SettingsIcon from '../Assets/img/settings.png';
import HeartIcon from '../Assets/img/heart.png';
import SearchIcon from '../Assets/img/search.png';

const Tab = ({tab, onPress, color}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {tab.name === 'New' && (
        <Text style={{color, fontSize: 16, fontWeight: 'bold'}}>
          {tab.name}
        </Text>
      )}

      {tab.name === 'AtoZ' && (
        <Image source={AtoZIcon} resizeMode={'contain'} style={styles.image} />
      )}

      {tab.name === 'Search' && (
        <Image
          source={SearchIcon}
          resizeMode={'contain'}
          style={styles.image}
        />
      )}

      {tab.name === 'Wishlist' && (
        <Image source={HeartIcon} resizeMode={'contain'} style={styles.image} />
      )}
      {tab.name === 'Setting' && (
        <Image
          source={SettingsIcon}
          resizeMode={'contain'}
          style={styles.image}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  image: {width: '100%', height: 22},
});
export default Tab;
