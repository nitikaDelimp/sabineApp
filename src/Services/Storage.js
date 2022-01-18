import AsyncStorage from '@react-native-async-storage/async-storage';
import {showWithGravity} from '../Utils/Notify';

export const setJwtAuthToken = async token => {
  return await AsyncStorage.setItem('jwtAuthToken', token);
};
export const removeJwtAuthToken = async () => {
  return await AsyncStorage.removeItem('jwtAuthToken');
};
export const getJwtAuthToken = async () => {
  return await AsyncStorage.getItem('jwtAuthToken');
};

export const setAuthUserStorage = async user => {
  return await AsyncStorage.setItem('authUser', JSON.stringify(user));
};
export const removeAuthUserStorage = async () => {
  return await AsyncStorage.removeItem('authUser');
};
export const getAuthUserStorage = async () => {
  const user = await AsyncStorage.getItem('authUser');
  return JSON.parse(user);
};

//wishlist system

export const getWishlist = async () => {
  let wishlist = await AsyncStorage.getItem('wishlist');
  if (wishlist) {
    let list = JSON.parse(wishlist);
    let reducedWishlist = list.filter(function (el) {
      return el != null;
    });
    return reducedWishlist;
  }
};
export const addItemToWishlist = async item => {
  let wishlist = await AsyncStorage.getItem('wishlist');
  if (wishlist !== null) {
    wishlist = JSON.parse(wishlist);
    if (item) {
      wishlist.push(item);
    }

    await AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
  } else {
    const wishlist = [];
    if (item) {
      wishlist.push(item);
    }
    AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
};

export const removeWishlistItem = async id => {
  let wishlist = await AsyncStorage.getItem('wishlist');
  if (wishlist !== null) {
    wishlist = JSON.parse(wishlist);
    let reducedWishlist = wishlist.map(function (item) {
      if (item !== null) {
        if (item.id !== id) {
          return item;
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
    let filtered_array = reducedWishlist.filter(function (e) {
      return e != null;
    });
    if (filtered_array?.length > 0) {
      await AsyncStorage.setItem('wishlist', JSON.stringify(filtered_array));
    } else {
      await AsyncStorage.removeItem('wishlist');
    }
  } else {
    showWithGravity('No item in the wishlist');
  }
};
