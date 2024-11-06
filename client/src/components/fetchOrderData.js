import { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import useFetchUserData from "./fetchUser";
import { useDispatch } from "react-redux";
import { setLoading } from "../features/genaralSlice";


const useFetchOrderData = () => {
  const userInfo = useFetchUserData();  // Get user info
  
  const dispatch = useDispatch();
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      dispatch(setLoading(true));

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
        dispatch(setLoading(false));
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


