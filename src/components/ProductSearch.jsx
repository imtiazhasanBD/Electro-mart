import React, { useContext, useState, useEffect } from "react";
import Product from "./Product";
import { v4 as uuidv4 } from "uuid";
import { ProductsContext } from "../context/ProductsContext";
import { Link, useParams } from "react-router-dom";
import { GoSortDesc } from "react-icons/go";
import { TbFilterSearch } from "react-icons/tb";

const ProductSearch = () => {
  const { state, dispatch } = useContext(ProductsContext);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const { title } = useParams();
  const [filterValue, setFilterValue] = useState('');
  const [filterProducts, setFilterProducts] = useState(state.searchProducts[0]);
  const [activeSort, setActiveSort] = useState("Best Match");


  // Create unique filters for categories and brands
  const filters = {
    categorys: [
      ...new Set(state.searchProducts[0]?.map((product) => product.category)),
    ],
    brands: [
      ...new Set(
        state.searchProducts[0]?.map((product) => product.brand || "No Brand")
      ),
    ],
  };

  const handleSortClick = (sortOption) => {
    setActiveSort(sortOption);

    let sortedProducts = [...filterProducts];

    switch (sortOption) {
      case "Low To High":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "High To Low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "Top Sales":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "New Arrivals":
        sortedProducts.sort((a, b) => b.stock - a.stock);
        break;
      case "Best Match":
      default:
        sortedProducts = state.searchProducts[0];
        break;
    }

    setFilterProducts(sortedProducts);
  };

  useEffect(() => {
    setFilterProducts(state.searchProducts[0]); // Ensure products are reset when state changes
  }, [state.searchProducts]);

  const handleFilterProducts = (value) => {
    setFilterValue(value);
    let sortedProducts = [...state.searchProducts[0]].filter(
      (product) =>
        product.brand === value ||
        product.category === value ||
        (value === "50" ? product.price <= 50 : false) ||
        (value === "100"
          ? product.price <= 100 && product.price > 50
          : false) ||
        (value === "200"
          ? product.price <= 200 && product.price > 100
          : false) ||
        (value === "201" ? product.price > 200 : false)
    );
    setFilterProducts(sortedProducts);
    console.log(value);
  };

  const sortOptions = [
    "Best Match",
    "Top Sales",
    "New Arrivals",
    "Low To High",
    "High To Low",
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:mx-8 gap-4 mb-2 mt-3">
      <div className="product-filter w-full lg:w-1/4 md:flex flex-col gap-5 p-4 bg-white drop-shadow-sm hidden">
        <h1 className="text-2xl font-bold">Filters</h1>
        <div className="flex flex-col">
          <h3 className="text-md font-semibold border-b-2 pb-2">Category</h3>
          {filters.categorys &&
            filters.categorys.map((category) => (
              <span
                key={uuidv4()}
                className={`pt-2 ${
                  category === filterValue ? "text-blue-500" : ""
                }`}
                onClick={() => handleFilterProducts(category)}
              >
                {category}
              </span>
            ))}
        </div>
        <div className="product-brand">
          <div className="product-catagory product-brand-list flex flex-col">
            <h3 className="text-md font-semibold border-b-2 pb-2">Brands</h3>
            {filters.brands &&
              filters.brands.map((brand) => (
                <label key={uuidv4()} className="pt-2">
                  <input
                    type="checkbox"
                    onClick={() => handleFilterProducts(brand)}
                  />
                  <span className="pl-2">
                    {typeof brand === "undefined" ? "No Brand" : brand}
                  </span>
                </label>
              ))}
          </div>
        </div>
        <div className="product-price flex flex-col">
          <h3 className="text-md font-semibold border-b-2 pb-2">Price $</h3>
          <label className="pt-2">
            <input
              type="checkbox"
              name="option"
              value="50"
              onClick={() => handleFilterProducts("50")}
            />
            <span className="pl-2">under - 50</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="option"
              value="100"
              onClick={() => handleFilterProducts("100")}
            />
            <span className="pl-2">50 - 100</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="option"
              value="200"
              onClick={() => handleFilterProducts("200")}
            />
            <span className="pl-2">100 - 200</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="option"
              value="201"
              onClick={() => handleFilterProducts("201")}
            />
            <span className="pl-2">200 - over</span>
          </label>
        </div>
        {/* <div className="product-color">
          <div className="product-catagory flex flex-col">
            <h3 className="text-md font-semibold border-b-2 pb-2">Colors</h3>
            <label className="pt-2">
              <input type="checkbox" value="Black" />
              <span>Black</span>
            </label>
            <label>
              <input type="checkbox" value="Blue" />
              <span>Blue</span>
            </label>
            <label>
              <input type="checkbox" value="White" />
              <span>White</span>
            </label>
            <label>
              <input type="checkbox" value="Red" />
              <span>Red</span>
            </label>
          </div>
        </div> */}
      </div>

      <div className="flex-1 bg-white drop-shadow-sm lg:p-4">
        <div className="path-link mb-4 text-gray-600 text-sm px-4 pt-4 lg:p-0">
          <Link to="/">
            <span className="hover:text-blue-500 cursor-pointer">Home</span>
          </Link>{" "}
          /<span className="hover:text-blue-500 cursor-pointer"> watch </span>/
          <span className="text-blue-500"> red</span>
        </div>
        <p className="font-semibold text-lg pb-2 px-4 lg:px-0">
          Showing {filterProducts.length} results for "{title}"
        </p>
        <section className="md:flex gap-5 drop-shadow-sm border-b mb-2 hidden">
          <span className="font-semibold">Sort By:</span>
          {sortOptions.map((option) => (
            <span
              key={option}
              onClick={() => handleSortClick(option)}
              className={`cursor-pointer ${
                activeSort === option
                  ? "text-blue-500 font-semibold border-blue-500 border-b-2 pb-2"
                  : "pb-2"
              }`}
            >
              {option}
            </span>
          ))}
        </section>
        {/* Sort and filter Dropdown for Mobile */}
        <div className="lg:hidden flex font-semibold border-y sticky">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="w-full bg-white p-2 flex gap-2 justify-center items-center mb-2"
          >
            <GoSortDesc />
            <span>{activeSort}</span>
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="w-full bg-white p-2 flex gap-2 justify-center items-center mb-2"
          >
            <TbFilterSearch />
            <span>Filters</span>
          </button>
        </div>

        {/*sort dropdown */}
        {sortOpen && (
          <div className="w-full bg-white p-4 shadow-lg absolute z-10">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  handleSortClick(option);
                  setSortOpen(!sortOpen);
                }}
                className="block cursor-pointer pb-2"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Filter dropdown*/}
        {filterOpen && (
          <div className="w-full bg-white p-4 shadow-lg absolute z-10">
            {/* Category Filter */}
            <div className="flex flex-col mb-4">
              <h3 className="text-md font-semibold border-b-2 pb-2">
                Category
              </h3>
              {filters.categorys &&
                filters.categorys.map((category) => (
                  <span
                    key={uuidv4()}
                    className="pt-2 cursor-pointer"
                    onClick={() => handleFilterProducts(category)}
                  >
                    {category}
                  </span>
                ))}
            </div>
            {/* Brand Filter */}
            <div className="flex flex-col mb-4">
              <h3 className="text-md font-semibold border-b-2 pb-2">Brands</h3>
              {filters.brands &&
                filters.brands.map((brand) => (
                  <label
                    key={uuidv4()}
                    className="pt-2 flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={brand}
                      onClick={() => handleFilterProducts(brand)}
                    />
                    <span className="pl-2">
                      {typeof brand === "undefined" ? "No Brand" : brand}
                    </span>
                  </label>
                ))}
            </div>
            {/* Price Filter */}
            <div className="flex flex-col mb-4">
              <h3 className="text-md font-semibold border-b-2 pb-2">Price $</h3>
              <label className="pt-2 flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="option"
                  value="50"
                  onClick={() => handleFilterProducts("50")}
                />
                <span className="pl-2">under - 50</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="option"
                  value="100"
                  onClick={() => handleFilterProducts("100")}
                />
                <span className="pl-2">50 - 100</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="option"
                  value="200"
                  onClick={() => handleFilterProducts("200")}
                />
                <span className="pl-2">100 - 200</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="option"
                  value="201"
                  onClick={() => handleFilterProducts("201")}
                />
                <span className="pl-2">200 - over</span>
              </label>
            </div>
            {/* Color Filter */}
          {/*   <div className="flex flex-col mb-4">
              <h3 className="text-md font-semibold border-b-2 pb-2">Colors</h3>
              <label className="pt-2 flex items-center cursor-pointer">
                <input type="checkbox" value="Black" />
                <span className="pl-2">Black</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" value="Blue" />
                <span className="pl-2">Blue</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" value="White" />
                <span className="pl-2">White</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" value="Red" />
                <span className="pl-2">Red</span>
              </label>
            </div> */}
          </div>
        )}

        <div
          className={`products w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 ${
            sortOpen ? "opacity-50" : ""
          }`}
        >
          {filterProducts &&
            filterProducts.map((product) => (
              <Product product={product} key={uuidv4()} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
