import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Product4 from '../Assets/img/product4.png';

const ShoppingCartItem = () => {
  const {width} = Dimensions.get('window');
  const detailsWhite = Math.ceil(width - 150) - 16 * 2;

  const [qualityCount, setQualityCount] = useState(1);
  const AddQualityCount = () => {
    setQualityCount(qualityCount + 1);
  };
  const RemoveQualityCount = () => {
    setQualityCount(qualityCount - 1);
  };
  return (
    <>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <View style={styles.productImgBox}>
          <Image
            source={Product4}
            resizeMode={'cover'}
            style={styles.productImg}
          />
        </View>
        <View style={{paddingLeft: 10, width: detailsWhite}}>
          <Text style={{fontSize: 18, marginBottom: 10}}>Gloria Cami</Text>
          <Text style={{color: '#8c8c8c'}}>Colour: Burnt Sugar</Text>
          <Text style={{color: '#8c8c8c'}}>Fabric content: 100% Silk</Text>
          <Text style={{color: '#8c8c8c', marginVertical: 10}}>Size: xs</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{fontWeight: 'bold', color: '#8c8c8c'}}>$372.00</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={AddQualityCount} style={styles.add}>
                <Text style={{textAlignVertical: 'center'}}>+</Text>
              </TouchableOpacity>
              <Text style={styles.count}>
                {qualityCount <= 0 ? '0' : qualityCount}
              </Text>
              <TouchableOpacity
                onPress={qualityCount <= 0 ? null : RemoveQualityCount}
                style={styles.remove}>
                <Text style={{textAlignVertical: 'center'}}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <TouchableOpacity>
              <Text style={styles.underline}>Romove</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.underline}>Move to wishlist</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  underline: {
    color: '#8c8c8c',
    textDecorationColor: '#8c8c8c',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  add: {
    borderColor: '#8c8c8c',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRightWidth: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  count: {
    borderColor: '#8c8c8c',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 5,
    paddingHorizontal: 12,
    textAlignVertical: 'center',
  },
  remove: {
    borderColor: '#8c8c8c',
    borderWidth: 1,
    borderStyle: 'solid',
    borderLeftWidth: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  productImgBox: {
    width: 150,
    height: 200,
  },
  productImg: {width: '100%', height: '100%'},
});
export default ShoppingCartItem;
