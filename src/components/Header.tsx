'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { 
  IconChevronDown,
  IconChevronRight,
  IconSearch,
  IconShoppingCart,
  IconUser,
  IconMenu2,
  IconX,
  IconHome,
  IconBolt,
} from '@tabler/icons-react';
import { categories } from '@/MockData/CategoryData';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-white/10">
      {/* Main Header */}
      <div className="bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-white p-1 hover:text-[#FFD700] transition-colors"
            >
              <IconMenu2 size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#FFD700] group-hover:shadow-[0_0_10px_rgba(255,215,0,0.3)] transition-shadow">
                <Image 
                  src="/assets/images/hero_fireworks.png"
                  alt="SkySpark"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#FFD700] transition-colors">SkySpark</span>
            </Link>

            {/* Shop by Category - Desktop Only */}
            <div 
              className="relative hidden lg:block"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <button className="bg-[#FFD700] text-black px-6 py-2.5 rounded-sm flex items-center gap-2 hover:bg-white transition-colors focus:outline-none font-bold tracking-wide uppercase text-sm">
                <IconMenu2 size={18} />
                Products
                <IconChevronDown size={16} className={`transition-transform ${showMegaMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu */}
              {showMegaMenu && (
                <div className="absolute top-full left-0 mt-0 bg-[#0a0a0a] border border-white/10 flex z-50 min-w-[700px] shadow-2xl">
                  {/* Categories List */}
                  <div className="w-64 bg-[#111] border-r border-white/5 py-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className={`flex items-center justify-between px-6 py-3 cursor-pointer transition-colors ${
                          activeCategory.id === category.id 
                            ? 'bg-[#FFD700] text-black' 
                            : 'hover:bg-white/5 text-gray-300'
                        }`}
                        onMouseEnter={() => setActiveCategory(category)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg opacity-70">{category.icon}</span>
                          <span className="text-sm font-bold uppercase tracking-wider">{category.name}</span>
                        </div>
                        <IconChevronRight size={14} className={activeCategory.id === category.id ? "text-black" : "text-gray-600"} />
                      </div>
                    ))}
                  </div>

                  {/* Subcategories */}
                  <div className="flex-1 p-8 text-white">
                    <div className="mb-6 pb-4 border-b border-white/10">
                      <Link 
                        href={`/category/${activeCategory.slug}`}
                        className="text-xl font-bold text-white hover:text-[#FFD700] transition-colors"
                      >
                        {activeCategory.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-2">{activeCategory.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      {activeCategory.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${activeCategory.slug}?sub=${sub.slug}`}
                          className="text-sm text-gray-400 hover:text-white transition-colors py-1 flex items-center gap-2 group/item"
                        >
                          <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/item:bg-[#FFD700] transition-colors"></span>
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded-sm overflow-hidden w-full focus-within:border-[#FFD700] transition-colors">
                <input 
                  type="text" 
                  placeholder="Search firecrackers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
                />
                <button className="px-4 text-gray-400 hover:text-[#FFD700] transition-colors">
                  <IconSearch size={20} />
                </button>
              </div>
            </div>

            {/* Mobile Search Button */}
            <button 
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden text-white p-1"
            >
              <IconSearch size={22} />
            </button>

            {/* Account Actions - Desktop */}
            <div className="hidden sm:flex items-center gap-6">
               <Link href="/login" className="flex flex-col items-center group">
                  <IconUser size={22} className="text-gray-300 group-hover:text-[#FFD700] transition-colors" />
                  <span className="text-[10px] uppercase font-bold text-gray-500 mt-0.5 group-hover:text-white">Account</span>
               </Link>
               
               <Link href="/cart" className="flex flex-col items-center group relative">
                  <div className="relative">
                    <IconShoppingCart size={22} className="text-gray-300 group-hover:text-[#FFD700] transition-colors" />
                    <span className="absolute -top-1.5 -right-1.5 bg-[#E31837] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {totalItems}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-500 mt-0.5 group-hover:text-white">Cart</span>
               </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {mobileSearchOpen && (
            <div className="md:hidden mt-4">
              <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded-sm overflow-hidden">
                <input 
                  type="text" 
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
                  autoFocus
                />
                <button className="px-3 text-gray-400">
                  <IconSearch size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Navigation Bar - Desktop - Sleek Dark */}
      <div className="hidden lg:block bg-[#111] border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
             <div className="flex items-center gap-8 mx-auto pl-32"> {/* Centered Links with offset to balance */}
               <Link href="/" className="text-sm font-bold uppercase tracking-wider text-[#FFD700] hover:text-white transition-colors">
                 Home
               </Link>
              {categories.slice(0, 6).map((category) => (
                <Link 
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wide"
                >
                  {category.name}
                </Link>
              ))}
              <Link href="/product" className="text-sm font-bold uppercase tracking-wider text-[#E31837] hover:text-white transition-colors">
                 Sale
               </Link>
             </div>
             
             {/* Quick Buy - Right Aligned */}
             <Link href="/quick-purchase" className="hidden lg:flex text-white hover:text-[#FFD700] transition-colors font-bold tracking-wide uppercase text-xs items-center gap-1 border border-white/20 px-3 py-1.5 rounded-sm hover:border-[#FFD700]">
                <IconBolt size={16} className="text-[#E31837]" />
                Quick Purchase
             </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute left-0 top-0 h-full w-[80%] max-w-sm bg-[#111] border-r border-white/10 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="bg-[#0a0a0a] p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                 <span className="text-xl font-bold text-white tracking-tight">SkySpark</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white p-1 hover:text-[#E31837]">
                <IconX size={24} />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="p-4 space-y-2">
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Account</h3>
                <Link href="/login" className="flex items-center gap-3 py-2 text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                  <IconUser size={18} />
                  <span>Log In / Sign Up</span>
                </Link>
                <Link href="/order-tracking" className="flex items-center gap-3 py-2 text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                  <IconHome size={18} />
                  <span>Track Order</span>
                </Link>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Categories</h3>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="flex items-center justify-between py-2.5 text-gray-300 hover:text-[#FFD700] border-b border-white/5 last:border-0"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <IconChevronRight size={14} className="text-gray-600" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
