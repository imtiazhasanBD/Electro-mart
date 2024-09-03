import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ProductsContext } from "../context/ProductsContext";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useAddToCart } from "../components/useAddToCart";

const Favorites = () => {
  const { state, dispatch } = useContext(ProductsContext);

  // Add to cart from wishlist
    const addToCart = useAddToCart();
  


  // Remove Product from wishlist
  const removeFromFavorites = (id) => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: id });
    toast.info("The item has been removed from the wishlist");
  };

  return (
    <div className=" mx-auto lg:mx-8 lg:p-8 p-2 bg-white mb-2">
      <h2 className="text-gray-600 mb-4">
        Home / <span className="text-blue-500">Wishlist</span>
      </h2>
      <h1 className="text-3xl font-bold text-blue-400 mb-6">My Wishlist</h1>
      {state.favoriteProducts.length > 0 ? (
        <section className="products_list overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4"></th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Unit Price</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {state.favoriteProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => removeFromFavorites(product.id)}
                      className="text-blue-500 active:text-red-500"
                    >
                      <MdOutlineRemoveCircleOutline size={24} />
                    </button>
                  </td>
                  <td className="py-3 px-4 flex items-center gap-4">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-[40px] h-[40px] object-cover"
                    />
                    <p className="truncate w-48">{product.title}</p>
                  </td>
                  <td className="py-3 px-4">${product.price}</td>
                  <td className="py-3 px-4">{product.availabilityStatus}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => addToCart(product)}
                      className="text-sm font-bold bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out"
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <p className="text-gray-600">
          No favorite products yet. Browse and add some!
        </p>
      )}
    </div>
  );
};

export default Favorites;
