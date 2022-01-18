import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { setAuthUser, setTokenAction } from './Reducers/Auth.slice';
import { getAuthUserStorage, getJwtAuthToken } from './Services/Storage';
import { showWithGravity } from './Utils/Notify';
import { api, VALIDATE_TOKEN } from './Services/Api';
import { fetchCategories } from './Reducers/Product.slice';


export default function SplashScreen(props) {
  const dispatch = useDispatch();
//   const {user = {}} = useSelector(state => state?.auth);
const {categories = {}} = useSelector(state => state?.products);

  useEffect(() => { 
      (async () => {
      const authToken = await getJwtAuthToken();
      if(authToken){
        props.navigation.navigate("HomeTabScreens") 
      }else{
        props.navigation.navigate("Authentication")
      }
    //   if (authToken?.length > 0) {
    //       console.log('authtoken',authToken)
    //       console.log('authtoken length',authToken.length)

    //     try {
    //       const response = await api.post(VALIDATE_TOKEN);
    //       if (response?.status === 200) {
    //         dispatch(setTokenAction(authToken));
    //         const data = await getAuthUserStorage();
    //         console.log('data ', data)
    //         if(data != null){
    //             props.navigation.navigate("HomeTabScreens") 
    //         }else{
    //             console.log('data elae ')

    //             props.navigation.navigate("Authentication")
    //         }
    //       }
    //     } catch (e) {
    //         console.log('abbbbbbbbbbbbbbbbbbbbbbbbbb')
    //         props.navigation.navigate("Authentication")

    //       showWithGravity(e.toString());
    //     }
    //   }
    })();
  }, []);


  useEffect(() => {
    if (!(categories.length > 0)) {
      dispatch(fetchCategories());
    }
  }, [categories]);



  return (
    <View style={styles.container}>
      <Image source={require("./Assets/img/logo.png")} style={{height:hp(20), width:wp(40),}} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  
});
