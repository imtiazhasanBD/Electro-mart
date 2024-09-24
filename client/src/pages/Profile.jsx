import React, { useContext, useState } from "react";
import { auth } from "../components/firebase";
import { ProductsContext } from "../context/ProductsContext";
import LoadingScreen from "../components/LoadingScreen";
import useFetchUserData from "../components/fetchUser";
import useFetchOrderData from "../components/fetchOrderData";
import { useNavigate, useParams } from "react-router-dom";
import { RiAccountBoxLine, RiLockPasswordLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { TiHomeOutline } from "react-icons/ti";
import { LuPackage2 } from "react-icons/lu";
import { MdPayment, MdOutlineReviews, MdOutlineSupportAgent } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import SidebarLink from "../components/UserProfile/SidebarLink";
import UserProfileForMobile from "../components/UserProfileForMobile";
import UserprofileBody from "../components/UserprofileBody";
import banner from "../assets/images/banner_images/extensive-ecommerce-banner.jpg";

// Profile Page Component
const Profile = () => {
  const userInfo = useFetchUserData();
  const orderItems = useFetchOrderData();
  const { dispatch } = useContext(ProductsContext);
  const navigate = useNavigate();
  const { activepage } = useParams();

  // Logout function
  async function handleLogout() {
    try {
      await auth.signOut();
      dispatch({ type: "SET_AVATAR", payload: "" });
      dispatch({ type: "SET_LOGIN", payload: false });
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {userInfo ? (
        <div className="mb-2  md:mx-8">
          {/* Banner Section */}
          <div className="relative h-60">
            <img src={banner} alt="Banner" className="w-full h-full object-cover" />
            <p className="absolute top-10 text-white text-5xl p-4 text-center w-full">
              user/{activepage}
            </p>
          </div>

          {/* Main Content */}
          <div className="container mx-auto py-8 flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 bg-white rounded-lg shadow p-4">
              <section className="flex items-center gap-4 p-4">
                <img
                  src={userInfo.avatar}
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full border object-cover"
                />
                <div>
                  <h1 className="text-2xl font-semibold text-gray-700">{`${userInfo.firstName} ${userInfo.lastName}`}</h1>
                  <p className="text-gray-500">{userInfo.email}</p>
                </div>
              </section>
              {/* Sidebar Links */}
              <ul className="mt-4">
                <SidebarLink to="/user/profile" icon={RiAccountBoxLine} label="My Account" />
                <SidebarLink to="/user/edit-profile" icon={FaRegEdit} label="Edit Profile" />
                <SidebarLink to="/user/change-password" icon={RiLockPasswordLine} label="Change Password" />
                <SidebarLink to="/user/edit-location" icon={TiHomeOutline} label="Edit Location" />
                <SidebarLink to="/user/orders" icon={LuPackage2} label="My Orders" />
                <SidebarLink to="/user/payment-options" icon={MdPayment} label="Payment Option" />
                <SidebarLink to="/user/reviews" icon={MdOutlineReviews} label="My Reviews" isHidden={true} />
                <SidebarLink to="/user/support" icon={MdOutlineSupportAgent} label="Help & Support" isHidden={true} />
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 py-4 px-6 w-full text-gray-700 hover:text-blue-500"
                  >
                    <TbLogout2 />
                    <span className="font-semibold">Logout</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Main Content (User Info) */}
            <div className="flex-1 bg-white rounded-lg shadow p-6">
              <UserprofileBody />
            </div>

            {/* Mobile View */}
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
