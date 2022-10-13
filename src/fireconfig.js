//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,Timestamp } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMCBXAVAhmWzgw6zsfB8k6QFCZlY_oAW4",
  authDomain: "testfire-dccae.firebaseapp.com",
  databaseURL: "https://testfire-dccae-default-rtdb.firebaseio.com",
  projectId: "testfire-dccae",
  storageBucket: "testfire-dccae.appspot.com",
  messagingSenderId: "984828777999",
  appId: "1:984828777999:web:f2fb726aed100966e4f57a",
  measurementId: "G-LSSRWMZSZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app)
