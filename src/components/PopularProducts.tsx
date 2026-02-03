"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { getAllProducts } from "@/MockData/ProductData";
import { categories } from "@/MockData/CategoryData";
import { IconChevronRight } from "@tabler/icons-react";

export default function PopularProducts() {
  const [activeCategory, setActiveCategory] = useState(0);
  const allProducts = getAllProducts();

  const filteredProducts =
    activeCategory === 0
      ? allProducts.slice(0, 10)
      : allProducts.filter((p) => p.categoryId === activeCategory).slice(0, 10);

  return (
    <section className="py-12 bg-background border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Best Selling Fireworks
            </h2>
            <p className="text-gray-400 text-sm">
              Top rated crackers chosen by our customers
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <button
              onClick={() => setActiveCategory(0)}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                activeCategory === 0
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-gray-400 border-white/10 hover:border-white hover:text-white"
              }`}
            >
              All
            </button>
            {categories.slice(0, 5).map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                  activeCategory === category.id
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-gray-400 border-white/10 hover:border-white hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
            <Link
              href="/product"
              className="ml-4 text-sm font-bold text-primary hover:text-white transition-colors whitespace-nowrap flex items-center gap-1"
            >
              View All <IconChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
