import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  api,
  GET_DESIGNER_LIST,
  PRODUCT_CATEGORIES_URL,
  PRODUCT_URL,
  WooCommerceApi,
  WooCommerceCartApi,
} from '../Services/Api';

export const fetchProducts = createAsyncThunk(
  PRODUCT_URL,
  async (params = {}, {dispatch}) => {
    dispatch(toggleLoading());
    return await WooCommerceApi.get(PRODUCT_URL, params);
  },
);
export const fetchCategories = createAsyncThunk(
  PRODUCT_CATEGORIES_URL,
  async (_, {dispatch}) => {
    dispatch(toggleLoading());
    return await WooCommerceCartApi.get(PRODUCT_CATEGORIES_URL);
  },
);
export const fetchDesigners = createAsyncThunk(
  GET_DESIGNER_LIST,
  async (_, {dispatch}) => {
    dispatch(toggleLoading());
    const response = await api.get(GET_DESIGNER_LIST);
    if (response.status === 200) {
      const result = response?.data;
      if (result?.data) {
        return result?.data?.categories?.map(item => {
          return {
            title: item?.title,
            data: item?.items,
          };
        });
      } else {
        return [];
      }
    }
  },
);

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    categories: [],
    designers: {},
    products: {},
    loading: false,
  },
  reducers: {
    toggleLoading: state => {
      state.loading = !state.loading;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchProducts.fulfilled]: (state, action) => {
      // Add user to the state array
      state.loading = false;
      if (action.payload) {
        state.products = action?.payload;
      } else {
        state.products = [];
      }
      state.loading = false;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.products = [];
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action?.payload;
    },
    [fetchDesigners.fulfilled]: (state, action) => {
      state.loading = false;
      if (action?.payload) {
        state.designers = action?.payload;
      } else {
        state.designers = [];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {toggleLoading} = productSlice.actions;

export default productSlice.reducer;
