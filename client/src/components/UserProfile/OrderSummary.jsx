import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Custom hook to fetch order details
import { MdLocationOn, MdPayment, MdLocalShipping } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import LoadingScreen from "../LoadingScreen";
import useFetchOrderData from "../fetchOrderData";
import useFetchUserData from "../fetchUser";


const OrderSummary = () => {
  const orderItems = useFetchOrderData();
  const userInfo = useFetchUserData();
  const [orderDetails, setOrderDetails] = useState(); 
  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const navigate = useNavigate();


  useEffect(() => {
    if (orderDetails) {
      setLoading(false);
    }
    const orderItemData = orderItems?.filter(item => item.paymentId === id);
    if (orderItemData) {
      setOrderDetails(orderItemData)
    }
  }, [orderItems]);
  
  useEffect(() => {
    // Fetch Stripe checkout session
    const fetchCheckoutSession = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:7000/api/get-checkout-session/${id}`);
        const data = await response.json();
        setCheckoutData(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch checkout session data");
        setLoading(false);
      }
    };

    if (id) {
      fetchCheckoutSession();
    }
  }, [id]);


  console.log(checkoutData)
  if (loading) {
    return <div className="container md:relative mt-20">
        <LoadingScreen/>
    </div>
  }; // Display loading spinner while fetching data

  return (
    <div className="container mx-auto">
    <h1 className="text-3xl font-bold mb-6">Order Summary</h1>

    {/* Order Header */}
    <div className="bg-white shadow-md p-4 rounded-lg mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Order #  {orderDetails[0]?.paymentId.substring(0, 10) + "..."}</h2>
        <span className={`text-${checkoutData?.payment_status === 'paid' ? 'green' : 'red'}-500 flex items-center gap-2`}>
          <AiOutlineCheckCircle />
          {checkoutData?.payment_status}
        </span>
      </div>
      <p className="text-gray-600">
        Placed on {new Date(checkoutData?.created * 1000).toLocaleString()}
      </p>
    </div>

    {/* Order Items */}
    <div className="bg-white shadow-md p-4 rounded-lg mb-6">
      <h3 className="text-xl font-bold mb-4">Items Purchased</h3>
      {orderDetails[0]?.orderItems.map((item) => (
        <div key={item.id} className="flex justify-between mb-4 border-b pb-2">
          <div className="flex items-center gap-4">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h4 className="text-lg font-bold">{item.title}</h4>
              <p className="text-gray-600">Qty: {item.quantity}</p>
            </div>
          </div>
          <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
    </div>

    {/* Shipping Details */}
    <div className="bg-white shadow-md p-4 rounded-lg mb-6">
      <h3 className="text-xl font-bold mb-4">Shipping Details</h3>
      <div className="flex items-center gap-4">
        <MdLocationOn className="text-gray-600 text-2xl" />
        <div>
          <p className="font-semibold">{userInfo?.firstName + " " + userInfo?.lastName}</p>
          <p>{userInfo?.addressInfo?.shipping?.address || "No address provided"}</p>
          <p>{userInfo?.addressInfo?.shipping?.zone || "No zone provided"}</p>
          <p>{userInfo?.addressInfo?.shipping?.city || "No city provided"}</p>
          <p>{userInfo?.addressInfo?.shipping?.region || "No region provided"}</p>
        </div>
      </div>
    </div>

    {/* Payment Information */}
    <div className="bg-white shadow-md p-4 rounded-lg mb-6">
      <h3 className="text-xl font-bold mb-4">Payment Information</h3>
      <div className="flex items-center gap-4">
        <MdPayment className="text-gray-600 text-2xl" />
        <div>
          <p className="font-semibold">{orderDetails[0]?.paymentMethod || "N/A"}</p>
          <p className="text-gray-600">Payment ID: {orderDetails[0]?.paymentId.substring(0, 10) + "..."}</p>
          <p className="text-gray-600">Total: ${checkoutData?.amount_total / 100}</p>
        </div>
      </div>
    </div>

    {/* Shipping Method */}
    <div className="bg-white shadow-md p-4 rounded-lg mb-6">
      <h3 className="text-xl font-bold mb-4">Shipping Method</h3>
      <div className="flex items-center gap-4">
        <MdLocalShipping className="text-gray-600 text-2xl" />
        <div>
          <p className="font-semibold">{orderDetails[0]?.paymentMethod || "N/A"}</p>
          <p className="text-gray-600">Estimated Delivery: {(new Date(checkoutData?.expires_at * 1000).toLocaleDateString()) || "N/A"}</p>
        </div>
      </div>
    </div>

    {/* Order Total */}
    <div className="bg-white shadow-md p-4 rounded-lg mb-6">
      <h3 className="text-xl font-bold mb-4">Order Total</h3>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Subtotal</span>
        <span className="text-lg">${checkoutData?.amount_subtotal / 100}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Shipping</span>
        <span className="text-lg">${checkoutData?.shipping_cost?.amount_subtotal / 100 || 0}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Tax</span>
        <span className="text-lg">${checkoutData?.tax / 100 || 0}</span>
      </div>
      <div className="flex justify-between items-center mt-4 border-t pt-4">
        <span className="text-xl font-bold">Total</span>
        <span className="text-xl font-bold">${checkoutData?.amount_total / 100}</span>
      </div>
    </div>

    <div className="text-right hidden">
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </button>
    </div>
  </div>
  );
};

export default OrderSummary;
