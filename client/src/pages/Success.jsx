import React, {  useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from "../components/firebase";
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { toast } from "react-toastify";  // If you are using toast for notifications
import LoadingScreen from '../components/LoadingScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../features/genaralSlice';
import { clearCart } from '../features/cart/cartSlice';

const Success = () => {
  const { cart, isLoading, error } = useSelector((state) => state.cartR);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const { isItLoading } = useSelector((state) => state.genaralSliceR);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      } else {
        navigate("/login"); // Redirect if the user is not logged in
      }
    });
    return () => unsubscribe(); // Cleanup the subscription
  }, [navigate]);

  // Save order to Firestore if sessionId exists and cart is not empty
  useEffect(() => {
    if (sessionId && cart.length > 0 && userData) {
      const saveOrder = async () => {
        try {
          dispatch(setLoading(true));

          const orderRef = doc(db, "orders", userData.email);
          const docSnap = await getDoc(orderRef);

          if (docSnap.exists()) {
            // Update existing order if needed
            await updateDoc(orderRef, {
              orders: arrayUnion({
                userEmail: userData?.email,
                paymentId: sessionId,
                orderItems: cart,
                paymentMethod: "stripe",
                userId: userData?.uid,
                createdAt: new Date(),
              }),
            });
          } else {
            // Create a new order document
            await setDoc(orderRef, {
              orders: [
                {
                  userEmail: userData?.email,
                  paymentId: sessionId,
                  orderItems: cart,
                  paymentMethod: "stripe",
                  createdAt: new Date(),
                },
              ],
            });
          }
          toast.success("Order saved successfully!");
          dispatch(clearCart())
        } catch (error) {
          toast.error("Error saving order data");
        } finally {
          dispatch(setLoading(false));
        }
      };
      saveOrder();
    }
  }, [sessionId, cart, userData, dispatch]);

  return (
    <>
      {isItLoading && <LoadingScreen/>}
      <div className="min-h-screen flex flex-col items-center justify-center gap-y-4 bg-white px-2">
      <div className="flex justify-center">
        <div className="h-60">
          <img src={isItLoading? "https://shorturl.at/grmBV" : "https://shorturl.at/0J1Sc"}
            className="h-full w-full">
          </img>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">
        {!isItLoading? "Thank you for ordering!" : "Your order payment is processing"}
      </h2>
      <p className="text-gray-500 text-center mb-4">
      <b>Your Payment Accepted by ElectroMart.com </b><br />
      Now you can view your Orders or continue Shopping with us
      </p>
      <div className="flex items-center gap-y-5 md:gap-x-5 flex-col md:flex-row">
      <Link to="/orders">
        <button className="bg-white text-black w-52 h-12 rounded-full lg:text-base font-semibold border-2">
          VIEW ORDER
        </button>
      </Link>  
      <Link to="/">
        <button className="bg-blue-500 text-white  w-52 h-12 rounded-full lg:text-base font-semibold text-sm ">
          CONTINUE SHOPPING
        </button>
      </Link>
      </div>
      </div>
        
    </>
  );
};

export default Success;
