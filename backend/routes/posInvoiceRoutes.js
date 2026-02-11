const express = require("express");
const router = express.Router();
const {
  generateInvoiceNumberAPI,
  getInvoiceSettings,
  updateInvoiceSettings,
} = require("../controllers/posInvoiceController");
const { authenticateToken } = require("../middleware/auth");

// All routes require authentication
router.use(authenticateToken);

// @route   POST /api/pos/invoice/generate-number
// @desc    Generate next invoice number
// @access  Private
router.post("/generate-number", generateInvoiceNumberAPI);

// @route   GET /api/pos/invoice/settings
// @desc    Get invoice settings
// @access  Private
router.get("/settings", getInvoiceSettings);

// @route   PUT /api/pos/invoice/settings
// @desc    Update invoice settings
// @access  Private
router.put("/settings", updateInvoiceSettings);

module.exports = router;
