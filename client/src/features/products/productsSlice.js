import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState ={
    products: [],
    isLoading: false,
    error: null
  }


const BASE_URL = "https://dummyjson.com/products";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const res = await axios.get(BASE_URL);
    return res.data;   
})

export const productsSlice = createSlice({
    name:"Products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.isLoading = true,
            state.error = null
      
          })
          builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false,
            state.products = action.payload.products
      
          })
          builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false,
            state.products = [],
            state.error = "Failed to fetch data" || action.error.message
      
          })
    }
})

export default productsSlice.reducer;