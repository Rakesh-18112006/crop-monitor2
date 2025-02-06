import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaChartLine, FaCloudSunRain, FaRobot,FaCalculator } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-green-600 p-4 shadow-lg">
      <ul className="flex justify-start space-x-8">
        <li>
          <Link to="/profile" className="text-white hover:text-blue-400 flex flex-col items-center">
            <FaUser className="text-2xl mb-1" />
            <span className="text-sm">Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/marketplace" className="text-white hover:text-blue-400 flex flex-col items-center">
            <FaShoppingCart className="text-2xl mb-1" />
            <span className="text-sm">Marketplace</span>
          </Link>
        </li>
        <li>
          <Link to="/daily-reports" className="text-white hover:text-blue-400 flex flex-col items-center">
            <FaChartLine className="text-2xl mb-1" />
            <span className="text-sm">AI Tools</span>
          </Link>
        </li>
        <li>
          <Link to="/weather" className="text-white hover:text-blue-400 flex flex-col items-center">
            <FaCloudSunRain className="text-2xl mb-1" />
            <span className="text-sm">Weather</span>
          </Link>
        </li>
        <li>
          <Link to="/farmer-dashboard" className="text-white hover:text-blue-400 flex flex-col items-center">
            <FaRobot className="text-2xl mb-1" />
            <span className="text-sm">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="https://koyeb-frontend.vercel.app/" className="text-white hover:text-blue-400 flex flex-col items-center">
            <FaCalculator className="text-2xl mb-1" />
            <span className="text-sm">Calculator</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
