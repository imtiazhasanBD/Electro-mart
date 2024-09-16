import React, { useContext, useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import { v4 as uuidv4 } from "uuid";
import LoadingScreen from "../components/LoadingScreen";

const Order = () => {
  const { state, dispatch } = useContext(ProductsContext);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    setOrderItems(state.cartProducts);
  }, [state.cartProducts]);

  const totalAmount = orderItems?.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );
  
   if(state.isLoading){
    return <LoadingScreen/>
   }
   
  return (
    <div className="m-auto p-4 md:p-10 lg:mx-8 md:mx-8 relative bg-white mb-2">
      <h1 className="text-3xl font-bold text-blue-400 md:mb-10">My Order</h1>
        {orderItems && orderItems.length > 0 ? (
      <div className="border-x-2 my-4 md:m-10">
        <section className="bg-gray-200 flex justify-between p-4 items-center">
          <p className="font-bold text-md hidden md:block">
            Order ID:{" "}
            <span className="font-normal">
              cs_test_b1MFq2C1qOHvjfm7DMMWQ8g5deRSibJZ7FhXyAS...
            </span>
          </p>
          <button className="bg-blue-500 p-2 text-white font-semibold">
            Track Order
          </button>
        </section>

          <>
            <div className="p-4 mx-2">
              <p>Your order has shipped and will be with you soon.</p>
              <p>Order Item Count: {orderItems.length}</p>
              <p>Payment Status: Paid by Stripe</p>
              <p>Order Amount: ${totalAmount?.toFixed(2)}</p>
            </div>

            {orderItems.map((product) => (
              <div
                key={product.id || uuidv4()}
                className="flex justify-between items-center p-4 mx-2 border-b-2"
              >
                <div className="flex items-center gap-4">
                  <Link
                    to={`/preview/${product.title}`}
                    state={{ product }}
                    className="w-28 h-28"
                  >
                    <img
                      src={product.thumbnail}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <span className="space-y-1">
                    <p className="text-lg font-semibold">{product.title}</p>
                    <p>{product.category}</p>
                    <button className="bg-blue-500 p-1 px-2 text-white font-semibold">
                      Buy again
                    </button>
                    <p>
                      Quantity: <span>{product.quantity}</span>
                    </p>
                    <p>Price ${product.price}</p>
                    <p className="text-lg font-semibold">
                      SubTotal ${(product.quantity * product.price).toFixed(2)}
                    </p>
                  </span>
                </div>
              </div>
            ))}
          </>
      </div>
        ) : (
          <div>
            <p className="text-gray-600 mt-10">
              No orders yet. Browse and add some!
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
};

export default Order;
