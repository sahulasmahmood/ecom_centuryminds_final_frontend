const express = require("express");
const authRoutes = require("./authRoutes");

const productRoutes = require("./products");
const posOrderRoutes = require("./posOrderRoutes");
const posProductRoutes = require("./posProductRoutes");
const posInvoiceRoutes = require("./posInvoiceRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/pos/orders", posOrderRoutes);
router.use("/pos/products", posProductRoutes);
router.use("/pos/invoice", posInvoiceRoutes);

module.exports = router;
