import React from 'react';
import {View} from 'react-native';

const Header = ({children, style}) => {
  return <View style={style}>{children}</View>;
};

export default Header;
