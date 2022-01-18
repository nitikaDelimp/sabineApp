import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import Header from '../Components/Header';
import closeImg from '../Assets/img/cancel.png';
import Banner from '../Assets/img/accout-banner.jpg';
import userAvatar from '../Assets/img/ctgr1.jpg';
import editIcon from '../Assets/img/pan.png';
import Font from '../Layout/Font';
import Colors from '../Layout/Colors';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RETRIEVE_USER, WooCommerceApi} from '../Services/Api';
import {updateUser} from '../Reducers/Auth.slice';
import {showWithGravity} from '../Utils/Notify';
import Loader from '../Components/Loader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Profile = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state?.auth);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState();

  useEffect(() => {
    if (isFocused || user) {
      (async () => {
        setLoading(true);
        const response = await WooCommerceApi.get(RETRIEVE_USER, {
          email: user?.user_email,
        });
        if (response?.length > 0 && response[0]?.id) {
          setUserInfo(response[0]);
          setFirstName(response[0]?.first_name);
          setLastName(response[0]?.last_name);
          setEmail(response[0]?.email);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    }
  }, [isFocused, user]);

  const updateProfile = () => {
    if (firstName?.length <= 0) {
      showWithGravity('Please enter you first name');
      return false;
    }
    if (lastName?.length <= 0) {
      showWithGravity('Please enter you first name');
      return false;
    }
    if (email?.length <= 0) {
      showWithGravity('Please enter you email');
      return false;
    }
    const params = {
      id: userInfo?.id,
      first_name: firstName,
      last_name: lastName,
      email: email,
    };
    dispatch(updateUser(params));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <Header style={styles.header}>
        <TouchableOpacity
          style={{
            width: 30,
          }}
        />
        <View>
          <Text style={styles.pageTitle}>My Account</Text>
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
      <ScrollView style={{marginBottom:hp(5)}}>
        <View style={{marginBottom:hp(4)}}>
        <ImageBackground source={Banner} style={styles.bannerImg}>
        <View style={{ height: '100%', width: '100%', flex: 1, backgroundColor:  "#252525f3", borderRadius: 6 }}>
          <View style={{borderRadius:3,alignItems:'center', justifyContent:'center', position:'absolute', right:wp(35),bottom:hp(10)}}>
            <Image source={userAvatar}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius:50,
                    }}
                  resizeMode={'cover'}/>
                <TouchableOpacity style={styles.editIcon}>
                <Image
                  source={editIcon}
                  style={{width: '100%', height: '100%'}}
                  resizeMode={'cover'}
                />
              </TouchableOpacity>
          </View>
         </View>
        </ImageBackground>
        </View>

        <View style={{paddingHorizontal: 20, marginTop: 20}}>
          <View style={{marginBottom: 16}}>
            <Text style={{color: '#8c8c8c'}}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={text => setFirstName(text)}
              placeholder={'First Name'}
            />
          </View>
          <View style={{marginBottom: 16}}>
            <Text style={{color: '#8c8c8c'}}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={text => setLastName(text)}
              placeholder={'Last Name'}
            />
          </View>
          <View>
            <Text style={{color: '#8c8c8c'}}>Email Id</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder={'Email Id'}
            />
          </View>
          <TouchableOpacity
            onPress={() => updateProfile()}
            style={styles.button}>
            <Text style={styles.buttonText}>UPDATE</Text>
          </TouchableOpacity>
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
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pageTitle: {
    fontFamily: Font.LatoBold,
    fontSize: 20,
    color: Colors.black,
  },
  content: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImg: {
    width: '100%',
    height: 200,
  },
  overlayLinearGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#252525f3',
  },
  input: {
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 0,
    paddingTop: 4,
  },
  editIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 100,
    zIndex: 9,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  button: {
    marginTop: 10,
    marginHorizontal: 60,
    backgroundColor: 'black',
    padding: 13,
    borderRadius: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
export default Profile;
