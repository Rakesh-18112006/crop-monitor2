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
    // Try to get user from localStorage first
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = { uid: firebaseUser.uid, ...userDoc.data() };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
        }
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔍 Debugging: Log user state
  console.log("User State in App:", user);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <AuthProvider>
      <Router>
        <ToastContainer autoClose={5000} />

        {/* ✅ Weather Alert for Farmers Only */}
        {user?.role === "farmer" && !localStorage.getItem("alertTriggered") && <WeatherAlert />}

        <Routes>
           <Route path="/register" element={<Register />} />
          <Route path="/" element={user ? <Navigate to={user.role === "farmer" ? "/farmer-dashboard" : "/buyer-dashboard"} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
  

          {/* 🔹 Farmer Routes (Protected) */}
          <Route path="/farmer-dashboard" element={<ProtectedRoute user={user} role="farmer"><FarmerDashboard /></ProtectedRoute>} />
          <Route path="/marketplace" element={<ProtectedRoute user={user} role="farmer"><Marketplace user={user} /></ProtectedRoute>} />
          <Route path="/daily-reports" element={<ProtectedRoute user={user} role="farmer"><DailyReports /></ProtectedRoute>} />
          <Route path="/weather" element={<ProtectedRoute user={user} role="farmer"><WeatherWidget /></ProtectedRoute>} />
          <Route path="/farmer-listings" element={<ProtectedRoute user={user} role="farmer"><FarmerListing /></ProtectedRoute>} />
          <Route path="/farmer-orders" element={<ProtectedRoute user={user} role="farmer"><FarmerOrders user={user} /></ProtectedRoute>} />
          <Route path="/chat/:productId/:farmerId/:buyerId" element={<ProtectedRoute user={user}><Chat /></ProtectedRoute>} />



          {/* 🔹 Buyer Routes (Protected) */}
          <Route path="/buyer-dashboard" element={<ProtectedRoute user={user} role="non-farmer"><BuyerDashboard user={user}  /></ProtectedRoute>} />
          <Route path="/buyer-marketplace" element={<ProtectedRoute user={user} role="non-farmer"><BuyerMarketplace user={user} /></ProtectedRoute>} />
          <Route path="/buyer-orders" element={<ProtectedRoute user={user} role="non-farmer"><BuyerOrders /></ProtectedRoute>} />


          {/* 🔹 Common Routes (Protected) */}
          <Route path="/profile" element={<ProtectedRoute user={user} ><Profile user={user}  /></ProtectedRoute>} />
          <Route path="/chat/:productId/:farmerId/:buyerId" element={<ProtectedRoute user={user}><Chat /></ProtectedRoute>} />

          {/* 🔹 404 Page */}
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
