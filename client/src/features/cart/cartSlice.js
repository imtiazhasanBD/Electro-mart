import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  isLoading: false,
  error: null,
};

// Add to Cart action
export const AddToCart = createAsyncThunk(
  "products/add_to_cart",
  async (product) => {
    return product;
  }
);

// Remove from Cart action
export const RemoveFromCart = createAsyncThunk(
  "products/remove_from_cart",
  async (id) => {
    return id;
  }
);

// Remove quantity action
export const RemoveQuantity = createAsyncThunk(
  "products/remove_quantity",
  async (id) => {
    return id;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddToCart.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        const product = state.cart.find(
          (product) => product.id === action.payload.id
        );
        state.isLoading = false;
        product
          ? (product.quantity += 1)
          : state.cart.push({ ...action.payload, quantity: 1 });
      })
      .addCase(AddToCart.rejected, (state, action) => {
        (state.isLoading = false),
          (state.cart = []),
          (state.error = "Failed to fetch data" || action.error.message);
      })
      .addCase(RemoveFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(RemoveQuantity.fulfilled, (state, action) => {
        const product = state.cart.find(
          (product) => product.id === action.payload
        );
        if (product && product.quantity > 1) {
          product.quantity -= 1;
        }
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
