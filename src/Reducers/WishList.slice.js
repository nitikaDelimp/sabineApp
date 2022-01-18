import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {WooCommerceApi, WISHLIST_URL} from '../Services/Api';

export const getWishList = createAsyncThunk(WISHLIST_URL, async () => {
  const response = await WooCommerceApi.get(WISHLIST_URL);
  return response.data;
});

export const addToWishList = createAsyncThunk(
  WISHLIST_URL,
  async (params, {dispatch}) => {
    dispatch(toggleLoading());
    const response = await WooCommerceApi.post(WISHLIST_URL, params);
    dispatch(getWishList());
    return response.data;
  },
);

export const removeFromWishList = createAsyncThunk(
  WISHLIST_URL,
  async (params, {dispatch}) => {
    dispatch(toggleLoading());
    const response = await WooCommerceApi.delete(WISHLIST_URL, params);
    dispatch(getWishList());
    return response.data;
  },
);

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: [],
    loading: false,
  },
  reducers: {
    toggleLoading: state => {
      state.loading = !state.loading;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [addToWishList.fulfilled]: (state, action) => {
      state.loading = false;
      const res = action?.payload;
      if (res?.response === 'success') {
        //
      } else {
        if (typeof res?.message === 'string') {
          //
        }
      }
    },
    [removeFromWishList.fulfilled]: (state, action) => {
      state.loading = false;
      const res = action?.payload;
      if (res?.response === 'success') {
        //
      } else {
        if (typeof res?.message === 'string') {
          //
        }
      }
    },
    [getWishList.fulfilled]: (state, action) => {
      state.loading = false;
      const res = action?.payload;
      if (res?.response === 'success') {
        state.wishlist = res?.data;
      } else {
        state.wishlist = {};
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {toggleLoading} = wishlistSlice.actions;

export default wishlistSlice.reducer;
