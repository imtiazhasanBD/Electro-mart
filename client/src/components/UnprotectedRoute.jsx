import React, { useContext } from "react";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UnprotectedRoute = ({ children }) => {
  const { isLogin } = useSelector((state) => state.genaralSliceR);

  if (isLogin) {
    return <Navigate to="/user/profile" replace />;
  }
  return children;
};

export default UnprotectedRoute;
