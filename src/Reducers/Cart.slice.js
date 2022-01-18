import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_FROM_CART,
  api,
} from '../Services/Api';
import {showWithGravity} from '../Utils/Notify';

export const getCartItems = createAsyncThunk(GET_CART_ITEMS, async () => {
  const response = await api.get(GET_CART_ITEMS);
  if (response?.status === 200) {
    if (
      Object.values(response?.data)?.length > 0 &&
      typeof response.data === 'object'
    ) {
      let data = Object.values(response.data);
        const filteredArray = data.map(item => {
        return {
          id: item?.id,
          item_key: item?.item_key,
          name: item?.name,
          title: item?.title,
          price: item?.price,
          quantity: item?.quantity,
          totals: item?.totals,
          featured_image: item?.featured_image,
          stock_status: item?.stock_status,
        };
      });

      return {
        status: 200,
        data: filteredArray,
        message: 'Item found successfully',
      };
    } else {
      return {
        status: 403,
        data: null,
        message: 'Empty Carty',
      };
    }
  } else {
    return {
      status: 403,
      data: null,
      message: 'Empty Carty',
    };
  }
});


export const addToCart = createAsyncThunk(
  ADD_TO_CART,
  async (params, {dispatch}) => {
    dispatch(toggleLoading());
    const response = await api.post(ADD_TO_CART, params);
    dispatch(getCartItems());
    return response;
  },
);

export const removeFromCart = createAsyncThunk(
  REMOVE_FROM_CART,
  async (params, {dispatch}) => {
    dispatch(toggleLoading());
    const response = await api.post(REMOVE_FROM_CART, params);
    return response;
  },
);




export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    loading: true,
  },
  reducers: {
    toggleLoading: state => {
      state.loading = !state.loading;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [addToCart.fulfilled]: (state, action) => {
      state.loading = false;
      const response = action?.payload;
      if (response.status === 200) {
        showWithGravity('Product added to cart successfully');

      
      } else {
        if (response.status === 403) {
          showWithGravity(response?.message);
        } else {
          showWithGravity('Product not added to cart , try again');
        }
      }
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false;
      const response = action?.payload;
      if (response.status === 403) {
        showWithGravity(response?.message);
      } else {
        showWithGravity('Product not added to cart , try again');
      }
    },
    [removeFromCart.fulfilled]: state => {
      state.loading = false;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.loading = false;
      const response = action?.payload;
      if (response?.status === 200) {
        state.cart = response.data;
      } else {
        state.cart = [];
        showWithGravity('No item in the cart');
      }
    },
    [getCartItems.rejected]: state => {
      state.loading = false;
      state.cart = [];
      showWithGravity('No item in the cart');
    },
  },
});

// Action creators are generated for each case reducer function
export const {toggleLoading} = cartSlice.actions;

export default cartSlice.reducer;
