"use client";

import React, { useState } from "react";
import { Product } from "./pos-interface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

// Mock Data for POS
const POS_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "1000 Wala Giant",
    price: 850,
    category: "Walas",
    stock: 50,
    sku: "WL-1001",
    gstPercentage: 18,
  },
  {
    id: "2",
    name: "Flower Pot Big (10 Pcs)",
    price: 350,
    category: "Flower Pots",
    stock: 120,
    sku: "FP-2001",
    gstPercentage: 18,
  },
  {
    id: "3",
    name: "Standard Sparklers 10cm",
    price: 60,
    category: "Sparklers",
    stock: 500,
    sku: "SP-3001",
    gstPercentage: 18,
  },
  {
    id: "4",
    name: "Rocket Bomb (12 Pcs)",
    price: 220,
    category: "Rockets",
    stock: 80,
    sku: "RK-4001",
    gstPercentage: 18,
  },
  {
    id: "5",
    name: "Sky Shot 12 Color",
    price: 650,
    category: "Sky Shots",
    stock: 30,
    sku: "SS-5001",
    gstPercentage: 18,
  },
  {
    id: "6",
    name: "Gift Box Premium",
    price: 2500,
    category: "Gift Boxes",
    stock: 15,
    sku: "GB-6001",
    gstPercentage: 18,
  },
  {
    id: "7",
    name: "Atom Bomb Green",
    price: 120,
    category: "Atom Bombs",
    stock: 200,
    sku: "AB-7001",
    gstPercentage: 18,
  },
];

const CATEGORIES = [
  "All",
  "Walas",
  "Flower Pots",
  "Sparklers",
  "Rockets",
  "Sky Shots",
  "Gift Boxes",
];

interface Props {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onAddToCart: (p: Product) => void;
}

export const ProductCatalog: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  onAddToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = POS_PRODUCTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      {/* Filters */}
      <div className="p-4 space-y-4 bg-white border-b">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search products by Name or SKU..."
            className="pl-10 bg-gray-50 border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="whitespace-nowrap rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => onAddToCart(product)}
              className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-primary/50 transition-all text-left"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                {/* Placeholder for Image */}
                <div className="text-4xl font-bold text-gray-300 select-none">
                  {product.name.charAt(0)}
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-primary text-white p-1 rounded-full shadow-lg">
                    <PlusIcon className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="p-3 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight h-10">
                    {product.name}
                  </h3>
                </div>
                <p className="text-xs text-gray-500">{product.sku}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  <Badge variant="secondary" className="text-xs font-normal">
                    {product.stock} In Stock
                  </Badge>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
