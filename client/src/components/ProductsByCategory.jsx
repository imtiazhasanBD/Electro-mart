import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";

import { FaHeart } from "react-icons/fa";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaArrowCircleRight } from "react-icons/fa";
import furniture_banner from "../assets/images/banner_images/FurnitureSale_Banner.jpg";
import Carousel from "react-multi-carousel";
import { useAddToCart } from "./useAddToCart";
import { useAddToFavs } from "./useAddToFavs";
import { Link, useNavigate } from "react-router-dom";
const laptops_banner = "https://www.lapshop.in/_nuxt/img/jul_2024_banner2.a4049c2.jpg";
import grocery_banner from "../assets/images/banner_images/banner-mobile.jpg";
import getResponsiveConfig from "./getResponsiveConfig";
const ProductsByCategory = ({category}) => {
  const { state, dispatch } = useContext(ProductsContext);
  const [categoryProducts, setcategoryProducts] = useState(null);

  const isForCategoryList = ["womens-dresses", "womens-bags", "womens-shoes","home-decoration","kitchen-accessories","sports-accessories"].includes(category);


  useEffect(() => {
    const fetchProducts = async () => {
      const url = `https://dummyjson.com/products/category/${category}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setcategoryProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [category]);
  
  const responsive = getResponsiveConfig({category});

const navigate = useNavigate();

const handleOnClick = () => {
  dispatch({ type: "SET_LOADING", payload: true });
   navigate(`/products/category/${category}`)
}
  // Product Add To Cart
  const addToCart = useAddToCart();

  // Product Add To Favs
  const addTofavs = useAddToFavs();

  const renderProductCard = (product) => (
    <div key={product.id} className="p-3 relative border-2 border-gray-100">
      <Link to={`/preview/${product.title}`} state={{ product }}>
        <img
          src={product.thumbnail}
          alt={`Image of ${product.title}`}
          className="m-auto hover:scale-110 duration-300"
        />
      </Link>
      <FaHeart
        onClick={() => addTofavs(product)}
        className="absolute top-0 right-0 mt-2 mr-2 text-gray-300 hover:text-gray-500 cursor-pointer text-xl"
      />
      <div className="flex flex-col gap-2">
        <p className="text-lg md:text-xl font-semibold">{product.title}</p>
        <span className="flex gap-2">
          <p className="line-through text-gray-500 text-sm md:text-md">
            ${product.price}
          </p>
          <p className="text-red-500 text-sm md:text-md">
            {product.discountPercentage}%
          </p>
        </span>
        <p className="price text-lg md:text-xl font-bold text-blue-500">
          ${(
            product.price -
            (product.price / 100) * product.discountPercentage
          ).toFixed(2)}
        </p>
      </div>
      <CiShoppingCart
        onClick={() => addToCart(product)}
        size={"1.4rem"}
        className="absolute top-6 right-0 mt-2 mr-2 text-gray-400 cursor-pointer hover:text-gray-600 text-xs"
      />
    </div>
  );

  return (
    <div className={`bg-white ${isForCategoryList ? "my-2 md:p-4" : "md:mx-8 my-2 md:block lg:block md:p-4"}`}>
      <span className="flex justify-between items-center text-2xl text-blue-500 font-bold border-b-2 mb-1 pb-1 p-4">
        <p className="text-black">Best {category.replace("-", " ")} Deals</p>
        <FaArrowCircleRight className="cursor-pointer" onClick={handleOnClick} />
      </span>

      {!isForCategoryList && (
        <section className="w-full">
          <img
            src={category === "furniture"?  furniture_banner : category=== "laptops"? laptops_banner : category === "groceries"? grocery_banner : ""}
            alt=""
            className="w-full"
          />
        </section>
      )}

      {categoryProducts?.products && (
        isForCategoryList ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-2 gap-3 pt-4">
            {categoryProducts.products
              .sort((a, b) => b.discountPercentage - a.discountPercentage)
              .slice(0, 4)
              .map(renderProductCard)}
          </div>
        ) : (
          <Carousel responsive={responsive} className="z-0">
            {categoryProducts.products
              .sort((a, b) => b.discountPercentage - a.discountPercentage)
              .map(renderProductCard)}
          </Carousel>
        )
      )}
    </div>
  );
};

export default ProductsByCategory;
