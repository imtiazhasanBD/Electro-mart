import { useState, useEffect, createContext, useReducer } from "react";
import reducer from '../reducer/productsReducer';

export const ProductsContext = createContext({});
const initialState = {
     isLoading: false,
     isError: false,
     products: [],
     cartProducts: [],
     relatedProducts: [],
     favoriteProducts: [],
     showMessage: 'Product has Added To Cart',
     image: ''
    
}

const ProductsProvider = ({children}) => {

    const [state , dispatch] = useReducer(reducer, initialState)

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
    
    
   

         return  <ProductsContext.Provider value={{state, dispatch}}>
                    {children}
                </ProductsContext.Provider>
    
}


    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => console.log(data.products[29]))


export default ProductsProvider;


