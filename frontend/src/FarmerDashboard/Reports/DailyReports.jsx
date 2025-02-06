import React from "react";
import { motion } from "framer-motion";

const mlProjects = [
  {
    id: 1,
    title: "Crop Disease Detection",
    description: "An AI model to identify crop diseases from images.",
    image: "https://source.unsplash.com/300x200/?farm,plant",
    link: "https://crop-ram.onrender.com", // Your friend's ML project link
  },
  {
    id: 2,
    title: "Yield Prediction",
    description: "Predicts crop yield based on climate and soil data.",
    image: "https://source.unsplash.com/300x200/?agriculture,data",
    link: "#",
  },
  {
    id: 3,
    title: "Automated Irrigation System",
    description: "ML-based irrigation system optimizing water usage.",
    image: "https://source.unsplash.com/300x200/?water,farm",
    link: "#",
  },
];

const DailyReports = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Heading */}
      <motion.h2 
        className="text-2xl font-bold text-green-700 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Daily Reports - ML Projects
      </motion.h2>
      <p className="text-gray-600 mb-8">Explore my friend's Machine Learning projects.</p>

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
              View Project
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DailyReports;
