import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState ={
    searchProducts: [],
    isLoading: false,
    error: null
  }


const BASE_URL = "https://dummyjson.com/products";

export const fetchSearchProducts = createAsyncThunk("products/fetch_Search_Products", async (value) => {
    const res = await axios.get(BASE_URL+value);
    return res.data;   
})

export const searchProductsSlice = createSlice({
    name:"searchProducts",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchSearchProducts.pending, state => {
            state.isLoading = true,
            state.error = null
      
          })
          builder.addCase(fetchSearchProducts.fulfilled, (state, action) => {
            state.isLoading = false,
            state.searchProducts = action.payload.products
      
          })
          builder.addCase(fetchSearchProducts.rejected, (state, action) => {
            state.isLoading = false,
            state.searchProducts = [],
            state.error = "Failed to fetch data" || action.error.message
      
          })
    }
})

export default searchProductsSlice.reducer;