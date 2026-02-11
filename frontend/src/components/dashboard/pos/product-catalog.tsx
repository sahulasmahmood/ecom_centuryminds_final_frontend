"use client";

import { useState } from "react";
import { usePOSStore } from "@/store/use-pos-store";
import type { POSProduct } from "@/services/posService";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import Image from "next/image";

interface ProductCatalogProps {
  products: POSProduct[];
  loading: boolean;
}

const categories = [
  "All",
  "ground-crackers",
  "aerial-crackers",
  "sparklers",
  "sound-crackers",
  "fancy-crackers",
  "gift-boxes",
];

export function ProductCatalog({ products, loading }: ProductCatalogProps) {
  const { selectedCategory, setCategory, addToCart } = usePOSStore();

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-3" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setCategory(category)}
            className="whitespace-nowrap"
          >
            {category === "All" ? "All Products" : category.replace("-", " ")}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Package className="h-12 w-12 mb-4" />
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: product.sellingPrice,
                stock: product.stock,
                category: product.category,
                image: product.image,
                sku: product.sku,
                gstPercentage: product.gstPercentage,
              })}
            >
              <div className="p-4">
                {/* Product Image */}
                <div className="aspect-square relative bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Package className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                  
                  {/* Stock Badge */}
                  <div className="absolute top-2 right-2">
                    {product.stock <= 0 ? (
                      <Badge variant="destructive">Out of Stock</Badge>
                    ) : product.stock <= 10 ? (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        Low Stock
                      </Badge>
                    ) : null}
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-green-600">
                        ₹{product.sellingPrice.toFixed(2)}
                      </p>
                      {product.mrp && product.mrp > product.sellingPrice && (
                        <p className="text-xs text-gray-500 line-through">
                          ₹{product.mrp.toFixed(2)}
                        </p>
                      )}
                    </div>
                    
                    <Button
                      size="sm"
                      className="h-8 w-8 p-0"
                      disabled={product.stock <= 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.sellingPrice,
                          stock: product.stock,
                          category: product.category,
                          image: product.image,
                          sku: product.sku,
                          gstPercentage: product.gstPercentage,
                        });
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Stock: {product.stock}</span>
                    {product.sku && <span>SKU: {product.sku}</span>}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
