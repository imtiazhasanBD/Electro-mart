import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchOrderData from "./fetchOrderData";
import { auth } from "./firebase";
import UserPasswordUpdate from "./UserProfile/UserPasswordUpdate";
import UserAddressUpdate from "./UserProfile/UserAddressUpdate";
import UserDashboard from "./UserProfile/UserDashBoard";
import OrderSummary from "./UserProfile/OrderSummary";
import { updateUserDataToDatabase } from "./UserProfile/updateUserDataToDatabase";
import UserOrders from "./UserProfile/UserOrders";

const UserprofileBody = () => {
  const { activepage } = useParams();
  const [currentEmail, setCurrentEmail] = useState('');
  const [error, setError] = useState(""); // State for error message
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentEmail(user.email);
    }
  }, [auth]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidFullName = userInfo.name.trim().split(" ").length >= 2;
    if (!isValidFullName) {
      setError("Please enter your full name.");
      return;
    }
    updateUserDataToDatabase({
      firstName: userInfo.name.trim().split(" ")[0], 
      lastName: userInfo.name.trim().split(" ").slice(1).join(" "), 
      phone: userInfo.phone,
    });
    
    setError(null);
    setUserInfo({
        name: '',
        phone: '',
    
      });
    
  }


  return (
    <>
      {activepage === "edit-profile" && (
        <div className="w-full flex flex-col p-16 items-center bg-white">
          <h1 className="text-2xl font-semibold text-blue-400">
            Personal Information
          </h1>
          {/* Form container */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col mt-10 space-y-6">

            <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
              {/* Name field */}
              <label htmlFor="name" className="flex flex-col w-full">
                <span className="mb-2 text-base font-medium text-gray-700">
                  Your Name
                </span>
                <input
                  onChange={handleChange}
                  name="name"  
                  type="text"
                  id="name"
                  value={userInfo.name}
                  required
                  className="border-gray-300 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your full name"
                />
              </label>

              {/* Phone field */}
              <label htmlFor="phone" className="flex flex-col w-full">
                <span className="mb-2 text-base font-medium text-gray-700">
                  Phone/Mobile
                </span>
                <input
                  onChange={handleChange}
                  name="phone"
                  type="tel"
                  id="phone"
                  value={userInfo.phone}
                  required
                  className="border-gray-300 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your phone number"
                />
              </label>
            </div>

            {/* Email field */}
            <label htmlFor="email" className="flex flex-col w-full md:w-1/2">
              <span className="mb-2 text-base font-medium text-gray-700">
                Email
              </span>
              <input
                name="email"
                type="email"
                id="email"
                value={currentEmail}
                disabled
                className="border-gray-300 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-200"
                placeholder="Enter your email address"
              />
            </label>
               {/* Display validation error if any */}
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          <button  type="submit" className="bg-blue-500 md:w-40 md:m-auto p-4 text-base text-white font-semibold mt-10 rounded-lg hover:bg-blue-600 transition duration-300">
            Save Changes
          </button>
          </form>
        </div>
      )}
      {activepage === "change-password" && (
       <UserPasswordUpdate/>
       )}
      {activepage === "edit-location" && (
         <UserAddressUpdate/>
       )}
      {activepage === "profile" && (
         <UserDashboard/>
       )}
      {activepage === "orders" && 
      <div className="w-full flex flex-col items-center bg-white">
          <UserOrders/>
      </div>}
      {activepage === "order" && 
      <div className="w-full flex flex-col items-center bg-white">
          <OrderSummary/>
      </div>}
      {activepage === "chat" && <div className="w-full flex flex-col p-16 items-center bg-white">{activepage}</div>}
      {activepage === "reviews" && <div className="w-full flex flex-col p-16 items-center bg-white">{activepage}</div>}
      {activepage === "support" && <div className="w-full flex flex-col p-16 items-center bg-white">{activepage}</div>}
      {activepage === "payment-options" && <div className="w-full flex flex-col p-16 items-center bg-white">{activepage}</div>}
    </>
  );
};

export default UserprofileBody;
