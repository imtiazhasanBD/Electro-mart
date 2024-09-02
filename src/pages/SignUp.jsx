import React, { useContext, useEffect, useState } from "react";
import shoppingImage from "../assets/images/online shopping-min.jpg";
import { RiLockPasswordLine } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";

import { toast } from "react-toastify";
import { ProductsContext } from "../context/ProductsContext";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { state, dispatch } = useContext(ProductsContext);
  const [file, setFile] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const name = `${file.lastModified}${file.name}.`;
    const storage = getStorage();
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAvatar(downloadURL);
        });
      }
    );
  }, [file]);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const { email, password, firstName, lastName } = userInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) {
      toast.error("Please upload a profile picture");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), { ...userInfo, avatar });
      }
      dispatch({ type: "SET_LOGIN", payload: true });
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="h-screen w-full bg-gray-200 flex justify-center">
      <div className="w-[100%] h-[100%] bg-slate-100 flex lg:w-[75%] lg:h-[80%] md:w-[75%] md:h-[75%] md:my-8">
        <div className="banner w-[45%] h-full hidden md:flex flex-col items-center justify-center bg-blue-500 text-white text-center p-4 gap-4">
          <h1 className="text-5xl font-bold">Hello</h1>
          <p className="text-3xl font-bold">Looks like you're new here!</p>
          <p className="text-xl">Sign up with your email to get started</p>
        </div>
        <div className="login w-[100%] md:w-[60%] h-full flex flex-col gap-14 text-center items-center pt-10">
          <h1 className="text-lg md:text-2xl font-bold text-blue-400">
            Create your ElectroMart Account
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[80%]">
            <div className="flex">
              <label htmlFor="firstName" className="w-full relative">
                <FaRegUser className="text-blue-400 absolute top-3 left-3" />
                <input
                  onChange={handleChange}
                  type="text"
                  name="firstName"
                  className="bg-gray-100 w-full pl-10 pr-4 py-2 focus:outline-none"
                  placeholder="First Name"
                  required
                />
              </label>
              <label htmlFor="lastName" className="w-full relative">
                <FaRegUser className="text-blue-400 absolute top-3 left-3" />
                <input
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  className="bg-gray-100 w-full pl-10 pr-4 py-2 focus:outline-none"
                  placeholder="Last Name"
                  required
                />
              </label>
            </div>
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

            <label htmlFor="file" className="w-full relative">
              {!avatar ? (
                <CgProfile className="text-blue-400 absolute top-3 left-3 text-xl" />
              ) : (
                <img
                  src={avatar}
                  className="w-[8%] text-blue-400 absolute top-3 left-3 mb-4"
                />
              )}
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                name="password"
                className="bg-gray-100 w-full pl-10 pr-4 py-2 focus:outline-none"
                placeholder="Password"
                required
              />
              <p className="text-xs leading-5 text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </label>
            <span>
              <p className="text-gray-500 text-sm">
                By clicking "SIGN UP" I agree to{" "}
                <a className="text-blue-500">Terms of Use </a>and{" "}
                <a className="text-blue-500">Privacy Policy</a>
              </p>
            </span>
            <button
              type="submit"
              className="p-2 bg-blue-400 text-white font-bold rounded-lg"
            >
              SIGN UP
            </button>
            <p className="text-sm text-gray-400  font-semibold">
              Existing user?
              <Link to="/user/login" className="text-blue-500 hover:underline">
                {" "}
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
