"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer01 from "@/components/Footer01";
import Footer02 from "@/components/Footer02";
import { getAllProducts } from "@/MockData/ProductData";
import { categories } from "@/MockData/CategoryData";
import { useCart } from "@/context/CartContext";
import { IconMinus, IconPlus, IconBolt } from "@tabler/icons-react";

export default function QuickPurchasePage() {
  const { addToCart } = useCart();
  const allProducts = getAllProducts();

  // State to track quantities for each product variant
  // Key format: `${productId}-${variantIndex}`
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addingToCart, setAddingToCart] = useState(false);

  // Search/Filter state
  const [searchTerm, setSearchTerm] = useState("");

  const handleQuantityChange = (
    productId: number,
    variantIndex: number,
    value: string,
  ) => {
    const qty = parseInt(value) || 0;
    const key = `${productId}-${variantIndex}`;
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(0, qty),
    }));
  };

  const incrementQty = (productId: number, variantIndex: number) => {
    const key = `${productId}-${variantIndex}`;
    setQuantities((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const decrementQty = (productId: number, variantIndex: number) => {
    const key = `${productId}-${variantIndex}`;
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) - 1),
    }));
  };

  const calculateTotal = () => {
    let totalQty = 0;
    let totalPrice = 0;

    Object.entries(quantities).forEach(([key, qty]) => {
      if (qty > 0) {
        const [productId, variantIndexStr] = key.split("-").map(Number);
        const product = allProducts.find((p) => p.id === productId);
        if (product) {
          const variant = product.variants[variantIndexStr];
          totalQty += qty;
          totalPrice += variant.price * qty;
        }
      }
    });

    return { totalQty, totalPrice };
  };

  const handleBulkAddToCart = () => {
    setAddingToCart(true);
    let itemsAdded = 0;

    Object.entries(quantities).forEach(([key, qty]) => {
      if (qty > 0) {
        const [productId, variantIndexStr] = key.split("-").map(Number);
        const product = allProducts.find((p) => p.id === productId);
        if (product) {
          addToCart(product, variantIndexStr, qty);
          itemsAdded++;
        }
      }
    });

    if (itemsAdded > 0) {
      // Optional: Reset requests or keep them?
      // Usually better to reset or show success message.
      // Resetting feels cleaner for "New Order".
      setQuantities({});
      alert(`Successfully added ${itemsAdded} items to cart!`);
    } else {
      alert("Please select at least one item.");
    }
    setAddingToCart(false);
  };

  const { totalQty, totalPrice } = calculateTotal();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pb-32">
        {/* Header Section */}
        <div className="bg-card border-b border-border py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Quick Purchase <span className="text-primary">Price List</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Bulk order made easy. Select quantities for multiple items and add
              to cart in one click.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-muted border border-border rounded-full px-6 py-3 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-2 md:px-4 py-8">
          {/* Categories Loop */}
          <div className="space-y-12">
            {categories.map((category) => {
              // Filter products for this category
              const categoryProducts = allProducts.filter(
                (p) =>
                  p.categoryId === category.id &&
                  (searchTerm === "" ||
                    p.name.toLowerCase().includes(searchTerm.toLowerCase())),
              );

              if (categoryProducts.length === 0) return null;

              return (
                <div
                  key={category.id}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="bg-muted px-6 py-4 border-b border-border flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h2 className="text-xl font-bold text-foreground uppercase tracking-wider">
                      {category.name}
                    </h2>
                  </div>

                  {/* Desktop Table Header */}
                  <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-card text-xs font-bold text-muted-foreground uppercase tracking-widest border-b border-border">
                    <div className="col-span-1">Image</div>
                    <div className="col-span-3">Product Name</div>
                    <div className="col-span-2 text-center">Unit</div>
                    <div className="col-span-2 text-right">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

                  {/* Products List */}
                  <div className="divide-y divide-white/5">
                    {categoryProducts.map((product) =>
                      product.variants.map((variant, index) => {
                        const key = `${product.id}-${index}`;
                        const qty = quantities[key] || 0;
                        const rowTotal = qty * variant.price;

                        return (
                          <div
                            key={key}
                            className="group hover:bg-muted transition-colors"
                          >
                            {/* Desktop View */}
                            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 items-center">
                              {/* Image */}
                              <div className="col-span-1 relative h-12 w-12 bg-muted rounded overflow-hidden">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              {/* Name */}
                              <div className="col-span-3">
                                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                  {product.name}
                                </h3>
                              </div>

                              {/* Unit / Weight */}
                              <div className="col-span-2 text-center">
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded border border-border">
                                  {variant.unit}
                                </span>
                              </div>

                              {/* Price */}
                              <div className="col-span-2 text-right">
                                <div className="font-mono text-primary font-bold">
                                  ₹{variant.price}
                                </div>
                                <div className="text-xs text-muted-foreground line-through">
                                  ₹{variant.mrp}
                                </div>
                              </div>

                              {/* Quantity Input */}
                              <div className="col-span-2 flex items-center justify-center gap-2">
                                <button
                                  onClick={() =>
                                    decrementQty(product.id, index)
                                  }
                                  className="w-8 h-8 rounded bg-muted hover:bg-secondary hover:text-foreground flex items-center justify-center text-muted-foreground transition-colors"
                                >
                                  <IconMinus size={14} />
                                </button>
                                <input
                                  type="number"
                                  min="0"
                                  value={qty || ""}
                                  placeholder="0"
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      product.id,
                                      index,
                                      e.target.value,
                                    )
                                  }
                                  className="w-16 bg-card border border-border rounded py-1.5 text-center text-foreground focus:outline-none focus:border-primary"
                                />
                                <button
                                  onClick={() =>
                                    incrementQty(product.id, index)
                                  }
                                  className="w-8 h-8 rounded bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center text-muted-foreground transition-colors"
                                >
                                  <IconPlus size={14} />
                                </button>
                              </div>

                              {/* Row Total */}
                              <div className="col-span-2 text-right font-mono text-foreground font-bold">
                                {qty > 0 ? `₹${rowTotal}` : "-"}
                              </div>
                            </div>

                            {/* Mobile View */}
                            <div className="md:hidden p-4 flex gap-4">
                              <div className="relative h-20 w-20 flex-shrink-0 bg-muted rounded overflow-hidden">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-foreground mb-1">
                                  {product.name}
                                </h3>
                                <p className="text-xs text-muted-foreground mb-2">
                                  {variant.unit}
                                </p>
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <span className="font-bold text-primary">
                                      ₹{variant.price}
                                    </span>
                                    <span className="text-xs text-muted-foreground line-through ml-2">
                                      ₹{variant.mrp}
                                    </span>
                                  </div>
                                  <div className="text-sm font-bold text-foreground">
                                    {qty > 0 && `Total: ₹${rowTotal}`}
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() =>
                                      decrementQty(product.id, index)
                                    }
                                    className="w-10 h-10 rounded bg-muted border border-border flex items-center justify-center text-foreground"
                                  >
                                    <IconMinus size={16} />
                                  </button>
                                  <input
                                    type="number"
                                    min="0"
                                    value={qty || ""}
                                    placeholder="0"
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        product.id,
                                        index,
                                        e.target.value,
                                      )
                                    }
                                    className="flex-1 bg-card border border-border rounded py-2 text-center text-foreground focus:outline-none focus:border-primary"
                                  />
                                  <button
                                    onClick={() =>
                                      incrementQty(product.id, index)
                                    }
                                    className="w-10 h-10 rounded bg-primary text-primary-foreground flex items-center justify-center"
                                  >
                                    <IconPlus size={16} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }),
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-2xl z-40 pb-safe">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:block">
            <div className="text-xs text-muted-foreground uppercase tracking-widest">
              Total Items
            </div>
            <div className="text-2xl font-bold text-foreground">{totalQty}</div>
          </div>

          <div className="flex items-center gap-4 md:gap-8 flex-1 justify-end">
            <div className="text-right">
              <div className="text-xs text-muted-foreground uppercase tracking-widest">
                Grand Total
              </div>
              <div className="text-xl md:text-3xl font-bold text-primary">
                ₹{totalPrice}
              </div>
            </div>

            <button
              onClick={handleBulkAddToCart}
              disabled={totalQty === 0 || addingToCart}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground px-6 md:px-10 py-3 md:py-4 rounded-sm font-bold tracking-wider uppercase flex items-center gap-2 transition-all"
            >
              <IconBolt size={20} />
              <span className="hidden md:inline">Quick Add to Cart</span>
              <span className="md:hidden">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 20px);
        }
      `}</style>
      <Footer01 />
      <Footer02 />
    </>
  );
}
