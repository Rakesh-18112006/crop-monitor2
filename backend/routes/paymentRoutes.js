// const express = require("express");
// const router = express.Router();
// const Razorpay = require("razorpay");
// const Order = require("../models/Order");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET
// });

// router.post("/create", async (req, res) => {
//   try {
//     const { productId, buyerId, farmerId, amount } = req.body;

//     const options = {
//       amount: amount * 100, 
//       currency: "INR",
//       receipt: `order_rcptid_${Date.now()}`,
//       payment_capture: 1,
//     };

//     const response = await razorpay.orders.create(options);

//     const newOrder = new Order({
//       productId,
//       buyerId,
//       farmerId,
//       status: "payment_pending",
//       paymentId: response.id
//     });
//     await newOrder.save();

//     res.json({ id: response.id, currency: response.currency, amount: response.amount });
//   } catch (error) {
//     res.status(500).json({ error: "Payment failed" });
//   }
// });

// module.exports = router;
