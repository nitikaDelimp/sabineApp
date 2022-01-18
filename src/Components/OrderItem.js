import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Product4 from '../Assets/img/product4.png';
import {useNavigation} from '@react-navigation/native';

const OrderItem = props => {
  const {item} = props;
  const {width} = Dimensions.get('window');
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderDetails', {id: item?.id})}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.productImgBox}>
          <Image
            source={require('../Assets/img/logo.png')}
            resizeMode={'contain'}
            style={styles.productImg}
          />
        </View>
        <View style={{paddingLeft: 10, width: Math.ceil(width - 150) - 16 * 2}}>
          <Text style={{fontSize: 15, marginBottom: 10}}>
            ORDER NO-{item?.id}
          </Text>
          <Text style={{color: '#8c8c8c', marginBottom: 4}}>
            Ordered at on {item?.date_created_gmt}
          </Text>

          <Text style={{color: '#8c8c8c', fontWeight: 'bold'}}>
            Amount : {item?.total}
          </Text>
        </View>
      </View>
      <View style={styles.DividerLineStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productImgBox: {
    width: 150,
    height: 150,
  },

  productImg: {width: 150, height: 150},
  DividerLineStyle: {
    borderStyle: 'solid',
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default OrderItem;
