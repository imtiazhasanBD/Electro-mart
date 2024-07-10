import { useContext, useEffect, useState } from 'react';
import { auth, db } from '../components/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ProductsContext } from '../context/ProductsContext';

const useFetchUserData = (defaultValue = true) => {
  const { state, dispatch } = useContext(ProductsContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setUserInfo(docSnap.data());
            dispatch({ type: "SET_AVATAR", payload: docSnap.data().avatar });
          } else {
            console.log("No such document!");
          }
        } else if (defaultValue) {
          console.log("User is not logged in");
        }
      });
    };

    fetchUserData();
  }, [dispatch]);

  return userInfo;
};

export default useFetchUserData;
