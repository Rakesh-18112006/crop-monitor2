import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";

const mlProjects = [
  {
    id: 1,
    title: "Crop Disease Detection",
    description: "An AI model to identify crop diseases from images.",
    image: "1.jpg",
    link: "https://crop-ram.onrender.com", // Your friend's ML project link
  },
  {
    id: 2,
    title: "Crop Prediction",
    description: "Predicts crop yield based on climate and soil data.",
    image: "2.jpg",
    link: "https://cropp-o2vy.onrender.com/",
  },
  {
    id: 3,
    title: "Fertizer Prediction",
    description: "ML-based Fertilizer Prediction for farmers",
    image: "3.jpg",
    link: "https://fertile.onrender.com/",
  },
];

const DailyReports = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Heading */}
      <motion.h2 
        className="text-3xl font-bold text-blue-700 mb-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome To Kissan Predictions
      </motion.h2>
      <p className="text-gray-600 mb-8 ">Explore These Tools.</p>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mlProjects.map((project) => (
          <motion.div 
            key={project.id} 
            className="bg-white shadow-lg rounded-lg p-4 w-80 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-3">{project.title}</h3>
            <p className="text-gray-600 mt-2">{project.description}</p>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Detect Now
            </a>
          </motion.div>
        ))}
      </div>
      </div>
      </>
  );
};

export default DailyReports;
