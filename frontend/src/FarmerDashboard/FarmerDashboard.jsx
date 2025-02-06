import React, { useState } from "react";
import { FaCommentDots, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion"; // For animations
import Chatbot from "../chatbot/Chatbot";
import Navbar from "../components/Navbar";

const FarmerDashboard = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="text-center py-6">
        <h1 className="text-4xl font-bold text-green-700">Welcome, Farmer!</h1>
        <p className="text-gray-600">Manage your farm, track sales, and stay updated.</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-white shadow-lg rounded-2xl">
          <FaShoppingCart className="text-green-500 text-3xl mb-2" />
          <h2 className="text-lg font-semibold">Pending Orders</h2>
          <p>3 Orders</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-white shadow-lg rounded-2xl">
          <FaChartLine className="text-yellow-500 text-3xl mb-2" />
          <h2 className="text-lg font-semibold">Market Trends</h2>
          <p>Rice +5% | Wheat -2%</p>
        </motion.div>
      </div>

      {/* Chatbot Toggle */}
      <div className="fixed bottom-8 right-8 cursor-pointer" onClick={() => setIsChatbotOpen(!isChatbotOpen)}>
        <div className="bg-blue-500 p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
          <FaCommentDots className="text-white text-2xl" />
        </div>
      </div>

      {/* Chatbot Component */}
      <div
        className={`fixed bottom-10 right-24 transition-all duration-500 ease-in-out ${
          isChatbotOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Chatbot />
      </div>
      </div>
      </>
  );
};

export default FarmerDashboard;
