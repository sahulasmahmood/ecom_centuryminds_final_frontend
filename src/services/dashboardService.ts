import { api } from '@/lib/api';
import type { DashboardData } from '@/types/dashboard';

// Mock data for development - replace with actual API calls
const mockDashboardData: DashboardData = {
  kpiCards: {
    todaysOrders: 24,
    todaysRevenue: 15420,
    totalCustomers: 1250,
    totalProducts: 89,
  },
  orderOperations: {
    pending: 8,
    confirmed: 12,
    shipped: 15,
    delivered: 45,
    cancelled: 3,
  },
  productInsights: {
    topSellingProducts: [
      { name: "Flower Pots (10 pieces)", sales: 45, category: "Ground Crackers" },
      { name: "Sparklers Box", sales: 38, category: "Sparklers" },
      { name: "Crackling Soda", sales: 32, category: "Sound Crackers" },
      { name: "Twin Star", sales: 28, category: "Aerial Crackers" },
    ],
    lowStockProducts: [
      { name: "Electric Sparklers", stock: 5 },
      { name: "Gold Lakshmi", stock: 8 },
      { name: "Mumbai Beauty", stock: 12 },
    ],
  },
  recentOrders: [
    {
      id: "ORD001",
      customerName: "Rajesh Kumar",
      items: 5,
      total: 2500,
      status: "confirmed",
      date: "2024-02-05",
    },
    {
      id: "ORD002",
      customerName: "Priya Sharma",
      items: 3,
      total: 1800,
      status: "shipped",
      date: "2024-02-05",
    },
    {
      id: "ORD003",
      customerName: "Amit Patel",
      items: 8,
      total: 4200,
      status: "pending",
      date: "2024-02-04",
    },
    {
      id: "ORD004",
      customerName: "Sunita Devi",
      items: 2,
      total: 950,
      status: "delivered",
      date: "2024-02-04",
    },
    {
      id: "ORD005",
      customerName: "Vikram Singh",
      items: 6,
      total: 3200,
      status: "confirmed",
      date: "2024-02-04",
    },
  ],
};

export const dashboardService = {
  // Get dashboard data
  async getDashboardData(): Promise<DashboardData> {
    try {
      // For now, return mock data
      // In production, replace with actual API calls:
      // const response = await api.get('/api/dashboard');
      // return response.data;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return mockDashboardData;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  },

  // Get today's orders count
  async getTodaysOrders(): Promise<number> {
    try {
      // const response = await api.get('/api/dashboard/orders/today');
      // return response.data.count;
      return mockDashboardData.kpiCards.todaysOrders;
    } catch (error) {
      console.error('Error fetching today\'s orders:', error);
      return 0;
    }
  },

  // Get today's revenue
  async getTodaysRevenue(): Promise<number> {
    try {
      // const response = await api.get('/api/dashboard/revenue/today');
      // return response.data.revenue;
      return mockDashboardData.kpiCards.todaysRevenue;
    } catch (error) {
      console.error('Error fetching today\'s revenue:', error);
      return 0;
    }
  },

  // Get order operations data
  async getOrderOperations() {
    try {
      // const response = await api.get('/api/dashboard/orders/operations');
      // return response.data;
      return mockDashboardData.orderOperations;
    } catch (error) {
      console.error('Error fetching order operations:', error);
      throw error;
    }
  },

  // Get product insights
  async getProductInsights() {
    try {
      // const response = await api.get('/api/dashboard/products/insights');
      // return response.data;
      return mockDashboardData.productInsights;
    } catch (error) {
      console.error('Error fetching product insights:', error);
      throw error;
    }
  },

  // Get recent orders
  async getRecentOrders() {
    try {
      // const response = await api.get('/api/dashboard/orders/recent');
      // return response.data;
      return mockDashboardData.recentOrders;
    } catch (error) {
      console.error('Error fetching recent orders:', error);
      throw error;
    }
  },
};