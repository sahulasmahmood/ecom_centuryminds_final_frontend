const express = require("express");
const router = express.Router();
const {
  getPOSProducts,
  toggleProductDisplay,
} = require("../controllers/posProductController");
const { authenticateToken } = require("../middleware/auth");

// All routes require authentication
router.use(authenticateToken);

// @route   GET /api/pos/products
// @desc    Get all products for POS display
// @access  Private
router.get("/", getPOSProducts);

// @route   PATCH /api/pos/products/:id/display
// @desc    Toggle product display in POS
// @access  Private
router.patch("/:id/display", toggleProductDisplay);

module.exports = router;
