"use client";

import React, { useState, useEffect } from "react";
import { ProductCatalog } from "./product-catalog";
import { CartPanel } from "./cart-panel";
import { toast } from "sonner"; // Assuming sonner is used, or fallback to alert/console

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
  image?: string;
  gstPercentage?: number;
}

export interface CartItem extends Product {
  quantity: number;
  discount?: number;
  discountType?: "percentage" | "flat";
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
}

export const POSInterface = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  // Totals
  const [totals, setTotals] = useState({ subtotal: 0, tax: 0, total: 0 });

  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((acc, item) => {
      const itemTotal = item.price * item.quantity;
      const discount =
        item.discountType === "flat"
          ? item.discount || 0
          : (itemTotal * (item.discount || 0)) / 100;
      return acc + (itemTotal - discount);
    }, 0);

    // Simple GST calc (assuming inclusive or exclusive logic, here inclusive for retail)
    // For crackers, usually 18% GST. Let's show it as part of breakdown.
    const tax = subtotal * 0.18;
    const total = subtotal; // If price is inclusive. Or subtotal + tax.
    // Let's assume Price is Selling Price (Inclusive) for simplicity in prototype

    setTotals({ subtotal, tax, total });
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // toast.success(`${product.name} added`);
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    if (confirm(`Confirm Sale of ₹${totals.total.toFixed(2)}?`)) {
      // Here we would call the API to create order
      alert("Order Created Successfully! (Invoice Generated)");
      clearCart();
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-gray-100">
      {/* Left: Product Catalog */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 bg-white border-b">
          <h1 className="text-xl font-bold text-gray-800">Skyspark POS</h1>
        </div>
        <ProductCatalog
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddToCart={addToCart}
        />
      </div>

      {/* Right: Cart Panel */}
      <div className="w-[400px] flex-shrink-0 bg-white border-l shadow-xl z-20">
        <CartPanel
          cartItems={cartItems}
          totals={totals}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};
