// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiPtW-YsR65eU6zSl72FNNvi0tfoF91DM",
  authDomain: "crop-monitor2.firebaseapp.com",
  projectId: "crop-monitor2",
  storageBucket: "crop-monitor2.firebasestorage.app",
  messagingSenderId: "553856553724",
  appId: "1:553856553724:web:c73af474e7c2518dc27d79",
  measurementId: "G-DG34234EFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

// ✅ Fix signOut function
export const signOutUser = () => signOut(auth);
