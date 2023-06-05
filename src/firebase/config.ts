// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyXPu-7aeOO83gjI49ck3l3Gv0JaQzFjc",
  authDomain: "image-gallery-app-ba3c5.firebaseapp.com",
  projectId: "image-gallery-app-ba3c5",
  storageBucket: "image-gallery-app-ba3c5.appspot.com",
  messagingSenderId: "381696791717",
  appId: "1:381696791717:web:50a3c0968cec7d987f694c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };