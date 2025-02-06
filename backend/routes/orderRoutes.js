const express = require("express");
const router = express.Router();
const { placeOrder, getOrders } = require("../controllers/orderController");

router.post("/place", placeOrder); // Place an order
router.get("/all", getOrders); // Get all orders

module.exports = router;
