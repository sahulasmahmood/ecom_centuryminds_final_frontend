const express = require("express");
const router = express.Router();
const {
  createPOSOrder,
  getPOSOrders,
  getPOSOrderById,
  getPOSStats,
} = require("../controllers/posOrderController");
const { authenticateToken } = require("../middleware/auth");

// All routes require authentication
router.use(authenticateToken);

// @route   POST /api/pos/orders
// @desc    Create a new POS order
// @access  Private
router.post("/", createPOSOrder);

// @route   GET /api/pos/orders
// @desc    Get all POS orders with filters
// @access  Private
router.get("/", getPOSOrders);

// @route   GET /api/pos/orders/stats
// @desc    Get POS statistics
// @access  Private
router.get("/stats", getPOSStats);

// @route   GET /api/pos/orders/:id
// @desc    Get single POS order by ID
// @access  Private
router.get("/:id", getPOSOrderById);

module.exports = router;
