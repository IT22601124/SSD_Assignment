// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA388h-6j6bKj4TpJMZqYy6rDuCWgsLVGs",
  authDomain: "natura-e7e71.firebaseapp.com",
  projectId: "natura-e7e71",
  storageBucket: "natura-e7e71.appspot.com",
  messagingSenderId: "81336958322",
  appId: "1:81336958322:web:50a9c3798839dc5e12f1eb",
  measurementId: "G-QPJE52JN7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

