import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAF2E3sGdeBJQ4xuWLunzfJ0waGCfNwsI0",
  authDomain: "ferreteria-265b8.firebaseapp.com",
  projectId: "ferreteria-265b8",
  storageBucket: "ferreteria-265b8.firebasestorage.app",
  messagingSenderId: "92605534371",
  appId: "1:92605534371:web:7749996d3adf2ffcc22f16",
  measurementId: "G-C9ND2STRED"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;