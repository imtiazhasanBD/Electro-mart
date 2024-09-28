import React, { useEffect, useState } from "react";
import { updateUserDataToDatabase } from "./updateUserDataToDatabase";
import useFetchUserData from "../fetchUser";

const UserAddressUpdate = () => {
  const userInfo = useFetchUserData();
  const [doEdit, setDoEdit] = useState(false);
  const [addressType, setAddressType] = useState("billing");
  const [isChanging, setIsChanging] = useState(true)
  const [addressInfo, setAddressInfo] = useState({
    billing: {
      region: "",
      city: "",
      zone: "",
      address: "",
    },
    shipping: {
      region: "",
      city: "",
      zone: "",
      address: "",
    },
  });
  
  useEffect(() => {
    if (userInfo?.addressInfo) {
      setAddressInfo(userInfo.addressInfo);
    }
  }, [userInfo]);



  const handleAddressTypeChange = (e) => {
    setAddressType(e.target.value);
  };
  const handleChange = (e) => {
    setIsChanging(false);
    const { name, value } = e.target;
    setAddressInfo((prev) => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [name]: value,       
      },
    }));
  };

  // Handle form submit to update the address
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserDataToDatabase({ addressInfo });
    setDoEdit(false);
    setIsChanging(true);
  };

  const handleEdit = (value) => {
    setDoEdit((prev) => !prev);
    setAddressType(value)
  };

  return (
    <div className="w-full flex flex-col md:p-16 items-center bg-white">
      <h1 className="text-xl md:text-2xl font-semibold text-blue-400 hidden md:block">
        {userInfo?.addressInfo ? "Edit Your Address" : "Add New Address"}
      </h1>
      {/* Form container */}
      {!userInfo?.addressInfo || doEdit ? (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col p-2 space-y-6"
        >
          <div className="flex gap-6 w-full justify-end">
            <label
              htmlFor="billing"
              className="flex items-center gap-1 font-semibold text-gray-700"
            >
              <input
                onChange={handleAddressTypeChange}
                type="radio"
                name="addressType"
                value="billing"
                checked={addressType === "billing"}
                required
              />
              <span>Billing</span>
            </label>
            <label
              htmlFor="shipping"
              className="flex items-center gap-1 font-semibold text-gray-700"
            >
              <input
                onChange={handleAddressTypeChange}
                type="radio"
                name="addressType"
                value="shipping"
                checked={addressType === "shipping"}
                required
              />
              <span>Shipping</span>
            </label>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
            {/* Region field */}
            <label htmlFor="region" className="flex flex-col w-full">
              <span className="mb-2 text-base font-medium text-gray-700">
                Province / Region <span className="text-red-500">*</span>
              </span>
              <input
                onChange={handleChange}
                name="region"
                type="text"
                value={addressInfo[addressType]?.region || ""}
                className="border-gray-300 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your province / region"
                required
              />
            </label>

            {/* City field */}
            <label htmlFor="city" className="flex flex-col w-full">
              <span className="mb-2 text-base font-medium text-gray-700">
                City <span className="text-red-500">*</span>
              </span>
              <input
                onChange={handleChange}
                name="city"
                type="text"
                value={addressInfo[addressType]?.city || ""}
                className="border-gray-300 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your city"
                required
              />
            </label>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
            {/* Zone field */}
            <label htmlFor="zone" className="flex flex-col w-full">
              <span className="mb-2 text-base font-medium text-gray-700">
                Zone <span className="text-red-500">*</span>
              </span>
              <input
                onChange={handleChange}
                name="zone"
                type="text"
                value={addressInfo[addressType]?.zone || ""}
                className="border-gray-300 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your full zone"
                required
              />
            </label>

            {/* Address field */}
            <label htmlFor="address" className="flex flex-col w-full">
              <span className="mb-2 text-base font-medium text-gray-700">
                Address <span className="text-red-500">*</span>
              </span>
              <input
                onChange={handleChange}
                name="address"
                type="text"
                value={addressInfo[addressType]?.address || ""}
                className="border-gray-300 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your address"
                required
              />
            </label>
          </div>
          <div className="m-auto space-x-10">
            <button
              onClick={handleEdit}
              className="bg-orange-800 md:w-28 md:m-auto p-4 text-base text-white font-semibold rounded-lg hover:bg-orange-900 transition duration-300"
            >
              Cancel
            </button>
            <button 
             disabled = {isChanging}
              type="submit"
              className={`bg-blue-500 md:w-40 md:m-auto p-4 text-base text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ${isChanging && "cursor-not-allowed"}`}
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="w-full flex justify-between mt-10 flex-col gap-10">
          <section className="space-y-4 p-6 flex flex-col justify-between w-full rounded-lg shadow-lg">
            <div className="flex justify-between text-base md:text-lg font-semibold">
              <span>Billing Address</span>
              <button onClick={() => {handleEdit("billing")}} className="text-blue-500">
                Edit
              </button>
            </div>
            <div className="text-gray-500">
              <p>{addressInfo?.billing?.address || "No address provided"}</p>
              <p>{addressInfo?.billing?.zone || "No zone provided"}</p>
              <p>{addressInfo?.billing?.city || "No city provided"}</p>
              <p>{addressInfo?.billing?.region || "No region provided"}</p>
            </div>
          </section>
          <section className="space-y-4 p-6 flex flex-col justify-between w-full rounded-lg shadow-lg">
            <div className="flex justify-between text-base md:text-lg font-semibold">
              <span>Shipping Address</span>
              <button onClick={() => handleEdit("shipping")} className="text-blue-500">
                Edit
              </button>
            </div>
            <div className="text-gray-500">
              <p>{addressInfo?.shipping?.address || "No address provided"}</p>
              <p>{addressInfo?.shipping?.zone || "No zone provided"}</p>
              <p>{addressInfo?.shipping?.city || "No city provided"}</p>
              <p>{addressInfo?.shipping?.region || "No region provided"}</p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default UserAddressUpdate;
