import { useState, useEffect, createContext, useReducer } from "react";
import reducer from "../reducer/productsReducer";

export const ProductsContext = createContext({});

const getLocalData = () => {
  const data = localStorage.getItem("appState");
  return data ? JSON.parse(data) : {};
};

const initialState = {
  isLoading: true,
  isError: false,
  products: [],
  searchProducts: getLocalData().searchProducts || [],
  cartProducts: getLocalData().cartProducts || [],
  saleProducts: [],
  relatedProducts: getLocalData().relatedProducts || [],
  favoriteProducts: getLocalData().favoriteProducts || [],
  showMessage: "Product has Added To Cart",
  image: "",
  isModelOpen: false,
  isLogin: getLocalData().isLogin ?? false,
  avatar: getLocalData().avatar || "",
};

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await fetch("https://dummyjson.com/products");

        // Check if the response is not okay (e.g., status code 404 or 500)
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        dispatch({ type: "API_DATA", payload: data.products });
      } catch (error) {
        dispatch({ type: "API_DATA_ERROR" });
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
