import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {WooCommerceApi, ORDER_URL} from '../Services/Api';

export const getOrders = createAsyncThunk(
  ORDER_URL,
  async (params, {dispatch}) => {
    dispatch(toggleLoading());
    const response = await WooCommerceApi.get(ORDER_URL);
    return response.data;
  },
);

export const cancelOrders = createAsyncThunk(
  ORDER_URL,
  async (order_number, {dispatch}) => {
    dispatch(toggleLoading());
    const response = await WooCommerceApi.post(ORDER_URL, {order_number});
    dispatch(getOrders());
    return response.data;
  },
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
  },
  reducers: {
    toggleLoading: state => {
      state.loading = !state.loading;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [getOrders.fulfilled]: (state, action) => {
      const res = action?.payload;
      state.loading = false;
      state.orders = res?.data || [];
      if (res?.response === 'success') {
      } else {
        //
      }
    },
    [cancelOrders.fulfilled]: (state, action) => {
      const res = action?.payload;
      state.loading = false;
      if (res?.response === 'success') {
        //
      } else {
        //
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {toggleLoading} = ordersSlice.actions;

export default ordersSlice.reducer;
