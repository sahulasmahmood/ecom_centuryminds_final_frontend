"use client";

import { useState } from "react";
import { usePOSStore, POSProduct } from "@/store/use-pos-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

// Mock Data (Replace with API fetch)
const MOCK_PRODUCTS: POSProduct[] = [
  {
    id: "1",
    name: "1000 Wala",
    price: 450,
    stock: 50,
    category: "Ground Crackers",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Flower Pots (Big)",
    price: 120,
    stock: 200,
    category: "Ground Crackers",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Rocket Bomb",
    price: 80,
    stock: 150,
    category: "Aerial Crackers",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "Sparklers (10cm)",
    price: 40,
    stock: 500,
    category: "Sparklers",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    name: "Chakkar",
    price: 60,
    stock: 100,
    category: "Ground Crackers",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "6",
    name: "Standard Gift Box",
    price: 999,
    stock: 20,
    category: "Gift Boxes",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "7",
    name: "Multi-Shot 30",
    price: 1200,
    stock: 15,
    category: "Aerial Crackers",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "8",
    name: "Atom Bomb",
    price: 50,
    stock: 0,
    category: "Sound Crackers",
    image: "https://via.placeholder.com/150",
  },
];

const CATEGORIES = [
  "All",
  "Ground Crackers",
  "Aerial Crackers",
  "Sparklers",
  "Sound Crackers",
  "Gift Boxes",
];

export function POSProductGrid() {
  const {
    addToCart,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setCategory,
  } = usePOSStore();

  // Filtering Logic
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50 border-r">
      {/* Search & Filter Header */}
      <div className="p-4 bg-white border-b space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search products..."
            className="pl-10 h-10 bg-gray-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories - Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(cat)}
              className="whitespace-nowrap rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredProducts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <MagnifyingGlassIcon className="h-16 w-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`
                   group relative bg-white rounded-xl border shadow-sm p-3 flex flex-col gap-2 cursor-pointer transition-all hover:shadow-md hover:border-primary/50
                   ${product.stock === 0 ? "opacity-60 grayscale cursor-not-allowed" : ""}
                 `}
                onClick={() => product.stock > 0 && addToCart(product)}
              >
                {/* Image Placeholder */}
                <div className="aspect-square bg-gray-100 rounded-lg w-full flex items-center justify-center overflow-hidden">
                  {/* In real app, performant Next.js Image */}
                  <span className="text-4xl">🎆</span>
                </div>

                <div className="flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <span className="font-bold text-primary">
                      ₹{product.price}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full border ${product.stock > 10 ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}
                    >
                      {product.stock} left
                    </span>
                  </div>
                </div>

                {/* Hover Overlay */}
                {product.stock > 0 && (
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <div className="bg-white p-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <PlusIcon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
