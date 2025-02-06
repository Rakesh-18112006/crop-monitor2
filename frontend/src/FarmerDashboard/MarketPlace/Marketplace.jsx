import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Package, Tag, MapPin, IndianRupee } from "lucide-react"; // Icons
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
    axios
      .get("http://localhost:5000/api/products/all", {
        params: {
          userId: user.uid,
          role: user.role,
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
      window.location.reload();
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <>
      <FarmerMarketplaceNavbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🌾 Farmer's Marketplace
        </h2>

        {user?.role === "farmer" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Upload Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 col-span-2"
              />
              <input
                type="file"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500 col-span-2"
              />
              <button
                onClick={uploadProduct}
                className="bg-green-600 text-white flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-green-700 transition col-span-2"
              >
                <Upload size={20} /> Upload
              </button>
            </div>
          </div>
        )}

        {/* Product Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <p className="text-center text-gray-600 col-span-3">No products found. Please add a product.</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <div className="mt-3 flex items-center justify-between text-gray-700">
                  <span className="flex items-center gap-1">
                    <IndianRupee size={16} /> <span className="font-semibold">{product.price}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag size={16} /> {product.category}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-gray-500">
                  <MapPin size={16} /> {product.location}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Marketplace;
