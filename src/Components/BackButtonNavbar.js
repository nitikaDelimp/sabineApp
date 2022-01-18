import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Back from '../Assets/img/back.png';
import Header from './Header';
import {useNavigation} from '@react-navigation/native';

const BackButtonNavbar = (props) => {

  const { leftIcon , prop,   leftHeaderIcon,
    leftIconSource,rightIcon,  } = props;
  const navigation = useNavigation();
  return (
    <Header style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: 30,
        }}>
        <Image
          // source={Back}
          source={leftIconSource}
          style={{width: 20, height: 20}}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
      <View
        style={{
          width: 70,
        
        }}
      />
      <TouchableOpacity
        style={{
          width: 35,
        }}
      >
        <Image source ={rightIcon} style={{width: 40, height: 45}}
          resizeMode={'contain'} />
        </TouchableOpacity>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default BackButtonNavbar;
