'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/MockData/ProductData';
import { categories } from '@/MockData/CategoryData';
import { IconChevronLeft, IconChevronRight, IconFilter, IconX } from '@tabler/icons-react';

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const itemsPerPage = 15;

  const allProducts = getAllProducts();
  
  // Filter by category
  let filteredProducts = selectedCategory 
    ? allProducts.filter(p => p.categoryId === selectedCategory)
    : allProducts;

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.variants[0].price - b.variants[0].price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.variants[0].price - a.variants[0].price);
  } else if (sortBy === 'discount') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.variants[0].discount - a.variants[0].discount);
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setShowMobileFilter(false);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
              <Link href="/" className="text-[#e63946] hover:underline">Home</Link>
              <span>/</span>
              <span className="text-gray-900">All Products</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex gap-4 sm:gap-6">
            {/* Sidebar Filters - Desktop */}
            <div className="w-64 flex-shrink-0 hidden lg:block">
              <div className="bg-white rounded-lg p-4 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <IconFilter size={20} className="text-gray-600" />
                  <h3 className="font-semibold text-gray-800">Filters</h3>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-800 mb-3">Categories</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCategorySelect(null)}
                      className={`w-full text-left px-3 py-2 rounded text-sm ${
                        selectedCategory === null 
                          ? 'bg-[#e63946] text-white' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 ${
                          selectedCategory === category.id 
                            ? 'bg-[#e63946] text-white' 
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Sort Bar */}
              <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 flex items-center justify-between gap-2">
                <p className="text-gray-600 text-xs sm:text-sm">
                  <span className="hidden sm:inline">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                  </span>
                  <span className="sm:hidden">{filteredProducts.length} items</span>
                </p>
                <div className="flex items-center gap-2">
                  {/* Mobile Filter Button */}
                  <button 
                    onClick={() => setShowMobileFilter(true)}
                    className="lg:hidden flex items-center gap-1 px-3 py-1.5 border rounded text-sm"
                  >
                    <IconFilter size={16} />
                    <span>Filter</span>
                  </button>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded px-2 sm:px-3 py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#e63946]"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Discount</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 sm:p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    <IconChevronLeft size={18} className="sm:w-5 sm:h-5" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm ${
                        currentPage === i + 1
                          ? 'bg-[#e63946] text-white'
                          : 'border hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 sm:p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    <IconChevronRight size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {showMobileFilter && (
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setShowMobileFilter(false)}>
            <div 
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Filter by Category</h3>
                <button onClick={() => setShowMobileFilter(false)} className="p-1">
                  <IconX size={24} />
                </button>
              </div>
              <div className="p-4 space-y-2">
                <button
                  onClick={() => handleCategorySelect(null)}
                  className={`w-full text-left px-3 py-3 rounded text-sm ${
                    selectedCategory === null 
                      ? 'bg-[#e63946] text-white' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`w-full text-left px-3 py-3 rounded text-sm flex items-center gap-2 ${
                      selectedCategory === category.id 
                        ? 'bg-[#e63946] text-white' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer01 />
      <Footer02 />
    </>
  );
}
