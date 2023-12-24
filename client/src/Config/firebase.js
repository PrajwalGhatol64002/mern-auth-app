// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-auth-d2d70.firebaseapp.com",
  projectId: "mern-auth-d2d70",
  storageBucket: "mern-auth-d2d70.appspot.com",
  messagingSenderId: "6182292208",
  appId: "1:6182292208:web:4e4b69704275d16617d035",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
