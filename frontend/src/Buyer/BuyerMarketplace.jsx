import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BuyerMarketplaceNavbar from "./BuyerMarketplaceNavbar";

const BuyerMarketplace = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/orders/all"),
          axios.get("http://localhost:5000/api/products/all", {
            params: { userId: user.uid, role: user.role },
          }),
        ]);
        setOrders(ordersRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const placeOrder = async (productId, sellerId) => {
    try {
      await axios.post("http://localhost:5000/api/orders/place", {
        productId,
        buyerId: user.uid,
        farmerId: sellerId,
      });
      alert("✅ Order placed successfully!");
      window.location.reload();
    } catch (error) {
      alert("❌ Failed to place order. Please try again.");
      console.error("Error placing order:", error.response?.data || error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-2xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <>
      <BuyerMarketplaceNavbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Marketplace Heading */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Marketplace</h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                <p className="text-lg font-bold text-green-600 mt-2">₹{product.price}</p>
                <p className="text-gray-500 text-sm">Category: {product.category}</p>
                <p className="text-gray-500 text-sm">Location: {product.location}</p>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => navigate(`/chat/${product._id}/${product.sellerId}/${user.uid}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => placeOrder(product._id, product.sellerId)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Orders Section */}
          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6">Your Orders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {orders
              .filter((order) => order.buyerId === user.uid)
              .map((order) => {
                const product = products.find((p) => p._id === order.productId);
                return (
                  <div
                    key={order._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">Order ID: {order._id}</h3>
                    <p className="text-gray-600 text-sm mt-2">Status: {order.status}</p>
                    {product && (
                      <div className="mt-4">
                        <p className="text-gray-800">Product: {product.name}</p>
                        <p className="text-gray-600">Price: ₹{product.price}</p>
                        <p className="text-gray-500 text-sm">Category: {product.category}</p>
                        <p className="text-gray-500 text-sm">Location: {product.location}</p>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerMarketplace;