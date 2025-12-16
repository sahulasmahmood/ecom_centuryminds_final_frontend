'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { getAllProducts } from '@/MockData/ProductData';
import { categories } from '@/MockData/CategoryData';

export default function PopularProducts() {
  const [activeCategory, setActiveCategory] = useState(0);
  const allProducts = getAllProducts();
  
  const filteredProducts = activeCategory === 0 
    ? allProducts.slice(0, 10)
    : allProducts.filter(p => p.categoryId === activeCategory).slice(0, 10);

  return (
    <section className="py-4 sm:py-6 md:py-8 bg-white">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Best Sellers</h2>
            <p className="text-xs sm:text-sm text-gray-500">Most popular products near you</p>
          </div>
          <Link 
            href="/product" 
            className="text-[#e63946] font-medium hover:underline text-xs sm:text-sm md:text-base"
          >
            View All →
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveCategory(0)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors active:scale-95 ${
              activeCategory === 0
                ? 'bg-[#e63946] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.slice(0, 6).map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors active:scale-95 ${
                activeCategory === category.id
                  ? 'bg-[#e63946] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
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
