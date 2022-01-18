import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Divider} from 'react-native-elements';
import Colors from '../Layout/Colors';
import Device from '../Layout/Device';
import ShareButtonNavbar from '../Components/ShareButtonNavbar';
import Font from '../Layout/Font';
import CartItem from '../Components/CartItem';
import {useDispatch, useSelector} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {
  StackActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {getCartItems} from '../Reducers/Cart.slice';
import Loader from '../Components/Loader';

function ShoppingCart() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const {cart = {}, loading = false} = useSelector(state => state?.cart);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(getCartItems());
    }
  }, [isFocused]);

  useEffect(() => {
    if (cart) {
      let totalAmount = 0;
      let subTotalAmount = 0;
      let taxAmount = 0;
      cart.map(item => {
        totalAmount = totalAmount + parseFloat(item?.totals?.total);
        subTotalAmount = subTotalAmount + parseFloat(item?.totals?.subtotal);
        taxAmount = taxAmount + parseFloat(item?.totals?.subtotal_tax);
      });
      setTotal(totalAmount);
      setSubTotal(subTotalAmount);
      setTax(taxAmount);
    }
  }, [cart]);

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading || loader} />
      <ShareButtonNavbar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <View>
              <View style={{marginVertical: 10}}>
                <View style={styles.pageHeader}>
                  <Text style={styles.pageTitle}>Shopping Cart</Text>
                  <Text style={styles.cartItemCount}>{cart?.length} Item</Text>
                </View>
                 <Divider style={styles.divider} />
              </View>

              {cart.length > 0 ? (
                <View>
                  <View>
                    {cart?.length > 0 &&
                      cart.map(item => {
                        return (
                          <CartItem
                            key={item?.id?.toString()}
                            setLoader={setLoader}
                            item={item}
                          />
                        );
                      })}
                  </View>
                  <View>
                    <View>
                      <View style={{marginVertical: 13, paddingHorizontal: 25}}>
                        <View style={{marginVertical: hp(1)}}>
                          <Text style={styles.title}>Order Summery</Text>
                        </View>
                        <View style={styles.priceSection}>
                          <Text style={styles.title}>SubTotal</Text>
                          <View style={{marginHorizontal: 3}}>
                            <Text style={styles.title}>{subTotal}</Text>
                          </View>
                        </View>
                        <View style={styles.priceSection}>
                          <Text style={styles.title}>Tax</Text>
                          <View style={{marginHorizontal: 3}}>
                            <Text style={styles.title}>{tax}</Text>
                          </View>
                        </View>
                        <Divider style={styles.divider} />
                        <View style={styles.priceSection}>
                          <Text style={styles.title}>TOTAL</Text>
                          <Text style={styles.title}>{total}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.buttonSection}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.dispatch(StackActions.replace('Checkout'))
                      }
                      style={styles.button}>
                      <Text style={styles.buttonText}>Check Out</Text>
                    </TouchableOpacity>
                  </View>
          
                </View>
              ) : (
                <View style={styles.errorSection}>
                  <View>
                    <Text style={styles.noItemText}>
                      The Shopping Cart Is Empty
                    </Text>
                  </View>
                  <View style={{marginVertical: 25}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Search')}
                      style={styles.continueShoppingButton}>
                      <Text style={styles.continueShoppingButtonText}>
                        Continue Shopping
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentWrapper: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  pageTitle: {
    fontFamily: Font.LatoRegular,
    fontSize: 18,
    color: Colors.primary,
  },
  cartItemCount: {
    fontFamily: Font.LatoRegular,
    fontSize: 12,
    color: Colors.mutedText,
  },
  divider: {
    marginVertical: 15,
    backgroundColor: Colors.black,
    borderWidth: 0.5,
  },
  title: {
    fontFamily: Font.LatoBold,
    fontSize: 15,
    color: Colors.primary,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  shippingCharge: {
    fontFamily: Font.LatoBold,
    fontSize: 15,
    color: Colors.mutedText,
    textDecorationLine: 'line-through',
  },
  buttonSection: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 300,
    height: 45,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: Font.LatoBold,
    fontSize: 15,
    color: Colors.white,
  },
  errorSection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Device.height * 0.6,
  },
  noItemText: {
    fontFamily: Font.LatoBold,
    fontSize: 20,
    color: Colors.mutedText,
  },
  continueShoppingButton: {
    width: 250,
    height: 40,
    borderRadius: 5,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueShoppingButtonText: {
    fontFamily: Font.LatoBold,
    fontSize: 18,
    color: Colors.white,
  },
});

export default ShoppingCart;
