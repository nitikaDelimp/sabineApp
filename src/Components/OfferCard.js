import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const OfferCard = ({OfferData}) => {
  const navigation = useNavigation();
  return (
    <>
      {OfferData.map((item, index) => {
        return (
          <View style={styles.ItemBox} key={index}>
            <TouchableOpacity
              style={styles.InnerBox}
              onPress={() => navigation.goBack()}>
              <LinearGradient
                colors={['rgba(0,0,0, 0)', 'rgba(0,0,0, 0)', 'rgba(0,0,0, 1)']}
                style={styles.overlayLinearGradient}
              />
              <ImageBackground source={item.image} style={styles.image} />
              <View style={styles.ContentBox}>
                <Text style={styles.heading}>{item.label}</Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                  }}>
                  {item.price}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  overlayLinearGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  ItemBox: {
    width: '50%',
    height: 270,
    padding: 5,
    position: 'relative',
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  ContentBox: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    width: '100%',
    zIndex: 2,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  InnerBox: {
    height: '100%',
  },
});
export default OfferCard;
