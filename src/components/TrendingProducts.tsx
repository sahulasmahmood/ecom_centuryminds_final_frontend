"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { getAllProducts } from "@/MockData/ProductData";

export default function TrendingProducts() {
  const allProducts = getAllProducts();
  // Get products with best discounts
  const trendingProducts = [...allProducts]
    .sort((a, b) => {
      const discountA = a.variants[0]?.discount || 0;
      const discountB = b.variants[0]?.discount || 0;
      return discountB - discountA;
    })
    .slice(0, 10);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Trending Now
            </h2>
            <p className="text-gray-400 text-sm">
              Best deals with maximum savings
            </p>
          </div>
          <Link
            href="/product"
            className="text-sm font-bold text-primary hover:text-white transition-colors whitespace-nowrap flex items-center gap-1"
          >
            View All Deals <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
