import React, { useContext } from "react";
import { auth, db } from "../components/firebase";

import { ProductsContext } from "../context/ProductsContext";
import LoadingScreen from "../components/LoadingScreen";
import useFetchUserData from "../components/fetchUser";
import { SlNote } from "react-icons/sl";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { IoLocationOutline } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdOutlineReviews } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import UserProfileForMobile from "../components/UserProfileForMobile";



const Profile = () => {
  const userInfo = useFetchUserData();
  const { state, dispatch } = useContext(ProductsContext);

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

  return (
    <div className="">
      {userInfo ? (
         <div className="h-screen bg-white md:flex">
           <div className="w-1/4 bg-white pt-4 text-gray-500 hidden md:block">
                 <ul className="p-5 text-xl flex flex-col justify-between gap-6">
                    <li>
                       <button className="flex flex-row justify-center items-center gap-8 hover:text-blue-400">
                         <ImProfile />
                         <span className="font-semibold text-lg">Edit Profile</span>
                       </button>
                    </li>
                    <li>
                       <button className="flex flex-row justify-center items-center gap-8 hover:text-blue-400">
                         <IoLocationOutline />
                         <span className="font-semibold text-lg">Edit Location</span>
                       </button>
                    </li>
                    <li>
                       <button className="flex flex-row justify-center items-center gap-8 hover:text-blue-400">
                         <IoChatboxEllipsesOutline />
                         <span className="font-semibold text-lg">Chat With Us</span>
                       </button>
                    </li>
                    <li>
                       <button className="flex flex-row justify-center items-center gap-8 hover:text-blue-400">
                         <MdOutlineReviews />
                         <span className="font-semibold text-lg">My Reviews</span>
                       </button>
                    </li>
                    <li>
                       <button className="flex flex-row justify-center items-center gap-8 hover:text-blue-400">
                         <MdOutlineSupportAgent />
                         <span className="font-semibold text-lg">Help & Support</span>
                       </button>
                    </li>
                    <li>
                       <button className="flex flex-row justify-center items-center gap-8 hover:text-blue-400">
                         <MdOutlinePayments />
                         <span className="font-semibold text-lg">Payment Option</span>
                       </button>
                    </li>
                    <li>
                       <button onClick={handleLogout} className="flex flex-row justify-center items-center gap-8 hover:text-blue-400">
                         <LuLogOut />
                         <span className="font-semibold text-lg">Logout</span>
                       </button>
                    </li>
                 </ul>
            </div>
            <div className=" bg-gray-100  w-full hidden md:block">
              <div>
                <h1 className="text-3xl p-5">My Account</h1>
              </div>
              <div className="p-10">
                <div className="flex w-full md:w-4/5 flex-col md:flex-row">
                  <div className="m-auto md:w-full">
                    <img
                      src={userInfo.avatar}
                      alt="User Avatar"
                      className="w-20 h-20 md:w-40 md:h-40 rounded-full border border-gray-700 object-cover p-1"
                    />
                  </div>

                  <div>
                    <h1 className="text-3xl mb-3 font-bold">
                      Welcome, Dear {userInfo.firstName + " " + userInfo.lastName}
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
                  <button className="p-2 bg-blue-400 text-white px-3 rounded-md">
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
            <UserProfileForMobile/>
         </div>
     
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default Profile;
