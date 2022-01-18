import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Card from '../Assets/img/card.png';
import Font from '../Layout/Font';
import Colors from '../Layout/Colors';

const CreditCard = props => {
  const {item} = props;
  return (
    <View style={styles.cardItem}>
      <View>
        <Text style={styles.cardName}>{item?.bankName}</Text>
        <Text style={styles.cardNumber}>{item?.cardNumber}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.imageWrapper}>
          <Image source={Card} style={styles.image} resizeMode={'cover'} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity>
            <Text style={styles.defaultText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.underline}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  underline: {
    color: '#8c8c8c',
    textDecorationColor: '#8c8c8c',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingRight: 16,
    paddingVertical: 10,
    borderLeftColor: 'transparent',
    borderLeftWidth: 10,
    borderStyle: 'solid',
  },
  cardName: {
    fontFamily: Font.LatoBold,
    fontSize: 16,
    color: Colors.black,
  },
  cardNumber: {
    fontFamily: Font.LatoBold,
    fontSize: 16,
    color: Colors.mutedText,
  },
  cardBody: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  imageWrapper: {width: 50, height: 30, marginBottom: 4},
  image: {width: '100%', height: '100%'},
  defaultActiveText: {
    marginRight: 16,
    fontWeight: 'bold',
    color: '#000',
    textDecorationColor: '#000',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  defaultText: {
    marginRight: 16,
    color: '#000',
    textDecorationColor: '#000',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  cardItemDefault: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingRight: 16,
    paddingVertical: 10,
    borderLeftColor: '#363434',
    borderLeftWidth: 10,
    borderStyle: 'solid',
  },
  button: {
    marginTop: 48,
    marginHorizontal: 60,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
export default CreditCard;
