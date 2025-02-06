import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BuyerMarketplaceNavbar from "./BuyerMarketplaceNavbar";

const BuyerMarketplace = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders/all")
      .then((res) => setOrders(res.data))
      .catch((error) => console.error("Error fetching orders:", error));

    axios.get("http://localhost:5000/api/products/all", {
      params: { userId: user.uid, role: user.role }
    })
    .then((res) => setProducts(res.data))
    .catch((error) => console.error("Error fetching products:", error));
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
      console.error("❌ Error placing order:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <BuyerMarketplaceNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Marketplace</h2>

        {/* Display products */}
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border shadow rounded p-4">
              <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover rounded mb-2" />
              <h3 className="text-xl">{product.name}</h3>
              <p>{product.description}</p>
              <p>₹{product.price}</p>
              <p>Category: {product.category}</p>
              <p>Location: {product.location}</p>

              {/* Chat with Seller */}
              <button
                onClick={() => navigate(`/chat/${product._id}/${product.sellerId}/${user.uid}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2 mr-2"
              >
                Chat with Seller
              </button>

              {/* Buy Now */}
              <button
                onClick={() => placeOrder(product._id, product.sellerId)}
                className="bg-green-500 text-white px-3 py-1 rounded mt-2"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>

        {/* Display orders */}
        <h2 className="text-2xl font-bold my-6">Your Orders</h2>
        <div className="grid grid-cols-3 gap-4">
          {orders
            .filter((order) => order.buyerId === user.uid)
            .map((order) => {
              const product = products.find((p) => p._id === order.productId);
              return (
                <div key={order._id} className="border p-4 shadow rounded">
                  <h3 className="text-xl">Order ID: {order._id}</h3>
                  <p>Status: {order.status}</p>
                  {product && (
                    <div>
                      <p>Product Name: {product.name}</p>
                      <p>Price: ₹{product.price}</p>
                      <p>Category: {product.category}</p>
                      <p>Location: {product.location}</p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default BuyerMarketplace;
