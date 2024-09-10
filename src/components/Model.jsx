import React, { useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { ProductsContext } from "../context/ProductsContext";
import SignIn from "../pages/SignIn";

const Model = () => {
  const { dispatch } = useContext(ProductsContext);


  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);


  return createPortal(
    <div
      className="fixed  bg-black/40 inset-0 z-10 hidden md:block lg:block"
      onClick={() => dispatch({ type: "SET_MODEL", payload: false })}
    >
      <div onClick={(e) => e.stopPropagation()}
        className=" w-[60%] h-3/4  bg-white fixed top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 flex rounded-lg"
     >
         <SignIn/>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Model;
