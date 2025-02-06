import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-200 p-3">
      <ul className="flex space-x-4">
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/marketplace">Marketplace</Link></li>
        <li><Link to="/daily-reports">Daily Reports</Link></li>
        <li><Link to="/weather">WeatherWidget</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
