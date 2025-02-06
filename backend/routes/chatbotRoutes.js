const express = require("express");
const router = express.Router();
const { handleChat } = require("../controllers/chatbotController");

// Chat API route
router.post("/chatbot", handleChat);

module.exports = router;
