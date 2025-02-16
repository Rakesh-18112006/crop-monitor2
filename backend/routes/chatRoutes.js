const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Chat = require("../models/Chat");

// ✅ Send a message (Socket.io will handle broadcasting)
router.post("/send", async (req, res) => {
  try {
    let { buyerId, farmerId, productId, senderId, message } = req.body;

    console.log("🔹 Incoming Message:", req.body);

    if (!buyerId || !farmerId || !productId || !senderId || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Store `buyerId` & `farmerId` as strings (Firebase UIDs)
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
    const { productId, buyerId, farmerId } = req.params;

    console.log("🔹 Fetching Chat for:", { productId, buyerId, farmerId });

    // ✅ Use exact match for Firebase IDs (Strings)
    const chat = await Chat.findOne({ productId, buyerId, farmerId });

    if (!chat) {
      return res.status(200).json({ messages: [] }); // ✅ Return empty array instead of 500 error
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("❌ Error fetching chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get list of all chats for a user (For Chat List Sidebar)
// ✅ Get list of all chats for a user
router.get("/list/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // ✅ Find all chats where user is either a buyer or a farmer
    const chats = await Chat.find({ $or: [{ buyerId: userId }, { farmerId: userId }] })
      .populate("buyerId farmerId")
      .sort({ "messages.timestamp": -1 });

    // ✅ Format response
    const chatList = chats.map(chat => ({
      _id: chat._id,
      farmerId: chat.farmerId._id,
      farmerName: chat.farmerId.name,
      farmerProfile: chat.farmerId.profile || null,
      lastMessage: chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].message : "",
    }));

    res.status(200).json(chatList);
  } catch (error) {
    console.error("❌ Error fetching chat list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
