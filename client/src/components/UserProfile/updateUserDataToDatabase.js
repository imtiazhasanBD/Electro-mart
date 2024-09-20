import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";

// Function to update user data
export const updateUserDataToDatabase = async (newUserData) => {
    const {uid} = auth.currentUser;
  try {
    // Reference to the user document
    const userRef = doc(db, "Users", uid);

    // Update only the specified fields
    await updateDoc(userRef, newUserData);
    toast.success("User data updated successfully");
  } catch (error) {
    console.error("Error updating user data: ", error);
  }
};


