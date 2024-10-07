import React, { useContext, useState, useEffect } from "react";
import Product from "./Product";
import { v4 as uuidv4 } from "uuid";
import { ProductsContext } from "../context/ProductsContext";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { GoSortDesc } from "react-icons/go";
import { TbFilterSearch } from "react-icons/tb";
import LoadingScreen from "./LoadingScreen";
import falseSaleBanner from "../assets/images/banner_images/flash-sale-banner.jpg";
import FlashSaleTimer from "./FlashSaleTimer";

const ProductSearch = () => {
  const { state, dispatch } = useContext(ProductsContext);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const { title } = useParams();
  const [filterValue, setFilterValue] = useState("");
  const [searchProducts, setSearchProducts] = useState(null);
  const [filterdProducts, setFilterdProducts] = useState(null);
  const [activeSort, setActiveSort] = useState("Best Match");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const location = useLocation();
  const flashSale = location.pathname === "/flash-sales";
  // recive user search input from url
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    // Handle search button click
    const handleSearch = async () => {
      let url = "https://dummyjson.com/products";
      if (query?.trim()) {
        url += `/search?q=${query}`;
      }
     else if (title) {
        url += `/category/${title.replace("_", "-")}`;
      }
     else if (flashSale) {
        url += "";
      }
      
      // Fetch search results
      try {
        const response = await fetch(url);
        const data = await response.json();
        // Update state with fetched products
        setSearchProducts(data.products);
        setFilterdProducts(data.products);
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error) {
        dispatch({ type: "API_DATA_ERROR" });
      }
        
    };
    handleSearch();
  }, [query]);

  // Create unique filters for categories and brands
  const filters = {
    categorys: [...new Set(searchProducts?.map((product) => product.category))],
    brands: [
      ...new Set(searchProducts?.map((product) => product.brand || "No Brand")),
    ],
  };

  const handleSortClick = (sortOption) => {
    setActiveSort(sortOption);

    let sortedProducts = [...filterdProducts];

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
        sortedProducts = searchProducts;
        break;
    }

    setFilterdProducts(sortedProducts);
  };

  const handleFilterProducts = (value) => {
    setFilterValue(value);
    dispatch({ type: "SET_LOADING", payload: true }); // Start loading before filtering

    let sortedProducts = [...searchProducts].filter(
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
        (value === "201" ? product.price > 200 : false) ||
        (value === "all")? product : false
    );

    setTimeout(() => {
      //   setSearchProducts(sortedProducts);
      setFilterdProducts(sortedProducts);
      dispatch({ type: "SET_LOADING", payload: false }); // Stop loading
    }, 500);
  };

  const sortOptions = [
    "Best Match",
    "Top Sales",
    "New Arrivals",
    "Low To High",
    "High To Low",
  ];

  // loading state
  if (state.isLoading) {
    return <LoadingScreen />;
  }
  console.log(filterdProducts);

  return (
    <>
      {flashSale && (
        <>
          <div className="lg:mx-8 gap-4 mt-3 space-y-2 md:h-full p-1 bg-white">
            <section className="h-32 md:h-full">
              <img
                src={falseSaleBanner}
                alt=""
                className="w-full h-full overflow-hidden object-cover"
              />
            </section>
            <FlashSaleTimer />
          </div>
          <section className="flex justify-between md:justify-center p-4 gap-4 bg-white font-semibold overflow-auto sticky top-16 z-50 lg:mx-8">
            <p onClick={() => handleFilterProducts('all')} className="bg-gray-200 py-1 px-3 rounded-md">All</p>
            {filters.categorys.map((category) => (
              <p
                key={uuidv4()}
                onClick={() => handleFilterProducts(category)}
                className={`bg-gray-200 py-1 px-3 rounded-md cursor-pointer  ${
                    category === filterValue ? "text-blue-500 border border-blue-500 bg-white" : ""
                  }`}
              >
                {category}
              </p>
            ))}
          </section>
        </>
      )}
      <div className="flex flex-col lg:flex-row lg:mx-8 gap-4 mb-2 mt-3">
        {filterOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
            onClick={() => setFilterOpen(!filterOpen)}
          ></div>
        )}
        <div
          className={`fixed w-72 h-full top-0 right-0 z-50 lg:z-0 transform transition-transform duration-300 ease-in-out lg:w-1/4 md:flex flex-col gap-5 p-4 bg-white drop-shadow-sm ${
            filterOpen ? "translate-x-0" : "translate-x-full"
          } lg:translate-x-0 lg:relative overflow-y-auto`}
        >
          <h1 className="text-2xl font-bold hidden md:block">Filters</h1>
          {/* Category Filter */}
          <div className="flex flex-col mb-4">
            <h3 className="text-md font-semibold border-b-2 pb-2">Category</h3>
            {filters.categorys &&
              filters.categorys.map((category) => (
                <span
                  key={uuidv4()}
                  className={`pt-2 cursor-pointer ${
                    category === filterValue ? "text-blue-500" : ""
                  } ${title ? "text-blue-500 font-bold" : ""}`}
                  onClick={() => {
                    handleFilterProducts(category), 
                    setFilterOpen(!filterOpen);
                  }}
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
                    type="radio"
                    value={brand}
                    checked={selectedBrand === brand}
                    onChange={() => {
                      setSelectedBrand(brand);
                      handleFilterProducts(brand);
                      setFilterOpen(!filterOpen);
                    }}
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
                type="radio"
                name="option"
                value="50"
                checked={selectedPrice === "50"}
                onChange={(e) => {
                  setSelectedPrice(e.target.value);
                  handleFilterProducts("50");
                  setFilterOpen(!filterOpen);
                }}
              />
              <span className="pl-2">under - 50</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="option"
                value="100"
                checked={selectedPrice === "100"}
                onChange={(e) => {
                  setSelectedPrice(e.target.value);
                  handleFilterProducts("100");
                  setFilterOpen(!filterOpen)
                }}
              />
              <span className="pl-2">50 - 100</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="option"
                value="200"
                checked={selectedPrice === "200"}
                onChange={(e) => {
                  setSelectedPrice(e.target.value);
                  handleFilterProducts("200");
                  setFilterOpen(!filterOpen)
                }}
              />
              <span className="pl-2">100 - 200</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="option"
                value="201"
                checked={selectedPrice === "201"}
                onChange={(e) => {
                  setSelectedPrice(e.target.value);
                  handleFilterProducts("201");
                  setFilterOpen(!filterOpen)
                }}
              />
              <span className="pl-2">200 - over</span>
            </label>
          </div>
        </div>

        <div className="flex-1 bg-white drop-shadow-sm lg:p-4">
          <div className="path-link mb-4 text-gray-600 text-sm px-4 pt-4 lg:p-0 lg:block hidden">
            <Link to="/">
              <span className="hover:text-blue-500 cursor-pointer">Home</span>
            </Link>{" "}
            /
            <span className="hover:text-blue-500 cursor-pointer">
              {" "}
              Products{" "}
            </span>
            /<span className="text-blue-500"> {query}</span>
          </div>
          {(query || title) && (
            <p className="font-semibold text-lg pb-2 px-4 lg:px-0">
              Showing {searchProducts?.length} results for "
              {query || title.replace("_", "-")}"
            </p>
          )}
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
          <div className={`flex font-semibold border-y sticky lg:hidden ${flashSale && "hidden"}`}>
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

          <div
            className={`products w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 p-2 md:p-4 ${
              sortOpen ? "opacity-50" : ""
            }`}
          >
            {filterdProducts &&
              filterdProducts.map((product) => (
                <Product product={product} key={uuidv4()} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSearch;
