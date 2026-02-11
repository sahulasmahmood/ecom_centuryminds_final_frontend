import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface POSProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
  sku?: string;
  gstPercentage?: number;
}

export interface CartItem extends POSProduct {
  quantity: number;
  discount?: number; // Percentage discount per item
}

export interface Customer {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface HeldOrder {
  id: string;
  customerName: string;
  customer?: Customer | null;
  items: CartItem[];
  timestamp: number;
  note?: string;
  orderDiscount?: number;
  orderDiscountType?: "percentage" | "flat";
}

export interface OfflineOrder {
  id: string;
  orderData: POSOrderData;
  timestamp: number;
  attempts: number;
}

export interface POSOrderData {
  customer?: Customer;
  items: CartItem[];
  subtotal: number;
  tax?: number;
  taxRate?: number;
  discount?: number;
  roundingOff?: number;
  total: number;
  paymentMethod: string;
  amountReceived?: number;
  changeGiven?: number;
}

interface POSState {
  cart: CartItem[];
  heldOrders: HeldOrder[];
  offlineOrders: OfflineOrder[];
  searchQuery: string;
  selectedCategory: string;
  selectedCustomer: Customer | null;
  orderDiscount: number;
  orderDiscountType: "percentage" | "flat";

  // Actions
  addToCart: (product: POSProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateItemDiscount: (productId: string, discount: number) => void;
  clearCart: () => void;

  // Customer
  setCustomer: (customer: Customer | null) => void;

  // Order-level discount
  setOrderDiscount: (discount: number, type: "percentage" | "flat") => void;

  // Hold orders
  holdOrder: (customerName: string, note?: string) => void;
  resumeOrder: (orderId: string) => void;
  deleteHeldOrder: (orderId: string) => void;

  // Search & Filter
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;

  // Offline queue
  addOfflineOrder: (orderData: POSOrderData) => void;
  removeOfflineOrder: (orderId: string) => void;
  clearOfflineOrders: () => void;
  incrementOrderAttempts: (orderId: string) => void;
}

export const usePOSStore = create<POSState>()(
  persist(
    (set, get) => ({
      cart: [],
      heldOrders: [],
      offlineOrders: [],
      searchQuery: "",
      selectedCategory: "All",
      selectedCustomer: null,
      orderDiscount: 0,
      orderDiscountType: "flat",

      addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          // Check stock limit
          if (existingItem.quantity >= product.stock) {
            console.warn("Cannot add more than available stock");
            return;
          }

          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1, discount: 0 }] });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        const item = get().cart.find((item) => item.id === productId);
        if (item && quantity > item.stock) {
          console.warn("Cannot exceed available stock");
          return;
        }

        set({
          cart: get().cart.map((item: CartItem) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        });
      },

      updateItemDiscount: (productId: string, discount: number) => {
        set({
          cart: get().cart.map((item: CartItem) =>
            item.id === productId ? { ...item, discount } : item,
          ),
        });
      },

      clearCart: () => {
        set({
          cart: [],
          selectedCustomer: null,
          orderDiscount: 0,
          orderDiscountType: "flat",
        });
      },

      setCustomer: (customer: Customer | null) => {
        set({ selectedCustomer: customer });
      },

      setOrderDiscount: (discount: number, type: "percentage" | "flat") => {
        set({ orderDiscount: discount, orderDiscountType: type });
      },

      holdOrder: (customerName, note) => {
        const {
          cart,
          heldOrders,
          selectedCustomer,
          orderDiscount,
          orderDiscountType,
        } = get();
        if (cart.length === 0) return;

        const newHeldOrder: HeldOrder = {
          id: `HOLD-${Date.now()}`,
          customerName: customerName || `Customer ${heldOrders.length + 1}`,
          customer: selectedCustomer,
          items: [...cart],
          timestamp: Date.now(),
          note,
          orderDiscount,
          orderDiscountType,
        };

        set({
          heldOrders: [...heldOrders, newHeldOrder],
          cart: [],
          selectedCustomer: null,
          orderDiscount: 0,
          orderDiscountType: "flat",
        });
      },

      resumeOrder: (orderId) => {
        const { heldOrders } = get();
        const orderToResume = heldOrders.find((o) => o.id === orderId);

        if (!orderToResume) return;

        set({
          cart: [...orderToResume.items],
          selectedCustomer: orderToResume.customer || null,
          orderDiscount: orderToResume.orderDiscount || 0,
          orderDiscountType: orderToResume.orderDiscountType || "flat",
          heldOrders: heldOrders.filter((o) => o.id !== orderId),
        });
      },

      deleteHeldOrder: (orderId: string) => {
        set({
          heldOrders: get().heldOrders.filter(
            (o: HeldOrder) => o.id !== orderId,
          ),
        });
      },

      setSearchQuery: (query) => set({ searchQuery: query }),
      setCategory: (category) => set({ selectedCategory: category }),

      addOfflineOrder: (orderData: POSOrderData) => {
        const offlineOrder: OfflineOrder = {
          id: `OFFLINE-${Date.now()}`,
          orderData,
          timestamp: Date.now(),
          attempts: 0,
        };
        set({ offlineOrders: [...get().offlineOrders, offlineOrder] });
      },

      removeOfflineOrder: (orderId: string) => {
        set({
          offlineOrders: get().offlineOrders.filter(
            (o: OfflineOrder) => o.id !== orderId,
          ),
        });
      },

      clearOfflineOrders: () => set({ offlineOrders: [] }),

      incrementOrderAttempts: (orderId) => {
        set({
          offlineOrders: get().offlineOrders.map((o) =>
            o.id === orderId ? { ...o, attempts: o.attempts + 1 } : o,
          ),
        });
      },
    }),
    {
      name: "pos-storage", // localStorage key
    },
  ),
);
