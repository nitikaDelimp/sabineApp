import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import OrderItem from '../Components/OrderItem';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {WooCommerceApi, RETRIEVE_USER, ORDER_URL} from '../Services/Api';
import Colors from '../Layout/Colors';
import BackButtonNavbar from '../Components/BackButtonNavbar';
import Back from '../Assets/img/back.png';

const MyOrder = (props) => {
  const isFocused = useIsFocused();
  const {user} = useSelector(state => state?.auth);
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);

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
  useEffect(() => {
    if (userId) {
      (async () => {
        const response = await WooCommerceApi.get(ORDER_URL, {
          id: userId,
        });
        setOrders(response);
      })();
    }
  }, [userId]);
  return (
    <SafeAreaView style={styles.container}>
      <BackButtonNavbar props
      leftIconSource={Back} />
      <View style={styles.contentWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View>
              {orders?.length > 0 &&
                orders.map(item => {
                  if (item?.customer_id === userId) {
                    return <OrderItem key={item?.id.toString()} item={item} />;
                  }
                })}
              <View style={{paddingVertical: 100}}>
                <Text
                  style={{color: '#8c8c8c', fontSize: 16, textAlign: 'center'}}>
                  No more Orders
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
  },
  header: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  underline: {
    color: '#8c8c8c',
    textDecorationColor: '#8c8c8c',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
});

export default MyOrder;
