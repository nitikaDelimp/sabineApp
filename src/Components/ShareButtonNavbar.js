import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Layout/Colors';
import {useNavigation} from '@react-navigation/native';

function ShareButtonNavbar() {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Ionicons name="chevron-back" size={25} color={Colors.black} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
  },
});
export default ShareButtonNavbar;
