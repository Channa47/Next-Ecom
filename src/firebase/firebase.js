// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 👉 import getAuth (important!)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjpP89s1C9b7AilJfL8oklQJWbqR6jswE",
  authDomain: "nextapp-f524f.firebaseapp.com",
  projectId: "nextapp-f524f",
  storageBucket: "nextapp-f524f.appspot.com", // 👉 (also small typo corrected here: storageBucket)
  messagingSenderId: "22252656740",
  appId: "1:22252656740:web:c65add21965fe227c0a771",
  measurementId: "G-BFBL53080P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // 👉 Initialize auth
// const analytics = getAnalytics(app);

export { auth }; // 👉 Export auth (not analytics)
