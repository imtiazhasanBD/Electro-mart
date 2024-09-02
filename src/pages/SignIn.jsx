import React, { useContext, useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { ProductsContext } from "../context/ProductsContext";
import { Link, NavLink } from "react-router-dom";

import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../components/firebase';
import useFetchUserData from '../components/fetchUser';
const SignIn = () => {
    const { state, dispatch } = useContext(ProductsContext);
    useFetchUserData(false);
  
    const [user, setUser] = useState({
      email: "",
      password: "",
    });
  
    const { email, password } = user;
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        dispatch({ type: "SET_MODEL", payload: false });
        dispatch({ type: "SET_LOGIN", payload: true });
        toast.success("User logged in Successfully!!", {
          position: "top-center",
        });
        //window.location.href = '/user'
      } catch (error) {
        toast.error(error.message, {
          position: "bottom-center",
        });
      }
    };
  return (
    <div className="w-full h-full bg-white flex rounded-lg"
      >
        {/*User login section*/}
        <div className="login md:w-[60%]  h-full flex flex-col gap-5 text-center items-center pt-10">
          <h1 className="text-2xl font-bold text-blue-400">
            Welcome! Please Login to continue
          </h1>
          <div className="icons flex text-4xl gap-4">
            <FaFacebookF className="border-2 border-gray-300 p-2 rounded-full" />
            <FaGoogle className="border-2 border-gray-300 p-2 rounded-full" />
            <FaLinkedinIn className="border-2 border-gray-300 p-2  rounded-full" />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[80%]">
            <p>or use your email account:</p>
            <label htmlFor="email" className="w-full relative">
              <TfiEmail className="text-blue-400 absolute top-3 left-3" />
              <input
                onChange={handleChange}
                type="email"
                name="email"
                className="bg-gray-100 w-full pl-10 pr-4 py-2 focus:outline-none"
                placeholder="Email"
                required
              />
            </label>
            <label htmlFor="password" className="w-full relative">
              <RiLockPasswordLine className="text-blue-400 absolute top-3 left-3" />
              <input
                onChange={handleChange}
                type="password"
                name="password"
                className="bg-gray-100 w-full pl-10 pr-4 py-2 focus:outline-none"
                placeholder="Password"
                required
              />
            </label>

            <a className="text-sm text-blue-400 hover:underline cursor-pointer">
              Forgot your password?
            </a>
            <button
              type="submit"
              className="p-2 bg-blue-400 text-white font-bold rounded-lg"
            >
              SIGN IN
            </button>
          </form>
          <p className="font-semibold text-gray-400">New member?
            <Link to="/user/register" className=" text-blue-500 hover:underline"> Register here</Link>
          </p>
        </div>
        {/*User sign up section*/}
        <div className="sign_up w-[40%] bg-blue-500 h-full md:flex items-center justify-center text-center px-4 rounded-r-lg hidden">
          <div className="sign_up text-white flex flex-col gap-3">
            <h1 className="text-5xl font-bold">Hello </h1>
            <h1 className="text-3xl font-bold">New member? </h1>
            <p className="text-sm">
              Enter your personal details and start journey with us
            </p>
            <NavLink to="/user/register">
              {" "}
              <button
                onClick={() => dispatch({ type: "SET_MODEL", payload: false })}
                className="text-xl border-2 border-white font-bold py-1 px-4 rounded-lg mt-4"
              >
                SIGN UP
              </button>
            </NavLink>
          </div>
          <button
            onClick={() => dispatch({ type: "SET_MODEL", payload: false })}
            className="absolute top-2 right-2 p-2 text-2xl font-bold"
          >
            <RxCrossCircled className="text-white" />
          </button>
        </div>
     </div>
  )
}

export default SignIn