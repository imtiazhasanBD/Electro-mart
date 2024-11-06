import React, {  useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../features/cart/cartSlice";
import { setModel } from "../features/genaralSlice";

export const useAddToCart = () => {
  
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

  const addToCart = (product) => {
    if (!isLogin && !isDesktop) {
      navigate("/user/profile"); // Redirect to login if user is not logged in and on mobile
    } else {
      if (isLogin) {
        dispatch(AddToCart(product))
        toast.success("The product added successfully!");
      } else {
        dispatch(setModel(true)); // Show modal if not logged in but on desktop
      }
    }
  };

  return addToCart;
};
