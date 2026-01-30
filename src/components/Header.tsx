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
  IconMapPin,
  IconMenu2,
  IconX,
  IconHome,
  IconHeart,
} from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from '@/MockData/CategoryData';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { totalItems, totalPrice } = useCart();

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Main Header */}
      <div className="premium-header">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-white p-1"
            >
              <IconMenu2 size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden bg-white shadow-lg">
                <Image 
                  src="/logo.jpeg"
                  alt="Crackers Central Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Crackers Central</span>
            </Link>

            {/* Shop by Category - Desktop Only */}
            <div 
              className="relative hidden lg:block"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <button style={{ backgroundColor: 'var(--color-bright-yellow)', color: 'var(--color-gray-900)' }} className="px-4 py-2.5 rounded-lg flex items-center gap-2 focus:outline-none font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:opacity-90">
                <IconMenu2 size={20} />
                Shop by Category
                <IconChevronDown size={18} className={`transition-transform ${showMegaMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu */}
              {showMegaMenu && (
                <div className="absolute top-full left-0 mt-0 bg-white rounded-xl shadow-lg flex z-50 min-w-[700px]">
                  {/* Categories List - Left Side */}
                  <div className="w-64 bg-gray-50 border-r border-gray-200 py-2 rounded-l-xl">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        style={{
                          backgroundColor: activeCategory.id === category.id ? 'var(--color-yellow-light)' : 'transparent',
                          color: activeCategory.id === category.id ? 'var(--color-primary-red)' : 'var(--color-gray-600)',
                          borderLeft: activeCategory.id === category.id ? '4px solid var(--color-primary-red)' : 'none',
                        }}
                        className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-300 ${
                          activeCategory.id === category.id ? 'font-semibold' : 'hover:bg-gray-100'
                        }`}
                        onMouseEnter={() => setActiveCategory(category)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{category.icon}</span>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <IconChevronRight size={16} className="text-gray-400" />
                      </div>
                    ))}
                  </div>

                  {/* Subcategories - Right Side */}
                  <div className="flex-1 p-6">
                    <div className="mb-4">
                      <Link 
                        href={`/category/${activeCategory.slug}`}
                        style={{ color: 'var(--color-gray-900)' }}
                        className="text-lg font-bold hover:text-[var(--color-primary-red)] transition-colors"
                      >
                        {activeCategory.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{activeCategory.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                      {activeCategory.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${activeCategory.slug}?sub=${sub.slug}`}
                          style={{ color: 'var(--color-gray-600)' }}
                          className="text-sm hover:text-[var(--color-primary-red)] hover:underline transition-colors py-1 font-medium"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <Link 
                        href={`/category/${activeCategory.slug}`}
                        style={{ color: 'var(--color-primary-red)' }}
                        className="inline-flex items-center gap-2 font-semibold text-sm transition-all hover:gap-3 hover:opacity-80"
                      >
                        View All {activeCategory.name}
                        <IconChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl">
              <div className="flex items-center bg-white rounded-md overflow-hidden w-full">
                <div className="px-3">
                  <IconSearch size={20} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for Products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-2 py-2.5 focus:outline-none text-gray-700 w-full"
                />
              </div>
            </div>

            {/* Mobile Search Button */}
            <button 
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden text-white p-1"
            >
              <IconSearch size={22} />
            </button>

            {/* Location - Desktop Only */}
            <div className="hidden xl:flex items-center gap-2 text-white cursor-pointer hover:opacity-90">
              <IconMapPin size={20} />
              <div className="text-sm">
                <p className="text-xs opacity-80">Deliver to</p>
                <p className="font-medium">Select Location</p>
              </div>
              <IconChevronDown size={16} />
            </div>

            {/* Account - Desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden sm:flex items-center gap-1 lg:gap-2 text-white hover:opacity-90 focus:outline-none">
                  <IconUser size={22} />
                  <div className="hidden lg:block text-sm text-left">
                    <p className="text-xs opacity-80">Sign In</p>
                    <p className="font-medium">My Account</p>
                  </div>
                  <IconChevronDown size={16} className="hidden lg:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/login" className="cursor-pointer">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register" className="cursor-pointer">Register</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/order-tracking" className="cursor-pointer">My Orders</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link href="/cart" className="flex items-center gap-1 lg:gap-2 text-white hover:opacity-90 transition-opacity">
              <div className="relative">
                <IconShoppingCart size={22} className="sm:w-6 sm:h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 text-gray-900 text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold shadow-md" style={{ backgroundColor: 'var(--color-bright-yellow)' }}>
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-sm">
                <p className="text-xs opacity-80">My Cart</p>
                <p className="font-medium">₹{totalPrice.toFixed(2)}</p>
              </div>
            </Link>
          </div>

          {/* Mobile Search Bar */}
          {mobileSearchOpen && (
            <div className="md:hidden mt-3">
              <div className="flex items-center bg-white rounded-md overflow-hidden">
                <div className="px-3">
                  <IconSearch size={20} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for Products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-2 py-2.5 focus:outline-none text-gray-700"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Navigation Bar - Desktop */}
      <div className="hidden lg:block bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 py-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Link 
                key={category.id}
                href={`/category/${category.slug}`}
                className="navbar-category-link flex items-center gap-2 text-gray-700 whitespace-nowrap text-sm font-semibold py-1 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="premium-header p-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
                  <Image 
                    src="/logo.jpeg"
                    alt="Crackers Central Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xl font-bold text-white">Crackers Central</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white p-1">
                <IconX size={24} />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="p-4 border-b">
              <Link 
                href="/login" 
                className="flex items-center gap-3 py-3 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <IconUser size={20} />
                <span>Sign In / Register</span>
              </Link>
              <Link 
                href="/order-tracking" 
                className="flex items-center gap-3 py-3 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <IconHome size={20} />
                <span>My Orders</span>
              </Link>
              <Link 
                href="/wishlist" 
                className="flex items-center gap-3 py-3 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <IconHeart size={20} />
                <span>Wishlist</span>
              </Link>
            </div>

            {/* Mobile Categories */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Shop by Category</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    style={{ color: 'var(--color-gray-600)' }}
                    className="flex items-center gap-3 py-3 rounded-lg px-2 -mx-2 font-medium transition-all duration-300 hover:bg-gray-100"
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary-red)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-gray-600)'; }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Footer Links */}
            <div className="p-4 border-t bg-gray-50">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Link href="/about" className="py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                <Link href="/contact" className="py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                <Link href="/faq" className="py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>FAQs</Link>
                <Link href="/shipping" className="py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>Shipping</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
