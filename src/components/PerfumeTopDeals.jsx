import React, { useContext, useState } from "react";
import perfume_banner from "../assets/images/banner_images/fragrances_banner_3.jpg";
import { ProductsContext } from "../context/ProductsContext";

import { FaHeart } from "react-icons/fa";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaArrowCircleRight } from "react-icons/fa";
import { useAddToCart } from "./useAddToCart";
import { useAddToFavs } from "./useAddToFavs";
import { Link } from "react-router-dom";

const PerfumeTopDeals = () => {
  const { state, dispatch } = useContext(ProductsContext);

  let filtered;

  if (state.products[0]) {
    filtered = state.products[0]
      .filter((product) =>
        product.category.toLowerCase().includes("fragrances")
      )
      .sort((a, b) => b.discountPercentage - a.discountPercentage);
  }

  // Product Add To Cart
  const addToCart = useAddToCart();

  // Product Add To Favs
  const addTofavs = useAddToFavs();

  return (
    <div className="bg-white p-4 md:mx-8 my-2  md:block lg:block">
      <span className="flex justify-between items-center text-2xl text-blue-500 font-bold border-b-2 mb-1 pb-1">
        <p className="text-black">Best Fragrances Deals</p>
        <FaArrowCircleRight className="cursor-pointer" />
      </span>

      <div className="bg-white flex gap-2 justify-center items-center ">
        <section className="flex gap-2 bg-white bottom-2 overflow-auto scrollbar-custom">
          {filtered &&
            filtered.map((product) => (
              <div
                key={product.id}
                className=" p-3 relative border-2 border-gray-100"
              >
                <Link to={`/preview/${product.title}`} state={{ product }}>
                  <img src={product.thumbnail} alt="" />
                </Link>
                <FaHeart
                  onClick={() => addTofavs(product)}
                  className="absolute top-0 right-0 mt-2 mr-2 text-gray-300 hover:text-gray-500 cursor-pointer"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-sm md:text-lg font-semibold">
                    {product.title}
                  </p>
                  <p className="price text-sm md:text-xl font-bold text-blue-500">
                    $
                    {(
                      product.price -
                      (product.price / 100) * product.discountPercentage
                    ).toFixed(2)}
                  </p>
                  <span className="flex gap-2">
                    <p className="line-through text-gray-500 text-xs md:text-sm">
                      ${product.price}
                    </p>
                    <p className=" text-red-500 text-xs md:text-sm">
                      {product.discountPercentage}%
                    </p>
                  </span>
                </div>
                <CiShoppingCart
                  onClick={() => addToCart(product)}
                  size={"1.4rem"}
                  className="absolute top-6 right-0 mt-2 mr-2 text-gray-400 cursor-pointer hover:text-gray-600"
                />
              </div>
            ))}
        </section>
        <section className="w-[35%] hidden md:block lg:block">
          <img src={perfume_banner} alt="" className="w-full h-full" />
        </section>
      </div>
    </div>
  );
};

export default PerfumeTopDeals;
