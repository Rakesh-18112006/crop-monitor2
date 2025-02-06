import React, { useState, useEffect } from "react";
import axios from "axios";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders/all")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      <div>
        {orders.map((order) => (
          <div key={order._id}>
            <p>Product: {order.productId.name}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerOrders;