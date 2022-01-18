import React, { useState } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import { LOGIN_URL } from '../Services/Api';
import { setAuthUser, setTokenAction } from '../Reducers/Auth.slice';
import { setAuthUserStorage, setJwtAuthToken } from '../Services/Storage';
import { useDispatch } from 'react-redux';
import Colors from '../Layout/Colors';
import { showWithGravity } from '../Utils/Notify';
import Font from '../Layout/Font';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const Login = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (!userName) {
      showWithGravity('Enter valid username', 'bottom');
      return false;
    }

    if (!password) {
      showWithGravity('Enter your password', 'bottom');
      return false;
    }
    const params = {
      username: userName,
      password,
    };
    props.setLoading(true);

    try {
      const response = await axios.post(LOGIN_URL, params);
      if (response.status === 200) {
        try {
          const user = response?.data;
          await setAuthUserStorage(user);
          await setJwtAuthToken(user.token);
          dispatch(setTokenAction(user.token));
          dispatch(setAuthUser(user));
          props.setLoading(false);
          showWithGravity('User logged in successfully');
          navigation.navigate('HomeTabScreens')
          
        } catch (e) {
          props.setLoading(false);
          showWithGravity('Something went wrong,please try again', 'center');
        }
      } else {
        props.setLoading(false);
        showWithGravity(
          'Server request failed,please check your internet connection',
        );
      }
    } catch (error) {
      props.setLoading(false);
      showWithGravity('Incorrect username or password', 'center');
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.form}>
            <Text style={{ marginVertical: hp(6), color: '#2d2c2c', fontSize: 16 , fontFamily: Font.LatoBold}}>
              Please sign up to continue.
            </Text>
            <KeyboardAvoidingView>
              <View style={styles.inputWrapper}>
                <TextInput
                  onChangeText={text => setUserName(text)}
                  style={styles.input}
                  placeholder={'Username'}
                  placeholderTextColor={'#848484'}

                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  secureTextEntry={true}
                  onChangeText={text => setPassword(text)}
                  style={styles.input}
                  placeholder={'Password'}
                  placeholderTextColor={'#848484'}
                />
                <TouchableOpacity>
                  <Image source={require('../Assets/img/lock.png')} resizeMode='contain' style={styles.lockImage} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => login()}>
                <Text style={styles.buttonText}>Sign in</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>

            <TouchableOpacity
              style={{
                marginTop:hp(8),
                alignItems:'center'
              }}>
              <Text
                style={{
                  color: '#8c8c8c',
                  fontFamily: Font.LatoRegular,
                  fontSize: 15
                }}>
                Forget Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
    marginBottom:16
  },
  input: {
    fontFamily: Font.LatoRegular,
    fontSize: 13,
    color: Colors.black,
    width:'90%',
  },
  lockImage: {
    height: 25,
    width: 25
  },
  submitBtn: {
    borderRadius: 40,
    marginTop: 40,
  },
  button: {
    marginTop: hp(8),
    marginHorizontal: 40,
    backgroundColor: 'black',
    padding: 13,
    borderRadius: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: Font.LatoBold
  },
});
