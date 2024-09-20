import { useContext, useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ProductsContext } from "../context/ProductsContext";

const useFetchUserData = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { state, dispatch } = useContext(ProductsContext);
  
  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // Real-time listener for user data changes
          const userDocRef = doc(db, "Users", user.uid);
          const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
              setUserInfo(docSnap.data());
              dispatch({ type: "SET_AVATAR", payload: docSnap.data().avatar });
            } else {
              console.log("No such document!");
            }
          });
          
          return () => unsubscribe(); // Cleanup listener on unmount
        }
      });
    };

    fetchUserData();
  }, []);

  return userInfo;
};

export default useFetchUserData;
