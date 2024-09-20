import React, { useEffect, useState } from "react";
import { updateUserDataToDatabase } from "./updateUserDataToDatabase";
import useFetchUserData from "../fetchUser";

const UserAddressUpdate = () => {
    const userInfo = useFetchUserData();
    const [doEdit, setDoEdit] = useState(false);
   
  const [addressInfo, setAddressInfo] = useState({
        region: "",
        city: "",
        zone: "",
        address: "",
    });

    useEffect(() => {
        if (userInfo?.addressInfo) {
          setAddressInfo(userInfo.addressInfo);
        }
      }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit to update the address
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserDataToDatabase({ addressInfo });
    setDoEdit(false); 
  };

  const handleEdit = () => {
    setDoEdit(prev => !prev );
    console.log(doEdit)
  }

  return (
    <div className="w-full flex flex-col p-16 items-center bg-white">
      <h1 className="text-2xl font-semibold text-blue-400">{userInfo?.addressInfo? "Edit Your Address" : "Add New Address"}</h1>
      {/* Form container */}
      {!userInfo?.addressInfo || doEdit ? 
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col mt-10 space-y-6"
      >
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
              value={addressInfo.region}
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
              value={addressInfo.city}
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
              value={addressInfo.zone}
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
              value={addressInfo.address}
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
          type="submit"
          className="bg-blue-500 md:w-40 md:m-auto p-4 text-base text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
          Save Changes
        </button>
        </div>
      </form>
       :
       <div className="w-full justify-between mt-10 flex gap-10">
            <section className="space-y-4 p-6 flex flex-col justify-between w-full rounded-lg shadow-lg">
                <div className="flex justify-between text-lg font-semibold">
                    <span>Billing Address</span>
                    <button onClick={handleEdit} className="text-blue-500">Edit</button>
                </div>
                <div className="text-gray-500">
                    <p>{userInfo?.addressInfo.address}</p>
                    <p>{userInfo?.addressInfo.zone}</p>
                    <p>{userInfo?.addressInfo.city}</p>
                    <p>{userInfo?.addressInfo.region}</p>
                </div>
            </section>
            <section className="space-y-4 p-6 flex flex-col justify-between w-full rounded-lg shadow-lg">
                <div className="flex justify-between text-lg font-semibold">
                    <span>Shipping Address</span>
                    <button onClick={handleEdit} className="text-blue-500">Edit</button>
                </div>
                <div className="text-gray-500">
                    <p>56/4</p>
                    <p>Road-11</p>
                    <p>Kallyanpur</p>
                    <p>Dhaka</p>
                </div>
            </section>
       </div>
        }
    </div>
  );
};

export default UserAddressUpdate;
