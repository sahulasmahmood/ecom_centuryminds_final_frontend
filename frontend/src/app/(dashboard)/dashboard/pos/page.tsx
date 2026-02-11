"use client";

import { useEffect, useState } from "react";
import { usePOSStore } from "@/store/use-pos-store";
import { getPOSProducts, type POSProduct } from "@/services/posService";
import { ProductCatalog } from "@/components/dashboard/pos/product-catalog";
import { CartPanel } from "@/components/dashboard/pos/cart-panel";
import { CheckoutDialog } from "@/components/dashboard/pos/checkout-dialog";
import { HeldOrdersDialog } from "@/components/dashboard/pos/held-orders-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function POSPage() {
  const [products, setProducts] = useState<POSProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [heldOrdersOpen, setHeldOrdersOpen] = useState(false);
  
  const { searchQuery, setSearchQuery, selectedCategory, heldOrders, cart } = usePOSStore();
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await getPOSProducts({
        search: searchQuery || undefined,
        category: selectedCategory !== "All" ? selectedCategory : undefined,
        limit: 100,
      });
      setProducts(response.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products by name, SKU, or barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setHeldOrdersOpen(true)}
              className="relative"
            >
              <Clock className="h-4 w-4 mr-2" />
              Held Orders
              {heldOrders.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {heldOrders.length}
                </span>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.location.href = "/dashboard/pos/orders"}
            >
              <Package className="h-4 w-4 mr-2" />
              View Orders
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Product Catalog */}
        <div className="flex-1 overflow-auto">
          <ProductCatalog products={products} loading={loading} />
        </div>

        {/* Cart Panel */}
        <div className="w-96 border-l bg-white">
          <CartPanel onCheckout={() => setCheckoutOpen(true)} />
        </div>
      </div>

      {/* Dialogs */}
      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        onSuccess={() => {
          setCheckoutOpen(false);
          loadProducts(); // Reload to update stock
        }}
      />
      
      <HeldOrdersDialog
        open={heldOrdersOpen}
        onOpenChange={setHeldOrdersOpen}
      />
    </div>
  );
}
