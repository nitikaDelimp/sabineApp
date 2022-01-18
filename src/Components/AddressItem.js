import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import OptionsDots from '../Assets/img/selet-dots.png';
import {Icon} from 'react-native-elements';
import Colors from '../Layout/Colors';

const AddressItem = props => {
  const [optionPopup, setOptionPopup] = useState(false);

  const MakePopupOpen = () => {
    setOptionPopup(!optionPopup);
  };

  const {address} = props;
  let addressOne = address?.address_1?.length ? address?.address_1 : '';
  let addressTwo = address?.address_2?.length ? ',' + address?.address_2 : '';
  let city = address?.city ? `, ${address?.city}` : '';
  let state = address?.state ? `, ${address?.state}` : '';
  let country = address?.country?.length ? `, ${address?.country}` : '';
  let postcode = address?.postcode?.length ? `, ${address?.postcode}` : '';
  let fullAddress = `${addressOne}${addressTwo}${city}${state}${country}${postcode}`;
  return (
    <>
      {Object.keys(address)?.length > 0 && (
        <View>
          {optionPopup && (
            <View
              style={
                optionPopup === true ? styles.optionActive : styles.option
              }>
              <View style={{paddingVertical: 4, paddingHorizontal: 8}}>
                <TouchableOpacity>
                  <Text style={{color: '#8c8c8c'}}>Edit</Text>
                </TouchableOpacity>
              </View>
              <View style={{paddingVertical: 4, paddingHorizontal: 8}}>
                <TouchableOpacity
                  onPress={() => props?.removeAddress(address?.id)}>
                  <Text style={{color: '#8c8c8c'}}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.addressItem}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: 35, height: 35, marginRight: 20}}>
                <Icon
                  name={'home'}
                  type={'ant-design'}
                  size={30}
                  color={Colors.mutedText}
                />
              </View>
              <Text style={{color: '#8c8c8c', width: '70%'}}>
                {fullAddress}
              </Text>
            </View>
            <TouchableOpacity
              style={{width: 30, height: 30}}
              onPress={MakePopupOpen}>
              <Image
                source={OptionsDots}
                resizeMode={'contain'}
                style={{width: '100%', height: '100%'}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.DividerLineStyle} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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

export default AddressItem;
