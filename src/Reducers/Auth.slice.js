import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api, USER_URL, WooCommerceApi} from '../Services/Api';
import {showWithGravity} from '../Utils/Notify';

export const fetchUser = createAsyncThunk(USER_URL, async (id, {dispatch}) => {
  dispatch(toggleLoading());
  return await api.get(USER_URL + `/${id}`);
});

export const createUser = createAsyncThunk(
  USER_URL,
  async (params, {dispatch}) => {
    dispatch(toggleLoading());
    const response = await WooCommerceApi.post(USER_URL, params);
    if (response.data.status && response.data.status === 400) {
      showWithGravity(response.message);
    } else {
      if (response?.id) {
        dispatch(fetchUser(response.id));
      }
    }
    return response;
  },
);

export const updateUser = createAsyncThunk(
  USER_URL,
  async (params, {dispatch}) => {
    dispatch(toggleLoading());
    const response = await WooCommerceApi.put(
      USER_URL + '/' + params?.id,
      params,
    );
    if (response.data.status && response.data.status === 400) {
      showWithGravity(response.message);
    } else {
      if (response?.id) {
        showWithGravity('User Detail Updated successfully');
      }
    }
    return response;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    token: null,
    loading: false,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload?.username;
    },
    setTokenAction: (state, action) => {
      state.token = action.payload;
    },
    toggleLoading: state => {
      state.loading = !state.loading;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [fetchUser.rejected]: state => {
      state.token = null;
      state.user = {};
      state.loading = false;
    },
    [createUser.fulfilled]: (state, action) => {
      const response = action.payload;
      if (response.data.status && response.data.status === 400) {
        showWithGravity(response.message);
      } else {
        if (response?.id) {
          state.user = response;
          state.token = response.username;
          state.loading = false;
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {setAuthUser, setTokenAction, toggleLoading} = authSlice.actions;

export default authSlice.reducer;
