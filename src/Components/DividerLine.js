import React from 'react';
import {StyleSheet, View} from 'react-native';

const DividerLine = () => {
  return <View style={styles.DividerLineStyle} />;
};

const styles = StyleSheet.create({
  DividerLineStyle: {
    borderStyle: 'solid',
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
    marginBottom: 22,
  },
});
export default DividerLine;
