const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/upload");
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validateCreateProduct, validateUpdateProduct } = require('../middleware/validateProduct');

// Public routes
router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);

// Protected routes - Admin only
router.post("/", 
  authenticateToken, 
  requireRole('admin'), 
  upload.single("image"),
  validateCreateProduct,
  productController.createProduct
);

router.put("/:id", 
  authenticateToken, 
  requireRole('admin'), 
  upload.single("image"),
  validateUpdateProduct,
  productController.updateProduct
);

router.delete("/:id", 
  authenticateToken, 
  requireRole('admin'), 
  productController.deleteProduct
);

module.exports = router;
