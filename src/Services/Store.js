import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../Reducers/Auth.slice';
import ordersReducer from '../Reducers/Order.slice';
import productReducer from '../Reducers/Product.slice';
import cartReducer from '../Reducers/Cart.slice';

const rootReducer = {
  cart: cartReducer,
  products: productReducer,
  auth: authReducer,
  orders: ordersReducer,
};

const store = configureStore({
  reducer: {
    ...rootReducer,
  },
});

export default store;
