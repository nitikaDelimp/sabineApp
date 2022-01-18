import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import ProductSlider from '../Components/ProductSlider';
import Colors from '../Layout/Colors';
import ProductPageHeader from '../Components/ProductPageHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import {ListItem, Divider} from 'react-native-elements';
import Font from '../Layout/Font';
import {PRODUCT_URL, WooCommerceApi} from '../Services/Api';
import {useIsFocused} from '@react-navigation/native';
import Device from '../Layout/Device';
import Loader from '../Components/Loader';

import {addToCart, toggleLoading} from '../Reducers/Cart.slice';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToWishlist, removeWishlistItem} from '../Services/Storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProductPage = ({route}) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [size, setSize] = useState(null);
  const [colors, setColors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [sizelist, setSizeList] = useState(false)
  const[ productDetails, setProductDetails] = useState(false);
  const [careDetails, setCareDetails] = useState(false)
  const changeSize = e => {
    setSize(e);
  };

const [loaderCart, setloadercart] = useState('')
  const [sizes, setSizes] = useState([]);

  const isFocused = useIsFocused();

  const getSingleProduct = async productId => {
    setLoading(true);
    const item = await WooCommerceApi.get(PRODUCT_URL + `/${productId}`);
    if (Object.keys(item)?.length !== 0) {
      setProduct(item);
      if (Object.keys(item)?.length) {
        item?.attributes?.length > 0 &&
          item?.attributes?.map(attribute => {
            if (attribute.name === 'size') {
              setSizes(attribute.options);
            }
            if (attribute.name === 'color') {
              setColors(attribute.options);
            }
          });
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const addItemToCart = async (productId, quantity) => {
    const params = {
      id: productId?.toString(),
      quantity: quantity?.toString(),
    };    
    dispatch(addToCart(params));
  };
  // const addItemToCart = async (product) => {
  //     // const params = {
  //     //   id: productId?.toString(),
  //     //   quantity: quantity?.toString(),
  //     // };    
  //     dispatch(addToCart(product));
  //   };

  useEffect(() => {
    if (isFocused && route?.params?.id) {
      (async () => {
        await getSingleProduct(route?.params?.id);
      })();
    }
  }, [isFocused, route?.params?.id]);

  const addToWishList = async (isLiked, data) => {
    if (isLiked) {
      await removeWishlistItem(data?.id);
    } else {
      await addItemToWishlist(data);
    }
    setLike(!isLiked);
  };


  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <ProductPageHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.contentWrapper}>
            <View style={{marginBottom:hp(3.2)}}>
              <View style={styles.marginVertical(3)}>
                <Text style={styles.productName}>{product?.name}</Text>
              </View>
              <View style={{marginVertical: 3}}>
                {product?.price_html?.length > 0 && (
                  <RenderHtml
                    contentWidth={Device.width}
                    source={{html: `${product.price_html}`}}
                  />
                )}
              </View>
            </View>
            <View>
              {product?.images?.length > 0 && (
                <ProductSlider images={product?.images} />
              )}
            </View>

            <View style={{marginTop:hp(3)}}>
              {sizes?.length > 0 && (
                <SelectDropdown
                  defaultButtonText={'Select a Size'}
                  data={sizes}
                  onSelect={selectedItem => {
                    changeSize(selectedItem);
                  }}
                  buttonStyle={styles.selectBoxStyle}
                  buttonTextStyle={styles.selectBoxTextStyle}
                  renderDropdownIcon={() => {
                    return (
                      <FontAwesome
                        name="chevron-down"
                        color={Colors.mutedText}
                        size={16}
                      />
                    );
                  }}
                  buttonTextAfterSelection={selectedItem => {
                    return selectedItem;
                  }}
                  rowTextForSelection={item => {
                    return item;
                  }}
                  renderCustomizedRowChild={item => {
                    return (
                      <View>
                        <Text>{item}</Text>
                      </View>
                    );
                  }}
                />
              )}

              {colors &&
                colors.map(item => {
                  return (
                    <View key={item.toString()} style={{marginHorizontal: 5}}>
                      <View
                        style={{
                          borderWidth: 1,
                          width: 25,
                          height: 25,
                          borderColor: Colors.primary,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: Font.LatoBold,
                            fontSize: 14,
                            color: Colors.primary,
                          }}>
                          {item}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </View>
            <View style={styles.buttonSection}>
              <View style={styles.marginVertical(5)}>

                <TouchableOpacity
                  onPress={() =>
                    addItemToCart(product?.variations[0] ?? product?.id, 1)
                  }
                  // onPress={() => addItemToCart(product)}
                  style={styles.addToCartButton}>
                  <Text style={styles.addToCartButtonText}>Add To Bag</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.marginVertical(6)}>
                <TouchableOpacity
                  onPress={() => addToWishList(like, product)}
                  style={styles.addToWishListButton}>
                  <Text style={styles.addToWishListButtonText}>
                    Add To WishList
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={{justifyContent:'space-between', flexDirection:'row'}} onPress={() => setProductDetails(!productDetails)}>
                  <Text style={{fontFamily: Font.LatoBlack, fontSize: 15, color: Colors.black}}>Editor's Notes</Text>
                  <AntDesign name={productDetails ? "up" : "down"} size={16} color={Colors.black} />
            </TouchableOpacity>
          

            {
              productDetails?  <View  style={{marginTop:hp(3)}}>
              { product?.description?.length > 0 && (
                <RenderHtml
                  contentWidth={Device.width}
                  style={{color: '#848484',fontFamily: Font.LatoRegular}}
                  source={{html: `${product?.description}`}}
                />
              ) }
            </View>: null
            }
             <View style={styles.lineWrapp}/>

             <TouchableOpacity style={{justifyContent:'space-between', flexDirection:'row'}} onPress={() => setSizeList(!sizelist)} >
                  <Text style={{fontFamily: Font.LatoBlack, fontSize: 15, color: Colors.black}}>Size & Fit</Text>
                  <AntDesign name={sizelist ? "up" : "down"} size={16} color={Colors.black} />
            </TouchableOpacity>

            {
              sizelist ?  <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                marginTop:hp(2)
              }}>
               
              {sizes &&
                sizes.map(item => {
                  return (
                    <View
                      key={item.toString()}
                      style={{marginHorizontal: 2}}>
                      <View
                        style={{
                          borderColor: Colors.primary,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                           
                        <Text
                          style={{
                            fontFamily: Font.LatoBold,
                            fontSize: 14,
                            color: '#848484',
                          }}>
                          {item.toString()}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </View>: null
            }
            <View style={styles.lineWrapp}/>

            <TouchableOpacity style={{justifyContent:'space-between', flexDirection:'row'}} onPress={() => setCareDetails(!careDetails)} >
                  <Text style={{fontFamily: Font.LatoBlack, fontSize: 15, color: Colors.black}}>Details & Care</Text>
                  <AntDesign name={careDetails ? "up" : "down"} size={16} color={Colors.black} />
            </TouchableOpacity>

            {
              careDetails ? <View>
              <View style={styles.detailSection}>
                <Text style={styles.dataDefinition}>SKU</Text>
                <Text style={styles.dataDescription}>{product?.sku}</Text>
              </View>
              <View style={styles.detailSection}>
                <Text style={styles.dataDefinition}>Name</Text>
                <Text style={styles.dataDescription}>
                  {product?.name}
                </Text>
              </View>
              <View style={styles.detailSection}>
                <Text style={styles.dataDefinition}>Stock</Text>
                <Text style={styles.dataDescription}>
                  {product?.stock_status}
                </Text>
              </View>
              <View style={styles.detailSection}>
                <Text style={styles.dataDefinition}>Listing Date</Text>
                <Text style={styles.dataDescription}>
                  {product?.date_created}
                </Text>
              </View>
              <View style={styles.detailSection}>
                <Text style={styles.dataDefinition}>Rating</Text>
                <Text style={styles.dataDescription}>
                  {product?.average_rating}
                </Text>
              </View>
            </View>  : null
            }
            <View style={styles.lineWrapp}/>

           
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  marginHorizontal(mh) {
    return {
      marginHorizontal: mh,
    };
  },
  marginVertical(mv) {
    return {
      marginVertical: mv,
    };
  },
  content: {
    // padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:wp(5),
    marginVertical:hp(2)
  },
  contentWrapper: {
    width: '100%',
  },
  productName: {
    fontFamily: Font.LatoBlack,
    fontSize: 15,
  },
  lineWrapp:{height:hp(.1), backgroundColor: '#8c8c8c',marginVertical:hp(4)},
  description: {
    fontFamily: Font.LatoRegular,
    fontSize: 12,
    color: Colors.mutedText,
  },
  priceText: {
    fontFamily: Font.LatoBold,
    fontSize: 15,
    color: Colors.mutedText,
  },
  paragraph: {
    color: '#8c8c8c',
  },
  sizeItemGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sizeItem: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 10,
    color: '#8c8c8c',
  },
  activeSizeItem: {
    marginLeft: 10,
    width: 28,
    height: 28,
    borderColor: '#8c8c8c',
    borderWidth: 2,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#8c8c8c',
  },
  addBtn: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'black',
    padding: 16,
  },
  colorTitle: {
    fontSize: 15,
    color: Colors.mutedText,
  },
  colorDescription: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: 'bold',
  },
  sizeGuideText: {
    fontSize: 15,
    color: Colors.mutedText,
    fontWeight: 'bold',
  },
  sizeGuideUnderLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.mutedText,
  },
  propertySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectBoxStyle: {
    width: '100%',
  },
  selectBoxTextStyle: {
    fontSize: 14,
    color: Colors.mutedText,
    textAlign:'left'
  },
  buttonSection: {
    marginVertical: 20,
  },
  addToCartButton: {
    width: '100%',
    height: hp(7),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: Font.LatoBold
  },
  addToWishListButton: {
    width: '100%',
    height: hp(7),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.black,
  },
  addToWishListButtonText: {
    fontSize: 15,
    color: Colors.black,
    fontFamily: Font.LatoBold
  },
  detailSection: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  dataDefinition: {
    fontFamily: Font.LatoBold,
    fontSize: 14,
    color: Colors.black,
  },
  dataDescription: {
    fontFamily: Font.LatoBold,
    fontSize: 14,
    color: Colors.mutedText,
  },
  orderText:{fontSize: 12, fontFamily: Font.LatoRegular, color:'#8c8c8c',}
});
export default ProductPage;
