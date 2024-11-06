import React, {  useState } from "react";
import { auth } from "../components/firebase";
import LoadingScreen from "../components/LoadingScreen";
import useFetchUserData from "../components/fetchUser";
import useFetchOrderData from "../components/fetchOrderData";
import { useNavigate, useParams } from "react-router-dom";
import { RiAccountBoxLine, RiLockPasswordLine } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { TiHomeOutline } from "react-icons/ti";
import { LuPackage2 } from "react-icons/lu";
import { MdPayment, MdOutlineReviews, MdOutlineSupportAgent } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import SidebarLink from "../components/UserProfile/SidebarLink";
import UserProfileForMobile from "../components/UserProfileForMobile";
import UserprofileBody from "../components/UserprofileBody";
import banner from "../assets/images/banner_images/extensive-ecommerce-banner.jpg";
import { useDispatch } from "react-redux";
import { setAvatar, setLogin } from "../features/genaralSlice";

// Profile Page Component

const Profile = ({handlePageTitle}) => {
  const userInfo = useFetchUserData();
  const orderItems = useFetchOrderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activepage } = useParams();
  //handlePageTitle("Manage My Account")

  // Logout function
  async function handleLogout() {
    try {
      await auth.signOut();
      dispatch(setAvatar(""));
      dispatch(setLogin(false));
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBodyOpen, setIsBodyOpen] = useState(true);

  const toggleBody = () => {
    setIsBodyOpen(!isSidebarOpen);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsBodyOpen(!isSidebarOpen);
  };

    const handleBackClick = () => {
      navigate(-1); // Go back to the previous page
    };
  
  return (
    <div className={`w-full min-h-screen md:bg-gray-100 bg-white md:static ${activepage === "profile"? "fixed": "static"}`}>
      {userInfo ? (
        <div className="mb-2  md:mx-8">
          {/* Banner Section */}
          <div className="relative h-60 hidden md:block">
            <img src={banner} alt="Banner" className="w-full h-full object-cover" />
            <p className="absolute top-10 text-white md:text-5xl p-4 text-center w-full">
              user/{activepage}
            </p>
          </div>

          {/* Main Content */}
          <div className="container mx-auto md:py-8 flex flex-col lg:flex-row md:gap-4">
            {/* Sidebar */}
            <div className="relative md:w-1/4">

      {/* Sidebar with sliding animation */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 md:z-0 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 lg:relative lg:w-full lg:top-auto lg:right-auto lg:h-auto`}
        
      >
        <section className="flex items-center gap-4 p-4">
          <img
            src={userInfo.avatar}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border object-cover"
          />
          <div>
            <h1 className="text-2xl font-semibold text-gray-700">
              {`${userInfo.firstName} ${userInfo.lastName}`}
            </h1>
            <p className="text-gray-500">{userInfo.email}</p>
          </div>
        </section>

        {/* Sidebar Links */}
        <ul className="mt-4">
          <SidebarLink onToggleSidebar={toggleSidebar} to="/user/profile" icon={RiAccountBoxLine} label="My Account" />
          <SidebarLink onToggleSidebar={toggleSidebar} to="/user/orders" icon={LuPackage2} label="My Orders" />
          <SidebarLink onToggleSidebar={toggleSidebar} to="/user/edit-profile" icon={FaRegEdit} label="Edit Profile" />
          <SidebarLink onToggleSidebar={toggleSidebar} to="/user/edit-location" icon={TiHomeOutline} label="Edit Location" />
          <SidebarLink onToggleSidebar={toggleSidebar} to="/user/change-password" icon={RiLockPasswordLine} label="Change Password" />
          <SidebarLink onToggleSidebar={toggleSidebar} to="/user/payment-options" icon={MdPayment} label="Payment Option" />
          <SidebarLink to="/user/reviews" icon={MdOutlineReviews} label="My Reviews" isHidden={true} />
          <SidebarLink onToggleSidebar={toggleSidebar} to="/user/support" icon={MdOutlineSupportAgent} label="Help & Support" isHidden={true} />
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

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
            {/* Mobile View */}
            <div className={`${ activepage === "profile"? "block" : "hidden"} ${activepage === "orders"? "hidden" : "block"} `}>

            <UserProfileForMobile onToggleSidebar={toggleSidebar} />
            </div>
            {/* Main Content (User Info) */}
            <div className={`flex-1 bg-white rounded-lg shadow md:p-4 `}>
              <div>
              <section className="w-full flex items-center text-white bg-blue-500 p-4 fixed z-20 md:hidden">
            <BiArrowBack  size={"1.7rem"} onClick={handleBackClick}/>
          <h1 className="text-2xl font-semibold w-full text-center">
            {activepage}
          </h1>
            </section> 
            <section className={`flex justify-center items-center p-4 bg-white h-full md:py-1 ${activepage !== "profile"? "py-20": ""}`}>

              <UserprofileBody />
            </section>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default Profile;
