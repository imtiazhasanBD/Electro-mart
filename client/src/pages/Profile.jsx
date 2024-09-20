import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../components/firebase";

import { ProductsContext } from "../context/ProductsContext";
import LoadingScreen from "../components/LoadingScreen";
import useFetchUserData from "../components/fetchUser";
import { SlNote } from "react-icons/sl";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { IoLocationOutline } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdOutlineReviews } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import UserProfileForMobile from "../components/UserProfileForMobile";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import useFetchOrderData from "../components/fetchOrderData";
import { v4 as uuidv4 } from "uuid";
import UserprofileBody from "../components/UserprofileBody";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import banner from "../assets/images/banner_images/profile-banner.jpg"

const Profile = () => {
  const userInfo = useFetchUserData();
  const orderItems = useFetchOrderData();
  const { state, dispatch } = useContext(ProductsContext);

  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await auth.signOut();
      //  window.location.href = "/";
      dispatch({ type: "SET_AVATAR", payload: "" });
      console.log("User logged out successfully!");
      dispatch({ type: "SET_LOGIN", payload: false });
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  // console.log(orderItems[0]?.createdAt.toDate().toLocaleDateString());

  const {activepage} = useParams();
  const handleAddress = () => {};

  return (
    <div className="">
      {userInfo ? (
        <div>
          <div>
              <img  alt="" />
          </div>
        <div className="flex flex-col lg:flex-row lg:mx-8 gap-4 mb-2 mt-3">
          <div className="w-1/3 bg-white  pt-4 text-gray-500 hidden md:block">
            <ul className="text-xl flex flex-col justify-between items-start">
              <li className="w-full">
                <NavLink
                  to="/user/profile"
                  className="flex flex-row py-6 px-6 items-center gap-4 hover:text-blue-400" 
                >
                  <span className="font-semibold text-xl">Manage My Account</span>
                </NavLink>
              </li>
              <li className="w-full">
                <NavLink
                  to="/user/edit-profile"
                  className="flex flex-row py-6 px-6 text-base items-center gap-4 hover:text-blue-400" 
                >
                  <FaRegEdit/>
                  <span className="font-semibold text-md">Edit Profile</span>
                </NavLink>
              </li>
              <li className="w-full"> 
                <NavLink
                  to="/user/change-password"
                  className="flex flex-row py-6 px-6 text-base items-center gap-4 hover:text-blue-400"
                >
                  <MdOutlineRemoveRedEye/>
                  <span className="font-semibold">Change Password</span>
                </NavLink>
              </li>
              <li className="w-full"> 
                <NavLink
                  to="/user/edit-location"
                  className="flex flex-row py-6 px-6 text-base  items-center gap-4 hover:text-blue-400"
                >
                  <IoLocationOutline />
                  <span className="font-semibold">{userInfo?.addressInfo?"Edit Location" : "Add Location"}</span>
                </NavLink>
              </li>
              <li className="w-full">
                <NavLink
                  to="/user/orders"
                  className="flex flex-row py-6 px-6 text-base  items-center gap-4 hover:text-blue-400"
                >
                  <CiDeliveryTruck />
                  <span className="font-semibold ">My Orders</span>
                </NavLink>
              </li>
              <li className="w-full hidden">
                <NavLink
                  to="/user/reviews"
                  className="flex flex-row py-6 px-6 text-base  items-center gap-4 hover:text-blue-400"
                >
                  <MdOutlineReviews />
                  <span className="font-semibold">My Reviews</span>
                </NavLink>
              </li>
              <li className="w-full hidden">
                <NavLink
                  to="/user/support"
                  className="flex flex-row py-6 px-6 text-base items-center gap-4 hover:text-blue-400"
                >
                  <MdOutlineSupportAgent />
                  <span className="font-semibold ">Help & Support</span>
                </NavLink>
              </li>
              <li className="w-full hidden">
                <NavLink
                  to="/user/payment-options"
                  className="flex flex-row py-6 px-6 text-base items-center gap-4 hover:text-blue-400"
                >
                  <MdOutlinePayments />
                  <span className="font-semibold ">Payment Option</span>
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex flex-row py-4 px-6 text-base items-center gap-4 hover:text-blue-400"
                >
                  <LuLogOut />
                  <span className="font-semibold ">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        {activepage === "profile" && 
          <div className="w-full space-y-6">
            <div className=" bg-white hidden md:block">
              <div>
                <h1 className="text-3xl p-5">My Account</h1>
              </div>
              <div className="p-10 ">
                <div className="flex w-full flex-col md:flex-row">
                  <div className="m-auto md:w-full">
                    <img
                      src={userInfo.avatar}
                      alt="User Avatar"
                      className="w-20 h-20 md:w-40 md:h-40 rounded-full border border-gray-700 object-cover p-1"
                    />
                  </div>

                  <div>
                    <h1 className="text-3xl mb-3 font-bold">
                      Welcome, Dear{" "}
                      {userInfo.firstName + " " + userInfo.lastName}
                    </h1>
                    <p className="hidden md:block">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem, exercitationem saepe distinctio modi vero, atque
                      laudantium perspiciatis eaque natus aperiam odit adipisci
                      voluptatum totam labore, maxime reprehenderit. In dolorem
                      quidem, beatae culpa quisquam sint voluptates omnis minima
                      maxime, nam aut vel magni pariatur ab doloribus eius, iste
                      magnam libero consectetur.
                    </p>
                  </div>
                </div>
                <div className="buttons flex gap-6 font-semibold mt-10 text-sm justify-center md:justify-start">
                  <button className="p-2 bg-blue-400 text-white px-3 rounded-md">
                    Edit Profile
                  </button>
                  <button
                    onClick={handleAddress}
                    className="p-2 bg-blue-400 text-white px-3 rounded-md"
                  >
                    Add Address
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 bg-blue-400 text-white px-3 rounded-md"
                  >
                    LogOut
                  </button>
                </div>
              </div>
            </div>
            {orderItems && orderItems.length > 0 ? (
              <div className="bg-white p-4 hidden lg:block">
                <section>
                  <p className="text-xl font-semibold">Recent order details</p>
                </section>
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-3 px-4">Order#</th>
                      <th>Placed On</th>
                      <th>Total</th>
                      <th>Payment Method</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody className="">
                    {orderItems.map((orderItem) => (
                      <tr key={uuidv4()} className="border-b">
                        <td className="py-3 px-4 text-left">
                          {orderItem.paymentId.substring(0, 30) + "..."}
                        </td>
                        {/*  <td className="py-3 px-4 text-left">{orderItem?.createdAt.toDate().toLocaleDateString()}</td> */}
                        <td>20/09/2024</td>
                        <td className="py-3 px-4">$2350</td>
                        <td className="py-3 px-4">{orderItem.paymentMethod}</td>
                        <td className="py-3 px-4">
                          <button className="text-blue-400 p-2  font-semibold">
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 mt-10">
                No orders yet. Browse and add some!
              </p>
            )}
          </div>
          }

          <UserprofileBody/>
   
          <UserProfileForMobile />
        </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default Profile;
