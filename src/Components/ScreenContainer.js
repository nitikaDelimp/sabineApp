import React from 'react';
import {StyleSheet, View} from 'react-native';

const ScreenContainer = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingBottom: 50,
  },
});
export default ScreenContainer;
