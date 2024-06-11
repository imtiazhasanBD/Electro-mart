import { useState, useEffect, createContext } from "react";


export const ProductsContext = createContext({});

const ProductsProvider = ({children}) => {
 
    const [products, setProducts] = useState(null);
    const [flitedProducts, setFlitedproducts] = useState(null);
    const [cartProducts, setCartProducts]= useState([])


     useEffect(() => {
         fetch("https://fakestoreapi.com/products")
         .then((res) => res.json())
         .then((data) => {
             setProducts(data);
             setFlitedproducts(data)
         })
    
    
     },[])
    

         return  <ProductsContext.Provider value={{products, setProducts , flitedProducts, setFlitedproducts, cartProducts, setCartProducts}}>
                    {children}
                </ProductsContext.Provider>
    
}



export default ProductsProvider;