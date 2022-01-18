import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import flagImg from '../Assets/img/flag.png';
import leftArrow from '../Assets/img/left-arrow.png';

const Menu = ({navigation}) => {
  const MenuData = [
    {
      label: 'Shipping Location',
      right_text: 'Sar',
      right_icon: flagImg,
      right_arrow: leftArrow,
    },
    {
      label: 'Wish List',
      right_arrow: leftArrow,
      link: 'Wishlist',
    },
    {
      label: 'My Orders',
      right_arrow: leftArrow,
      link: 'MyOrder',
    },
    {
      label: 'My Account',
      right_arrow: leftArrow,
      link: 'Profile',
    },
    {
      label: 'My Address',
      right_arrow: leftArrow,
      link: 'MyAddress',
    },
  ];
  return MenuData.map((item, index) => {
    return (
      <ScrollView>
      <TouchableOpacity
        style={styles.listItems}
        key={index}
        onPress={
          item.link
            ? () => {
                navigation.navigate(item.link);
              }
            : () => {}
        }>
        <Text>{item.label}</Text>
        <View style={styles.rightContent}>
          {item.right_text && (
            <Text style={{marginRight: 10}}>{item.right_text}</Text>
          )}
          {item.right_icon && (
            <Image source={item.right_icon} style={{marginRight: 10}} />
          )}
          {item.right_arrow && <Image source={item.right_arrow} />}
        </View>
      </TouchableOpacity>
      </ScrollView>
    );
  });
};

const styles = StyleSheet.create({
  listItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Menu;
