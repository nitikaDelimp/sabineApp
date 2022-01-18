import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Banner from '../Assets/img/accout-banner.jpg';
import LinearGradient from 'react-native-linear-gradient';
import Menu from '../Components/Menu';
import {useSelector} from 'react-redux';
import {RETRIEVE_USER, WooCommerceApi} from '../Services/Api';
import {useIsFocused} from '@react-navigation/native';
import MainNavbar from '../Components/MainNavbar';
import Loader from '../Components/Loader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const MyAccount = ({navigation}) => {
  const isFocused = useIsFocused();
  const {user} = useSelector(state => state?.auth);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused || user) {
      (async () => {
        setLoading(true);
        const response = await WooCommerceApi.get(RETRIEVE_USER, {
          email: user?.user_email,
        });
        if (response[0]?.id) {
          setUserInfo(response[0]);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    }
  }, [isFocused, user]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MainNavbar />
      <Loader visible={loading} />
      <ScrollView style={{marginBottom: hp(7)}} showsVerticalScrollIndicator={false} >
          <ImageBackground source={Banner} style={styles.bannerImg} >
          <View style={{ height: '100%', width: '100%', flex: 1, backgroundColor:  "#00000080", borderRadius: 6 }}>
          </View>
          </ImageBackground>
        <View style={{marginHorizontal: 16}}>
          <View style={{marginVertical: hp(4)}}>
            <Text style={{fontSize: 24}}>Welcome {userInfo?.first_name}</Text>
          </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bgImg: {
    position: 'relative',
  },
  bannerImg: {
    width: '100%',
    height: hp(30),
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

export default MyAccount;
