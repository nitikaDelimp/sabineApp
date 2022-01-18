import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../Layout/Colors';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {
  addItemToWishlist,
  getWishlist,
  removeWishlistItem,
} from '../Services/Storage';

const MainProductCard = props => {
  const [item, setItem] = useState([]);
  const [like, setLike] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setItem(props?.item);
  }, [props?.item]);

  useEffect(() => {
    if (item) {
      (async () => {
        const isLiked = await checkIsLiked(item?.id);
        setLike(isLiked);
      })();
    }
  }, [item]);

  const checkIsLiked = async id => {
    let status = false;
    const list = await getWishlist();
    if (list) {
      list.map(el => {
        if (el.id === id) {
          status = true;
        }
      });
    }
    return status;
  };

  const onPressLike = async (isLiked, data) => {
    if (isLiked) {
      await removeWishlistItem(data?.id);
    } else {
      await addItemToWishlist(data);
    }
    setLike(!isLiked);
  };
  return (
    <>
      <View style={styles.ItemBox}>
        <Pressable
          onPress={() => navigation.navigate('ProductPage', {id: item?.id})}
          style={styles.InnerBox}>
          <View style={styles.cardHeader}>
            <Text style={styles.arrival}>New Arrival</Text>
            <FontAwesome
              onPress={() => onPressLike(like, item)}
              color={like ? Colors.like : Colors.black}
              name={like ? 'heart' : 'heart-o'}
              size={22}
            />
          </View>
          <View style={styles.ImgBox}>
            {item?.images && (
              <Image
                resizeMode= 'contain'
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
    backgroundColor: 'transparent',
    justifyContent:'center',

  },
  arrival: {
    color: '#8c8c8c',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    paddingHorizontal: 5,
  },
  image: {
    width:wp(46),
    height: hp(30),
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
export default MainProductCard;
