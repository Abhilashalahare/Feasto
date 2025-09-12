// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "feasto-food-delivery.firebaseapp.com",
  projectId: "feasto-food-delivery",
  storageBucket: "feasto-food-delivery.firebasestorage.app",
  messagingSenderId: "294334599929",
  appId: "1:294334599929:web:79660b9dc9be6069a64828"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export {app, auth}