import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  relatedProducts: [],
  isLoading: false,
  error: null,
};

export const fetchRelatedProducts = createAsyncThunk(
  "products/fetch_Related_Products",
  async (category) => {
    const res = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    return res.data;
  }
);

export const relatedProductsSlice = createSlice({
  name: "relatedProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedProducts.pending, (state) => {
      (state.isLoading = true), (state.error = null);
    });
    builder.addCase(fetchRelatedProducts.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.relatedProducts = action.payload.products);
    });
    builder.addCase(fetchRelatedProducts.rejected, (state, action) => {
      (state.isLoading = false),
        (state.relatedProducts = []),
        (state.error = "Failed to fetch data" || action.error.message);
    });
  },
});

export default relatedProductsSlice.reducer;
