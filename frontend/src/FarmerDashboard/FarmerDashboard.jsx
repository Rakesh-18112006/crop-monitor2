import React, { useState } from "react";
import { FaCommentDots, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion"; // For animations
import Chatbot from "../chatbot/Chatbot";
import Navbar from "../components/Navbar";

const FarmerDashboard = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      {/* Navbar Fixed on Top (Above Background & Overlay) */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Background Section with Overlay */}
      <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("morning.jpg")' }}>
        {/* Black Shadow Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        {/* Hero Section */}
        <div className="relative text-center py-16 z-20">
          <h1 className="text-5xl font-extrabold text-yellow-500 font-sans">Welcome, Farmer!</h1>
          <p className="text-lg text-gray-300">Manage your farm, track sales, and stay updated.</p>
        </div>

        {/* Dashboard Cards */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-16 z-20">
          {/* First Card */}
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition duration-300">
            <FaShoppingCart className="text-green-500 text-4xl mb-4" />
            <h2 className="text-xl font-semibold">Pending Orders</h2>
            <p>3 Orders</p>
          </motion.div>

          {/* Second Card */}
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition duration-300">
            <FaChartLine className="text-yellow-500 text-4xl mb-4" />
            <h2 className="text-xl font-semibold">Market Trends</h2>
            <p>Rice +5% | Wheat -2%</p>
          </motion.div>
        </div>

        {/* Chatbot Toggle */}
        <div className="fixed bottom-8 right-8 cursor-pointer z-30" onClick={() => setIsChatbotOpen(!isChatbotOpen)}>
          <div className="bg-blue-500 p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
            <FaCommentDots className="text-white text-2xl" />
          </div>
        </div>

        {/* Chatbot Component */}
        <div
          className={`fixed bottom-10 right-24 transition-all duration-500 ease-in-out ${
            isChatbotOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } z-30`}
        >
          <Chatbot />
        </div>
      </div>
    </>
  );
};

export default FarmerDashboard;
