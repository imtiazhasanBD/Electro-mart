import React, {useState,useEffect, useContext } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddToFavs } from "../features/favorites/favoritesSlice";
import { setModel } from "../features/genaralSlice";

export const useAddToFavs = () => {
    
    const { favorites, isLoading, error } = useSelector((state) => state.favoritesR);
    const { isLogin } = useSelector((state) => state.genaralSliceR);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
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
        if (!isLogin && !isDesktop) {
            navigate("/user/profile"); // Redirect to login if user is not logged in and on mobile
          } else {
        if (isLogin) {
            if (!favorites.some(favProduct => favProduct.id === product.id)) {
                dispatch(AddToFavs(product));
                toast.success("The product has been added to the wishlist");
            } else {
                toast.warning("Already in Wishlist");
            }
        } else {
            dispatch(setModel(true));
        }
    }
    };

    return addToFavs;
};
