import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Font from '../Layout/Font';
import Colors from '../Layout/Colors';
import CreditCard from '../Assets/img/cards/card.png';
import * as valid from 'card-validator';
import VisaCard from '../Assets/img/cards/visa.png';
import AmericanExpressCard from '../Assets/img/cards/american-express.png';
import MasterCard from '../Assets/img/cards/mastercard.png';
import {showWithGravity} from '../Utils/Notify';

const CardPayment = props => {
  const [image, setImage] = useState(CreditCard);
  const [cardNumber, setCardNumber] = useState(null);
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [cvv, setCvv] = useState(null);
  const validateCard = text => {
    if (text.length > 0) {
      const validation = valid.number(text);
      if (!validation?.card?.type) {
        setImage(CreditCard);
        return false;
      }

      switch (validation?.card?.type) {
        case 'visa':
          setImage(VisaCard);
          break;
        case 'american-express':
          setImage(AmericanExpressCard);
          break;
        case 'mastercard':
          setImage(MasterCard);
          break;
        case 'maestro':
          setImage(MasterCard);
          break;
        case 'discover':
          setImage(CreditCard);
          break;
        default:
          setImage(CreditCard);
          break;
      }
      if (validation.isValid) {
        setCardNumber(text);
      }
    }
  };

  const onSubmit = async () => {
    if (!cardNumber?.length > 0 || !valid.number(cardNumber)?.isValid) {
      showWithGravity('Please enter valid card number');
      return false;
    }
    if (!valid.expirationDate(date)?.isValid) {
      showWithGravity('Please enter valid date');
      return false;
    }
    if (!valid.expirationMonth(month)?.isValid) {
      showWithGravity('Please enter valid month');
      return false;
    }
    if (!valid.expirationYear(year)?.isValid) {
      showWithGravity('Please enter valid year');
      return false;
    }
    if (!valid.cvv(year)?.isValid) {
      showWithGravity('Please enter valid cvv');
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={{marginBottom: 16}}>
              <Text style={styles.cardNumberText}>Card Number</Text>
              <TextInput
                keyboardType={'number-pad'}
                style={styles.input}
                onChangeText={text => validateCard(text)}
              />
              <View style={styles.cardImageWrapper}>
                <Image
                  source={image}
                  style={{width: '100%', height: '100%'}}
                  resizeMode={'cover'}
                />
              </View>
            </View>
            <View style={{marginBottom: 16}}>
              <Text style={styles.cardNumberText}>Card Holder Name</Text>
              <TextInput style={styles.input} keyboardType={'number-pad'} />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: '25%'}}>
                <TextInput
                  style={styles.input}
                  placeholder={'MM'}
                  keyboardType={'number-pad'}
                />
              </View>
              <View style={{width: '25%'}}>
                <TextInput
                  style={styles.input}
                  placeholder={'YY'}
                  keyboardType={'number-pad'}
                />
              </View>
              <View style={{width: '40%'}}>
                <TextInput
                  style={styles.input}
                  placeholder={'CVV'}
                  keyboardType={'number-pad'}
                />
              </View>
            </View>
            <View style={styles.rowCenter}>
              <TouchableOpacity
                onPress={() => props?.setIsVisible(false)}
                style={styles.buttonCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onSubmit()}
                style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Complete Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentWrapper: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  addCardTitle: {fontSize: 20},
  closeButtonWrapper: {
    width: 18,
    height: 18,
  },
  closeImage: {width: '100%', height: '100%'},
  cardImageWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 32,
    width: 50,
    height: 30,
  },
  card: {backgroundColor: '#ededed', padding: 16},
  cardNumberText: {color: '#8c8c8c'},
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  input: {
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 0,
    paddingTop: 4,
  },
  buttonCancel: {
    width: '48%',
    padding: 10,
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: Font.LatoBold,
    fontSize: 15,
    color: Colors.black,
    fontWeight: 'bold',
  },
  submitButton: {
    width: '48%',
    padding: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: Font.LatoBold,
    fontSize: 15,
    color: Colors.white,
  },
});
export default CardPayment;
