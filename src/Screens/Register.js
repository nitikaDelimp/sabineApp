import React, {useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import Colors from '../Layout/Colors';
import {setAuthUser, setTokenAction} from '../Reducers/Auth.slice';
import {useDispatch} from 'react-redux';
import {LOGIN_URL, USER_URL, WooCommerceApi} from '../Services/Api';
import {setAuthUserStorage, setJwtAuthToken} from '../Services/Storage';
import {showWithGravity} from '../Utils/Notify';
import {validateEmail} from '../Utils/functions';
import axios from 'axios';
import Font from '../Layout/Font';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Register = (props) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async params => {
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

  const onsubmit = async () => {
    if (!firstName) {
      showWithGravity('Enter first name');
      return false;
    }
    if (!lastName) {
      showWithGravity('Enter last name');
      return false;
    }
    if (!email) {
      showWithGravity('Enter email address');
      return false;
    }
    if (!validateEmail(email)) {
      showWithGravity('Please enter valid email address', 'bottom');
      return false;
    }
    if (!password) {
      showWithGravity('Enter your password');
      return false;
    }
    const params = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };
    props?.setLoading(true);
    const response = await WooCommerceApi.post(USER_URL, params);
    if (response && response?.code === 'registration-error-email-exists') {
      props?.setLoading(false);
      showWithGravity('Email already registered ,please login');
    } else if (response && response?.status === 400) {
      props?.setLoading(false);
      showWithGravity(response?.message);
    } else {
      if (response && response?.id) {
        const credentials = {
          username: response?.username,
          password: password,
        };
        await login(credentials);
        props?.setLoading(false);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <TextInput
              onChangeText={text => setFirstName(text)}
              style={styles.input}
              placeholder={'First name'}
              placeholderTextColor={'#848484'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              onChangeText={text => setLastName(text)}
              style={styles.input}
              placeholder={'Last name'}
              placeholderTextColor={'#848484'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              onChangeText={text => setEmail(text)}
              style={styles.input}
              placeholder={'Email'}
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
          <TouchableOpacity style={styles.button} onPress={() => onsubmit()}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.accountwrapper}>
            <Text style={styles.leftText}>Already have an account ?  </Text>
            <TouchableOpacity>
              <Text style={styles.rightText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  form: {
    width: '100%',
    paddingTop: 15
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
    marginBottom:12
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
    marginTop: hp(6),
    marginHorizontal: 40,
    backgroundColor: 'black',
    padding: 13,
    borderRadius: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize:15, 
    fontFamily: Font.LatoBold
  },
  accountwrapper:{flexDirection:'row', alignItems:'center', justifyContent:'center', marginVertical:hp(9)},
  leftText:{fontFamily: Font.LatoBold, fontSize: 15,color: '#8c8c8c',},
  rightText:{fontFamily: Font.LatoBold, fontSize: 15,color:Colors.black,}
});
export default Register;
