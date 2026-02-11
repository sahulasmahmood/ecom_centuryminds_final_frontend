import { POSOrderData } from "@/store/use-pos-store";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const posOrderService = {
  /**
   * Create a new POS order
   */
  async createPOSOrder(orderData: POSOrderData) {
    try {
      const response = await fetch(`${API_BASE_URL}/pos/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create order");
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error("POS Order Service Error:", error);
      throw error;
    }
  },

  /**
   * Get all held orders
   */
  async getHeldOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/pos/orders/held`);

      if (!response.ok) {
        throw new Error("Failed to fetch held orders");
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error("Get Held Orders Error:", error);
      throw error;
    }
  },

  /**
   * Sync offline orders
   */
  async syncOfflineOrders(orders: POSOrderData[]) {
    try {
      const response = await fetch(`${API_BASE_URL}/pos/orders/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orders }),
      });

      if (!response.ok) {
        throw new Error("Failed to sync offline orders");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Sync Offline Orders Error:", error);
      throw error;
    }
  },
};
