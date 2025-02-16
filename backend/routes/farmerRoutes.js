const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assuming farmers are stored in `User` model

// ✅ Get farmer details by ID
router.get("/:farmerId", async (req, res) => {
  try {
    const farmer = await User.findOne({ _id: req.params.farmerId });

    if (!farmer) {
      return res.status(404).json({ error: "Farmer not found" });
    }

    res.status(200).json(farmer);
  } catch (error) {
    console.error("❌ Error fetching farmer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
