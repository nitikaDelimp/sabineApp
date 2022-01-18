import React, {useEffect} from 'react';
import {getAuthUserStorage, getJwtAuthToken} from './Services/Storage';
import {useDispatch, useSelector} from 'react-redux';
import AppNavigator from './Navigation/AppNavigator';
import AuthNavigator from './Navigation/AuthNavigator';
import {setAuthUser, setTokenAction} from './Reducers/Auth.slice';
import {fetchCategories} from './Reducers/Product.slice';
import {api, VALIDATE_TOKEN} from './Services/Api';
import {showWithGravity} from './Utils/Notify';

function Index() {
  const dispatch = useDispatch();
  const {user = {}} = useSelector(state => state?.auth);
  const {categories = {}} = useSelector(state => state?.products);

  useEffect(() => {
    (async () => {
      const authToken = await getJwtAuthToken();
      if (authToken?.length > 0) {
        try {
          const response = await api.post(VALIDATE_TOKEN);
          console.log('response==============>',response)
          if (response?.status === 200) {
            dispatch(setTokenAction(authToken));
            const data = await getAuthUserStorage();
            if (Object.keys(data).length !== 0 && data.constructor === Object) {
              dispatch(setAuthUser(data));
            }
          }
        } catch (e) {
          showWithGravity(e.toString());
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (!(categories.length > 0)) {
      dispatch(fetchCategories());
    }
  }, [categories]);


  return (
    <>
      {Object.keys(user).length !== 0 && user.constructor === Object ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
}
export default Index;
