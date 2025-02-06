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

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({ uid: firebaseUser.uid, ...userDoc.data() });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading screen while waiting for user data

  return (
    <AuthProvider>
      <Router>
        <ToastContainer autoClose={5000} />
        {user && !localStorage.getItem("alertTriggered") && <WeatherAlert />}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Farmer Routes */}
          <Route
            path="/farmer-dashboard"
            element={
              user?.role === "farmer" ? (
                <ProtectedRoute>
                  <FarmerDashboard user={user} />
                </ProtectedRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/marketplace"
            element={
              user?.role === "farmer" ? (
                <ProtectedRoute>
                  <Marketplace user={user} />
                </ProtectedRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/daily-reports"
            element={
              user?.role === "farmer" ? (
                <ProtectedRoute>
                  <DailyReports />
                </ProtectedRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/weather"
            element={
              user?.role === "farmer" ? (
                <ProtectedRoute>
                  <WeatherWidget user={user} />
                </ProtectedRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/chat"
            element={
              user?.role === "farmer" ? (
                <ProtectedRoute>
                  <Chat user={user} />
                </ProtectedRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/farmer-orders"
            element={
              user?.role === "farmer" ? (
                <ProtectedRoute>
                  <FarmerOrders user={user} />
                </ProtectedRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Buyer Routes */}
          <Route
            path="/buyer-dashboard"
            element={
              user?.role === "non-farmer" ? (
                <ProtectedRoute>
                  <BuyerDashboard user={user} />
                </ProtectedRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/buyer-marketplace"
            element={    
                <ProtectedRoute>
                  <BuyerMarketplace user={user} />
                </ProtectedRoute>
            }
          />
          <Route
            path="/buyer-orders"
            element={    
                <ProtectedRoute>
                  <BuyerOrders user={user} />
                </ProtectedRoute>
            }
          />


          {/* Common Routes */}
          {/* This will be accessible by both farmer and buyer, if authenticated */}
          <Route path="/profile" element={<ProtectedRoute><Profile user={user} /></ProtectedRoute>} />
          <Route path="/chat/:productId/:farmerId/:buyerId" element={<ProtectedRoute><Chat user={user} /></ProtectedRoute>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
