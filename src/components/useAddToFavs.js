import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { toast } from "react-toastify";

export const useAddToFavs = () => {
    const { state, dispatch } = useContext(ProductsContext);

    const addToFavs = (product) => {
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
    };

    return addToFavs;
};
