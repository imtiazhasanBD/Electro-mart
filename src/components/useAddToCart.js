import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useAddToCart = () => {
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

  const addToCart = (product) => {
    if (!state.isLogin && !isDesktop) {
      navigate("/user"); // Redirect to login if user is not logged in and on mobile
    } else {
      if (state.isLogin) {
        dispatch({ type: "ADD_TO_CART", payload: { product, quantity: 1 } });
        toast.success("The product added successfully!");
      } else {
        dispatch({ type: "SET_MODEL", payload: true }); // Show modal if not logged in but on desktop
      }
    }
  };

  return addToCart;
};
