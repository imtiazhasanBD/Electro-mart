import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { auth, db } from "../components/firebase";
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { toast } from "react-toastify";  // If you are using toast for notifications
import LoadingScreen from '../components/LoadingScreen';

const Success = () => {
  const { state, dispatch } = useContext(ProductsContext);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");

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
    if (sessionId && state.cartProducts.length > 0 && userData) {
      const saveOrder = async () => {
        try {
          dispatch({ type: "SET_LOADING", payload: true });

          const orderRef = doc(db, "orders", userData.email);
          const docSnap = await getDoc(orderRef);

          if (docSnap.exists()) {
            // Update existing order if needed
            await updateDoc(orderRef, {
              orders: arrayUnion({
                userEmail: userData?.email,
                paymentId: sessionId,
                orderItems: state.cartProducts,
                paymentMethod: "stripe",
                userId: userData?.uid,
              }),
            });
          } else {
            // Create a new order document
            await setDoc(orderRef, {
              orders: [
                {
                  userEmail: userData?.email,
                  paymentId: sessionId,
                  orderItems: state.cartProducts,
                  paymentMethod: "stripe",
                },
              ],
            });
          }
          toast.success("Order saved successfully!");
          dispatch({ type: "CLEAR_CART" });
        } catch (error) {
          toast.error("Error saving order data");
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      };
      saveOrder();
    }
  }, [sessionId, state.cartProducts, userData, dispatch]);

  return (
    <>
      {state.isLoading && <LoadingScreen/>}
      <div className="min-h-[570px] flex flex-col items-center justify-center gap-y-4 bg-white px-2">
      <div className="flex justify-center">
        <div className="h-60">
          <img src={state.isLoading? "https://shorturl.at/grmBV" : "https://shorturl.at/0J1Sc"}
            className="h-full w-full">
          </img>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">
        {!state.isLoading? "Thank you for ordering!" : "Your order payment is processing"}
      </h2>
      <p className="text-gray-500 text-center mb-4">
      <b>Your Payment Accepted by ElectroMart.com </b><br />
      Now you can view your Orders or continue Shopping with us
      </p>
      <div className="flex items-center gap-x-5">
        <button className="bg-white text-black lg:w-52 lg:h-12 rounded-full lg:text-base font-semibold border-2">
          VIEW ORDER
        </button>
        <button className="bg-blue-500 text-white  lg:w-52 lg:h-12 rounded-full lg:text-base font-semibold">
          CONTINUE SHOPPING
        </button>
      </div>
      </div>
        
    </>
  );
};

export default Success;
