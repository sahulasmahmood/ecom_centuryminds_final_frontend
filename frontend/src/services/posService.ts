import api from "@/lib/api";

export interface POSProduct {
  id: string;
  name: string;
  sku?: string;
  barcode?: string;
  category: string;
  sellingPrice: number;
  mrp?: number;
  gstPercentage: number;
  stock: number;
  image?: string;
  display: string;
  discountType?: string;
  discountValue?: number;
}

export interface POSOrderItem {
  productId: string;
  productName: string;
  productSku?: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  subtotal: number;
  total: number;
  gstPercentage: number;
  gstAmount: number;
  priceBeforeGst: number;
}

export interface POSOrder {
  id: string;
  orderNumber: string;
  invoiceNumber?: string;
  orderType: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  items: POSOrderItem[];
  subtotal: number;
  tax: number;
  taxRate: number;
  discount: number;
  roundingOff: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  amountReceived?: number;
  changeGiven: number;
  orderStatus: string;
  syncStatus: string;
  createdBy?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePOSOrderRequest {
  customer?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  items: {
    productId: string;
    productName: string;
    productSku?: string;
    unitPrice: number;
    quantity: number;
    discount?: number;
    gstPercentage: number;
  }[];
  subtotal: number;
  tax: number;
  taxRate: number;
  discount?: number;
  roundingOff?: number;
  total: number;
  paymentMethod: string;
  amountReceived?: number;
  changeGiven?: number;
  createdBy?: string;
}

export interface POSStats {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  paymentMethodStats: {
    [key: string]: {
      count: number;
      total: number;
    };
  };
  topProducts: {
    productId: string;
    productName: string;
    quantitySold: number;
    totalRevenue: number;
  }[];
}

export interface InvoiceSettings {
  id: string;
  invoicePrefix: string;
  invoiceFormat: string;
  invoiceSequenceLength: number;
  currentSequenceNo: number;
  autoFinancialYear: boolean;
  financialYearStart: string;
  manualFinancialYear?: string;
  isActive: boolean;
}

// Get POS products
export const getPOSProducts = async (params?: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await api.get("/pos/products", { params });
  return response.data;
};

// Create POS order
export const createPOSOrder = async (orderData: CreatePOSOrderRequest) => {
  const response = await api.post("/pos/orders", orderData);
  return response.data;
};

// Get POS orders
export const getPOSOrders = async (params?: {
  page?: number;
  limit?: number;
  orderStatus?: string;
  paymentMethod?: string;
  syncStatus?: string;
  startDate?: string;
  endDate?: string;
}) => {
  const response = await api.get("/pos/orders", { params });
  return response.data;
};

// Get POS order by ID
export const getPOSOrderById = async (id: string) => {
  const response = await api.get(`/pos/orders/${id}`);
  return response.data;
};

// Get POS statistics
export const getPOSStats = async (params?: {
  startDate?: string;
  endDate?: string;
}) => {
  const response = await api.get("/pos/orders/stats", { params });
  return response.data;
};

// Toggle product display in POS
export const toggleProductDisplay = async (
  productId: string,
  display: "active" | "inactive"
) => {
  const response = await api.patch(`/pos/products/${productId}/display`, {
    display,
  });
  return response.data;
};

// Get invoice settings
export const getInvoiceSettings = async () => {
  const response = await api.get("/pos/invoice/settings");
  return response.data;
};

// Update invoice settings
export const updateInvoiceSettings = async (settings: Partial<InvoiceSettings>) => {
  const response = await api.put("/pos/invoice/settings", settings);
  return response.data;
};

// Generate invoice number
export const generateInvoiceNumber = async () => {
  const response = await api.post("/pos/invoice/generate-number");
  return response.data;
};
