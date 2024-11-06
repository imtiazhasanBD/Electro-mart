import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFetchUserData from "./fetchUser";
import { auth } from "./firebase";
import { NavLink } from "react-router-dom";

import { SlNote } from "react-icons/sl";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { IoLocationOutline } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdOutlineReviews } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { MdPendingActions } from "react-icons/md";
import { MdOutlineLocalShipping } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { GoCodeReview } from "react-icons/go";
import { GoPackageDependents } from "react-icons/go";
import { TbCalendarCancel } from "react-icons/tb";
import { GrCompliance } from "react-icons/gr";

import LoadingScreen from "./LoadingScreen";
import { setAvatar, setLogin } from "../features/genaralSlice";
import { toast } from "react-toastify";

const UserProfileForMobile = ({ onToggleSidebar }) => {
    
    const userInfo = useFetchUserData();
    
    const dispatch = useDispatch();
    const { favorites } = useSelector((state) => state.favoritesR);

    async function handleLogout() {
      try {
        await auth.signOut();
      //  window.location.href = "/";
        dispatch(setAvatar(""));
        toast.dismiss("User logged out successfully!");
        dispatch(setLogin(false));
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    }

  return (
     <>
      { userInfo ? (
             <div className="h-screen bg-gray-100 md:hidden">
             <div className="bg-blue-500 md:pl-[80px] w-full text-white p-2 pb-10 relative">
               <div className="flex justify-between p-2 mt-2">
                 <span className="flex gap-2">
                   <button>
                      <IoArrowBack />
                    </button> 
                   <p>My Account</p>
                 </span>
                  {/* Toggle button for mobile */}
                  <button onClick={onToggleSidebar} className="text-xl">
                     <IoSettingsOutline />
                  </button>
               </div>
               <div className="">
                 <div className="flex w-full flex-col">
                   <div className="m-auto">
                     <img
                       src={userInfo.avatar}
                       alt="User Avatar"
                       className="w-16 h-16 rounded-full object-cover p-1"
                     />
                   </div>
         
                   <div>
                     <span className="text-center">
                         <h1 className="text-xl mb-1 font-semibold">
                           {userInfo.firstName + " " + userInfo.lastName}
                         </h1>
                         <h1 className="text-md font-semibold">
                           {userInfo.email}
                         </h1>
                     </span>
                   </div>
                 </div>
               </div>
         
             </div>
              
             <div className="flex w-full justify-center items-center absolute top-44 z-10 md:hidden">
                 <section className="flex justify-between items-center text-center bg-white text-gray-500 mx-3 px-4 py-4 w-full shadow-md font-semibold">
                   <NavLink to={"/orders"}>
                     <button className="text-2xl">
                       <SlNote className="text-gray-500"/>
                     </button>
                     <p className="pt-1">My Orders</p>
                   </NavLink>
             
                   <NavLink to={"/favs"} size={"2rem"}>
                     <button className="relative text-3xl">
                       <IoIosHeartEmpty className="text-gray-500"/>
                       {favorites.length > 0 && (
                         <span className="px-1 bg-orange-500 text-white rounded-full text-xs absolute top-0 right-0">
                           {favorites.length}
                         </span>
                       )}
                     </button>
                     <p>Wishlist</p>
                   </NavLink>
             
                   <NavLink>
                     <button className="relative text-3xl">
                       <IoIosNotificationsOutline className="text-gray-500"/>
                       <span className="px-1 bg-orange-500 text-white rounded-full text-xs absolute top-0 right-0">
                         5
                       </span>
                     </button>
                     <p>Notifications</p>
                   </NavLink>
                 </section>
            </div>
            <div className="w-full pt-16 text-gray-500">
                 <ul className="p-5 text-xl  flex-col justify-between gap-4 hidden">
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
                  <section className="p-4 space-y-6 bg-white m-2 mx-2">
                    <div className="flex justify-between">
                      <p className="text-xl font-semibold">My Orders</p>
                      <p>View All</p>
                    </div>
                  <div className="flex justify-between text-3xl">
                       <span className="flex flex-col items-center">
                      <GrCompliance/>
                       <p className="text-xs">Completed</p>
                       </span>
                       <span className="flex flex-col items-center">
                      <GoPackageDependents/>
                       <p className="text-xs">Processing</p>
                       </span>
                       <span className="flex flex-col items-center">
                      <MdOutlineLocalShipping/>
                       <p className="text-xs">Shipped</p>
                       </span>
                       <span className="flex flex-col items-center">
                      <TbCalendarCancel/>
                       <p className="text-xs">Cancelled</p>
                       </span>
                       <span className="flex flex-col items-center">
                      <MdOutlineRateReview/>
                       <p className="text-xs">Review</p>
                       </span>
                  </div>
                  </section>
            </div>
             </div>
      ) : (<LoadingScreen/>)
   }
    </>
  )
}

export default UserProfileForMobile