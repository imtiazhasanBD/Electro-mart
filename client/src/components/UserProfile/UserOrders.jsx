import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Custom hook to fetch order details
import { MdLocationOn, MdPayment, MdLocalShipping } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import LoadingScreen from "../LoadingScreen";
import useFetchOrderData from "../fetchOrderData";
import Order from "../../pages/Order";


const UserOrders = () => {
    const { orderId } = useParams(); // Get the orderId from the URL
    const navigate = useNavigate();
    const orderItems = useFetchOrderData();
    const orderDetails = orderItems[0]; // Fetch order details using custom hook
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (orderDetails) setLoading(false);
    }, [orderDetails]);
  
    //if (loading) return <LoadingScreen />; // Display loading spinner while fetching data
  
    return (
      <div className="c container">
        <Order/>
      </div>
    );
}

export default UserOrders
