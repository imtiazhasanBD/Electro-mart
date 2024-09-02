import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { toast } from "react-toastify";

export const useAddToCart = () => {
    const { state, dispatch } = useContext(ProductsContext);

    const addToCart = (product) => {
        if (state.isLogin) {
            dispatch({ type: "ADD_TO_CART", payload: { product: product, quantity: 1 } });
            toast.success("The product added successfully!");
        } else {
            dispatch({ type: "SET_MODEL", payload: true });
        }
    };

    return addToCart;
};
