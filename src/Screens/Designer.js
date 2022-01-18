import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../Layout/Colors';
import ShareButtonNavbar from '../Components/ShareButtonNavbar';
import Device from '../Layout/Device';
import MainProductCard from '../Components/MainProductCard';
import SelectDropdown from 'react-native-select-dropdown';
import {FETCH_PRODUCT_CATEGORY, WooCommerceApi} from '../Services/Api';
import {showWithGravity} from '../Utils/Notify';
import Loader from '../Components/Loader';
import {fetchProducts} from '../Reducers/Product.slice';
import {useDispatch, useSelector} from 'react-redux';
import Font from '../Layout/Font';

const Designer = props => {
  const dispatch = useDispatch();
  const [short, setShort] = useState('new_arrival');
  const {products = []} = useSelector(state => state?.products);
  const [designerImage, setDesignerImage] = useState(null);
  const [designer, setDesigner] = useState({});
  const [loading, setLoading] = useState(false);
  const shorting = [
    {title: 'New Arrival', value: 'new_arrival'},
    {title: 'Price Low To High', value: 'price_ascending'},
    {title: 'Price High To Low', value: 'price_descending'},
  ];
  const product_view_types = [
    {title: 'Grid', value: 'grid'},
    {title: 'Row', value: 'row'},
  ];

  useEffect(() => {
    if (props?.route?.params?.id) {
      (async () => {
        await fetchCategory(props?.route?.params?.id);
      })();
    }
  }, [props?.route?.params?.id]);

  const fetchCategory = async id => {
    setLoading(true);
    const response = await WooCommerceApi.get(FETCH_PRODUCT_CATEGORY + id);
    if (Object.values(response)?.length > 0) {
      setDesigner(response);
      if (response?.image?.src) {
        setDesignerImage({uri: response?.image?.src});
      } else {
        setDesignerImage(require('../Assets/img/banner.png'));
      }
      if (id) {
        dispatch(fetchProducts({category: id}));
      }
      setLoading(false);
    } else {
      setLoading(false);
      showWithGravity('Invalid designer detail');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <ShareButtonNavbar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.contentWrapper}>
            <View style={styles.pageTitleWrapper}>
              <Text style={styles.pageTitle}>Designers</Text>
            </View>
            <View style={styles.hr} />
            <View>
              <Image style={styles.image} source={designerImage} />
            </View>
            <View style={styles.designerWrapper}>
              <Text style={styles.designerName}>{designer?.name}</Text>
            </View>
            <View style={styles.descriptionSection}>
              <Text style={styles.description}>{designer?.description}</Text>
            </View>
            <View style={styles.emailSection}>
              <View style={styles.marginHorizontal}>
                <FontAwesome name={'envelope'} size={15} color={Colors.black} />
              </View>
            </View>
            <View style={{marginVertical: 10}}>
              <View>
                <Text>SHOP WOMEN'S</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Show Filters</Text>
              </View>
              <View style={styles.filterSection}>
                <View style={{marginHorizontal: 3}}>
                  <SelectDropdown
                    defaultButtonText={'Show Result By'}
                    data={shorting}
                    onSelect={(selectedItem, index) => {
                      setShort(selectedItem.value);
                    }}
                    buttonStyle={styles.selectBoxStyle}
                    buttonTextStyle={styles.selectBoxTextStyle}
                    renderDropdownIcon={() => {
                      return (
                        <FontAwesome
                          name="chevron-down"
                          color={Colors.black}
                          size={16}
                        />
                      );
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.title;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    renderCustomizedRowChild={(item, index) => {
                      return (
                        <View>
                          <Text>{item.title}</Text>
                        </View>
                      );
                    }}
                  />
                </View>

                <View style={{marginHorizontal: 3}}>
                  <SelectDropdown
                    defaultButtonText={'Product View'}
                    data={product_view_types}
                    onSelect={(selectedItem, index) => {
                      setShort(selectedItem.value);
                    }}
                    buttonStyle={styles.selectBoxStyle}
                    buttonTextStyle={styles.selectBoxTextStyle}
                    renderDropdownIcon={() => {
                      return (
                        <FontAwesome
                          name="chevron-down"
                          color={Colors.black}
                          size={16}
                        />
                      );
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.title;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    renderCustomizedRowChild={(item, index) => {
                      return (
                        <View>
                          <Text>{item.title}</Text>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Just In This Month</Text>
              </View>
              <View style={styles.productSection}>
                {products.length > 0 &&
                  products.map(item => {
                    return (
                      <MainProductCard key={item.id.toString()} item={item} />
                    );
                  })}
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
  content: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hr: {
    width: '95%',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black,
    marginVertical: 20,
    alignSelf: 'center',
  },
  contentWrapper: {
    width: '100%',
  },
  pageTitleWrapper: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  pageTitle: {
    fontSize: 18,
    color: Colors.black,
  },
  image: {
    width: Device.width * 0.95,
    height: Device.height * 0.5,
  },
  designerWrapper: {
    margin: 15,
  },
  designerName: {
    fontSize: 20,
    color: Colors.black,
  },
  descriptionSection: {
    margin: 10,
  },
  description: {
    fontSize: 12,
    color: Colors.mutedText,
  },
  emailSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  marginHorizontal: {
    marginHorizontal: 5,
  },
  email: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: Colors.lightGray,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: Font.LatoBold
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  selectBoxStyle: {
    width: Device.width * 0.45,
    backgroundColor: Colors.transparent,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black,
  },

  selectBoxTextStyle: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  productSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    flex: 1,
    marginTop: 14,
  },
});

export default Designer;
