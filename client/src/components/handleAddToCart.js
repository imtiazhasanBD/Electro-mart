import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAddToCart } from "./useAddToCart";
import { useSelector } from 'react-redux';

const handleAddToCart = () => {
  const { isLogin } = useSelector((state) => state.genaralSliceR);
    const navigate = useNavigate();
    // Check if the screen width is above 768px (or any threshold you prefer)
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    
      // Product Add To Cart
      const addToCart = useAddToCart();
    
      const handleAddToCart = (product) => {
        if (!isLogin && !mediaQuery.matches) {
          navigate("/user/login");
        } else {
          addToCart(product);
        }
      };
}

export default handleAddToCart
