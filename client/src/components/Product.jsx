import React, {  useEffect } from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { useAddToCart } from "./useAddToCart";
import { useAddToFavs } from "./useAddToFavs";
import Rating from "./Rating";

const Product = ({ product }) => {
  const {
    id,
    title,
    images,
    description,
    price,
    category,
    rating,
    thumbnail,
    discountPercentage,
    reviews,
    stock,
  } = product;
  
  const navigate = useNavigate();

  // Check if the screen width is above 768px (or any threshold you prefer)
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  // Product Add To Cart
  const addToCart = useAddToCart();

  // Product Add To Wishlist
  const addTofavs = useAddToFavs();

  const location = useLocation();
  const flashSale = location.pathname === "/flash-sales";

  return (
    <div className="product bg-white drop-shadow-sm border p-2 flex flex-col gap-4 border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 duration-200 cursor-pointer">
      <div className="w-full relative p-2 group">
        <Link to={`/preview/${title}`} state={{ product }}>
          <img
            className="w-full h-full rounded-md object-cover hover:scale-110 duration-300"
            src={thumbnail}
            alt=""
          />
        </Link>
        <p
          className={`absolute top-0 bg-gray-200 text-sm font-bold  p-1 mt-1 ${
            flashSale && "text-blue-500"
          }`}
        >
          save {discountPercentage}%
        </p>
        <FaHeart
          onClick={() => addTofavs(product)}
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-300 hover:text-gray-500 cursor-pointer"
        />
      </div>
      <div className="flex-1">
        <p className="text-xs uppercase text-gray-400 pb-1">{category}</p>
        <h1 className="text-lg font-bold line-clamp-2">{title}</h1>
        <p className="desc text-sm hidden md:block lg:block">
          {description.substring(0, 50) + "..."}
        </p>
        <Rating
          rating={rating}
          count={reviews.length}
          className="text-base mt-2"
        />
        <div className="price-buy flex justify-between items-center pr-2">
          <div className="flex gap-2 items-center">
            <p className="line-through text-gray-500 text-sm">${price}</p>
            <p className="font-bold text-skyText">
              ${(price - (price / 100) * discountPercentage).toFixed(2)}
            </p>
          </div>
          {/*
          <CiShoppingCart
            size={"1.4rem"}
            onClick={() => addToCart(product)}
            className="cursor-pointer hover:text-gray-500"
          />
          */}
        </div>
      </div>
      {flashSale &&
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`bg-blue-500 h-2 rounded-full ${stock <20 && "bg-red-600"}`}
          style={{ width: `${stock}%` }}
        ></div>
      </div>}
      <button
        onClick={() => addToCart(product)}
        className={`bg-[#f7f7f7] text-black font-semibold p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-blue-500 hover:text-white duration-200 cursor-pointer ${
          flashSale && "bg-blue-500 text-white hover:bg-blue-700"
        }`}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default Product;
