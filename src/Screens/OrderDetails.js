import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../Layout/Colors';
import {ORDER_URL, WooCommerceApi} from '../Services/Api';
import BackButtonNavbar from '../Components/BackButtonNavbar';
import Font from '../Layout/Font';
import Loader from '../Components/Loader';
import Back from '../Assets/img/back.png';

const OrderDetails = (props) => {
  const {id} = props?.route?.params;
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        const response = await WooCommerceApi.get(ORDER_URL + `/${id}`, {
          id: id,
        });
        if (response?.id) {
          setOrder(response);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <BackButtonNavbar props
      leftIconSource={Back} />
      <Loader visible={loading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <View>
              <View>
                <View style={{padding: 15}}>
                  <Text style={styles.dataTitle}>Order Detail</Text>
                </View>
                <View style={styles.card}>
                  <View style={styles.row}>
                    <Text style={styles.dataTitle}>ORDER NO.</Text>
                    <Text style={styles.dataDescription}>{order?.id}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.dataTitle}>TOTAL AMOUNT</Text>
                    <Text style={styles.dataDescription}>{order?.total}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.dataTitle}>ORDER STATUS</Text>
                    <Text style={styles.dataDescription}>
                      {order?.status?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.dataTitle}>PAYMENT METHOD</Text>
                    <Text style={styles.dataDescription}>
                      {order?.payment_method_title}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.dataTitle}>ORDER DATE</Text>
                    <Text style={styles.dataDescription}>
                      {order?.date_created}
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.dataTitle}>TRANSACTION ID</Text>
                    <Text style={styles.dataDescription}>
                      {order?.transaction_id?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.dataTitle}>CURRENCY</Text>
                    <Text style={styles.dataDescription}>
                      {order?.currency_symbol}
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <View style={{padding: 15}}>
                  <Text style={styles.dataTitle}>
                    Billing & Shipping Detail
                  </Text>
                </View>
                <View style={styles.card}>
                  <View style={styles.row}>
                    <Text style={styles.dataTitle}>Name</Text>
                    <Text style={styles.dataDescription}>
                      {order?.billing?.first_name?.toUpperCase() +
                        ' ' +
                        order?.billing?.last_name?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.dataTitle}>ADDRESS</Text>
                    <Text style={styles.dataDescription}>
                      {order?.billing?.address_1?.toUpperCase() +
                        ',' +
                        order?.billing?.city +
                        ',' +
                        order?.billing?.state +
                        ',' +
                        order?.billing?.country}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.dataTitle}>POSTCODE</Text>
                    <Text style={styles.dataDescription}>
                      {order?.billing?.postcode}
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <View style={{padding: 15}}>
                  <Text style={styles.dataTitle}>Cart Items</Text>
                </View>
                <View style={styles.card}>
                  <View>
                    <View style={styles.row}>
                      <Text style={styles.cartTitle}>Name</Text>
                      <Text style={styles.cartTitle}>Quantity</Text>
                      <Text style={styles.cartTitle}>Sub Total</Text>
                      <Text style={styles.cartTitle}>Total</Text>
                    </View>
                  </View>
                  {order?.line_items?.length > 0 &&
                    order?.line_items?.map(cart => {
                      return (
                        <View key={cart?.id?.toString()} style={styles.row}>
                          <Text style={styles.dataTitle}>{cart?.name}</Text>
                          <Text style={styles.dataTitle}>{cart?.quantity}</Text>
                          <Text style={styles.dataTitle}>{cart?.subtotal}</Text>
                          <Text style={styles.dataDescription}>
                            {cart?.total}
                          </Text>
                        </View>
                      );
                    })}
                </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  content: {
    width: '100%',
  },
  card: {
    borderWidth: 0.5,
    borderColor: Colors.mutedText,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataTitle: {
    fontFamily: Font.LatoRegular,
    fontSize: 15,
    color: Colors.black,
  },
  cartTitle: {
    fontFamily: Font.LatoRegular,
    fontSize: 12,
    color: Colors.black,
  },
  dataDescription: {
    fontFamily: Font.LatoBold,
    fontSize: 15,
    color: Colors.black,
  },
});
export default OrderDetails;
