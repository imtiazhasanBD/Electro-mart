import { useState, useEffect, createContext, useReducer } from "react";
import reducer from '../reducer/productsReducer';

export const ProductsContext = createContext({});
const initialState = {
     isLoading: false,
     isError: false,
     products: [],
     cartProducts: [],
    
}

const ProductsProvider = ({children}) => {

    const [state , dispatch] = useReducer(reducer, initialState)

     useEffect(() => {
        
       try {
        fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
            dispatch({type: "API_DATA", payload: data})
        })
       } catch (error) {
        dispatch({type: "API_DATA_ERROR"})
       }
     },[])
    
    
   

         return  <ProductsContext.Provider value={{state, dispatch}}>
                    {children}
                </ProductsContext.Provider>
    
}



export default ProductsProvider;