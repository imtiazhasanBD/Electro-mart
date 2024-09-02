import { useState, useEffect, createContext, useReducer } from "react";
import reducer from '../reducer/productsReducer';

export const ProductsContext = createContext({});


const getLocalData = () => {
    const data = localStorage.getItem('appState');
    return data ? JSON.parse(data) : {};
  };

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    searchProducts: getLocalData().searchProducts || [],
    cartProducts: getLocalData().cartProducts || [],
    saleProducts: [],
    relatedProducts: getLocalData().relatedProducts || [],
    favoriteProducts: getLocalData().favoriteProducts || [],
    showMessage: 'Product has Added To Cart',
    image: '',
    isModelOpen: false,
    isLogin: getLocalData().isLogin ?? false,
    avatar: getLocalData().avatar || ''
    
}

const ProductsProvider = ({children}) => {

    const [state , dispatch] = useReducer(reducer, initialState);

     useEffect(() => {
        
       try {
        fetch('https://dummyjson.com/products')
        .then((res) => res.json())
        .then((data) => {
            dispatch({type: "API_DATA", payload: data.products})
        })
       } catch (error) {
        dispatch({type: "API_DATA_ERROR"})
       }
     },[])
    
     useEffect(() => {
        localStorage.setItem('appState', JSON.stringify(state))
     },[state])

         return  <ProductsContext.Provider value={{state, dispatch}}>
                    {children}
                </ProductsContext.Provider>
    
}


export default ProductsProvider;
