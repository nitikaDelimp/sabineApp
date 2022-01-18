import {DrawerContentScrollView} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import BrandName from '../Components/Logo';
import closeImg from '../Assets/img/cancel.png';
import leftArrowIcon from '../Assets/img/left-arrow.png';
import Colors from '../Layout/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {setAuthUser, setTokenAction} from '../Reducers/Auth.slice';
import {showWithGravity} from '../Utils/Notify';
import {removeAuthUserStorage, removeJwtAuthToken} from '../Services/Storage';

const AppDrawer = ({navigation, progress, ...props}) => {
  const dispatch = useDispatch();
  const [selectedGender, setSelectedGender] = useState('women');
  const {categories = []} = useSelector(state => state?.products);
  console.log('categories',categories)

  const logOut = () => {
    (async () => {
      await removeAuthUserStorage();
      await removeJwtAuthToken();
    })();
    dispatch(setTokenAction(null));
    dispatch(setAuthUser({}));
    showWithGravity('Logged out successfully');
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View
          style={{
            width: 70,
          }}>
          <BrandName />
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 18,
            height: 18,
          }}>
          <Image
            source={closeImg}
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      <DrawerContentScrollView {...props}>
        <View style={styles.genderSection}>
          <Pressable
            onPress={() => setSelectedGender('women')}
            style={[
              styles.genderWrapper,
              {
                backgroundColor:
                  selectedGender === 'women'
                    ? Colors.selectionGray
                    : 'transparent',
              },
            ]}>
            <Text>Women</Text>
          </Pressable>
          <Pressable
            onPress={() => setSelectedGender('men')}
            style={[
              styles.genderWrapper,
              {
                backgroundColor:
                  selectedGender === 'men'
                    ? Colors.selectionGray
                    : 'transparent',
              },
            ]}>
            <Text>Men</Text>
          </Pressable>
          <Pressable
            onPress={() => setSelectedGender('kids')}
            style={[
              styles.genderWrapper,
              {
                backgroundColor:
                  selectedGender === 'kids'
                    ? Colors.selectionGray
                    : 'transparent',
              },
            ]}>
            <Text>Kids</Text>
          </Pressable>
        </View>
        {categories?.length > 0 &&
          categories.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Search', {category: item?.id});
                  navigation.navigate('Products', {category: item?.id});
                }}
                key={item.id.toString()}
                style={styles.categoryItems}>
                <Text style={styles.categoryItemsText}>{item?.name}</Text>
                <View style={styles.categoryItemArrow}>
                  <Image
                    source={leftArrowIcon}
                    resizeMode={'contain'}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
      </DrawerContentScrollView>
      <View padding={30}>
        <TouchableOpacity style={styles.button} onPress={() => {logOut(), navigation.navigate('Authentication')}}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  categoryItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingVertical: 16,
    paddingLeft: 16,
    borderLeftColor: 'transparent',
    borderLeftWidth: 6,
    borderStyle: 'solid',
  },
  categoryItemsActive: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingVertical: 16,
    paddingLeft: 16,
    borderLeftColor: '#000',
    borderLeftWidth: 6,
    borderStyle: 'solid',
  },
  categoryItemsActiveText: {
    color: '#000',
  },
  categoryItemsText: {
    color: '#686868',
  },
  categoryItemArrow: {width: 12, height: 12, opacity: 0.5},
  categoryItemArrowActive: {width: 12, height: 12, opacity: 1},
  genderSection: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    marginBottom: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genderWrapper: {
    height: 45,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default AppDrawer;
