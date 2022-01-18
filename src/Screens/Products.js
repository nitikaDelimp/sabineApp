import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import searchIcon from '../Assets/img/search.png';
import MainProductCard from '../Components/MainProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../Reducers/Product.slice';
import {useIsFocused} from '@react-navigation/native';
import Colors from '../Layout/Colors';
import MainNavbar from '../Components/MainNavbar';
import Loader from '../Components/Loader';
const Products = ({navigation, route}) => {
  const categoryId = route?.params?.category ?? null;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {products = [], loading = true} = useSelector(state => state?.products);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (isFocused) {
      if (categoryId) {

        if (search) {
          dispatch(fetchProducts({category: categoryId, search}));
        } else { 

          dispatch(fetchProducts({category: categoryId}));
        }
      } else {

        if (search) {

          dispatch(fetchProducts({search}));
        } else {

          dispatch(fetchProducts());
        }
      }
    }
  }, [isFocused, categoryId]);

  function searchProduct(search) { 
    dispatch(fetchProducts({search: search}));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <MainNavbar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginBottom: 50}}>
          <View style={{paddingHorizontal: 16}}>
            <TextInput
              onChangeText={text => setSearch(text)}
              style={styles.input}
              placeholder={'Search for...'}
            />
            <TouchableOpacity
              onPress={() => searchProduct(search)}
              style={styles.searchIconWrapper}>
              <Image
                source={searchIcon}
                style={{width: '100%', height: '100%'}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          <View style={{paddingVertical: 40}}>
            <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 10}}>
              Just Landed
            </Text>
            <Text style={{textAlign: 'center', color: '#8c8c8c'}}>
              Don't miss the labes's effortless new arrivals
            </Text>
          </View>

          <View style={styles.productCountSection}>
            <Text style={{color: '#8c8c8c'}}>
              {products.length ?? 0} item (s)
            </Text>
          </View>
          <View style={styles.productSection}>
            {products.length > 0 &&
              products.map(item => {
                return (
                  <MainProductCard
                    key={item.id.toString()}
                    item={item}
                    navigation={navigation}
                  />
                );
              })}
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
  header: {
    padding: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 28,
    marginBottom: 28,
    marginHorizontal: 40,
    backgroundColor: 'black',
    padding: 13,
    borderRadius: 40,
  },
  productSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    flex: 1,
    marginTop: 14,
  },
  input: {
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  searchIconWrapper: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 16,
    height: 16,
  },
  productCountSection: {
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
});
export default Products;
