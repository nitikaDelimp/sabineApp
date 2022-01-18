import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../Components/Header';
import closeImg from '../Assets/img/cancel.png';
import Banner from '../Assets/img/accout-banner.jpg';
import LinearGradient from 'react-native-linear-gradient';
import Menu from '../Components/Menu';

const AccountOld = ({navigation}) => {
  return (
    <>
      <Header style={styles.header}>
        <TouchableOpacity
          style={{
            width: 30,
          }}
        />
        <View>
          <Text style={{fontSize: 20}}>Setting</Text>
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
        <View style={styles.bgImg}>
          <ImageBackground source={Banner} style={styles.bannerImg} />
          <LinearGradient
            colors={['rgba(0,0,0, 0)', 'rgba(0,0,0, 0.8)']}
            style={styles.overlayLinearGradient}
          />
        </View>

        <View style={{marginHorizontal: 16}}>
          <Text style={{fontSize: 24, marginVertical: 20}}>Welcome Lisa</Text>
          <Menu navigation={navigation} />
        </View>
        <View style={{paddingBottom: 20}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bgImg: {
    position: 'relative',
  },
  bannerImg: {
    width: '100%',
    height: 230,
  },
  overlayLinearGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  button: {
    marginTop: 28,
    marginHorizontal: 40,
    backgroundColor: 'black',
    padding: 13,
    borderRadius: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
export default AccountOld;
