// Validation middleware for product operations

// Valid categories for crackers
const VALID_CATEGORIES = [
  'ground-crackers',
  'aerial-crackers',
  'sparklers',
  'sound-crackers',
  'fancy-crackers',
  'gift-boxes'
];

const VALID_SOUND_LEVELS = ['Silent', 'Low', 'Medium', 'High', 'Very High'];
const VALID_STATUSES = ['active', 'inactive', 'out-of-stock'];
const VALID_UNITS = ['Box', 'Pkt', 'Pcs'];

// Validate create product request
const validateCreateProduct = (req, res, next) => {
  const errors = [];
  const { 
    name, 
    category, 
    sellingPrice, 
    stock,
    soundLevel,
    status,
    unit
  } = req.body;

  // Required fields validation
  if (!name || name.trim().length === 0) {
    errors.push('Product name is required');
  } else if (name.length > 200) {
    errors.push('Product name must be less than 200 characters');
  }

  if (!category) {
    errors.push('Category is required');
  } else if (!VALID_CATEGORIES.includes(category)) {
    errors.push(`Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }

  if (!sellingPrice) {
    errors.push('Selling price is required');
  } else {
    const price = parseFloat(sellingPrice);
    if (isNaN(price) || price < 0) {
      errors.push('Selling price must be a positive number');
    }
  }

  if (stock !== undefined && stock !== null && stock !== '') {
    const stockNum = parseInt(stock);
    if (isNaN(stockNum) || stockNum < 0) {
      errors.push('Stock must be a non-negative number');
    }
  }

  // Optional field validations
  if (soundLevel && !VALID_SOUND_LEVELS.includes(soundLevel)) {
    errors.push(`Invalid sound level. Must be one of: ${VALID_SOUND_LEVELS.join(', ')}`);
  }

  if (status && !VALID_STATUSES.includes(status)) {
    errors.push(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  if (unit && !VALID_UNITS.includes(unit)) {
    errors.push(`Invalid unit. Must be one of: ${VALID_UNITS.join(', ')}`);
  }

  // GST validation
  if (req.body.gstPercentage) {
    const gst = parseFloat(req.body.gstPercentage);
    if (isNaN(gst) || gst < 0 || gst > 100) {
      errors.push('GST percentage must be between 0 and 100');
    }
  }

  // Price validations
  if (req.body.mrp) {
    const mrp = parseFloat(req.body.mrp);
    if (isNaN(mrp) || mrp < 0) {
      errors.push('MRP must be a positive number');
    }
  }

  if (req.body.purchasePrice) {
    const purchasePrice = parseFloat(req.body.purchasePrice);
    if (isNaN(purchasePrice) || purchasePrice < 0) {
      errors.push('Purchase price must be a positive number');
    }
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors: errors
    });
  }

  next();
};

// Validate update product request
const validateUpdateProduct = (req, res, next) => {
  const errors = [];
  const { 
    name, 
    category, 
    sellingPrice, 
    stock,
    soundLevel,
    status,
    unit
  } = req.body;

  // Optional field validations (only validate if provided)
  if (name !== undefined) {
    if (name.trim().length === 0) {
      errors.push('Product name cannot be empty');
    } else if (name.length > 200) {
      errors.push('Product name must be less than 200 characters');
    }
  }

  if (category && !VALID_CATEGORIES.includes(category)) {
    errors.push(`Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }

  if (sellingPrice !== undefined) {
    const price = parseFloat(sellingPrice);
    if (isNaN(price) || price < 0) {
      errors.push('Selling price must be a positive number');
    }
  }

  if (stock !== undefined && stock !== null && stock !== '') {
    const stockNum = parseInt(stock);
    if (isNaN(stockNum) || stockNum < 0) {
      errors.push('Stock must be a non-negative number');
    }
  }

  if (soundLevel && !VALID_SOUND_LEVELS.includes(soundLevel)) {
    errors.push(`Invalid sound level. Must be one of: ${VALID_SOUND_LEVELS.join(', ')}`);
  }

  if (status && !VALID_STATUSES.includes(status)) {
    errors.push(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  if (unit && !VALID_UNITS.includes(unit)) {
    errors.push(`Invalid unit. Must be one of: ${VALID_UNITS.join(', ')}`);
  }

  if (req.body.gstPercentage !== undefined) {
    const gst = parseFloat(req.body.gstPercentage);
    if (isNaN(gst) || gst < 0 || gst > 100) {
      errors.push('GST percentage must be between 0 and 100');
    }
  }

  if (req.body.mrp !== undefined) {
    const mrp = parseFloat(req.body.mrp);
    if (isNaN(mrp) || mrp < 0) {
      errors.push('MRP must be a positive number');
    }
  }

  if (req.body.purchasePrice !== undefined) {
    const purchasePrice = parseFloat(req.body.purchasePrice);
    if (isNaN(purchasePrice) || purchasePrice < 0) {
      errors.push('Purchase price must be a positive number');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors: errors
    });
  }

  next();
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
  VALID_CATEGORIES,
  VALID_SOUND_LEVELS,
  VALID_STATUSES,
  VALID_UNITS
};
