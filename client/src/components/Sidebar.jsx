import React, { useContext } from "react";
import { HiOutlineMenuAlt2, HiOutlineHome } from "react-icons/hi";
import { CiShoppingCart, CiDeliveryTruck } from "react-icons/ci";
import { IoHeartOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";

import { NavLink } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

const Sidebar = () => {
  const { state, dispatch } = useContext(ProductsContext);

  return (
    <div className="fixed bottom-0 right-0 w-full p-1 bg-white text-gray-700 font-bold z-10 sm:hidden border-2 border-gray-200">
      <ul className="px-8 py-3 flex justify-between">
        {/*   <li>
          <button>
            <HiOutlineMenuAlt2 size={'1.5rem'}/>
          </button>
        </li> */}

        <li>
          <NavLink to={"/"}>
            <button>
              <HiOutlineHome size={"1.5rem"} />
            </button>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/cart"}>
            <button className="relative">
              <CiShoppingCart size={"1.5rem"} />
              {state.cartProducts.length > 0 && (
                <span className="px-1 bg-blue-500 text-white rounded-full text-xs absolute top-0 right-0">
                  {state.cartProducts.length}
                </span>
              )}
            </button>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/favs"}>
            <button className="relative">
              <IoHeartOutline size={"1.5rem"} />
              {state.favoriteProducts.length > 0 && (
                <span className="px-1 bg-blue-500 text-white rounded-full text-xs absolute top-0 right-0">
                  {state.favoriteProducts.length}
                </span>
              )}
            </button>
          </NavLink>
        </li>

        <li>
        <NavLink
            to={state.isLogin ? "/orders" : "/user/login"}
            className={({ isActive }) => 
              isActive && location.pathname !== "/user/login" ? 'active' : ''
            }
          >
            <button>
              <CiDeliveryTruck size={"1.5rem"} />
            </button>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/user"}>
            <button>
              {!state.avatar ? (
                <HiOutlineUserCircle size={"1.5rem"} />
              ) : (
                <img
                  src={state.avatar}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
            </button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
