const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, sellerId, location } = req.body;

    if (!name || !price || !category || !sellerId || !location) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
      category,
      sellerId,
      location,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

// Get all products (filtered by seller for farmers, or all products for buyers)
exports.getAllProducts = async (req, res) => {
  try {
    const { userId, role } = req.query;

    let products;
    if (role === "farmer") {
      products = await Product.find({ sellerId: userId });
    } else if (role === "non-farmer") {
      products = await Product.find({ sellerId: { $ne: userId } });
    } else {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
