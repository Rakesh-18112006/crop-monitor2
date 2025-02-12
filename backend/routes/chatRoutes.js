const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Chat = require("../models/Chat");

// ✅ Send a message (Create chat if not exists)
router.post("/send", async (req, res) => {
  try {
    let { buyerId, farmerId, productId, senderId, message } = req.body;

    console.log("🔹 Incoming Message:", req.body);

    // ✅ Validate request data
    if (!buyerId || !farmerId || !productId || !senderId || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Convert IDs to ObjectId (Fix Cast Error)
    buyerId = new mongoose.Types.ObjectId(buyerId);
    farmerId = new mongoose.Types.ObjectId(farmerId);
    productId = new mongoose.Types.ObjectId(productId);
    senderId = new mongoose.Types.ObjectId(senderId);

    // ✅ Find chat or create a new one
    const chat = await Chat.findOneAndUpdate(
      { buyerId, farmerId, productId },
      { $push: { messages: { senderId, message, timestamp: new Date() } } },
      { new: true, upsert: true }
    );

    console.log("✅ Message saved:", chat);
    res.status(200).json({ success: true, chat });
  } catch (error) {
    console.error("❌ Error in /send API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get chat messages for a specific conversation
router.get("/:productId/:buyerId/:farmerId", async (req, res) => {
  try {
    let { productId, buyerId, farmerId } = req.params;

    console.log("🔹 Fetching Chat for:", { productId, buyerId, farmerId });

    // ✅ Convert IDs to ObjectId
    buyerId = new mongoose.Types.ObjectId(buyerId);
    farmerId = new mongoose.Types.ObjectId(farmerId);
    productId = new mongoose.Types.ObjectId(productId);

    const chat = await Chat.findOne({ productId, buyerId, farmerId });

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("❌ Error fetching chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
