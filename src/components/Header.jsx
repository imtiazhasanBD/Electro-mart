import React, { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { ProductsContext } from "../context/ProductsContext";
import { IoHeartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Header = () => {
  const [search, setSearch] = useState("");
  const { state, dispatch } = useContext(ProductsContext);
  const navigate = useNavigate();

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    if (search.trim()) {
      // Fetch search results
      fetch(`https://dummyjson.com/products/search?q=${search}`)
        .then((res) => res.json())
        .then((data) => {
          // Dispatch search results to the context
          dispatch({ type: "PRODUCT_SEARCH", payload: data.products });

          // Navigate to search results page
          navigate(`/search/${search}`);
        })
        .catch((error) => {
          dispatch({ type: "API_DATA_ERROR" });
        });
    }
  };
  // To hide the back botton on homepage
  const isHomePage = location.pathname === '/';

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };


  return (
    <header className={`bg-blue-500 flex justify-between sm:gap-10 items-center sm:px-12 py-3 sticky top-0 z-10 ${!isHomePage? 'pr-5 pl-2' : 'px-5'}`}>
     {!isHomePage && <NavLink
        onClick={handleBackClick}
        className="text-white  m-auto text-center pr-2  md:hidden"
      >
        <button className="">
          <BiArrowBack size={"1.7rem"} />
        </button>
      </NavLink>}
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
        <NavLink to="/user">
          <button className="flex justify-center items-center gap-2 text-sm">
            {!state.avatar ? (
              <CgProfile className="text-3xl" />
            ) : (
              <img
                src={state.avatar}
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
              {state.favoriteProducts.length > 0 && (
                <span className="px-1 bg-red-500 rounded-full text-xs absolute bottom-3 left-3">
                  {state.favoriteProducts.length}
                </span>
              )}
            </span>
          </button>
        </NavLink>

        <NavLink to="cart">
          <button className="flex justify-center items-center gap-2 text-sm">
            <span className="relative">
              <BsCart3 className="text-2xl" />
              {state.cartProducts.length > 0 && (
                <span className="px-1 bg-red-500 rounded-full text-xs absolute bottom-3 left-3">
                  {state.cartProducts.length}
                </span>
              )}
            </span>
            <p className="hidden md:block">Cart</p>
          </button>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
