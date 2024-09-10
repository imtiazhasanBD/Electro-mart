import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Order = () => {
  return (
    <div className="m-auto p-4 lg:mx-8 md:mx-8 relative bg-white mb-2">
      <h1 className="text-3xl font-bold text-blue-400">My Order</h1>
      <div>
        <p className="text-gray-600 mt-10">
          No orders yet. Browse and add some!
        </p>
        <NavLink to="/">
          <button className="flex items-center gap-3 text-white bg-blue-400 font-semibold rounded p-2 my-5">
            <BsArrowLeft />
            <span>Continue Shopping</span>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Order;
