const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Generate invoice number based on invoice settings
const generateInvoiceNumber = async () => {
  try {
    const settings = await prisma.invoiceSettings.findFirst({
      where: { isActive: true },
    });

    if (!settings) {
      console.warn(
        "⚠️ No active invoice settings found, creating default settings...",
      );

      // Create default invoice settings
      const defaultSettings = await prisma.invoiceSettings.create({
        data: {
          invoicePrefix: "INV",
          invoiceFormat: "{PREFIX}-{FY}-{SEQ}",
          invoiceSequenceLength: 4,
          currentSequenceNo: 1,
          autoFinancialYear: true,
          financialYearStart: new Date(new Date().getFullYear(), 3, 1), // April 1st
          isActive: true,
        },
      });

      return generateInvoiceNumberFromSettings(defaultSettings);
    }

    return generateInvoiceNumberFromSettings(settings);
  } catch (error) {
    console.error("❌ Error generating invoice number:", error);
    return null;
  }
};

// Helper function to generate invoice number from settings
const generateInvoiceNumberFromSettings = async (settings) => {
  // Determine financial year
  let financialYear = "";
  if (settings.autoFinancialYear) {
    const now = new Date();
    const fyStart = new Date(settings.financialYearStart);

    if (now >= fyStart) {
      financialYear = `${fyStart.getFullYear()}-${(fyStart.getFullYear() + 1).toString().slice(-2)}`;
    } else {
      financialYear = `${fyStart.getFullYear() - 1}-${fyStart.getFullYear().toString().slice(-2)}`;
    }
  } else {
    financialYear = settings.manualFinancialYear || "";
  }

  // Format sequence number with leading zeros
  const sequence = String(settings.currentSequenceNo).padStart(
    settings.invoiceSequenceLength,
    "0",
  );

  // Generate invoice number using template
  const invoiceNumber = settings.invoiceFormat
    .replace("{PREFIX}", settings.invoicePrefix)
    .replace("{FY}", financialYear)
    .replace("{SEQ}", sequence);

  // Increment sequence number for next invoice
  await prisma.invoiceSettings.update({
    where: { id: settings.id },
    data: {
      currentSequenceNo: settings.currentSequenceNo + 1,
    },
  });

  return invoiceNumber;
};

// Generate unique order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `POS-${timestamp}-${random}`;
};

// Create POS Order
const createPOSOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      tax = 0,
      taxRate = 0,
      discount = 0,
      roundingOff = 0,
      total,
      paymentMethod,
      amountReceived,
      changeGiven = 0,
      createdBy,
    } = req.body;

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Payment method is required",
      });
    }

    // Generate order number and invoice number
    const orderNumber = generateOrderNumber();
    const invoiceNumber = await generateInvoiceNumber();

    // Prepare order items
    const orderItems = items.map((item) => {
      const itemSubtotal = item.unitPrice * item.quantity;
      const discountAmount = item.discount
        ? (itemSubtotal * item.discount) / 100
        : 0;
      const itemTotal = itemSubtotal - discountAmount;

      // Calculate GST breakdown
      const gstPercentage = item.gstPercentage || 0;
      const priceBeforeGst = itemTotal / (1 + gstPercentage / 100);
      const gstAmount = itemTotal - priceBeforeGst;

      return {
        productId: item.productId,
        productName: item.productName,
        productSku: item.productSku || null,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        discount: item.discount || 0,
        subtotal: itemSubtotal,
        total: itemTotal,
        gstPercentage: gstPercentage,
        gstAmount: gstAmount,
        priceBeforeGst: priceBeforeGst,
      };
    });

    // Create order in database
    console.log(
      `📝 Creating POS order ${orderNumber} with invoice ${invoiceNumber || "N/A"}...`,
    );
    const order = await prisma.pOSOrder.create({
      data: {
        orderNumber,
        invoiceNumber,
        orderType: "pos",
        customerId: customer?.id || null,
        customerName: customer?.name || null,
        customerEmail: customer?.email || null,
        customerPhone: customer?.phone || null,
        subtotal,
        tax,
        taxRate,
        discount,
        roundingOff,
        total,
        paymentMethod,
        paymentStatus: "completed",
        amountReceived,
        changeGiven,
        orderStatus: "completed",
        syncStatus: "synced",
        createdBy: createdBy || null,
        completedAt: new Date(),
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    console.log(`✅ Order ${orderNumber} created successfully`);

    // Update product stock
    for (const item of items) {
      try {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
        console.log(
          `📦 Stock updated for product ${item.productName}: -${item.quantity}`,
        );
      } catch (stockError) {
        console.error(
          `❌ Failed to update stock for ${item.productName}:`,
          stockError,
        );
      }
    }

    res.status(201).json({
      success: true,
      message: "POS order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error creating POS order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create POS order",
      error: error.message,
    });
  }
};

// Get all POS orders
const getPOSOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      orderStatus,
      paymentMethod,
      syncStatus,
      startDate,
      endDate,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where = {};

    if (orderStatus) {
      where.orderStatus = orderStatus;
    }

    if (paymentMethod) {
      where.paymentMethod = paymentMethod;
    }

    if (syncStatus) {
      where.syncStatus = syncStatus;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    const [orders, total] = await Promise.all([
      prisma.pOSOrder.findMany({
        where,
        include: {
          items: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: parseInt(limit),
      }),
      prisma.pOSOrder.count({ where }),
    ]);

    res.json({
      success: true,
      data: orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching POS orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch POS orders",
      error: error.message,
    });
  }
};

// Get single POS order
const getPOSOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.pOSOrder.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching POS order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch POS order",
      error: error.message,
    });
  }
};

// Get POS statistics
const getPOSStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const where = {
      orderStatus: "completed",
    };

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    // Get total sales and orders
    const orders = await prisma.pOSOrder.findMany({
      where,
      select: {
        total: true,
        paymentMethod: true,
      },
    });

    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;

    // Group by payment method
    const paymentMethodStats = orders.reduce((acc, order) => {
      const method = order.paymentMethod.toLowerCase();
      if (!acc[method]) {
        acc[method] = { count: 0, total: 0 };
      }
      acc[method].count++;
      acc[method].total += order.total;
      return acc;
    }, {});

    // Get top selling products
    const topProducts = await prisma.pOSOrderItem.groupBy({
      by: ["productId", "productName"],
      _sum: {
        quantity: true,
        total: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 10,
    });

    res.json({
      success: true,
      data: {
        totalSales,
        totalOrders,
        averageOrderValue: totalOrders > 0 ? totalSales / totalOrders : 0,
        paymentMethodStats,
        topProducts: topProducts.map((p) => ({
          productId: p.productId,
          productName: p.productName,
          quantitySold: p._sum.quantity,
          totalRevenue: p._sum.total,
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching POS stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch POS statistics",
      error: error.message,
    });
  }
};

module.exports = {
  createPOSOrder,
  getPOSOrders,
  getPOSOrderById,
  getPOSStats,
  generateInvoiceNumber,
};
