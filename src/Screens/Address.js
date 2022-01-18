import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Back from '../Assets/img/back.png';
import DividerLine from '../Components/DividerLine';
import Header from '../Components/Header';
import AddressItem from '../Components/AddressItem';

const Address = ({navigation}) => {
  const list = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      company: '',
      address_1: '111 Market',
      address_2: 'sum street',
      city: 'San Francisco',
      state: 'CA',
      postcode: '94103',
      country: 'US',
      email: 'john.doe@example.com',
      phone: '(555) 555-5555',
    },
    {
      id: 2,
      first_name: 'Salina',
      last_name: 'Doe',
      company: '',
      address_1: '333 Market',
      address_2: 'red street',
      city: 'San Francisco',
      state: 'CA',
      postcode: '94103',
      country: 'US',
      email: 'john.doe@example.com',
      phone: '(555) 555-5555',
    },
    {
      id: 3,
      first_name: 'Vanilla',
      last_name: 'Doe',
      company: '',
      address_1: '55 Market',
      address_2: 'upper street',
      city: 'San Francisco',
      state: 'CA',
      postcode: '94103',
      country: 'US',
      email: 'john.doe@example.com',
      phone: '(555) 555-5555',
    },
    {
      id: 4,
      first_name: 'velma',
      last_name: 'Doe',
      company: '',
      address_1: '778 Market',
      address_2: 'news street',
      city: 'San Francisco',
      state: 'CA',
      postcode: '94103',
      country: 'US',
      email: 'john.doe@example.com',
      phone: '(555) 555-5555',
    },
    {
      id: 5,
      first_name: 'Raymond',
      last_name: 'Doe',
      company: '',
      address_1: '987 Market',
      address_2: 'down town',
      city: 'San Francisco',
      state: 'CA',
      postcode: '94103',
      country: 'US',
      email: 'john.doe@example.com',
      phone: '(555) 555-5555',
    },
  ];
  const [addressList, setAddressList] = useState(list);

  const removeAddress = id => {
    let newList = addressList.map(item => {
      return item.id !== id ? item : {};
    });
    setAddressList(newList);
  };
  return (
    <SafeAreaView>
      <Header style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 30,
          }}>
          <Image
            source={Back}
            style={{width: 20, height: 20}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View
          style={{
            width: 70,
          }}
        />
        <TouchableOpacity
          style={{
            width: 30,
          }}
        />
      </Header>
      <View style={styles.titleSection}>
        <View style={styles.pageTitleWrapper}>
          <Text style={{fontSize: 20, marginBottom: 4}}>My Addresses</Text>
          <TouchableOpacity>
            <Text style={styles.underline}>Add Address</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DividerLine />

      <ScrollView>
        <View
          style={{
            marginHorizontal: 16,
          }}>
          <View style={{paddingVertical: 16}}>
            {addressList.length > 0 &&
              addressList.map((item, index) => {
                return (
                  <AddressItem
                    key={index.toString()}
                    removeAddress={removeAddress}
                    address={item}
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
  header: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleSection: {marginHorizontal: 16, paddingBottom: 10},
  pageTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  underline: {
    color: '#8c8c8c',
    textDecorationColor: '#8c8c8c',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  DividerLineStyle: {
    borderStyle: 'solid',
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
    // marginBottom: 22,
  },
  option: {
    position: 'absolute',
    right: 30,
    backgroundColor: '#fff',
    top: 8,
    margin: 'auto',
    width: 100,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    opacity: 0,
  },
  optionActive: {
    position: 'absolute',
    right: 30,
    backgroundColor: '#fff',
    top: 8,
    margin: 'auto',
    paddingVertical: 4,
    width: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    opacity: 1,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
export default Address;
