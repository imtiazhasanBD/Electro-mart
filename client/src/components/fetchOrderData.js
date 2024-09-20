import { useContext, useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ProductsContext } from "../context/ProductsContext";
import { toast } from "react-toastify";
import useFetchUserData from "./fetchUser";


const useFetchOrderData = () => {
  const userInfo = useFetchUserData();  // Get user info
  const { state, dispatch } = useContext(ProductsContext);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        if (userInfo?.email) {  
          const docRef = doc(db, "orders", userInfo.email);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const orderData = docSnap.data().orders || []; 
            setOrderItems(orderData);
          } else {
            toast.info("No orders found for this user.");
          }
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    if (userInfo) {
      fetchOrderData();
    }
  }, [userInfo, dispatch]);

  return orderItems //.sort((a, b) => b.createdAt - a.createdAt);
  ;
}

export default useFetchOrderData


