import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Colors from '../Layout/Colors';
import WebView from 'react-native-webview';
import {Icon} from 'react-native-elements';
import {useNavigation, StackActions} from '@react-navigation/native';

import {UPDATE_ORDER_STATUS, WooCommerceApi} from '../Services/Api';
import axios from 'axios';
const PaymentWebView = props => {
  const navigation = useNavigation();
  const url = props?.route?.params?.order?.url;
  const [currentUrl, setCurrentUrl] = useState('');

  const orderReference = props?.route?.params?.order?.ref;
  const orderId = props.route?.params?.orderId;

  const SUCCESS_URL = 'https://sabine-boutique.com/payment-authorised-url/';
  const FAILURE_URL = 'https://sabine-boutique.com/payment-authorised-url/';
  const DECLINED_URL = 'https://sabine-boutique.com/payment-declined-url/';

  const goToOrderHistory = () => {
    navigation.dispatch(StackActions.replace('OrderHistory'));
  };

  useEffect(() => {
    if (currentUrl && orderReference) {
      if (
        currentUrl === SUCCESS_URL ||
        currentUrl === FAILURE_URL ||
        currentUrl === DECLINED_URL
      ) {
        if (currentUrl === FAILURE_URL || currentUrl === DECLINED_URL) {
          goToOrderHistory();
        }
        if (currentUrl === SUCCESS_URL) {
          (async () => {
            const check = await axios.post(
              'https://secure.telr.com/gateway/order.json',
              {
                method: 'check',
                store: 25053,
                authkey: 'pK94-RqnvB~bBvj7',
                order: {
                  ref: orderReference,
                },
              },
            );
            if (check?.status === 200) {
              const orderCheck = check?.data;
              if (orderCheck?.order?.status?.text === 'Paid') {
                await WooCommerceApi.post(UPDATE_ORDER_STATUS + '/' + orderId, {
                  status: 'processing',
                  id: orderId,
                  transaction_id: orderCheck?.order?.transaction?.ref,
                });
              }
              goToOrderHistory();
            }
          })();
        }
      }
    }
  }, [currentUrl, orderReference]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <View style={styles.closeButtonWrapper}>
            <Icon
              onPress={() => {
                goToOrderHistory();
              }}
              name={'close'}
              size={20}
              color={Colors.white}
            />
          </View>
          {url?.length > 0 && (
            <WebView
              style={styles.webView}
              source={{uri: url}}
              onNavigationStateChange={navState => {
                setCurrentUrl(navState.url);
              }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentWrapper: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  webView: {
    flex: 1,
  },
  closeButtonWrapper: {
    zIndex: 9999,
    position: 'absolute',
    top: 3,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaymentWebView;
