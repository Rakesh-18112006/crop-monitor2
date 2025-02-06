const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  buyerId: { type: String, required: true }, // Firebase UID
  farmerId: { type: String, required: true }, // Firebase UID
  status: { type: String, default: "pending" },
  paymentId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
