import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getWishlist} from '../Services/Storage';
import MainNavbar from '../Components/MainNavbar';
import WishlistProductCard from '../Components/WishlistProductCard';

const Wishlist = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [wishlist, setWishlist] = useState([]);

  const fetchWishList = async () => {
    setWishlist([]);
    let list = await getWishlist();
    if (list) {
      setWishlist(list);
    } else {
      setWishlist([]);
    }
  };

  useEffect(() => {
    if (isFocused) {
      (async () => {
        let list = await getWishlist();
        setWishlist(list);
      })();
    }
  }, [isFocused]);

  return (
    <SafeAreaView>
      <MainNavbar />
      <ScrollView style={{marginBottom: 50}}>
        <View style={styles.productCounterWrapper}>
          <Text style={{color: '#8c8c8c'}}>{wishlist?.length} item (s)</Text>
        </View>
        <View style={styles.productSection}>
          {wishlist?.length > 0 &&
            wishlist?.map(item => {
              return (
                <WishlistProductCard
                  fetchWishList={fetchWishList}
                  key={`${Math.random()}-${item?.id?.toString()}`}
                  item={item}
                  navigation={navigation}
                />
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productCounterWrapper: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#d7d7d7',
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  productSection: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  searchButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 16,
    height: 16,
  },
  searchImage: {width: '100%', height: '100%'},
  button: {
    marginTop: 28,
    marginBottom: 28,
    marginHorizontal: 40,
    backgroundColor: 'black',
    padding: 13,
    borderRadius: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  input: {
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
});
export default Wishlist;
