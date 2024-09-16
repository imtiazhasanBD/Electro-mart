import React, { useContext, useState, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { ProductsContext } from "../context/ProductsContext";
import AddTocart from "../components/AddTocart";
import { v4 as uuidv4 } from "uuid";
import { NavLink, useNavigate } from "react-router-dom";
import AddTocartMobile from "../components/AddTocartMobile";

const Card = () => {
  
 
  const { state } = useContext(ProductsContext);
  const [totalPrice, setTotalPrice] = useState(0); // total price cal state
  const [totalItems, setTotalItems] = useState(0); // total price cal state

  const navigate = useNavigate();

  //   calculate all products price in total and set in state
  useEffect(() => {
    const total = state.cartProducts.reduce(
      (acc, product) =>
        acc +
        (product.price - (product.price / 100) * product.discountPercentage) *
          product.quantity,
      0
    );
    setTotalPrice(total);
    const items = state.cartProducts.map(product => product.quantity).reduce((total, quantity) => total + quantity, 0);
     setTotalItems(items);
    
  }, [state.cartProducts]);

  const handleCheckout = () => {
     
     navigate('/orders');
  }

  return (
    <div className="m-auto p-4 lg:mx-8 md:mx-8 relative bg-white mb-2">
      <h1 className="text-3xl font-bold text-blue-400">Shopping Cart</h1>
      <p className="text-ml text-gray-400">
        There are {state.cartProducts.length} Items in your cart
      </p>
      {state.cartProducts.length > 0 ? (
        <section className="flex justify-between lg:flex-row flex-col  lg:space-x-10 mt-10">
          {/* for medium and lagre screen */}
          <div className="w-[60%] sm:w-full space-y-3 hidden md:block lg:block sm:block">
            <table className="w-full">
              <thead className="border-b text-center bg-blue-400 text-white">
                <tr className="font-bold">
                  <td className="text-gray-40 py-2 pl-3 text-left">Product</td>
                  <td className="text-gray-40 py-2 px-4">Price</td>
                  <td className="text-gray-40 py-2 px-4">Quantity</td>
                  <td className="text-gray-40 py-2 px-4">Total</td>
                  <td className="text-gray-40 py-2 px-4">Delete</td>
                </tr>
              </thead>
              <tbody className="space-y-10 text-center">
                {state.cartProducts &&
                  state.cartProducts.map((product) => (
                    <AddTocart product={product} key={uuidv4()} />
                  ))}
              </tbody>
            </table>
            <NavLink to="/">
              <button className="flex items-center gap-3 text-white bg-blue-400 font-semibold rounded p-2 my-5">
                <BsArrowLeft />
                <span>Continue Shopping</span>
              </button>
            </NavLink>
          </div>
          {/* Mobile screen*/}

          <div className="sm:hidden px-4 divide-y divide-gray-200 border-b border-t border-gray-200 mb-10">
            {state.cartProducts &&
              state.cartProducts.map((product) => (
                <AddTocartMobile product={product} key={uuidv4()} />
              ))}
          </div>

          <div className="lg:w-[40%] w-full h-fit border rounded p-5 space-y-2 text-sm bg-gray-50">
             <h1 className="text-xl font-semibold p-2">Oder Summary</h1>
            <div className="flex justify-between items-center p-2">
              <h1 className="">Sub Total ({totalItems} items)</h1>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center p-2">
              <h1 className="">shipping</h1>
              <p>${((totalPrice / 100) * 4).toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center p-2 font-semibold border-b-2 border-dotted ">
              <h1 className="">Discount</h1>
              <p>
                -$
                {totalPrice >= 500
                  ? ((totalPrice / 100) * 10).toFixed(2)
                  : ((totalPrice / 100) * 5).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center p-2 font-semibold text-xl">
              <h1 className="">Sub Total</h1>
              <p>
                $
                {(
                  totalPrice -
                  (totalPrice >= 500
                    ? (totalPrice / 100) * 10
                    : (totalPrice / 100) * 5) +
                  (totalPrice / 100) * 5
                ).toFixed(2)}
              </p>
            </div>
            <button onClick={handleCheckout} className="w-full p-2 bg-blue-400 text-center text-white font-bold text-lg rounded">
              CheckOut
            </button>
          </div>
        </section>
      ) : (
        <div>
          <p className="text-gray-600 mt-10">
            No Cart products yet. Browse and add some!
          </p>
          <NavLink to="/">
            <button className="flex items-center gap-3 text-white bg-blue-400 font-semibold rounded p-2 my-5">
              <BsArrowLeft />
              <span>Continue Shopping</span>
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Card;
