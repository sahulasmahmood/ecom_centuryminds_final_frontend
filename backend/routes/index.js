const express = require("express");
const authRoutes = require("./authRoutes");

const productRoutes = require("./products");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);

module.exports = router;
