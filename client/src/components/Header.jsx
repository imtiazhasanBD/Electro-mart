import React, {  useState } from "react";
import { CiSearch } from "react-icons/ci";

import { IoHeartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import logo from "../assets/images/logo2.png";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../features/genaralSlice";

const Header = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { cart, isLoading, error } = useSelector((state) => state.cartR);
  const { favorites } = useSelector((state) => state.favoritesR);
  const { avatar } = useSelector((state) => state.genaralSliceR);
  const navigate = useNavigate();

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    if (search) {
        dispatch(setLoading(true));
      // Navigate to search results page
      navigate(`/products/search?q=${search}`);
    }
  };

  // To hide the back botton on homepage
  const isHomePage = location.pathname === "/";

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <header
      className={`bg-blue-500 flex justify-between sm:gap-10 items-center sm:px-12 py-3 sticky top-0 z-40 ${
        !isHomePage ? "pr-5 pl-2" : "px-5"
      }`}
    >
      {!isHomePage && (
        <NavLink
          onClick={handleBackClick}
          className="text-white  m-auto text-center pr-2  md:hidden"
        >
          <button className="">
            <BiArrowBack size={"1.7rem"} />
          </button>
        </NavLink>
      )}
      <NavLink to="/">
        <div className="md:text-3xl sm:text-md text-xl font-bold text-white hidden sm:block">
          ElectroMart
        </div>
      </NavLink>

      <div className="flex justify-between items-center px-5 py-2 bg-gray-100 rounded sm:w-[60%] w-full">
        <input
          onChange={handleSearchChange}
          type="text"
          value={search}
          placeholder="Search product"
          className="bg-transparent outline-0 w-full"
        />
        <button
          onClick={handleSearch}
          className="text-blue-600 font-bold text-lg"
        >
          <CiSearch />
        </button>
      </div>

      <div className="gap-8 justify-center items-center text-lg text-white font-bold hidden sm:flex">
        <NavLink to="/user/profile">
          <button className="flex justify-center items-center gap-2 text-sm">
            {!avatar ? (
              <CgProfile className="text-3xl" />
            ) : (
              <img
                src={avatar}
                className="w-8 h-8 rounded-full"
                alt="User Avatar"
              />
            )}
            <p className="hidden md:block">Account</p>
          </button>
        </NavLink>

        <NavLink to="favs">
          <button className="flex justify-center items-center gap-2 text-sm">
            <span className="relative">
              <IoHeartOutline className="text-2xl" />
              {favorites.length > 0 && (
                <span className="px-1 bg-red-500 rounded-full text-xs absolute bottom-3 left-3">
                  {favorites.length}
                </span>
              )}
            </span>
          </button>
        </NavLink>

        <NavLink to="cart">
          <button className="flex justify-center items-center gap-2 text-sm">
            <span className="relative">
              <BsCart3 className="text-2xl" />
              <span className="px-1 bg-red-500 rounded-full text-xs absolute bottom-3 left-3">
                {cart.length === 0
                  ? 0
                  : cart.length}
              </span>
            </span>
            <p className="hidden md:block">Cart</p>
          </button>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
