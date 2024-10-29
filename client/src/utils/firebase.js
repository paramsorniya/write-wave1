// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "write-wave-42f3e.firebaseapp.com",
  projectId: "write-wave-42f3e",
  storageBucket: "write-wave-42f3e.appspot.com",
  messagingSenderId: "255429096294",
  appId: "1:255429096294:web:685d798e95ede5c55bcea7",
  measurementId: "G-PCZ7MNE51Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;