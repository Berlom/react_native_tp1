// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbpTdFSWxL3a6s7HTDZ-Q8GKBxOSWMeOE",
  authDomain: "test-8d280.firebaseapp.com",
  databaseURL: "https://test-8d280-default-rtdb.firebaseio.com",
  projectId: "test-8d280",
  storageBucket: "test-8d280.appspot.com",
  messagingSenderId: "475370571189",
  appId: "1:475370571189:web:e85084be882fabb718c5fc",
  measurementId: "G-1JB5N1JE13",
};

// Initialize Firebase
const initFirebase = app.initializeApp(firebaseConfig);
export default initFirebase;
