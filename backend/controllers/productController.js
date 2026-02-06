const { PrismaClient } = require("@prisma/client");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");
const prisma = new PrismaClient();

// Get all products with pagination and filtering
exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      status = "active",
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Build filter conditions
    const where = {};

    if (category) {
      where.category = category;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { brand: { contains: search, mode: "insensitive" } },
      ];
    }

    // Get total count for pagination
    const total = await prisma.product.count({ where });

    // Get products with pagination
    const products = await prisma.product.findMany({
      where,
      skip,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch products",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch product",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Add new product
exports.createProduct = async (req, res) => {
  let uploadedImagePublicId = null;

  try {
    const {
      name,
      description,
      brand,
      category,
      sku,
      purchasePrice,
      sellingPrice,
      mrp,
      gstPercentage,
      stock,
      lowStockThreshold,
      unit,
      soundLevel,
      piecesPerPack,
      duration,
      safetyDistance,
      effects,
      status,
      isFeatured,
    } = req.body;

    let imageUrl = "";
    let imagePublicId = "";

    // Handle Image Upload
    if (req.file) {
      try {
        const folder = "fireworks/products";
        const result = await uploadToCloudinary(req.file.buffer, folder);
        imageUrl = result.secure_url;
        imagePublicId = result.public_id;
        uploadedImagePublicId = imagePublicId; // Store for cleanup if needed
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return res.status(500).json({
          success: false,
          error: "Failed to upload image",
          message:
            process.env.NODE_ENV === "development"
              ? uploadError.message
              : undefined,
        });
      }
    }

    // Prepare product data
    const productData = {
      name: name.trim(),
      description: description?.trim() || null,
      brand: brand?.trim() || null,
      category,
      sku: sku?.trim() || null,

      // Price fields
      price: mrp ? parseFloat(mrp) : parseFloat(sellingPrice),
      mrp: mrp ? parseFloat(mrp) : null,
      sellingPrice: parseFloat(sellingPrice),
      purchasePrice: purchasePrice ? parseFloat(purchasePrice) : null,
      gstPercentage: gstPercentage ? parseFloat(gstPercentage) : 18,

      stock: stock ? parseInt(stock) : 0,
      lowStockThreshold: lowStockThreshold ? parseInt(lowStockThreshold) : 10,
      unit: unit || "Box",

      // Cracker-specific fields
      soundLevel: soundLevel || null,
      piecesPerPack: piecesPerPack || null,
      duration: duration || null,
      safetyDistance: safetyDistance || null,
      effects: effects || null,

      status: status || "active",
      isFeatured: isFeatured === "true" || isFeatured === true,

      image: imageUrl || null,
      imagePublicId: imagePublicId || null,
    };

    // Create product in database
    const product = await prisma.product.create({
      data: productData,
    });

    res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);

    // Cleanup uploaded image if database operation failed
    if (uploadedImagePublicId) {
      try {
        await deleteFromCloudinary(uploadedImagePublicId);
      } catch (cleanupError) {
        console.error("Error cleaning up uploaded image:", cleanupError);
      }
    }

    res.status(500).json({
      success: false,
      error: "Failed to create product",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  let newImagePublicId = null;

  try {
    const { id } = req.params;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    const {
      name,
      description,
      brand,
      category,
      sku,
      purchasePrice,
      sellingPrice,
      mrp,
      gstPercentage,
      stock,
      unit,
      soundLevel,
      piecesPerPack,
      duration,
      safetyDistance,
      effects,
      status,
      isFeatured,
    } = req.body;

    // Prepare update data (only include fields that are provided)
    let updateData = {};

    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined)
      updateData.description = description?.trim() || null;
    if (brand !== undefined) updateData.brand = brand?.trim() || null;
    if (category !== undefined) updateData.category = category;
    if (sku !== undefined) updateData.sku = sku?.trim() || null;

    // Price updates
    if (mrp !== undefined) {
      updateData.mrp = parseFloat(mrp);
      updateData.price = parseFloat(mrp);
    }
    if (sellingPrice !== undefined)
      updateData.sellingPrice = parseFloat(sellingPrice);
    if (purchasePrice !== undefined)
      updateData.purchasePrice = parseFloat(purchasePrice);
    if (gstPercentage !== undefined)
      updateData.gstPercentage = parseFloat(gstPercentage);

    if (stock !== undefined) updateData.stock = parseInt(stock);
    if (lowStockThreshold !== undefined)
      updateData.lowStockThreshold = parseInt(lowStockThreshold);
    if (unit !== undefined) updateData.unit = unit;

    // Cracker-specific updates
    if (soundLevel !== undefined) updateData.soundLevel = soundLevel;
    if (piecesPerPack !== undefined) updateData.piecesPerPack = piecesPerPack;
    if (duration !== undefined) updateData.duration = duration;
    if (safetyDistance !== undefined)
      updateData.safetyDistance = safetyDistance;
    if (effects !== undefined) updateData.effects = effects;

    if (status !== undefined) updateData.status = status;
    if (isFeatured !== undefined) {
      updateData.isFeatured = isFeatured === "true" || isFeatured === true;
    }

    // Handle Image Update
    if (req.file) {
      try {
        const folder = "fireworks/products";
        const result = await uploadToCloudinary(req.file.buffer, folder);
        updateData.image = result.secure_url;
        updateData.imagePublicId = result.public_id;
        newImagePublicId = result.public_id;

        // Delete old image after successful upload
        if (existingProduct.imagePublicId) {
          try {
            await deleteFromCloudinary(existingProduct.imagePublicId);
          } catch (deleteError) {
            console.error("Error deleting old image:", deleteError);
            // Continue anyway as new image is uploaded
          }
        }
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return res.status(500).json({
          success: false,
          error: "Failed to upload new image",
          message:
            process.env.NODE_ENV === "development"
              ? uploadError.message
              : undefined,
        });
      }
    }

    // Update product in database
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    res.json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);

    // Cleanup new image if database operation failed
    if (newImagePublicId) {
      try {
        await deleteFromCloudinary(newImagePublicId);
      } catch (cleanupError) {
        console.error("Error cleaning up new image:", cleanupError);
      }
    }

    res.status(500).json({
      success: false,
      error: "Failed to update product",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // Delete product from database first
    await prisma.product.delete({
      where: { id: req.params.id },
    });

    // Then delete image from Cloudinary
    if (product.imagePublicId) {
      try {
        await deleteFromCloudinary(product.imagePublicId);
      } catch (deleteError) {
        console.error("Error deleting image from Cloudinary:", deleteError);
        // Product is already deleted, so we just log the error
      }
    }

    res.json({
      success: true,
      data: {},
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete product",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
