import React, {  useState } from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";

import Products from "../components/Products";
import LoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";
import Slider from "../components/Slider";
import CategoryBar from "../components/CategoryBar";
import FlashSale from "../components/FlashSale";
import PerfumeTopDeals from "../components/PerfumeTopDeals";
import ProductsByCategory from "../components/ProductsByCategory";
import { useSelector } from "react-redux";

const Home = () => {
  const { products} = useSelector((state) => state.productsR);
  return (
    <div className="relative">
      <Slider />
      <CategoryBar />
      <FlashSale />
      <ProductsByCategory category={'laptops'}/>
      <PerfumeTopDeals />
      {!products ? <LoadingScreen /> : <Products />}
      <div className="flex flex-col xl:flex-row md:mx-8 gap-3">
         <ProductsByCategory category={'womens-dresses'} />
         <ProductsByCategory category={'womens-bags'} />
         <ProductsByCategory category={'womens-shoes'} />
      </div>
      <ProductsByCategory category={'mobile-accessories'} />
      <ProductsByCategory category={'furniture'} />
      <div className="flex flex-col xl:flex-row md:mx-8 gap-3">
         <ProductsByCategory category={'home-decoration'} />
         <ProductsByCategory category={'kitchen-accessories'} />
         <ProductsByCategory category={'sports-accessories'} />
      </div>
      <ProductsByCategory category={'groceries'} />
    </div>
  );
};

export default Home;
