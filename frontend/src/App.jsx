import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { AuthProvider } from "./context/AuthContext";
import { auth, db } from "./Firebase/FirebaseConfig";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FarmerDashboard from "./FarmerDashboard/FarmerDashboard";
import Profile from "./FarmerDashboard/Profile";
import DailyReports from "./FarmerDashboard/Reports/DailyReports";
import Marketplace from "./FarmerDashboard/MarketPlace/Marketplace";
import WeatherWidget from "./FarmerDashboard/Weather/WeatherWidget";
import WeatherAlert from "./FarmerDashboard/Weather/WeatherAlert";
import ProtectedRoute from "./components/ProtectedRoute";
import Chatbot from "./chatbot/Chatbot";
import BuyerDashboard from "./Buyer/BuyerDashBoard"; 
import BuyerMarketplace from "./Buyer/BuyerMarketplace";
import FarmerOrders from "./FarmerDashboard/MarketPlace/FarmerOrders";
import BuyerOrders from "./Buyer/BuyerOrders";
import Chat from "./components/Chat";
import FarmerListing from "./FarmerDashboard/MarketPlace/FarmerListing";

import Notfound from "./Notfound/Notfound";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = { uid: firebaseUser.uid, ...userDoc.data() };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
        }
      } else {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Get user data from localStorage if available
        }
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Redirect to login page if not logged in
  if (loading) return <p>Loading...</p>;

  const renderRoute = (role, component) => {
    return user?.role === role ? (
      <ProtectedRoute>{component}</ProtectedRoute>
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <AuthProvider>
      <Router>
        <ToastContainer autoClose={5000} />
        {user && !localStorage.getItem("alertTriggered") && <WeatherAlert />}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Farmer Routes */}
          <Route path="/farmer-dashboard" element={renderRoute("farmer", <FarmerDashboard user={user} />)} />
          <Route path="/marketplace" element={renderRoute("farmer", <Marketplace user={user} />)} />
          <Route path="/daily-reports" element={renderRoute("farmer", <DailyReports />)} />
          <Route path="/weather" element={renderRoute("farmer", <WeatherWidget user={user} />)} />
          <Route path="/chat" element={renderRoute("farmer", <Chat user={user} />)} />
          <Route path="/farmer-listings" element={renderRoute("farmer", <FarmerListing user={user} />)} />
          <Route path="/farmer-orders" element={renderRoute("farmer", <FarmerOrders user={user} />)} />

          {/* Buyer Routes */}
          <Route path="/buyer-dashboard" element={renderRoute("non-farmer", <BuyerDashboard user={user} />)} />
          <Route path="/buyer-marketplace" element={<ProtectedRoute><BuyerMarketplace user={user} /></ProtectedRoute>} />
          <Route path="/buyer-orders" element={<ProtectedRoute><BuyerOrders user={user} /></ProtectedRoute>} />

          {/* Common Routes */}
          <Route path="/profile" element={<ProtectedRoute><Profile user={user} /></ProtectedRoute>} />
          <Route path="/chat/:productId/:farmerId/:buyerId" element={<ProtectedRoute><Chat user={user} /></ProtectedRoute>} />

          {/* 🔹 Catch All Unmatched Routes */}
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
