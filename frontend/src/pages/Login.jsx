import React, { useState } from "react";
import { auth, googleProvider, db } from "../Firebase/FirebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa"; // Google Icon
import { FiLock, FiMail, FiArrowRight, FiChevronDown } from "react-icons/fi"; // Added icons

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [loading, setLoading] = useState(false); // For showing loading spinner
  const [googleLoading, setGoogleLoading] = useState(false); // For Google login spinner
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
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
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("login-image2.jpg")' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      <div className="flex pl-36 items-center min-h-screen relative z-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-2">Login</h2>
          <p className="text-center text-gray-500">Welcome back, please log in</p>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Login</span>
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

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all duration-300"
          >
            {googleLoading ? (
              <div className="w-6 h-6 border-t-2 border-b-2 border-green-600 rounded-full animate-spin"></div>
            ) : (
              <>
                <FaGoogle className="text-xl" />
                <span>Sign in with Google</span>
              </>
            )}
          </button>

          {/* Signup Link */}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
