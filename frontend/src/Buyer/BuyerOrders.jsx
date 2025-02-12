import React, { useState, useEffect } from "react";
import axios from "axios";
import BuyerMarketplaceNavbar from "./BuyerMarketplaceNavbar";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders/all")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <>
    <BuyerMarketplaceNavbar />
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Your Orders</h2>
        <div className="grid gap-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div 
                key={order._id} 
                className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500"
              >
                <p className="text-lg font-semibold text-gray-800">Product: {order.productId.name}</p>
                <p className={`text-sm font-medium ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>Status: {order.status}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No orders found.</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default BuyerOrders;