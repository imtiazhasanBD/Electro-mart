import React, { useContext, useEffect, useState } from "react";
import Product from "./Product";
import { v4 as uuidv4 } from "uuid";
import { ProductsContext } from "../context/ProductsContext";
import Pagination from "./Pagination";

const Products = () => {
  const { state, dispatch } = useContext(ProductsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProducts = state.products[0].slice(indexOfFirstPost, indexOfLastPost);


  return (
    <div className="w-[95%] m-auto mt-5 mb-28 bg-white">
      <div className="flex justify-between p-2 px-4 font-semibold border-b-2">
        <p className="text-xl">Just For You</p>
        <button className="text-blue-500">View All Products</button>
      </div>
      <div className="products  grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 md:grid-cols-3 gap-5 p-4 z-20">
        {currentProducts &&
          currentProducts.map((product) => (
            <Product product={product} key={uuidv4()} />
          ))}
      </div>
      <Pagination totalPosts={state.products[0].length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  );
};

export default Products;
