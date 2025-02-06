import React, { useState, useEffect } from "react";
import axios from "axios";
import FarmerMarketplaceNavbar from "./FarmerMarketplaceNavbar";

const Marketplace = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    category: "",
    location: "",
  });

  useEffect(() => {
    // Get products from the server, passing userId and role as query parameters
    axios
      .get("http://localhost:5000/api/products/all", {
        params: {
          userId: user.uid,
          role: user.role, // 'farmer' or 'buyer'
        },
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, [user]);

  const uploadProduct = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("location", form.location);
    formData.append("image", form.image);
    formData.append("sellerId", user.uid);

    try {
      await axios.post("http://localhost:5000/api/products/add", formData);
      window.location.reload(); // Refresh to display new product
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <>
      <FarmerMarketplaceNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Marketplace</h2>

        {user && user.role === "farmer" && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mb-2 p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mb-2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="mb-2 p-2 border rounded"
            />
            <input
              type="file"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              className="mb-2"
            />
            <button
              onClick={uploadProduct}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Upload
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          {products.length === 0 ? (
            <p>No products found. Please add a product.</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className="bg-white p-4 shadow rounded">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded"
                />
                <h3 className="text-xl">{product.name}</h3>
                <p>{product.description}</p>
                <p>₹{product.price}</p>
                <p>Category: {product.category}</p>
                <p>Location: {product.location}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Marketplace;
