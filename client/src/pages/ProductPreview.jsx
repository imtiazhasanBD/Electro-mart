import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import Product from "../components/Product";
import { v4 as uuidv4 } from "uuid";
import Rating from "../components/Rating";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import dayjs from "dayjs";
import LoadingScreen from "../components/LoadingScreen";
import { useAddToCart } from "../components/useAddToCart";
import { useAddToFavs } from "../components/useAddToFavs";
import paymentIcons from "../assets/images/payments icons/download2.webp";
import { IoReturnUpBack } from "react-icons/io5";
import { IoMdAddCircleOutline, IoMdArrowRoundBack } from "react-icons/io";
import { IoIosShareAlt } from "react-icons/io";

const ProductPreview = () => {
  const location = useLocation();

  const product = location.state?.product;

  if (!product) {
    return <LoadingScreen/>; // Loading if no product is found
  }

  const {
    id,
    title,
    images,
    description,
    price,
    category,
    rating,
    reviews,
    thumbnail,
    brand,
    discountPercentage,
    dimensions,
    weight,
    shippingInformation,
    warrantyInformation,
    returnPolicy,
    stock,
    sku,
  } = product

  const { state, dispatch } = useContext(ProductsContext);
  const [activeTab, setActiveTab] = useState("reviews");
  const [isFav, setIsFav] = useState(false);
  const [image, setImage] = useState("");

  // Related Products Add
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await fetch(
          `https://dummyjson.com/products/category/${category}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        if (data && data.products) {
          dispatch({ type: "RELETER_PRODUCTS", payload: data });
          dispatch({ type: "SET_IMAGE", payload: thumbnail });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({ type: "API_DATA_ERROR" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchData();

    // Cleanup function to prevent memory leaks
    return () => {
      // Optional cleanup logic (e.g., canceling API requests if using axios or abort controller)
    };
  }, [category, dispatch]);

  // Product AddToCart

  const addToCart = useAddToCart();

  // Product Add To Wishlist
  const addTofavs = useAddToFavs();

  useEffect(() => {
    const isFavCheck = state.favoriteProducts.some(
      (favProduct) => favProduct.id === product.id
    );
    setIsFav(isFavCheck);
  }, [state.favoriteProducts, product]);

  useEffect(() => {
    setImage(thumbnail);
  }, [product]);

  // loading state
  if (state.isLoading) {
    return <LoadingScreen />;
  }

  const copyUrlToClipboard = () => {
    const url = window.location.href; // Current page URL
    navigator.clipboard.writeText(url).then(() => {
      toast.info('URL copied to clipboard!');
    }).catch((err) => {
     toast.error('Failed to copy URL: ', err);
    });}

  return (
    <div className=" flex justify-center px-4 sm:px-8 md:px-12 lg:px-10 py-5 bg-white lg:mx-8 lg:mb-2">
      <div className="w-full">
        <div className="path-link mb-6 text-gray-600 text-sm hidden md:block">
          <Link to="/">
            <span className="hover:text-blue-500 cursor-pointer">Home</span>
          </Link>{" "}
          /
          <span className="hover:text-blue-500 cursor-pointer">
            {" "}
            {category}
          </span>{" "}
          /<span className="text-blue-500"> {title}</span>
        </div>

        <section className="product-item grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product image */}
          <div className="products-image relative bg-white shadow-lg rounded-lg sm:*h-[60vh] md:h-[60vh] lg:h-[70vh] flex flex-col justify-between p-5 min-h-[70%]">
            <img
              src={image}
              alt={title}
              className="image w-full h-[50vh] md:h-full sm:max-h-[60vh] rounded-md mb-4 object-contain"
            />
            <FaHeart
              onClick={() => addTofavs(product)}
              className={`absolute top-0 right-0 mt-3 mr-4 text-xl ${
                isFav ? "text-red-500" : "text-gray-300"
              } hover:text-gray-500 cursor-pointer`}
            />
            <IoIosShareAlt
              onClick={copyUrlToClipboard}
              className={`absolute top-0 right-0 mt-12 mr-3 text-3xl text-gray-300 hover:text-gray-500 cursor-pointer`}
            />

            <div className="absolute bottom-3 items-center justify-center left-1/2 transform -translate-x-1/2 flex space-x-2 ">
              {[...images].map((_, i) => (
                <img
                  onMouseEnter={() => setImage(images[i])}
                  key={i}
                  src={images[i]}
                  alt={`Thumbnail ${i}`}
                  className="h-[60px] w-[60px] object-cover rounded-md cursor-pointer hover:ring-2 hover:ring-blue-500"
                />
              ))}
            </div>
          </div>

          {/* Product details */}
          <div className="flex flex-col md:space-y-6 space-y-2">
            <h1 className="text-xl md:text-3xl font-bold">{title}</h1>
            <Rating rating={rating} count={reviews.length} />
            <div className="flex gap-2 items-center text-center">
              <p className="line-through text-gray-500 text-lg">${price}</p>
              <p className="text-xl md:text-4xl font-semibold text-blue-600">
                ${(price - (price / 100) * discountPercentage).toFixed(2)}
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {description.length > 310
                ? description.substring(0, 345) + "..."
                : description}
            </p>

            <div>
              <p className="text-md font-semibold">
                <span className="text-gray-600">Brand: </span>
                <span className="text-blue-500">
                  {typeof brand === "undefined" ? "No Brand" : brand}
                </span>
              </p>
              <p className="text-md font-semibold">
                <span className="text-gray-600">Category: </span>
                <span className="text-blue-500">{category}</span>
              </p>
            </div>
            {/* Add to cart and wishlist buttons */}
            <div className="lg:space-x-4 flex font-bold w-full fixed lg:static z-20 bottom-0 right-0 text-center bg-white">
              <NavLink
                to={"/"}
                className="bg-slate-200 text-blue-500 m-auto text-center p-2 hidden"
              >
                <button className="">
                  <IoMdArrowRoundBack size={"1.5rem"} />
                  <p className="text-xs">Back</p>
                </button>
              </NavLink>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-500 text-white py-4 px-6 lg:rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out"
              >
                Add To Cart
              </button>
              <button
                onClick={() => addTofavs(product)}
                className="w-full bg-orange-500 text-white py-4 px-6 lg:rounded-lg shadow-md hover:bg-orange-700 focus:outline-none transition duration-300 ease-in-out"
              >
                Buy Now
              </button>
            </div>
            <span className="m-auto text-center font-semibold space-y-2 hidden md:block">
              <img src={paymentIcons} alt="" />
              <p>Guaranteed safe & secure checkout</p>
            </span>
          </div>
        </section>

        {/* Details and related products sections */}
        <section className="details mb-12">
          <div className="flex flex-col">
            <div className="flex space-x-8 border-b pb-2 mb-6 font-bold">
            <div
                className={`cursor-pointer ${
                  activeTab === "reviews"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500"
                } hover:text-blue-500`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </div>
              <div
                className={`cursor-pointer ${
                  activeTab === "description"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500"
                } hover:text-blue-500`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </div>
              <div
                className={`cursor-pointer ${
                  activeTab === "additionalInfo"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500"
                } hover:text-blue-500`}
                onClick={() => setActiveTab("additionalInfo")}
              >
                Additional information
              </div>
            </div>
            <div>
              {activeTab === "description" && (
                <p>
                  {description} <br /> Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Fuga, labore. Illo magnam perspiciatis
                  dolore repellendus et pariatur mollitia ab inventore error
                  iusto enim odit veritatis deserunt, dolorem nihil debitis rem
                  libero nesciunt sequi placeat fugit architecto quo nobis.
                  Expedita at magni asperiores, officiis sit sunt provident
                  magnam cum repudiandae ex dolorum, ullam dicta similique nobis
                  quae quia impedit. Ipsa sit non aperiam. Dignissimos dolorem
                  nam tempora ipsa, cumque sequi hic illo explicabo debitis
                  nesciunt? Error, doloribus soluta? Optio at vel architecto
                  cupiditate id laborum quasi numquam inventore quaerat aliquam,
                  aperiam autem sequi! Cumque nihil repellat dignissimos eius
                  officiis dicta? Corrupti?
                </p>
              )}
              {activeTab === "additionalInfo" && (
                <div>
                  <p className="font-semibold text-lg mb-4">
                    Product details of {title}
                  </p>
                  <section className="overflow-x-auto w-full">
                    <table className="w-full table-auto border-collapse border border-gray-300">
                      <thead>
                        <tr>
                          <th className="p-2 border border-gray-300 text-left bg-gray-100">
                            Property
                          </th>
                          <th className="p-2 border border-gray-300 text-left bg-gray-100">
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border border-gray-300">Brand</td>
                          <td className="p-2 border border-gray-300">
                            {typeof brand === "undefined" ? "No Brand" : brand}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-300">
                            Dimensions
                          </td>
                          <td className="p-2 border border-gray-300">
                            <div className="flex flex-wrap gap-2">
                              <p>Depth: {dimensions.depth}</p>
                              <p>Height: {dimensions.height}</p>
                              <p>Width: {dimensions.width}</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-300">Weight</td>
                          <td className="p-2 border border-gray-300">
                            {weight}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-300">
                            Shipping Information
                          </td>
                          <td className="p-2 border border-gray-300">
                            {shippingInformation}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-300">
                            Return Policy
                          </td>
                          <td className="p-2 border border-gray-300">
                            {returnPolicy}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-300">SKU</td>
                          <td className="p-2 border border-gray-300">{sku}</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-300">
                            Warranty Information
                          </td>
                          <td className="p-2 border border-gray-300">
                            {warrantyInformation}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-300">Stock</td>
                          <td className="p-2 border border-gray-300">
                            {stock}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="md:space-y-10">
                    <p className="font-semibold text-sm md:text-lg mb-4">Ratings & Reviews of {title}</p>
                    <section className="flex flex-row justify-between md:justify-normal md:gap-20 md:pr-10 border-b-2 py-4">
                         <div>
                          <span className="text-3xl md:text-6xl font-semibold">{rating.toFixed(1)}<span className="text-xl md:text-4xl text-gray-400">/5</span></span>
                          <Rating rating={rating} className="text-3xl md:text-6xl pt-2"/>
                          <p className="text-sm md:text-lg text-gray-400 font-semibold">{reviews.length} Ratings</p>
                         </div>
                         <div className="">
                           {reviews.map(review => (
                              <span key={uuidv4()} className="flex flex-row justify-center items-center text-center gap-5">
                                 <Rating rating={review.rating} className="text-xl md:text-3xl"/>
                                  <p>{review.rating}</p>
                              </span>
                           ))}
                         </div>
                     </section>
                     <section className="p-2">
                        {reviews.map((review) => (
                        <div key={uuidv4()} className="flex gap-5 mb-10">
                          <div className="profile md:text-3xl mt-1">
                            <FaUserCircle />
                          </div>
                          <div className="comment">
                            <div className="flex gap-5 justify-center items-center text-center">
                              <h1 className="font-bold md:text-lg">
                                {review.reviewerName}
                              </h1>
                              <p className="text-xs md:text-sm text-gray-400">
                                {dayjs(review.date).format("MMMM D, YYYY h:mm A")}
                              </p>
                            </div>
                            <Rating rating={review.rating} />
                            <p>{review.comment}</p>
                          </div>
                        </div>
                          ))}
                     </section>
                   
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="related-products">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-b-blue-400 pb-2">
            Related Products
          </h2>
          {/* Releted Products Add section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
            {!state.relatedProducts[0] ? (
              <LoadingScreen />
            ) : (
              state.relatedProducts[0].products.map((product) => (
                <Product product={product} key={uuidv4()} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPreview;
