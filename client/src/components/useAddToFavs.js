import React, {useState,useEffect, useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useAddToFavs = () => {
    const { state, dispatch } = useContext(ProductsContext);
    const navigate = useNavigate();
  
    // State for screen size
    const [isDesktop, setIsDesktop] = useState(window.matchMedia("(min-width: 768px)").matches);
  
    useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 768px)");
  
      // Update the state based on screen size
      const handleScreenChange = (e) => setIsDesktop(e.matches);
  
      // Attach the listener
      mediaQuery.addEventListener('change', handleScreenChange);
  
      // Cleanup on component unmount
      return () => mediaQuery.removeEventListener('change', handleScreenChange);
    }, []);

    const addToFavs = (product) => {
        if (!state.isLogin && !isDesktop) {
            navigate("/user/profile"); // Redirect to login if user is not logged in and on mobile
          } else {
        if (state.isLogin) {
            if (!state.favoriteProducts.some(favProduct => favProduct.id === product.id)) {
                dispatch({ type: "ADD_TO_FAVORITES", payload: product });
                toast.success("The product has been added to the wishlist");
            } else {
                toast.warning("Already in Wishlist");
            }
        } else {
            dispatch({ type: "SET_MODEL", payload: true });
        }
    }
    };

    return addToFavs;
};
