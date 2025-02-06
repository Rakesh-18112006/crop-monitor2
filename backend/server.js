const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db");
const chatbotRoutes = require("./routes/chatbotRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const chatRoutes = require("./routes/chatRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

// ✅ Connect to MongoDB before loading routes
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api", weatherRoutes);
app.use("/api", chatbotRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Debug: Print All Registered Routes
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`✅ Registered Route: ${Object.keys(middleware.route.methods)[0].toUpperCase()} ${middleware.route.path}`);
  }
});

// ✅ Socket.io Chat System
io.on("connection", (socket) => {
  console.log("🔗 New client connected");

  socket.on("sendMessage", ({ chatId, senderId, message }) => {
    io.emit("receiveMessage", { chatId, senderId, message });
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

// ✅ 404 Handler for Undefined Routes
app.use((req, res) => {
  console.error(`❌ 404 - Route Not Found: ${req.originalUrl}`);
  res.status(404).json({ error: "Route Not Found" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
