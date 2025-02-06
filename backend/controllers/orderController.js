const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

exports.placeOrder = async (req, res) => {
  try {
    const { productId, buyerId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid productId format" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newOrder = new Order({
      productId: productId,
      buyerId: buyerId, // Keep buyerId as string (Firebase UID)
      farmerId: product.sellerId, // Store sellerId as farmerId in order
    });

    await newOrder.save();
    res.status(201).json({ message: "✅ Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
};

// Get all orders with product & buyer details
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("productId", "name price category location") // Fetch product details
      .populate("buyerId", "username email") // Fetch buyer details
      .populate("farmerId", "username email"); // Fetch farmer details

    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
