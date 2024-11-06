import React, { useEffect } from "react";
import FlashSaleTimer from "./FlashSaleTimer";
import Product from "./Product";
import { v4 as uuidv4 } from "uuid";

import { FaHeart } from "react-icons/fa";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { useAddToCart } from "./useAddToCart";
import { useAddToFavs } from "./useAddToFavs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../features/genaralSlice";

const FlashSale = () => {
  
  const dispatch = useDispatch();
  const { products} = useSelector((state) => state.productsR);

  // Product Add To Cart
  const addToCart = useAddToCart();

  // Product Add To Favs
  const addTofavs = useAddToFavs();



  return (
    <div className="bg-white md:mx-8 my-2">
      <div className="flex flex-col border-b-2">
        <section className="flex justify-between items-center p-3 text-xl font-semibold">
          <p className="sm:text-2xl md:text-2xl">FlashSale</p>
          <div className="hidden md:block lg:block">
            <FlashSaleTimer />
          </div>
          <Link to="/flash-sales" onClick={() =>     dispatch(setLoading(true))} className="text-blue-500 text-lg">Show All</Link>
        </section>
        <div className="block md:hidden lg:hidden ">
          <FlashSaleTimer />
        </div>
      </div>
      {/* flash sell product for web */}
      <div className="flash-sale-products md:grid grid-cols-1  xl:grid-cols-7 md:grid-cols-3 gap-2 p-2 hidden sm:hidden">
        {products &&
          [...products].sort(
            (a, b) => b.discountPercentage - a.discountPercentage
          ).slice(0, 7).map((product) => (
            <div
              key={product.id}
              className="flash-sale-product bg-gray-100 p-3 relative"
            >
              <Link to={`/preview/${product.title}`} state={{ product }}>
                <img src={product.thumbnail} alt="" />
              </Link>
              <FaHeart
                onClick={() => addTofavs(product)}
                className="absolute top-0 right-0 mt-2 mr-2 text-gray-300 hover:text-gray-500 cursor-pointer"
              />
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold">{product.title}</p>
                <p className="price text-xl font-bold text-blue-500">
                  $
                  {(
                    product.price -
                    (product.price / 100) * product.discountPercentage
                  ).toFixed(2)}
                </p>
                <span className="flex gap-2">
                  <p className="line-through text-gray-500 text-sm">
                    ${product.price}
                  </p>
                  <p className=" text-red-500 text-sm">
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
      </div>

      {/* flash sell product for mobile */}
      <div className="flex w-full p-4 md:hidden lg:hidden">
        {products[0] && (
          <section className=" border-r-2">
            <Link
              to={`/preview/${products[0].title}`}
              state={{ product: products[0] }}
            >
              <img src={products[0].thumbnail} alt="" />
            </Link>
            <div>
              <span className="flex gap-2">
                <p className="line-through text-gray-500 text-sm">
                  ${products[0].price}
                </p>
                <p className=" text-red-500 text-sm">
                  {products[0].discountPercentage}%
                </p>
              </span>
              <p className="price text-xl font-bold text-blue-500">
                $
                {(
                  products[0].price -
                  (products[0].price / 100) *
                    products[0].discountPercentage
                ).toFixed(2)}
              </p>
            </div>
          </section>
        )}
        <section>
          {products &&
            [...products].sort(
              (a, b) => b.discountPercentage - a.discountPercentage
            ).slice(1, 4).map((product) => (
              <div
                key={uuidv4()}
                className="flash-sale-product flex gap-2 pb-4"
              >
                <Link
                  to={`/preview/${product.title}`}
                  state={{ product }}
                  className="w-16"
                >
                  <img src={product.thumbnail} alt="" className="w-16 h-16" />
                </Link>
                <div className="">
                  <span className="flex gap-2">
                    <p className="line-through text-gray-500 text-xs">
                      ${product.price}
                    </p>
                    <p className=" text-red-500 text-xs">
                      {product.discountPercentage}%
                    </p>
                  </span>
                  <p className="price text-sm font-bold text-blue-500">
                    $
                    {(
                      product.price -
                      (product.price / 100) * product.discountPercentage
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
};

export default FlashSale;
