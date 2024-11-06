import React, { useContext } from "react";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ children }) => {
  const { isLogin } = useSelector((state) => state.genaralSliceR);

  if (!isLogin) {
    return <Navigate to="/user/login" replace />;
  }
  return children;
};

export default Protected;
