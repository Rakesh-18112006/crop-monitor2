const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

router.post("/send", async (req, res) => {
  try {
    const { buyerId, farmerId, productId, senderId, message } = req.body;

    let chat = await Chat.findOne({ buyerId, farmerId, productId });

    if (!chat) {
      chat = new Chat({ buyerId, farmerId, productId, messages: [] });
    }

    chat.messages.push({ senderId, message });
    await chat.save();

    res.json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

router.get("/:chatId", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Chat not found" });
  }
});

module.exports = router;
