import React, { useState } from "react";
import { auth, db, googleProvider } from "../Firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiArrowRight, FiChevronDown } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "farmer",
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: userData.username });
      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        username: userData.username,
        role: userData.role,
        email: userData.email,
        createdAt: new Date().toISOString(),
      });

      toast.success("Registration successful! Please verify your email.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName,
        role: "non-farmer",
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      toast.success("Google Sign-In Successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-black/60"
          style={{
            backgroundImage: "url('register-image3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg z-10 transform transition-all duration-300 hover:shadow-2xl">
        <div className="p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-500">Join our community today</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-4">
              {/* Username Input */}
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Role Selection */}
              <div className="relative">
                <div className="flex items-center">
                  <select
                    name="role"
                    onChange={handleChange}
                    className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="farmer">Farmer</option>
                    <option value="non-farmer">Non-Farmer</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>Register</span>
                  <FiArrowRight className="ml-2 animate-bounce-horizontal" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all duration-300 cursor-pointer"
          >
            {googleLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            ) : (
              <>
                <FcGoogle className="text-xl" />
                <span>Sign in with Google</span>
              </>
            )}
          </button>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
