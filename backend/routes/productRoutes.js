const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createProduct, getAllProducts } = require("../controllers/productController");

const upload = multer({ dest: "uploads/" });

router.post("/add", upload.single("image"), createProduct);
router.get("/all", getAllProducts);

module.exports = router;
