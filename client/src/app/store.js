import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import { loadState, saveState } from "./localStorage";  
import favoritesReducer  from "../features/favorites/favoritesSlice";
import searchProductsReducer  from "../features/search/searchSlice";
import relatedProductsReducer  from "../features/related-products/relatedProductsSlice";
import productsByCategoryReducer from "../features/productsByCategory/productsByCategorySlice";
import genaralSlice from "../features/genaralSlice"

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    productsR: productsReducer,
    cartR: cartReducer,
    favoritesR: favoritesReducer,
    searchProductsR: searchProductsReducer,
    relatedProductsR: relatedProductsReducer,
    productsByCategoryR: productsByCategoryReducer,
    genaralSliceR: genaralSlice
  },
  preloadedState: persistedState  
});


store.subscribe(() => {
  saveState({
    cartR: store.getState().cartR,
    favoritesR: store.getState().favoritesR,
    genaralSliceR: store.getState().genaralSliceR

  });
});
