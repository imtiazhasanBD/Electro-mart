import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModelOpen: false,
  isItLoading: false,
  isLogin: false,
  avatar: null,
};

const genaralSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setModel: (state, action) => {
      state.isModelOpen = action.payload;
    },
    setLoading: (state, action) => {
      state.isItLoading = action.payload;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const {
  setMessage,
  setImage,
  setModel,
  setLoading,
  setLogin,
  setAvatar,
  setSortCriteria,
} = genaralSlice.actions;

export default genaralSlice.reducer;
