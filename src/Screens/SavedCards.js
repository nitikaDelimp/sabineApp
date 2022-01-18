import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../Components/Header';
import closeImg from '../Assets/img/cancel.png';
import CreditCard from '../Components/CreditCard';
import Colors from '../Layout/Colors';
import {BottomSheet} from 'react-native-elements';
import AddNewCard from '../Components/AddNewCard';

const SavedCards = ({navigation}) => {
  const list = [
    {
      id: 1,
      bankName: 'City Bank',
      cardNumber: '12345 67890 12345',
      expirationDate: '01',
      expirationMonth: '02',
      expirationYear: '2026',
      cvv: '678',
      cardHolderName: 'John Doe',
    },
    {
      id: 2,
      bankName: 'State Bank',
      cardNumber: '15431 76541 899008',
      expirationDate: '02',
      expirationMonth: '02',
      expirationYear: '2025',
      cvv: '123',
      cardHolderName: 'John Doe',
    },
    {
      id: 3,
      bankName: 'Central Bank',
      cardNumber: '12345 67890 23456',
      expirationDate: '06',
      expirationMonth: '12',
      expirationYear: '2028',
      cvv: '678',
      cardHolderName: 'John Doe',
    },
    {
      id: 4,
      bankName: 'Punjab National Bank',
      cardNumber: '12345 67890 23456',
      expirationDate: '06',
      expirationMonth: '12',
      expirationYear: '2028',
      cvv: '678',
      cardHolderName: 'John Doe',
    },
    {
      id: 5,
      bankName: 'Bank Of Baroda',
      cardNumber: '12345 67890 23456',
      expirationDate: '06',
      expirationMonth: '12',
      expirationYear: '2028',
      cvv: '678',
      cardHolderName: 'John Doe',
    },
  ];

  const [cards, setCards] = useState(list);

  const [isVisible, setIsVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header style={styles.header}>
        <TouchableOpacity
          style={{
            width: 30,
          }}
        />
        <View>
          <Text style={{fontSize: 20}}>Saved Cards</Text>
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
      </Header>
      <ScrollView>
        <View>
          <View>
            {cards?.length > 0 &&
              cards.map((item, index) => {
                return <CreditCard key={index.toString()} item={item} />;
              })}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsVisible(!isVisible);
            }}>
            <Text style={styles.buttonText}>Add New Card</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 300}}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save & Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View>
        <BottomSheet
          isVisible={isVisible}
          containerStyle={{backgroundColor: 'transparent'}}>
          <AddNewCard setIsVisible={setIsVisible} />
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
export default SavedCards;
