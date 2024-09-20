import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { Navigate } from "react-router-dom";

const UnprotectedRoute = ({ children }) => {
  const { state } = useContext(ProductsContext);

  if (state.isLogin) {
    return <Navigate to="/user/profile" replace />;
  }
  return children;
};

export default UnprotectedRoute;
