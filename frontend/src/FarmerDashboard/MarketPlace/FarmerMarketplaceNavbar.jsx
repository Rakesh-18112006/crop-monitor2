import { Link } from "react-router-dom";

const FarmerMarketplaceNavbar = () => {
  return (
    <nav className="bg-green-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Farmer Marketplace</h1>
              <ul className="flex space-x-6">
                   <li>
            <Link to="/farmer-dashboard" className="text-white hover:text-gray-200">
              Dashoard
            </Link>
          </li>
          <li>
            <Link to="/marketplace" className="text-white hover:text-gray-200">
              Marketplace
            </Link>
          </li>
          <li>
            <Link to="/farmer-orders" className="text-white hover:text-gray-200">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/chat" className="text-white hover:text-gray-200">
              Chat
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default FarmerMarketplaceNavbar;
