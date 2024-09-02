import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { state } = useContext(ProductsContext);
  if (!state.isLogin) {
    return <Navigate to="/user" replace />;
  }
  return children;
};

export default Protected;
