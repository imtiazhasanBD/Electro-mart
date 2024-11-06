import React, { useContext } from "react";
import { HiOutlineMenuAlt2, HiOutlineHome } from "react-icons/hi";
import { CiShoppingCart, CiDeliveryTruck } from "react-icons/ci";
import { IoHeartOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";

import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

const Sidebar = () => {
  
  const { cart, isLoading, error } = useSelector((state) => state.cartR);
  const { favorites } = useSelector((state) => state.favoritesR);
  const { isLogin , avatar } = useSelector((state) => state.genaralSliceR);

  return (
    <div className="fixed bottom-0 right-0 w-full p-1 bg-white text-gray-700 font-bold z-10 sm:hidden border-2 border-gray-200">
      <nav className="px-8 py-3 flex justify-between list-none">
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
              {cart.length > 0 && (
                <span className="px-1 bg-blue-500 text-white rounded-full text-xs absolute top-0 right-0">
                  {cart.length}
                </span>
              )}
            </button>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/favs"}>
            <button className="relative">
              <IoHeartOutline size={"1.5rem"} />
              {favorites.length > 0 && (
                <span className="px-1 bg-blue-500 text-white rounded-full text-xs absolute top-0 right-0">
                  {favorites.length}
                </span>
              )}
            </button>
          </NavLink>
        </li>

        <li>
        <NavLink
            to={isLogin ? "/user/orders" : "/user/login"}
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
          <NavLink to={"/user/profile"}>
            <button>
              {!avatar ? (
                <HiOutlineUserCircle size={"1.5rem"} />
              ) : (
                <img
                  src={avatar}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
            </button>
          </NavLink>
        </li>
      </nav>
    </div>
  );
};

export default Sidebar;
