import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaClipboardList, FaComments } from "react-icons/fa";

const FarmerMarketplaceNavbar = () => {
  return (
    <nav className="bg-green-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold flex items-center">
          <span className="mr-2">🌾</span>
          Farmer Marketplace
        </h1>
        <ul className="flex space-x-8">
          <li>
            <Link to="/farmer-dashboard" className="text-white hover:text-gray-200 flex items-center">
              <FaHome className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/marketplace" className="text-white hover:text-gray-200 flex items-center">
              <FaShoppingCart className="mr-2" />
              Marketplace
            </Link>
          </li>
          <li>
            <Link to="/farmer-orders" className="text-white hover:text-gray-200 flex items-center">
              <FaClipboardList className="mr-2" />
              Orders
            </Link>
          </li>
          <li>
            <Link to="/farmer-listings" className="text-white hover:text-gray-200 flex items-center">
              <FaComments className="mr-2" />
              Listings
            </Link>
          </li>
          <li>
            <Link to="/chat" className="text-white hover:text-gray-200 flex items-center">
              <FaComments className="mr-2" />
              Chat
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default FarmerMarketplaceNavbar;