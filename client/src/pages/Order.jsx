import React, { useContext, useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import { v4 as uuidv4 } from "uuid";
import LoadingScreen from "../components/LoadingScreen";
import { auth, db } from "../components/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import useFetchOrderData from "../components/fetchOrderData";
import Pagination from "../components/Pagination";

const Order = () => {
  const orderItems = useFetchOrderData();
  const { state, dispatch } = useContext(ProductsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentOrders = orderItems.slice(indexOfFirstPost, indexOfLastPost);
  const navigate = useNavigate()

  if (state.isLoading) {
    return <div className="container relative mt-20">
        <LoadingScreen/>
    </div>
  }
  
const handleOrderSummary = (id) => {
    navigate(`/user/order?id=${id}`)
}
  console.log(orderItems);

  return (
    <div className="m-auto lg:p-4 relative bg-white mb-2">
      <h1 className="text-3xl font-bold text-blue-400 md:mb-10">My Orders</h1>
      {currentOrders && currentOrders.length > 0 ? (
        currentOrders.map((orderItem) => (
          <div onClick={() => handleOrderSummary(orderItem.paymentId)} key={uuidv4()} className="border-2 my-8 hover:border-gray-200 hover:shadow-lg cursor-pointer">
            <section className="bg-slate-100 flex flex-col lg:flex-row justify-between p-4 w-full">
              <div>
                 <span className="font-bold">Order Placed</span>
                 <p>{new Date(orderItem.createdAt?.toDate()).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                 </p>
              </div>
              <div className="font-bold text-md">
               <span>Order ID:</span>
                <p className="font-normal">{orderItem.paymentId.substring(0,35)+ "..."}</p>
              </div>
            </section>

            <>
              <div className="p-4 mx-2 hidden">
                <p>Your order has shipped and will be with you soon.</p>
                <p>Order Item Count: {orderItem.orderItems.length}</p>
                <p>Payment Status: Paid by {orderItem.paymentMethod}</p>
              </div>

              {orderItem.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-2 items-center mb-4 border-b p-4 last:border-none"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="text-base md:text-lg font-bold">{item.title}</h4>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-base md:text-lg font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </>
          </div>
        ))
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
       <Pagination totalPosts={orderItems.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  );
};

export default Order;
