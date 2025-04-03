import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5sUSQjJWhT6tNzf7lnzzjMZTM-_C_D_o",
  authDomain: "verdialdatabase.firebaseapp.com",
  projectId: "verdialdatabase",
  storageBucket: "verdialdatabase.firebasestorage.app",
  messagingSenderId: "1072432603009",
  appId: "1:1072432603009:web:5efb26653ce4344f561280",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, doc, getDoc };
