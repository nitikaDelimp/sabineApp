import WooCommerceAPI from 'react-native-woocommerce-api';
import axios from 'axios';
import {getJwtAuthToken} from './Storage';
// const consumerKey = 'ck_7e0e5480f113fb54ef47c49d25728f3421fdb61b';
// const consumerSecret = 'cs_3618265909adf5c76fbde0502bb80153f89d32cc';
const BASE_URL = 'https://sabine-boutique.com/';
// const BASE_URL = 'http://localhost/sabineboutique';
const consumerKey = 'ck_c93ca6b2c1ca7d64f3132905fff52616e1ce7507';
const consumerSecret = 'cs_3e3c1fa57a752ce8bbac273a73b80029c7d4064c';

export const WooCommerceApi = new WooCommerceAPI({
  url: BASE_URL, // Your store URL
  ssl: true,
  consumerKey: consumerKey, // Your consumer secret
  consumerSecret: consumerSecret, // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true,
});

export const WooCommerceCartApi = new WooCommerceAPI({
  url: BASE_URL, // Your store URL
  ssl: true,
  consumerKey: consumerKey, // Your consumer secret
  consumerSecret: consumerSecret, // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/store', // WooCommerce WP REST API version
  queryStringAuth: true,
});

export const api = {
  get: async (url, params) => {
    const token = await getJwtAuthToken();
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    };
    return axios.get(url, config);
  },
  post: async (url, params) => {
    const token = await getJwtAuthToken();
    let config = {
      method: 'post',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: params,
    };
    return axios(config);
  },
  delete: async (url, params) => {
    const token = await getJwtAuthToken();
    let config = {
      method: 'delete',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: params,
    };
    return axios(config);
  },
  endpoints: {},
};

export const USER_URL = 'customers';
export const LOGIN_URL = BASE_URL + 'wp-json/jwt-auth/v1/token';
export const VALIDATE_TOKEN = BASE_URL + 'wp-json/jwt-auth/v1/token/validate';
export const RETRIEVE_USER = 'customers';
export const PRODUCT_URL = 'products';
export const PRODUCT_CATEGORIES_URL = 'products/categories';
export const FETCH_PRODUCT_CATEGORY = 'products/categories/';
export const ORDER_URL = 'orders';
export const WISHLIST_URL = 'wishlist';
export const SHIPPING_ZONE_LIST = 'shipping/zones';

export const ADD_TO_CART = BASE_URL + 'wp-json/cocart/v2/cart/add-item';
export const UPDATE_CART_ITEM_URL = BASE_URL + 'wp-json/cocart/v2/cart/item/';
export const REMOVE_CART_ITEM_URL = BASE_URL + 'wp-json/cocart/v2/cart/item/';
export const GET_CART = BASE_URL + 'wp-json/cocart/v2/cart';
export const GET_CART_ITEMS = BASE_URL + '/wp-json/cocart/v2/cart/items';
export const REMOVE_FROM_CART = BASE_URL + '/wp-json/cocart/v2/cart/clear';
export const ADD_TO_WISHLIST = BASE_URL + '';
export const REMOVE_FROM_WISHLIST = BASE_URL + '';
export const ADD_NEW_ADDRESS = BASE_URL + '';
export const CREATE_ORDER = BASE_URL + '';
export const CANCEL_ORDER = BASE_URL + '';

export const GET_PAYMENT_GATEWAYS = 'payment_gateways';

export const UPDATE_ORDER_STATUS = 'orders';

export const GET_DESIGNER_LIST =
  BASE_URL + 'wp-json/custom/v1/get_all_designers_alpha';
