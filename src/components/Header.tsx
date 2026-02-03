"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
} from "@tabler/icons-react";
import { categories } from "@/MockData/CategoryData";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout, loading } = useAuth();

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-white/10">
      {/* Main Header */}
      <div className="bg-black/95 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-white p-2 hover:bg-white/5 rounded transition-colors"
            >
              <IconMenu2 size={20} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 flex-shrink-0 group"
            >
              <div className="w-9 h-9 rounded-lg overflow-hidden border-2 border-[#FFD700] group-hover:border-white transition-all group-hover:shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                <Image
                  src="/assets/images/hero_fireworks.png"
                  alt="SkySpark"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-white tracking-tight block leading-none group-hover:text-[#FFD700] transition-colors">
                  SkySpark
                </span>
                <span className="text-[8px] text-gray-500 uppercase tracking-widest">
                  Fireworks Store
                </span>
              </div>
            </Link>

            {/* Search Bar - Desktop & Tablet */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Search for firecrackers, sparklers, rockets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pl-11 bg-[#1a1a1a] border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] focus:bg-[#0a0a0a] transition-all text-sm"
                />
                <IconSearch
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FFD700] transition-colors"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search Button */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="md:hidden text-white p-2 hover:bg-white/5 rounded transition-colors"
              >
                <IconSearch size={20} />
              </button>

              {/* Products Dropdown - Desktop */}
              <div
                className="relative hidden lg:block"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FFD700] text-black rounded-full hover:bg-white transition-all font-semibold text-xs uppercase tracking-wide">
                  <IconMenu2 size={16} />
                  <span>Products</span>
                  <IconChevronDown
                    size={14}
                    className={`transition-transform ${showMegaMenu ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Mega Menu with Bridge */}
                {showMegaMenu && (
                  <>
                    {/* Invisible bridge to prevent gap issues */}
                    <div className="absolute top-full right-0 left-0 h-2 bg-transparent"></div>

                    <div className="absolute top-full right-0 mt-2 bg-black border border-white/20 z-50 w-[850px] shadow-2xl rounded-lg overflow-hidden">
                      {/* Header Strip */}
                      <div className="bg-gradient-to-r from-[#1a1a1a] to-black px-5 py-2 border-b border-white/10">
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                          Browse All Categories
                        </p>
                      </div>

                      {/* Grid Layout - All Categories Visible */}
                      <div className="p-5">
                        <div className="grid grid-cols-4 gap-3">
                          {categories.map((category) => (
                            <div
                              key={category.id}
                              className="group/item"
                              onMouseEnter={() => setActiveCategory(category)}
                            >
                              {/* Category Card */}
                              <Link
                                href={`/product?category=${category.slug}`}
                                className={`block p-2.5 rounded border transition-all ${
                                  activeCategory.id === category.id
                                    ? "bg-[#1a1a1a] border-[#FFD700]/50 shadow-lg"
                                    : "bg-[#0a0a0a] border-white/5 hover:border-white/20"
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="text-sm opacity-80">
                                    {category.icon}
                                  </span>
                                  <span
                                    className={`text-[10px] font-semibold uppercase tracking-wide ${
                                      activeCategory.id === category.id
                                        ? "text-[#FFD700]"
                                        : "text-gray-300"
                                    }`}
                                  >
                                    {category.name}
                                  </span>
                                </div>
                                <p className="text-[8px] text-gray-600 leading-tight line-clamp-1">
                                  {category.description}
                                </p>
                              </Link>

                              {/* Subcategories Dropdown */}
                              {activeCategory.id === category.id && (
                                <div className="mt-1.5 bg-[#0a0a0a] border border-white/10 rounded p-1.5 space-y-0.5">
                                  {activeCategory.subcategories
                                    .slice(0, 3)
                                    .map((sub) => (
                                      <Link
                                        key={sub.id}
                                        href={`/product?category=${activeCategory.slug}&sub=${sub.slug}`}
                                        className="block text-[9px] text-gray-500 hover:text-[#FFD700] transition-colors py-0.5 px-1.5 hover:bg-white/5 rounded"
                                      >
                                        • {sub.name}
                                      </Link>
                                    ))}
                                  {activeCategory.subcategories.length > 3 && (
                                    <Link
                                      href={`/product?category=${activeCategory.slug}`}
                                      className="block text-[8px] text-[#FFD700] hover:text-white transition-colors py-0.5 px-1.5 font-semibold"
                                    >
                                      View All →
                                    </Link>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer Strip */}
                      <div className="bg-[#0a0a0a] px-5 py-2 border-t border-white/10 flex items-center justify-between">
                        <Link
                          href="/product"
                          className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-wider"
                        >
                          View All Products
                        </Link>
                        <Link
                          href="/quick-purchase"
                          className="text-[10px] text-[#FFD700] hover:text-white transition-colors uppercase tracking-wider font-semibold"
                        >
                          Quick Purchase →
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Account - Desktop */}
              {loading ? (
                <div className="hidden sm:flex flex-col items-center px-2">
                  <div className="w-5 h-5 border-2 border-gray-600 border-t-[#FFD700] rounded-full animate-spin"></div>
                </div>
              ) : user ? (
                <div
                  className="hidden sm:flex flex-col items-center group px-2 cursor-pointer relative"
                  onMouseEnter={() => setShowUserMenu(true)}
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <IconUser
                    size={20}
                    className="text-[#FFD700] transition-colors"
                  />
                  <span className="text-[9px] uppercase font-semibold text-[#FFD700] mt-0.5 transition-colors truncate max-w-[60px]">
                    {user.name?.split(" ")[0] || "User"}
                  </span>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <>
                      {/* Invisible bridge to prevent gap issues */}
                      <div className="absolute top-full right-0 left-0 h-2 bg-transparent"></div>
                      
                      <div className="absolute top-full right-0 mt-2 bg-black border border-white/20 z-50 w-40 shadow-xl rounded-lg overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-xs text-white font-medium truncate">
                            {user.name}
                          </p>
                          <p className="text-[10px] text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        <button
                          onClick={async () => {
                            await logout();
                            window.location.href = "/";
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-white/5 transition-colors font-medium uppercase tracking-wide"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:flex flex-col items-center group px-2"
                >
                  <IconUser
                    size={20}
                    className="text-gray-300 group-hover:text-[#FFD700] transition-colors"
                  />
                  <span className="text-[9px] uppercase font-semibold text-gray-500 mt-0.5 group-hover:text-white transition-colors">
                    Login
                  </span>
                </Link>
              )}

              {/* Cart */}
              <Link
                href="/cart"
                className="flex flex-col items-center group px-2"
              >
                <div className="relative">
                  <IconShoppingCart
                    size={20}
                    className="text-gray-300 group-hover:text-[#FFD700] transition-colors"
                  />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#E31837] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-[9px] uppercase font-semibold text-gray-500 mt-0.5 group-hover:text-white transition-colors">
                  Cart
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {mobileSearchOpen && (
            <div className="md:hidden mt-3 pb-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-[#1a1a1a] border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] text-sm"
                  autoFocus
                />
                <IconSearch
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Navigation Bar - Desktop - Sleek Dark */}
      <div className="hidden lg:block bg-[#111] border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-8 mx-auto pl-32">
              {" "}
              {/* Centered Links with offset to balance */}
              <Link
                href="/"
                className="text-sm font-bold uppercase tracking-wider text-[#FFD700] hover:text-white transition-colors"
              >
                Home
              </Link>
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.id}
                  href={`/product?category=${category.slug}`}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wide"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/product"
                className="text-sm font-bold uppercase tracking-wider text-[#E31837] hover:text-white transition-colors"
              >
                Sale
              </Link>
            </div>

            {/* Quick Buy - Right Aligned */}
            <Link
              href="/quick-purchase"
              className="hidden lg:flex text-white hover:text-[#FFD700] transition-colors font-bold tracking-wide uppercase text-xs items-center gap-1 border border-white/20 px-3 py-1.5 rounded-sm hover:border-[#FFD700]"
            >
              <IconBolt size={16} className="text-[#E31837]" />
              Quick Purchase
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-[80%] max-w-sm bg-[#111] border-r border-white/10 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="bg-[#0a0a0a] p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white tracking-tight">
                  SkySpark
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-1 hover:text-[#E31837]"
              >
                <IconX size={24} />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="p-4 space-y-2">
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                  Account
                </h3>
                <Link
                  href="/login"
                  className="flex items-center gap-3 py-2 text-gray-300 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <IconUser size={18} />
                  <span>Log In / Sign Up</span>
                </Link>
                <Link
                  href="/order-tracking"
                  className="flex items-center gap-3 py-2 text-gray-300 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <IconHome size={18} />
                  <span>Track Order</span>
                </Link>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                  Categories
                </h3>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/product?category=${category.slug}`}
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
