import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  isLoading: false,
  error: null,
};

// Add to Favs action
export const AddToFavs = createAsyncThunk("products/add_to_favs", async (product) => {
  return product;
});

// Remove from Favs action
export const RemoveFromFavs = createAsyncThunk("products/remove_from_favs", async (id) => {
  return id;
});


export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(AddToFavs.pending, state => {
      state.isLoading = true,
      state.error = null

    })
    .addCase(AddToFavs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.favorites = [...state.favorites, action.payload]
  })
    .addCase(AddToFavs.rejected, (state, action) => {
      state.isLoading = false,
      state.favorites = [],
      state.error = "Failed to fetch data" || action.error.message

    })
    .addCase(RemoveFromFavs.fulfilled, (state, action) => {
      state.favorites = state.favorites.filter(product => product.id !== action.payload);
    })
  },
});

export default favoritesSlice.reducer;
