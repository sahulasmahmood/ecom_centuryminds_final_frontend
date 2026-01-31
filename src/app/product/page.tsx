'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/MockData/ProductData';
import { categories } from '@/MockData/CategoryData';
import { IconChevronLeft, IconChevronRight, IconFilter, IconX, IconAdjustmentsHorizontal, IconChevronDown } from '@tabler/icons-react';

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const itemsPerPage = 12;

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
      <main className="min-h-screen bg-background">
        
        {/* Premium Hero Header */}
        <div className="relative h-[300px] sm:h-[400px] overflow-hidden flex items-center justify-center">
           <Image 
             src="/assets/images/hero_fireworks.png" 
             alt="All Products" 
             fill 
             className="object-cover opacity-60"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
           <div className="relative z-10 text-center px-4">
              <span className="text-[#E31837] font-bold tracking-[0.2em] uppercase text-sm sm:text-base mb-4 block">Premium Collection</span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-6">
                 ALL PRODUCTS
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Link href="/" className="hover:text-[#FFD700] transition-colors">Home</Link>
                <span className="text-[#FFD700]">•</span>
                <span className="text-white">Shop</span>
              </div>
           </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Sidebar Filters - Glassmorphism */}
            <div className="w-full lg:w-72 flex-shrink-0 hidden lg:block">
              <div className="sticky top-24 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-sm p-6">
                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                  <IconAdjustmentsHorizontal size={20} className="text-[#FFD700]" />
                  <h3 className="font-bold text-white tracking-widest uppercase text-sm">Filters</h3>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h4 className="font-bold text-gray-500 mb-4 text-xs uppercase tracking-widest pl-2">Categories</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => handleCategorySelect(null)}
                      className={`w-full text-left px-4 py-3 rounded-sm text-sm transition-all duration-300 border-l-2 ${
                        selectedCategory === null 
                          ? 'border-[#FFD700] bg-white/5 text-white font-bold pl-6' 
                          : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5 hover:pl-6'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-sm text-sm transition-all duration-300 border-l-2 flex items-center justify-between group ${
                          selectedCategory === category.id 
                            ? 'border-[#FFD700] bg-white/5 text-white font-bold pl-6' 
                            : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5 hover:pl-6'
                        }`}
                      >
                        <span>{category.name}</span>
                        {selectedCategory === category.id && <span className="text-[#FFD700] text-xs">●</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Placeholder */}
                <div>
                   <h4 className="font-bold text-gray-500 mb-4 text-xs uppercase tracking-widest pl-2">Price Range</h4>
                   <div className="px-2">
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-[#FFD700] w-2/3"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                         <span>₹100</span>
                         <span>₹5000+</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Sort Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
                <p className="text-gray-400 text-sm">
                  Showing <span className="text-white font-bold">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</span> of <span className="text-white font-bold">{filteredProducts.length}</span> results
                </p>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Mobile Filter Toggle */}
                  <button 
                    onClick={() => setShowMobileFilter(true)}
                    className="lg:hidden flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-white/10 bg-[#111] rounded-sm text-sm text-white hover:border-[#FFD700] transition-colors uppercase tracking-wider font-bold"
                  >
                    <IconFilter size={16} />
                    Filters
                  </button>

                  <div className="relative flex-1 sm:flex-none z-20">
                    <button
                      onClick={() => setIsSortOpen(!isSortOpen)}
                      className="w-full sm:w-[200px] flex items-center justify-between bg-[#111] border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFD700] hover:border-white/30 transition-colors"
                    >
                      <span className="truncate mr-2">
                        {sortBy === 'relevance' && 'Sort by: Relevance'}
                        {sortBy === 'price-low' && 'Price: Low to High'}
                        {sortBy === 'price-high' && 'Price: High to Low'}
                        {sortBy === 'discount' && 'Sort by: Discount'}
                      </span>
                      <IconChevronDown size={16} className={`text-[#FFD700] flex-shrink-0 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isSortOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-[#111] border border-white/10 rounded-sm shadow-xl overflow-hidden">
                        {[
                          { value: 'relevance', label: 'Sort by: Relevance' },
                          { value: 'price-low', label: 'Price: Low to High' },
                          { value: 'price-high', label: 'Price: High to Low' },
                          { value: 'discount', label: 'Sort by: Discount' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setIsSortOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-white/5 ${
                              sortBy === option.value ? 'text-[#FFD700] font-bold' : 'text-gray-300'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {currentProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                 <div className="py-20 text-center border border-white/10 rounded-sm bg-[#111]">
                    <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                    <p className="text-gray-400">Try adjusting your filters or search criteria.</p>
                 </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-colors"
                  >
                    <IconChevronLeft size={18} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-sm text-sm font-bold transition-colors ${
                        currentPage === i + 1
                          ? 'bg-[#FFD700] text-black border border-[#FFD700]'
                          : 'bg-transparent text-white border border-white/10 hover:border-[#FFD700] hover:text-[#FFD700]'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-colors"
                  >
                    <IconChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {showMobileFilter && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 lg:hidden" onClick={() => setShowMobileFilter(false)}>
            <div 
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[#111] border-l border-white/10 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0a0a0a]">
                <h3 className="font-bold text-white uppercase tracking-widest">Filter Items</h3>
                <button onClick={() => setShowMobileFilter(false)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                  <IconX size={20} />
                </button>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-[#FFD700] mb-4 text-xs uppercase tracking-widest">Categories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className={`w-full text-left px-4 py-3 rounded-sm text-sm transition-colors border border-transparent ${
                      selectedCategory === null 
                        ? 'bg-[#FFD700] text-black font-bold' 
                        : 'bg-[#1a1a1a] text-gray-300 hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-sm text-sm flex items-center justify-between transition-colors border border-transparent ${
                        selectedCategory === category.id 
                           ? 'bg-[#FFD700] text-black font-bold' 
                            : 'bg-[#1a1a1a] text-gray-300 hover:bg-white/5 hover:border-white/10'
                      }`}
                    >
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
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
