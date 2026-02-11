const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get POS products (active products for POS display)
const getPOSProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 50 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where = {
      status: "active",
      display: "active", // Only show products marked for POS display
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { sku: { contains: search, mode: "insensitive" } },
        { barcode: { contains: search, mode: "insensitive" } },
      ];
    }

    if (category && category !== "all") {
      where.category = category;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: {
          name: "asc",
        },
        skip,
        take: parseInt(limit),
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching POS products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch POS products",
      error: error.message,
    });
  }
};

// Toggle product display in POS
const toggleProductDisplay = async (req, res) => {
  try {
    const { id } = req.params;
    const { display } = req.body;

    if (!display || !["active", "inactive"].includes(display)) {
      return res.status(400).json({
        success: false,
        message: "Invalid display status. Must be 'active' or 'inactive'",
      });
    }

    const product = await prisma.product.update({
      where: { id },
      data: { display },
    });

    res.json({
      success: true,
      message: `Product ${display === "active" ? "enabled" : "disabled"} in POS`,
      data: product,
    });
  } catch (error) {
    console.error("Error toggling product display:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle product display",
      error: error.message,
    });
  }
};

module.exports = {
  getPOSProducts,
  toggleProductDisplay,
};
