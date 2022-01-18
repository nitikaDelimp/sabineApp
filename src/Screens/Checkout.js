import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Divider, Input, ListItem, CheckBox} from 'react-native-elements';
import Colors from '../Layout/Colors';
import Device from '../Layout/Device';
import Font from '../Layout/Font';
import {showWithGravity} from '../Utils/Notify';
import axios from 'axios';
import {
  GET_PAYMENT_GATEWAYS,
  ORDER_URL,
  RETRIEVE_USER,
  WooCommerceApi,
} from '../Services/Api';
import {
  StackActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import Loader from '../Components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {getCartItems, removeFromCart} from '../Reducers/Cart.slice';
import CartItem from '../Components/CartItem';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Checkout = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [orderId, setOrderId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [street, setStreet] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('cod');

  const [isExpandedAddress, setIsExpandedAddress] = useState(true);
  const [isOrderDetailExpanded, setIsOrderDetailExpanded] = useState(true);
  const [isPaymentDetailExpanded, setIsPaymentDetailExpanded] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const {cart = {}, loading = false} = useSelector(state => state?.cart);

  const [loader, setLoader] = useState(false);

  const {user} = useSelector(state => state?.auth);
  const [userId, setUserId] = useState(null);

  const [shipping, setShipping ] = useState(false);
  const [order, setOrder ] = useState(false)

  useEffect(() => {
    if (isFocused || user) {
      (async () => {
        const response = await WooCommerceApi.get(RETRIEVE_USER, {
          email: user?.user_email,
        });
        if (response[0]?.id) {
          setUserId(response[0]?.id);
        }
      })();
    }
  }, [isFocused, user]);

  const paymentGateWayList = async () => {
    setLoader(true);
    const response = await WooCommerceApi.get(GET_PAYMENT_GATEWAYS);
    if (response?.length) {
      setPaymentMethods(response);
    }
    setLoader(false);
  };

  useEffect(() => {
    if (isFocused) {
      (async () => {
        await paymentGateWayList();
        dispatch(getCartItems());
      })();
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

  const payment = async id => {
    if (id !== null) {
      if (total !== null && userId !== null) {
        const params = {
          method: 'create',
          store: 25053,
          authkey: 'pK94-RqnvB~bBvj7',
          order: {
            cartid: id.toString(),
            test: '1',
            amount: total,
            currency: 'SAR',
            description: 'Sabine boutique product purchase',
          },
          customer: {
            ref: userId?.toString(),
            email: user?.email,
          },
          return: {
            authorised: 'https://sabine-boutique.com/payment-authorised-url/',
            declined: 'https://sabine-boutique.com/payment-declined-url/',
            cancelled: 'https://sabine-boutique.com/payment-cancelled-url/',
          },
        };

        const response = await axios.post(
          'https://secure.telr.com/gateway/order.json',
          params,
        );
        if (response.status === 200) {
          const result = response?.data;
          result.orderId = id;

          if (result?.order?.url) {
            navigation.navigate('PaymentWebView', result);
          }
        } else {
          await WooCommerceApi.delete('orders/' + id);
          showWithGravity('Order creation failed');
        }
      } else {
        showWithGravity('Invalid order amount');
      }
    } else {
      showWithGravity('Invalid Order Id');
    }
  };

  const onSubmit = async () => {
    if (firstName?.length <= 0) {
      showWithGravity('Please enter your first name');
      return false;
    }
    if (lastName?.length <= 0) {
      showWithGravity('Please enter your first name');
      return false;
    }
    if (company?.length <= 0) {
      showWithGravity('Please enter your first name');
      return false;
    }
    if (street?.length <= 0) {
      showWithGravity('Please enter your first name');
      return false;
    }
    if (address?.length <= 0) {
      showWithGravity('Please enter your first name');
      return false;
    }
    if (country?.length <= 0) {
      showWithGravity('Please enter your first name');
      return false;
    }
    if (zipcode?.length <= 0) {
      showWithGravity('Please enter your first name');
      return false;
    }
    if (city?.length <= 0) {
      showWithGravity('Please enter your first name');
      return false;
    }
    if (province?.length <= 0) {
      showWithGravity('Please enter your first name');
      return false;
    }
    if (phone?.length <= 0) {
      showWithGravity('Please enter your first name');
      return false;
    }
    if (email?.length <= 0) {
      showWithGravity('Please enter your first name');
      return false;
    }

    if (selectedMethod?.length <= 0) {
      showWithGravity('Please select payment method first');
      return false;
    }

    if (cart?.length <= 0) {
      showWithGravity('No items in the card');
      return false;
    }

    const userAddress = {
      first_name: firstName,
      last_name: lastName,
      address_1: address,
      address_2: street,
      city: city,
      state: province,
      postcode: zipcode,
      country: country,
      email: user?.user_email,
      phone: phone,
    };

    const line_items = cart?.map(item => {
      return {
        product_id: item?.id,
        quantity: item?.quantity?.value,
      };
    });

    const params = {
      customer_id: userId,
      payment_method: 'bacs',
      payment_method_title: 'Direct Bank Transfer',
      set_paid: false,
      billing: userAddress,
      shipping: userAddress,
      line_items: line_items,
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Flat Rate',
          total: '10.00',
        },
      ],
    };
    setLoader(true);
    const response = await WooCommerceApi.post(ORDER_URL, params);
    if (Object.values(response)?.length > 0) {
      if (response?.data?.status === 400) {
        setLoader(false);
        showWithGravity('Something went wrong please try again');
        return false;
      }
      if (response?.id) {
        setOrderId(response?.id);

        setLoader(false);
        if (selectedMethod === 'cod') {
          showWithGravity('Your order placed successfully');
          dispatch(removeFromCart());
          navigation.dispatch(StackActions.replace('OrderHistory'));
        } else {
          await payment(response?.id);
          return false;
        }
      }
      setLoader(false);
    } else {
      setLoader(false);
      showWithGravity('Order not placed,please try again');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading || loader} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <View>

            <TouchableOpacity style={{justifyContent:'space-between', flexDirection:'row',paddingHorizontal:wp(5),paddingVertical:hp(3)}} onPress={() => setOrder(!order)}>
                  <Text style={{fontFamily: Font.LatoRegular, fontSize: 15, color: Colors.black}}>Order Detail</Text>
                  <AntDesign name={order ? "up" : "down"} size={16} color={Colors.black} />
            </TouchableOpacity>

            {
              order ? <View>
              {cart?.length > 0 &&
                cart.map(item => {
                  return (
                    <CartItem
                      key={item?.id?.toString()}
                      item={item}
                      setLoader={setLoader}
                    />
                  );
                })}
            </View> : null
            }

              <Divider
                style={{backgroundColor: Colors.black, marginVertical: 10}}
                orientation="horizontal"
              />

            <TouchableOpacity style={{justifyContent:'space-between', flexDirection:'row',paddingHorizontal:wp(5),paddingVertical:hp(3)}} onPress={() => setShipping(!shipping)}>
                  <Text style={{fontFamily: Font.LatoRegular, fontSize: 15, color: Colors.black}}>Shipping Address</Text>
                  <AntDesign name={shipping ? "up" : "down"} size={16} color={Colors.black} />
            </TouchableOpacity>

{
  shipping ? 
    <View>
  <View style={styles.row}>
    <View>
      <Input
        inputStyle={styles.input}
        containerStyle={styles.rowInputContainer}
        inputContainerStyle={{borderBottomWidth: 0}}
        placeholder={'First Name'}
        onChangeText={text => setFirstName(text)}
      />
    </View>
    <View>
      <Input
        inputStyle={styles.input}
        containerStyle={styles.rowInputContainer}
        inputContainerStyle={{borderBottomWidth: 0}}
        placeholder={'Last Name'}
        onChangeText={text => setLastName(text)}
      />
    </View>
  </View>
  <View style={{marginVertical: 5,}}>
    <Input
      inputStyle={styles.input}
      containerStyle={styles.inputContainer}
      inputContainerStyle={{borderBottomWidth: 0}}
      placeholder={'Company Name (Optional)'}
      onChangeText={text => setCompany(text)}
    />
  </View>
  <View style={{marginVertical: 5}}>
    <Input
      inputStyle={styles.input}
      containerStyle={styles.inputContainer}
      inputContainerStyle={{borderBottomWidth: 0}}
      placeholder={'Country'}
      onChangeText={text => setCountry(text)}
    />
  </View>
  <View style={{marginVertical: 5}}>
    <Input
      inputStyle={styles.input}
      containerStyle={styles.inputContainer}
      inputContainerStyle={{borderBottomWidth: 0}}
      placeholder={'Street Address'}
      onChangeText={text => setStreet(text)}
    />
  </View>
  <View style={{marginVertical: 5}}>
    <Input
      inputStyle={styles.input}
      containerStyle={styles.inputContainer}
      inputContainerStyle={{borderBottomWidth: 0}}
      placeholder={'Address'}
      onChangeText={text => setAddress(text)}
    />
  </View>
  <View style={{marginVertical: 5}}>
    <Input
      inputStyle={styles.input}
      containerStyle={styles.inputContainer}
      inputContainerStyle={{borderBottomWidth: 0}}
      placeholder={'Postcode'}
      onChangeText={text => setZipcode(text)}
    />
  </View>
  <View style={{marginVertical: 5}}>
    <Input
      inputStyle={styles.input}
      containerStyle={styles.inputContainer}
      inputContainerStyle={{borderBottomWidth: 0}}
      placeholder={'Town/City'}
      onChangeText={text => setCity(text)}
    />
  </View>
  <View style={{marginVertical: 5}}>
    <Input
      inputStyle={styles.input}
      containerStyle={styles.inputContainer}
      inputContainerStyle={{borderBottomWidth: 0}}
      placeholder={'Province'}
      onChangeText={text => setProvince(text)}
    />
  </View>
  <View style={{marginVertical: 5}}>
    <Input
      inputStyle={styles.input}
      containerStyle={styles.inputContainer}
      inputContainerStyle={{borderBottomWidth: 0}}
      placeholder={'Phone'}
      onChangeText={text => setPhone(text)}
    />
  </View>
  <View style={{marginVertical: 5}}>
    <Input
      inputStyle={styles.input}
      containerStyle={styles.inputContainer}
      inputContainerStyle={{borderBottomWidth: 0}}
      placeholder={'Email'}
      onChangeText={text => setEmail(text)}
    />
  </View>
</View> : null
}
                  

              <Divider
                style={{backgroundColor: Colors.black, marginVertical: 10}}
                orientation="horizontal"
              />

              <ListItem.Accordion
                content={
                  <>
                    <ListItem.Content>
                      <ListItem.Title>Payment Detail</ListItem.Title>
                    </ListItem.Content>
                  </>
                }
                isExpanded={isPaymentDetailExpanded}
                onPress={() => {
                  setIsPaymentDetailExpanded(!isPaymentDetailExpanded);
                }}>
                <View>
                  {paymentMethods?.length > 0 &&
                    paymentMethods.map(item => {
                      if (item.enabled) {
                        return (
                          <View key={item?.id?.toString()}>
                            <CheckBox
                              onPress={() => setSelectedMethod(item?.id)}
                              checked={selectedMethod === item?.id}
                              title={item?.title}
                            />
                          </View>
                        );
                      }
                    })}
                </View>
              </ListItem.Accordion>
              <Divider
                style={{backgroundColor: Colors.black, marginVertical: 10}}
                orientation="horizontal"
              />
              <View>
                <View>
                  <View style={{marginVertical: 15, paddingHorizontal: 25}}>
                    <View style={{marginVertical: 10}}>
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
                  onPress={() => onSubmit()}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Order Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentWrapper: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowInputContainer: {
    borderWidth: 0.5,
    borderColor: Colors.black,
    width: Device.width * 0.46,
    height: 45,
  },
  inputContainer: {
    borderWidth: 0.5,
    borderColor: Colors.black,
    width: Device.width * 0.92,
    height: 45,
  },
  input: {
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
    marginVertical: 10,
  },
  buttonSection: {
    // marginVertical: 2,
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
});

export default Checkout;
