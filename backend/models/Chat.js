const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  buyerId: { type: String, required: true },  // ✅ Store Firebase UID as a string
  farmerId: { type: String, required: true }, // ✅ Store Firebase UID as a string
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // ✅ Keep productId as ObjectId if stored as one
  messages: [
    {
      senderId: { type: String, required: true },  // ✅ Firebase UID is a string
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);
