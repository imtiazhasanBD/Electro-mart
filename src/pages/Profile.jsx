import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../components/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CgProfile } from "react-icons/cg";
import { ProductsContext } from '../context/ProductsContext';
import LoadingScreen from '../components/LoadingScreen';
import Header from '../components/Header';
import useFetchUserData from '../components/fetchUser';


const Profile = () => {
    
    const userInfo = useFetchUserData();
    const {state, dispatch} = useContext(ProductsContext);

     


   async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/";
      dispatch({type: "SET_AVATAR" , payload: ""});
      console.log("User logged out successfully!");
      dispatch({type: "SET_LOGIN" , payload: false});
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
     
        <div className=''>
      {userInfo?   
      ( <div className='bg-gray-300 pl-[80px] w-full'>
          <div>
            <h1 className='text-3xl p-5'>My Account</h1>
          </div>
         <div className='p-10'>
            <div className='flex w-[80%]'>
              <div className='w-[70%]'>
                <img src={userInfo.avatar} alt="User Avatar" className='w-40 h-40 rounded-full border border-gray-700 object-cover p-1'/>
             </div>

              <div>
                <h1 className='text-3xl mb-3 font-bold'>Welcome, Dear {userInfo.firstName + " " + userInfo.lastName}</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, exercitationem saepe distinctio modi vero, atque laudantium perspiciatis eaque natus aperiam odit adipisci voluptatum totam labore, maxime reprehenderit. In dolorem quidem, beatae culpa quisquam sint voluptates omnis minima maxime, nam aut vel magni pariatur ab doloribus eius, iste magnam libero consectetur.</p>
              </div>
            </div>
             <div className="buttons flex gap-6 font-semibold mt-10 text-sm">
              <button className='p-2 bg-blue-400 text-white px-3 rounded-md'>Edit Profile</button>
              <button className='p-2 bg-blue-400 text-white px-3 rounded-md'>Add Address</button>
              <button onClick={handleLogout} className='p-2 bg-blue-400 text-white px-3 rounded-md'>LogOut</button> 
             </div>
         </div>
      </div>
        
      )
        
      :
      <LoadingScreen/>
      
      }
      
        </div>
   
  )
}

export default Profile;
