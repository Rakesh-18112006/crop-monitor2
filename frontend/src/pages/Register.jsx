import React, { useState } from "react";
import { auth, db, googleProvider } from "../Firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // For navigation

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "farmer",
  });

  const navigate = useNavigate(); // Navigate after successful registration

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: userData.username });
      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        username: userData.username,
        role: userData.role,
        email: userData.email,
      });

      toast.success("Registration successful! Please verify your email.");
      // Redirect to login page after registration
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName,
        role: "non-farmer", // Default role for Google users
        email: user.email,
      });

      toast.success("Google Sign-In Successful!");
      navigate("/login"); // Redirect to login after Google registration
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="farmer">Farmer</option>
          <option value="non-farmer">Non-Farmer</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Register;
