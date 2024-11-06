import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productsByCategory: {},
  isLoading: false,
  error: null,
};

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetch_Products_ByCategory",
  async (category) => {
    const res = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    return res.data;
  }
);

export const productsByCategorySlice = createSlice({
  name: "productsByCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsByCategory[action.meta.arg] = action.payload.products;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.productsByCategory[action.meta.arg] = []; 
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default productsByCategorySlice.reducer;
