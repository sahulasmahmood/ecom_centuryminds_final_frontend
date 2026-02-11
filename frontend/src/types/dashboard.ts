// Dashboard Data Types for Crackers E-commerce

export interface KPICardsData {
  todaysOrders: number;
  todaysRevenue: number;
  totalCustomers: number;
  totalProducts: number;
}

export interface OrderOperationsData {
  pending: number;
  confirmed: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

export interface ProductInsightsData {
  topSellingProducts: Array<{
    name: string;
    sales: number;
    category: string;
  }>;
  lowStockProducts: Array<{
    name: string;
    stock: number;
  }>;
}

export interface RecentOrderData {
  id: string;
  customerName: string;
  items: number;
  total: number;
  status: string;
  date: string;
}

export interface DashboardData {
  kpiCards: KPICardsData;
  orderOperations: OrderOperationsData;
  productInsights: ProductInsightsData;
  recentOrders: RecentOrderData[];
}