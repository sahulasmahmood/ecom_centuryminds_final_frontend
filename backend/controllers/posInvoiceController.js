const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Generate invoice number (endpoint for frontend)
const generateInvoiceNumberAPI = async (req, res) => {
  try {
    const settings = await prisma.invoiceSettings.findFirst({
      where: { isActive: true },
    });

    if (!settings) {
      // Create default settings if none exist
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

      const invoiceNumber = await generateInvoiceFromSettings(defaultSettings);

      return res.json({
        success: true,
        data: {
          invoiceNumber,
          settings: defaultSettings,
        },
      });
    }

    const invoiceNumber = await generateInvoiceFromSettings(settings);

    res.json({
      success: true,
      data: {
        invoiceNumber,
        settings,
      },
    });
  } catch (error) {
    console.error("Error generating invoice number:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate invoice number",
      message: error.message,
    });
  }
};

// Helper to generate invoice from settings
const generateInvoiceFromSettings = async (settings) => {
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

  // Format sequence number
  const sequence = String(settings.currentSequenceNo).padStart(
    settings.invoiceSequenceLength,
    "0",
  );

  // Generate invoice number
  const invoiceNumber = settings.invoiceFormat
    .replace("{PREFIX}", settings.invoicePrefix)
    .replace("{FY}", financialYear)
    .replace("{SEQ}", sequence);

  // Increment for next invoice (this happens when order is created)
  // We don't increment here to avoid gaps if user doesn't complete checkout

  return invoiceNumber;
};

// Get invoice settings
const getInvoiceSettings = async (req, res) => {
  try {
    const settings = await prisma.invoiceSettings.findFirst({
      where: { isActive: true },
    });

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "No active invoice settings found",
      });
    }

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching invoice settings:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch invoice settings",
      message: error.message,
    });
  }
};

// Update invoice settings
const updateInvoiceSettings = async (req, res) => {
  try {
    const {
      invoicePrefix,
      invoiceFormat,
      invoiceSequenceLength,
      currentSequenceNo,
      autoFinancialYear,
      financialYearStart,
      manualFinancialYear,
    } = req.body;

    // Get current active settings
    const currentSettings = await prisma.invoiceSettings.findFirst({
      where: { isActive: true },
    });

    if (!currentSettings) {
      // Create new settings
      const newSettings = await prisma.invoiceSettings.create({
        data: {
          invoicePrefix: invoicePrefix || "INV",
          invoiceFormat: invoiceFormat || "{PREFIX}-{FY}-{SEQ}",
          invoiceSequenceLength: invoiceSequenceLength || 4,
          currentSequenceNo: currentSequenceNo || 1,
          autoFinancialYear:
            autoFinancialYear !== undefined ? autoFinancialYear : true,
          financialYearStart: financialYearStart
            ? new Date(financialYearStart)
            : new Date(new Date().getFullYear(), 3, 1),
          manualFinancialYear,
          isActive: true,
        },
      });

      return res.json({
        success: true,
        message: "Invoice settings created successfully",
        data: newSettings,
      });
    }

    // Update existing settings
    const updatedSettings = await prisma.invoiceSettings.update({
      where: { id: currentSettings.id },
      data: {
        ...(invoicePrefix && { invoicePrefix }),
        ...(invoiceFormat && { invoiceFormat }),
        ...(invoiceSequenceLength && { invoiceSequenceLength }),
        ...(currentSequenceNo !== undefined && { currentSequenceNo }),
        ...(autoFinancialYear !== undefined && { autoFinancialYear }),
        ...(financialYearStart && {
          financialYearStart: new Date(financialYearStart),
        }),
        ...(manualFinancialYear && { manualFinancialYear }),
      },
    });

    res.json({
      success: true,
      message: "Invoice settings updated successfully",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Error updating invoice settings:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update invoice settings",
      message: error.message,
    });
  }
};

module.exports = {
  generateInvoiceNumberAPI,
  getInvoiceSettings,
  updateInvoiceSettings,
};
