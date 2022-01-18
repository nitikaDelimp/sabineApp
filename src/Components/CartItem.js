import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Font from '../Layout/Font';
import Colors from '../Layout/Colors';
import {Divider, Icon} from 'react-native-elements';
import Device from '../Layout/Device';

import {api, UPDATE_CART_ITEM_URL} from '../Services/Api';
import {useDispatch} from 'react-redux';
import {getCartItems} from '../Reducers/Cart.slice';
import {showWithGravity} from '../Utils/Notify';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CartItem = props => {
  const dispatch = useDispatch();
  const [item, setItem] = useState([]);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    if (props?.item) {
      setItem(props?.item);
      setQuantity(props?.item?.quantity?.value);
    }
  }, [props?.item]);

  const counter = arithmetic => {
    let newQty = 0;
    if (arithmetic === 'plus') {
      newQty = quantity + 1;
    }
    if (arithmetic === 'minus') {
      if (quantity > 0) {
        newQty = quantity - 1;
      } else {
        newQty = 0;
      }
    }
    (async () => {
      await updateCart(item?.item_key, newQty);
    })();
  };

  const updateCart = async (itemKey, qty) => {
    try {
      const params = {
        item_key: itemKey.toString(),
        quantity: parseFloat(qty),
        return_cart: false,
      };
      props?.setLoader(true);
      const response = await api.post(UPDATE_CART_ITEM_URL + itemKey, params);
      if (response.status === 200) {
        setQuantity(qty);
        dispatch(getCartItems());
        showWithGravity('Cart Quantity Updated Successfully');
      }
    } catch (error) {
      showWithGravity(error?.toString());
    } finally {
      props?.setLoader(false);
    }
  };

  const removeCartItem = async itemKey => {
    try {
      const params = {
        item_key: itemKey.toString(),
      };
      props?.setLoader(true);
      const response = await api.delete(UPDATE_CART_ITEM_URL + itemKey, params);
      if (response.status === 200) {
        dispatch(getCartItems());
        showWithGravity('Cart Item Removed Successfully');
      }
    } catch (error) {
      showWithGravity(error?.toString());
    } finally {
      props?.setLoader(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <View>
          <Image style={styles.image} source={{uri: item?.featured_image}} />
        </View>
        <View style={styles.paddingHorizontal(8)}>
          <View style={[styles.marginVertical(6),{ width:wp(50)}]}>
            <Text
              ellipsizeMode="middle"
              style={styles.productName}>
              {item?.name}
            </Text>
          </View>
          <View style={[styles.marginVertical(5)]}>
            <View>
              <Text style={styles.dataDefinition}>
                Size: {item?.meta?.variation?.size}
              </Text>
            </View>
          </View>
          <View style={styles.priceSection}>
            <View>
              <Text style={styles.dataDefinition}>
                Price: {item?.totals?.total}
              </Text>
            </View>
            <View>
              <View style={styles.counterButtonWrapper}>
                <TouchableOpacity
                  onPress={() => counter('plus')}
                  style={[{borderRightWidth: 0}, styles.counterButton]}>
                  <Icon name={'plus'} type={'font-awesome-5'} size={15} />
                </TouchableOpacity>
                <View style={styles.counterButton}>
                  <Text>{quantity}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => counter('minus')}
                  style={[{borderLeftWidth: 0}, styles.counterButton]}>
                  <Icon name={'minus'} type={'font-awesome-5'} size={15} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.buttonSection}>
          <TouchableOpacity
            onPress={async () => await removeCartItem(item?.item_key)}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Move To WishList</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  marginVertical(mv) {
    return {
      marginVertical: mv,
    };
  },
  paddingHorizontal(ph) {
    return {
      paddingHorizontal: ph,
    };
  },
  card: {
    width: Device.width * 0.95,
  },
  cardBody: {
    flexDirection: 'row',
  },
  cardFooter: {
    marginVertical: 10,
  },
  image: {
    width: 140,
    height: 120,
  },
  productName: {
    fontFamily: Font.LatoBold,
    fontSize: 15,
    color: Colors.black,
  },
  dataDefinition: {
    fontFamily: Font.LatoRegular,
    fontSize: 13,
    color: Colors.mutedText,
  },
  dataDescription: {
    fontFamily: Font.LatoRegular,
    fontSize: 12,
    color: Colors.mutedText,
  },
  price: {
    fontFamily: Font.LatoBold,
    fontSize: 14,
    color: Colors.mutedText,
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: Font.LatoRegular,
    fontSize: 14,
    color: Colors.mutedText,
    textDecorationLine:'underline'
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    marginVertical: 10,
    backgroundColor: Colors.black,
    borderWidth: 0.5,
  },
  priceSection: {
    width: Device.width * 0.5,
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButton: {
    width: 25,
    height: 25,
    borderWidth: 0.5,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartItem;
