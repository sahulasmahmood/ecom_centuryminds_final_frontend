"use client";

import React, { useState, useEffect } from "react";
import { ProductCatalog } from "./product-catalog";
import { CartPanel } from "./cart-panel";
import { toast } from "@/hooks/use-toast";
import { getPOSProducts, type POSProduct } from "@/services/posService";
import { usePOSStore } from "@/store/use-pos-store";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const POSInterface = () => {
  const [products, setProducts] = useState<POSProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const { cart, clearCart, selectedCategory } = usePOSStore();

  // Calculate totals locally for now (can be moved to store or use a selector)
  const calculateTotals = () => {
    const subtotal = cart.reduce((acc, item) => {
      const itemTotal = item.price * item.quantity;
      const discount = item.discount || 0; // Assuming simple discount for now
      return acc + (itemTotal - discount);
    }, 0);

    const tax = subtotal * 0.18; // Example GST
    const total = subtotal; // Assuming inclusive price

    return { subtotal, tax, total };
  };

  const totals = calculateTotals();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getPOSProducts(); // Fetch all products initially
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      });
      // Fallback mock data if API fails to avoid breaking UI during dev
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.sku &&
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category filtering is handled inside ProductCatalog via store,
    // but if we want to filter here we can.
    // However, ProductCatalog uses usePOSStore() to get selectedCategory and handles UI for filters.
    // Ideally, we should unify this.
    // Looking at ProductCatalog, it has category buttons and sets selectedCategory in store.
    // It doesn't seem to filter the passed 'products' prop based on category internally,
    // it just maps 'products'.
    // So we MUST filter by category here if ProductCatalog expects pre-filtered products,
    // OR ProductCatalog should filter them.

    // Let's check ProductCatalog again...
    // It renders category buttons -> updates store.
    // It maps 'products' prop directly.
    // So it does NOT filter by category. We need to do it here.

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (confirm(`Confirm Sale of ₹${totals.total.toFixed(2)}?`)) {
      toast({
        title: "Order Created",
        description: "Order created successfully!",
      });
      clearCart();
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-gray-100">
      {/* Left: Product Catalog */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 bg-white border-b flex justify-between items-center bg-card">
          <h1 className="text-xl font-bold text-foreground">Skyspark POS</h1>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ProductCatalog products={filteredProducts} loading={loading} />
        </div>
      </div>

      {/* Right: Cart Panel */}
      <div className="w-[400px] flex-shrink-0 bg-background border-l shadow-xl z-20">
        <CartPanel onCheckout={handleCheckout} />
      </div>
    </div>
  );
};
