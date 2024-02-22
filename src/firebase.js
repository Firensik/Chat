import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQngPkkml60o6S87HzpLBwQ-AQH07Yhmg",
  authDomain: "chat-56117.firebaseapp.com",
  projectId: "chat-56117",
  storageBucket: "chat-56117.appspot.com",
  messagingSenderId: "671218248831",
  appId: "1:671218248831:web:3d634b1de80142b5e3634a",
  measurementId: "G-M8KTZPK21H",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
