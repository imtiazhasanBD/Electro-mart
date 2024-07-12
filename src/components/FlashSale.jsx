import React, { useContext, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import FlashSaleTimer from "./FlashSaleTimer";
import Product from "./Product";
import { v4 as uuidv4 } from "uuid";

import { FaHeart } from "react-icons/fa";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { useAddToCart } from "./useAddToCart";
import { useAddToFavs } from "./useAddToFavs";
import { Link } from "react-router-dom";

const FlashSale = () => {
  const { state, dispatch } = useContext(ProductsContext);

  useEffect(() => {
    if (state.products && state.products[0]) {
      const flashSaleProducts = [...state.products[0]].sort(
        (a, b) => b.discountPercentage - a.discountPercentage
      );
      dispatch({ type: "ADD_SALE_PRODUCTS", payload: flashSaleProducts });
    }
  }, [state.products, dispatch]);

  // Product Add To Cart
  const addToCart = useAddToCart();

  // Product Add To Favs
  const addTofavs = useAddToFavs();

  ///
  const productZero =
    state.saleProducts && state.saleProducts.length > 0
      ? state.saleProducts[0]
      : null;

  return (
    <div className="bg-white md:mx-8 my-2">
      <div className="flex flex-col border-b-2">
        <section className="flex justify-between items-center p-3 text-xl font-semibold">
          <p className="sm:text-2xl md:text-2xl">FlashSale</p>
          <div className="hidden md:block lg:block">
            <FlashSaleTimer />
          </div>
          <button className="text-blue-500 text-lg">Show All</button>
        </section>
        <div className="block md:hidden lg:hidden ">
          <FlashSaleTimer />
        </div>
      </div>
      {/* flash sell product for web */}
      <div className="flash-sale-products md:grid grid-cols-1  xl:grid-cols-6 md:grid-cols-3 gap-2 p-2 hidden sm:hidden">
        {state.saleProducts[0] &&
          state.saleProducts[0].slice(0, 6).map((product) => (
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
        {state.saleProducts[0] && (
          <section className=" border-r-2">
            <Link
              to={`/preview/${state.saleProducts[0][0].title}`}
              state={{ product: productZero[0] }}
            >
              <img src={state.saleProducts[0][0].thumbnail} alt="" />
            </Link>
            <div>
              <span className="flex gap-2">
                <p className="line-through text-gray-500 text-sm">
                  ${state.saleProducts[0][0].price}
                </p>
                <p className=" text-red-500 text-sm">
                  {state.saleProducts[0][0].discountPercentage}%
                </p>
              </span>
              <p className="price text-xl font-bold text-blue-500">
                $
                {(
                  state.saleProducts[0][0].price -
                  (state.saleProducts[0][0].price / 100) *
                    state.saleProducts[0][0].discountPercentage
                ).toFixed(2)}
              </p>
            </div>
          </section>
        )}
        <section>
          {state.saleProducts[0] &&
            state.saleProducts[0].slice(1, 4).map((product) => (
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
