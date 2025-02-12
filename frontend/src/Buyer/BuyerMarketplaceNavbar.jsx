import React from "react";
import { Link } from "react-router-dom";

const BuyerMarketplaceNavbar = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/buyer-marketplace" className="hover:text-green-500">Market</Link>
            </li>
            <li>
              <Link to="/buyer-orders" className="hover:text-green-500">Orders</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-green-500">Profile</Link>
            </li>
            <li>
              <Link to="/buyer-dashboard" className="hover:text-green-500">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BuyerMarketplaceNavbar;
