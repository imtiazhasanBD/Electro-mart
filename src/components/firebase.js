// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmTJSyDUGLj8YswClhX2IawXQn6riJEjA",
  authDomain: "my-ecommerce-1c0c8.firebaseapp.com",
  projectId: "my-ecommerce-1c0c8",
  storageBucket: "my-ecommerce-1c0c8.appspot.com",
  messagingSenderId: "751017134021",
  appId: "1:751017134021:web:816537ffee369ce375adac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;

export const storage = getStorage(app);