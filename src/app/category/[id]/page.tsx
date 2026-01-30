'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/MockData/ProductData';
import { categories, getCategoryBySlug, getCategoryById } from '@/MockData/CategoryData';
import { IconChevronRight, IconChevronLeft, IconFilter, IconX } from '@tabler/icons-react';

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const itemsPerPage = 15;

  // Try to find category by slug first, then by id
  const category = getCategoryBySlug(id) || getCategoryById(parseInt(id));
  
  if (!category) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4">Category Not Found</h1>
            <Link href="/" className="text-[#e63946] hover:underline">Return to Home</Link>
          </div>
        </div>
        <Footer01 />
        <Footer02 />
      </>
    );
  }

  let products = getProductsByCategory(category.id);

  // Sort products
  if (sortBy === 'price-low') {
    products = [...products].sort((a, b) => a.variants[0].price - b.variants[0].price);
  } else if (sortBy === 'price-high') {
    products = [...products].sort((a, b) => b.variants[0].price - a.variants[0].price);
  } else if (sortBy === 'discount') {
    products = [...products].sort((a, b) => b.variants[0].discount - a.variants[0].discount);
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-[#0a0a0a] border-b border-white/5">
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Link href="/" className="text-gray-400 hover:text-[#FFD700] transition-colors">Home</Link>
              <IconChevronRight size={14} className="text-gray-600" />
              <span className="text-white font-medium">{category.name}</span>
            </div>
          </div>
        </div>

        {/* Category Header */}
        <div className="bg-[#111] border-b border-white/5 relative overflow-hidden">
           {/* Background decorative element */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           
           <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 relative z-10">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="text-4xl sm:text-6xl filter drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">{category.icon}</span>
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 tracking-tight">{category.name}</h1>
                <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">{category.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="flex gap-6 sm:gap-8">
            {/* Sidebar - Desktop */}
            <div className="w-64 flex-shrink-0 hidden lg:block">
              <div className="bg-[#0a0a0a] rounded-sm p-5 border border-white/10 sticky top-24">
                <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                  <IconFilter size={20} className="text-[#FFD700]" />
                  <h3 className="font-bold text-white tracking-wide uppercase text-sm">Categories</h3>
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      className={`block px-3 py-2.5 rounded-sm text-sm transition-colors border border-transparent ${
                        cat.id === category.id
                          ? 'bg-[#FFD700] text-black font-bold'
                          : 'hover:bg-white/5 text-gray-300 hover:border-white/10'
                      }`}
                    >
                      <span className="mr-3 opacty-70">{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="flex-1">
              {/* Sort Bar */}
              <div className="bg-[#0a0a0a] rounded-sm p-4 mb-6 flex items-center justify-between gap-4 border border-white/10">
                <p className="text-gray-400 text-xs sm:text-sm">
                  <span className="hidden sm:inline">
                     <span className="text-white font-bold">{products.length}</span> products found
                  </span>
                  <span className="sm:hidden text-white">{products.length} items</span>
                </p>
                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <button 
                    onClick={() => setShowMobileFilter(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-white/10 rounded-sm text-sm text-white hover:bg-white/5 transition-colors"
                  >
                    <IconFilter size={16} />
                    <span>Filter</span>
                  </button>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                         className="appearance-none bg-[#111] border border-white/10 rounded-sm pl-4 pr-10 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FFD700] cursor-pointer hover:border-white/30 transition-colors"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="discount">Discount</option>
                    </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {currentProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-[#0a0a0a] rounded-sm p-12 text-center border border-white/10">
                  <p className="text-gray-400">No products found in this category.</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 border-t border-white/10 pt-8">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                     className="p-2 rounded-sm border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-colors"
                  >
                    <IconChevronLeft size={20} />
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
                     className="p-2 rounded-sm border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-colors"
                  >
                    <IconChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {showMobileFilter && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden" onClick={() => setShowMobileFilter(false)}>
            <div 
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[#111] border-l border-white/10 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-bold text-white uppercase tracking-wider">Categories</h3>
                <button onClick={() => setShowMobileFilter(false)} className="p-1 text-gray-400 hover:text-white">
                  <IconX size={24} />
                </button>
              </div>
              <div className="p-5 space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setShowMobileFilter(false)}
                    className={`block px-4 py-3 rounded-sm text-sm transition-colors border border-transparent ${
                      cat.id === category.id
                        ? 'bg-[#FFD700] text-black font-bold'
                        : 'bg-[#1a1a1a] text-gray-300 hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    <span className="mr-3">{cat.icon}</span>
                    {cat.name}
                  </Link>
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
