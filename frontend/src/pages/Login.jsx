import React, { useState } from "react";
import { auth, googleProvider, db } from "../Firebase/FirebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      const user = userCredential.user;

      // Fetch user data to get their role
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.role === "farmer") {
          navigate("/farmer-dashboard"); // Navigate to Farmer's Dashboard
        } else if (userData.role === "non-farmer") {
          navigate("/buyer-dashboard"); // Navigate to Buyer's Dashboard
        }
      } else {
        console.error("User document does not exist in Firestore");
      }
      toast.success("Login Successful!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // After Google login, navigate to the respective dashboard
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.role === "farmer") {
          navigate("/farmer-dashboard"); // Navigate to Farmer's Dashboard
        } else if (userData.role === "non-farmer") {
          navigate("/buyer-dashboard"); // Navigate to Buyer's Dashboard
        }
      } else {
        console.error("Google user document does not exist in Firestore");
      }

      toast.success("Google Sign-In Successful!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
