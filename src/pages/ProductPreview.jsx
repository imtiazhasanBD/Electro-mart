import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import Product from "../components/Product";
import { v4 as uuidv4 } from "uuid";
import Rating from "../components/Rating";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import dayjs from "dayjs";
import LoadingScreen from "../components/LoadingScreen";
import { useAddToCart } from "../components/useAddToCart";
import { useAddToFavs } from "../components/useAddToFavs";

const ProductPreview = () => {
  const location = useLocation();
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
  } = location.state.product || {};
  const { state, dispatch } = useContext(ProductsContext);
  const [activeTab, setActiveTab] = useState("description");

  // Related Products Add
  useEffect(() => {
    if (category && id) {
      const relatedProducts = state.products[0]?.filter(
        (product) =>
          product.category.toLowerCase().includes(category.toLowerCase()) &&
          product.id !== id
      );
      if (relatedProducts) {
        dispatch({ type: "RELETER_PRODUCTS", payload: relatedProducts });
        dispatch({ type: "SET_IMAGE", payload: thumbnail });
      }
    }
  }, [category, id, state.products, dispatch]);

  // Product AddToCart
  const product = location.state.product;
  const addToCart = useAddToCart();

  // Product Add To Wishlist
  const addTofavs = useAddToFavs();

  // loading state
  if (!location.state || !state.products[0]) {
    return <LoadingScreen />;
  }

  return (
    <div className=" flex justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-5 bg-white lg:mx-8 lg:mb-2">
      <div className=" lg:w-[90%] w-full">
        <div className="path-link mb-6 text-gray-600 text-sm">
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

        <section className="product-item grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product image */}
          <div className="products-image relative bg-white shadow-lg rounded-lg sm:*h-[60vh] md:h-[70vh] flex flex-col justify-between p-5">
            <img
              src={state.image}
              alt={title}
              className="image w-full h-[100%]  rounded-md mb-4"
            />

            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {[...images].map((_, i) => (
                <img
                  onMouseEnter={() =>
                    dispatch({ type: "SET_IMAGE", payload: images[i] })
                  }
                  key={i}
                  src={images[i]}
                  alt={`Thumbnail ${i}`}
                  className="h-[60px] w-[60px] object-cover rounded-md cursor-pointer hover:ring-2 hover:ring-blue-500"
                />
              ))}
            </div>
          </div>

          {/* Product details */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            <Rating rating={rating} count={reviews.length} />
            <div className="flex gap-2 items-center text-center">
              <p className="line-through text-gray-500 text-lg">${price}</p>
              <p className="text-4xl font-semibold text-blue-600">
                ${(price - (price / 100) * discountPercentage).toFixed(2)}
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {description.length > 310
                ? description.substring(0, 345) + "..."
                : description}
            </p>

            {/* Add to cart and wishlist buttons */}
            <div className="space-x-4 flex font-bold">
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out"
              >
                Add To Cart
              </button>
              <button
                onClick={() => addTofavs(product)}
                className="bg-gray-300 text-gray-800 py-3 px-6 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none transition duration-300 ease-in-out"
              >
                Add To Wishlist
              </button>
            </div>
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
          </div>
        </section>

        {/* Details and related products sections */}
        <section className="details mb-12">
          <div className="flex flex-col">
            <div className="flex space-x-8 border-b pb-2 mb-6 font-bold">
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
              <div
                className={`cursor-pointer ${
                  activeTab === "reviews"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500"
                } hover:text-blue-500`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews ({reviews.length})
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
                <div>
                  {reviews.map((review) => (
                    <div key={uuidv4()} className="flex gap-5 mb-10">
                      <div className="profile text-3xl">
                        <FaUserCircle />
                      </div>
                      <div className="comment">
                        <div className="flex gap-5 justify-center items-center text-center">
                          <h1 className="font-bold text-lg">
                            {review.reviewerName}
                          </h1>
                          <p className="text-sm text-gray-400">
                            {dayjs(review.date).format("MMMM D, YYYY h:mm A")}
                          </p>
                        </div>
                        <Rating rating={review.rating} />
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  ))}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {state.relatedProducts[0] &&
              state.relatedProducts[0].map((product) => (
                <Product product={product} key={uuidv4()} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPreview;
