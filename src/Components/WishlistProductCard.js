import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../Layout/Colors';
import {useNavigation} from '@react-navigation/native';

import {addItemToWishlist, removeWishlistItem} from '../Services/Storage';

const WishlistProductCard = props => {
  const [like, setLike] = useState(true);
  const navigation = useNavigation();

  const onPressLike = async (likeStatus, item) => {
    if (likeStatus) {
      await removeWishlistItem(item?.id);
    } else {
      await addItemToWishlist(item);
    }
    setLike(!likeStatus);
    props.fetchWishList();
  };
  const item = props?.item;
  return (
    <>
      <View style={styles.ItemBox}>
        <Pressable
          onPress={() => navigation.navigate('ProductPage', {id: item?.id})}
          style={styles.InnerBox}>
          <View style={styles.cardHeader}>
            <Text style={{color: '#8c8c8c'}}>New Arrival</Text>
            <FontAwesome
              onPress={() => onPressLike(like, item)}
              color={like ? Colors.like : Colors.black}
              name={like ? 'heart' : 'heart-o'}
              size={22}
            />
          </View>
          <View style={styles.ImgBox}>
            {item?.images?.length > 0 && (
              <Image
                source={{uri: item?.images[0]?.src}}
                style={styles.image}
              />
            )}
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{item?.name}</Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>${item?.price}</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  ItemBox: {
    width: '50%',
    padding: 5,
    height: 300,
    marginBottom: 20,
  },
  ImgBox: {
    height: 200,
    backgroundColor: '#e3e3e3',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    paddingHorizontal: 5,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    height: '100%',
  },
  InnerBox: {
    height: '100%',
  },
  titleWrapper: {
    textAlign: 'center',
    marginTop: 14,
  },
  title: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  priceWrapper: {
    textAlign: 'center',
    marginTop: 5,
  },
  price: {
    color: Colors.mutedText,
  },
});
export default WishlistProductCard;
