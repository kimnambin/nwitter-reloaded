// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl6ICR644wF8HPFydQkjHlSwOc9EPnB4s",
  authDomain: "nwitter-reloaded-1ba8f.firebaseapp.com",
  projectId: "nwitter-reloaded-1ba8f",
  storageBucket: "nwitter-reloaded-1ba8f.appspot.com",
  messagingSenderId: "193040058819",
  appId: "1:193040058819:web:23ac4fab9ceb548fdb1576"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 사용자 인증
export const auth = getAuth(app); 