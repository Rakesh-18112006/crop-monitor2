const Chat = require("../models/Chat");
const mongoose = require("mongoose");

exports.sendMessage = (socket, io) => {
  socket.on("sendMessage", async (data) => {
    try {
      const { buyerId, farmerId, productId, senderId, message } = data;

      // ✅ Validate input
      if (!buyerId || !farmerId || !productId || !senderId || !message) return;

      // ✅ Convert IDs to ObjectId
      const buyerObjId = new mongoose.Types.ObjectId(buyerId);
      const farmerObjId = new mongoose.Types.ObjectId(farmerId);
      const productObjId = new mongoose.Types.ObjectId(productId);
      const senderObjId = new mongoose.Types.ObjectId(senderId);

      // ✅ Find existing chat or create a new one
      const chat = await Chat.findOneAndUpdate(
        { buyerId: buyerObjId, farmerId: farmerObjId, productId: productObjId },
        { $push: { messages: { senderId: senderObjId, message, timestamp: new Date() } } },
        { new: true, upsert: true }
      ).populate("buyerId farmerId");

      // ✅ Emit message to ALL users (including sender)
      io.emit("receiveMessage", {
        chatId: chat._id,
        senderId,
        message,
        timestamp: new Date(),
      });

    } catch (error) {
      console.error("❌ Error in sendMessage:", error);
    }
  });
};
