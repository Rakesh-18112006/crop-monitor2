import React, { useState, useEffect } from "react";
import axios from "axios";
import FarmerMarketplaceNavbar from "./FarmerMarketplaceNavbar";

const FarmerOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders/all")
      .then((res) => {
        // ✅ Filter orders where the sellerId of the product matches the logged-in farmer's uid
        const farmerOrders = res.data.filter(order => order.farmerId === user.uid);
        setOrders(farmerOrders);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, [user]);

  return (
    <>
      <FarmerMarketplaceNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Orders on Your Products</h2>

        <div className="grid grid-cols-3 gap-4">
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="border p-4 shadow rounded">
                <h3 className="text-xl">Order ID: {order._id}</h3>
                <p>Status: {order.status}</p>
                
                {/* Show buyer details */}
                <p>Buyer: {order.buyerId}</p>

                {/* Product Details */}
                <p>Product: {order.productId.name}</p>
                <p>Price: ₹{order.productId.price}</p>
                <p>Category: {order.productId.category}</p>
                <p>Location: {order.productId.location}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default FarmerOrders;
