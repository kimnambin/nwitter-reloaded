// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

//스토리지 
export const storage = getStorage(app);

//데이터베이스
export const db = getFirestore(app);