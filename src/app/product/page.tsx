"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer01 from "@/components/Footer01";
import Footer02 from "@/components/Footer02";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/MockData/ProductData";
import { categories } from "@/MockData/CategoryData";
import {
  IconChevronLeft,
  IconChevronRight,
  IconFilter,
  IconX,
  IconAdjustmentsHorizontal,
  IconChevronDown,
} from "@tabler/icons-react";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");
  const priceParam = searchParams.get("price");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    () => {
      if (categoryParam) {
        const category = categories.find((c) => c.slug === categoryParam);
        return category ? category.id : null;
      }
      return null;
    },
  );
  const [sortBy, setSortBy] = useState("relevance");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [priceRange, setPriceRange] = useState<string>(priceParam || "all");
  const [customMinPrice, setCustomMinPrice] = useState<string>(
    minPriceParam || "",
  );
  const [customMaxPrice, setCustomMaxPrice] = useState<string>(
    maxPriceParam || "",
  );
  const [showCustomPrice, setShowCustomPrice] = useState(
    priceParam === "custom",
  );
  const itemsPerPage = 12;

  // Update URL when filters change
  const updateURL = (
    category: number | null,
    price: string,
    minPrice?: string,
    maxPrice?: string,
  ) => {
    const params = new URLSearchParams();

    if (category !== null) {
      const cat = categories.find((c) => c.id === category);
      if (cat) params.set("category", cat.slug);
    }

    if (price !== "all") {
      params.set("price", price);
      if (price === "custom" && (minPrice || maxPrice)) {
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
      }
    }

    const queryString = params.toString();
    const newURL = queryString ? `/product?${queryString}` : "/product";
    router.push(newURL, { scroll: false });
  };

  // Update selected category when URL param changes
  useEffect(() => {
    if (categoryParam) {
      const category = categories.find((c) => c.slug === categoryParam);
      setSelectedCategory(category ? category.id : null);
    } else {
      setSelectedCategory(null);
    }
  }, [categoryParam]);

  const allProducts = getAllProducts();

  // Filter by category
  let filteredProducts = selectedCategory
    ? allProducts.filter((p) => p.categoryId === selectedCategory)
    : allProducts;

  // Filter by price range
  if (priceRange !== "all") {
    filteredProducts = filteredProducts.filter((product) => {
      const price = product.variants[0].price;
      switch (priceRange) {
        case "under-500":
          return price < 500;
        case "500-1000":
          return price >= 500 && price < 1000;
        case "1000-2000":
          return price >= 1000 && price < 2000;
        case "2000-5000":
          return price >= 2000 && price < 5000;
        case "above-5000":
          return price >= 5000;
        case "custom":
          const min = customMinPrice ? parseFloat(customMinPrice) : 0;
          const max = customMaxPrice ? parseFloat(customMaxPrice) : Infinity;
          return price >= min && price <= max;
        default:
          return true;
      }
    });
  }

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.variants[0].price - b.variants[0].price,
    );
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.variants[0].price - a.variants[0].price,
    );
  } else if (sortBy === "discount") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.variants[0].discount - a.variants[0].discount,
    );
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setShowMobileFilter(false);
    updateURL(categoryId, priceRange, customMinPrice, customMaxPrice);
  };

  const handlePriceRangeSelect = (range: string) => {
    setPriceRange(range);
    setCurrentPage(1);
    if (range === "custom") {
      setShowCustomPrice(true);
    } else {
      setShowCustomPrice(false);
      updateURL(selectedCategory, range);
    }
    setShowMobileFilter(false);
  };

  const applyCustomPrice = () => {
    setPriceRange("custom");
    setCurrentPage(1);
    updateURL(selectedCategory, "custom", customMinPrice, customMaxPrice);
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setPriceRange("all");
    setCustomMinPrice("");
    setCustomMaxPrice("");
    setShowCustomPrice(false);
    setCurrentPage(1);
    router.push("/product", { scroll: false });
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
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm sm:text-base mb-4 block">
              Premium Collection
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tight mb-6">
              ALL PRODUCTS
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span className="text-primary">•</span>
              <span className="text-foreground">Shop</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Horizontal Chip-Based Filter Bar */}
          <div className="mb-8">
            <div className="bg-card border border-border rounded-sm p-4">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <IconAdjustmentsHorizontal
                    size={18}
                    className="text-primary"
                  />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Filters
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {(selectedCategory !== null || priceRange !== "all") && (
                    <button
                      onClick={clearAllFilters}
                      className="text-[10px] text-gray-500 hover:text-primary transition-colors uppercase tracking-wider flex items-center gap-1"
                    >
                      <IconX size={12} />
                      Clear All
                    </button>
                  )}
                  <p className="text-muted-foreground text-xs">
                    <span className="text-foreground font-bold">
                      {filteredProducts.length}
                    </span>{" "}
                    products
                  </p>
                </div>
              </div>

              {/* Category Chips - Horizontal Scroll */}
              <div className="mb-4">
                <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Category
                </h4>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all border ${
                      selectedCategory === null
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                        : "bg-muted text-muted-foreground border-border hover:border-primary hover:text-foreground"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all border flex items-center gap-2 ${
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                          : "bg-muted text-muted-foreground border-border hover:border-primary hover:text-foreground"
                      }`}
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Chips */}
              <div>
                <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Price Range
                </h4>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent mb-3">
                  <button
                    onClick={() => handlePriceRangeSelect("all")}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all border ${
                      priceRange === "all"
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                        : "bg-muted text-muted-foreground border-border hover:border-primary hover:text-foreground"
                    }`}
                  >
                    All Prices
                  </button>
                  <button
                    onClick={() => handlePriceRangeSelect("under-500")}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                      priceRange === "under-500"
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                        : "bg-muted text-muted-foreground border-border hover:border-primary hover:text-foreground"
                    }`}
                  >
                    Under ₹500
                  </button>
                  <button
                    onClick={() => handlePriceRangeSelect("500-1000")}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                      priceRange === "500-1000"
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                        : "bg-muted text-muted-foreground border-border hover:border-primary hover:text-foreground"
                    }`}
                  >
                    ₹500 - ₹1000
                  </button>
                  <button
                    onClick={() => handlePriceRangeSelect("1000-2000")}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                      priceRange === "1000-2000"
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                        : "bg-muted text-muted-foreground border-border hover:border-primary hover:text-foreground"
                    }`}
                  >
                    ₹1000 - ₹2000
                  </button>
                  <button
                    onClick={() => handlePriceRangeSelect("2000-5000")}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                      priceRange === "2000-5000"
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                        : "bg-muted text-muted-foreground border-border hover:border-primary hover:text-foreground"
                    }`}
                  >
                    ₹2000 - ₹5000
                  </button>
                  <button
                    onClick={() => handlePriceRangeSelect("above-5000")}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                      priceRange === "above-5000"
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                        : "bg-muted text-muted-foreground border-border hover:border-primary hover:text-foreground"
                    }`}
                  >
                    Above ₹5000
                  </button>
                  <button
                    onClick={() => handlePriceRangeSelect("custom")}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all border ${
                      priceRange === "custom"
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                        : "bg-muted text-muted-foreground border-border hover:border-primary hover:text-foreground"
                    }`}
                  >
                    Custom Range
                  </button>
                </div>

                {/* Custom Price Input */}
                {showCustomPrice && (
                  <div className="bg-muted border border-border rounded-sm p-4 mt-2">
                    <h5 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Custom Price Range
                    </h5>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="text-[9px] text-gray-500 mb-1 block">
                          Min. Price
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                            ₹
                          </span>
                          <input
                            type="number"
                            value={customMinPrice}
                            onChange={(e) => setCustomMinPrice(e.target.value)}
                            placeholder="0"
                            className="w-full bg-card border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                      <div className="text-gray-600 mt-5">—</div>
                      <div className="flex-1">
                        <label className="text-[9px] text-gray-500 mb-1 block">
                          Max. Price
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                            ₹
                          </span>
                          <input
                            type="number"
                            value={customMaxPrice}
                            onChange={(e) => setCustomMaxPrice(e.target.value)}
                            placeholder="10000"
                            className="w-full bg-card border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                      <button
                        onClick={applyCustomPrice}
                        className="mt-5 px-4 py-2 bg-primary text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-white transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Top Bar - Results & Sort */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <p className="text-muted-foreground text-sm">
                Showing{" "}
                <span className="text-primary font-bold">
                  {startIndex + 1}-
                  {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
                </span>{" "}
                of{" "}
                <span className="text-foreground font-bold">
                  {filteredProducts.length}
                </span>
              </p>
              {(selectedCategory !== null || priceRange !== "all") && (
                <div className="flex items-center gap-2">
                  {selectedCategory && (
                    <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-[10px] text-primary font-semibold flex items-center gap-1.5">
                      {categories.find((c) => c.id === selectedCategory)?.name}
                      <button
                        onClick={() => handleCategorySelect(null)}
                        className="hover:text-foreground"
                      >
                        <IconX size={12} />
                      </button>
                    </span>
                  )}
                  {priceRange !== "all" && (
                    <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-[10px] text-primary font-semibold flex items-center gap-1.5">
                      {priceRange === "under-500" && "Under ₹500"}
                      {priceRange === "500-1000" && "₹500-₹1000"}
                      {priceRange === "1000-2000" && "₹1000-₹2000"}
                      {priceRange === "2000-5000" && "₹2000-₹5000"}
                      {priceRange === "above-5000" && "Above ₹5000"}
                      {priceRange === "custom" &&
                        `₹${customMinPrice || "0"} - ₹${customMaxPrice || "∞"}`}
                      <button
                        onClick={() => handlePriceRangeSelect("all")}
                        className="hover:text-white"
                      >
                        <IconX size={12} />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilter(true)}
                className="sm:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-white/10 bg-card rounded-full text-xs text-white hover:border-primary transition-colors uppercase tracking-wider font-semibold"
              >
                <IconFilter size={14} />
                Filter
              </button>

              {/* Sort Dropdown */}
              <div className="relative flex-1 sm:flex-none z-20">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="w-full sm:w-[180px] flex items-center justify-between bg-card border border-border rounded-full px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary hover:border-foreground/30 transition-colors font-semibold"
                >
                  <span className="truncate mr-2">
                    {sortBy === "relevance" && "Relevance"}
                    {sortBy === "price-low" && "Price: Low-High"}
                    {sortBy === "price-high" && "Price: High-Low"}
                    {sortBy === "discount" && "Best Discount"}
                  </span>
                  <IconChevronDown
                    size={14}
                    className={`text-primary flex-shrink-0 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isSortOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-sm shadow-2xl overflow-hidden">
                    {[
                      { value: "relevance", label: "Relevance" },
                      { value: "price-low", label: "Price: Low to High" },
                      { value: "price-high", label: "Price: High to Low" },
                      { value: "discount", label: "Best Discount" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-colors hover:bg-white/5 ${
                          sortBy === option.value
                            ? "text-primary font-bold bg-muted"
                            : "text-muted-foreground"
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-border rounded-sm bg-card">
              <div className="text-4xl mb-4">🎆</div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Try selecting a different category
              </p>
              <button
                onClick={() => handleCategorySelect(null)}
                className="px-6 py-2 bg-primary text-black text-xs font-bold uppercase tracking-wider rounded-full hover:bg-white transition-colors"
              >
                View All Products
              </button>
            </div>
          )}

          {/* Pagination - Compact Design */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-primary hover:text-black hover:border-primary transition-all"
              >
                <IconChevronLeft size={16} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
                    currentPage === i + 1
                      ? "bg-primary text-black border border-primary scale-110"
                      : "bg-transparent text-gray-400 border border-white/10 hover:border-primary hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-primary hover:text-black hover:border-primary transition-all"
              >
                <IconChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Filter Overlay - Redesigned */}
        {showMobileFilter && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 sm:hidden"
            onClick={() => setShowMobileFilter(false)}
          >
            <div
              className="absolute bottom-0 left-0 right-0 max-h-[80vh] bg-card border-t border-white/20 overflow-y-auto rounded-t-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle Bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-white/20 rounded-full"></div>
              </div>

              <div className="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 bg-card z-10">
                <div className="flex items-center gap-2">
                  <IconFilter size={18} className="text-primary" />
                  <h3 className="font-bold text-white uppercase tracking-wider text-sm">
                    Filter Products
                  </h3>
                </div>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <IconX size={18} />
                </button>
              </div>

              <div className="p-5 space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Category
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCategorySelect(null)}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all border ${
                        selectedCategory === null
                          ? "bg-primary text-black border-primary"
                          : "bg-muted text-muted-foreground border-white/10"
                      }`}
                    >
                      All
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all border flex items-center gap-2 ${
                          selectedCategory === category.id
                            ? "bg-primary text-black border-primary"
                            : "bg-muted text-muted-foreground border-white/10"
                        }`}
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Price Range
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <button
                      onClick={() => handlePriceRangeSelect("all")}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all border ${
                        priceRange === "all"
                          ? "bg-primary text-black border-primary"
                          : "bg-muted text-muted-foreground border-white/10"
                      }`}
                    >
                      All Prices
                    </button>
                    <button
                      onClick={() => handlePriceRangeSelect("under-500")}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                        priceRange === "under-500"
                          ? "bg-primary text-black border-primary"
                          : "bg-muted text-muted-foreground border-white/10"
                      }`}
                    >
                      Under ₹500
                    </button>
                    <button
                      onClick={() => handlePriceRangeSelect("500-1000")}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                        priceRange === "500-1000"
                          ? "bg-primary text-black border-primary"
                          : "bg-muted text-muted-foreground border-white/10"
                      }`}
                    >
                      ₹500 - ₹1000
                    </button>
                    <button
                      onClick={() => handlePriceRangeSelect("1000-2000")}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                        priceRange === "1000-2000"
                          ? "bg-primary text-black border-primary"
                          : "bg-muted text-muted-foreground border-white/10"
                      }`}
                    >
                      ₹1000 - ₹2000
                    </button>
                    <button
                      onClick={() => handlePriceRangeSelect("2000-5000")}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                        priceRange === "2000-5000"
                          ? "bg-primary text-black border-primary"
                          : "bg-muted text-muted-foreground border-white/10"
                      }`}
                    >
                      ₹2000 - ₹5000
                    </button>
                    <button
                      onClick={() => handlePriceRangeSelect("above-5000")}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                        priceRange === "above-5000"
                          ? "bg-primary text-black border-primary"
                          : "bg-muted text-muted-foreground border-white/10"
                      }`}
                    >
                      Above ₹5000
                    </button>
                    <button
                      onClick={() => handlePriceRangeSelect("custom")}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all border ${
                        priceRange === "custom"
                          ? "bg-primary text-black border-primary"
                          : "bg-muted text-muted-foreground border-white/10"
                      }`}
                    >
                      Custom Range
                    </button>
                  </div>

                  {/* Custom Price Input - Mobile */}
                  {showCustomPrice && (
                    <div className="bg-muted border border-white/10 rounded p-3">
                      <h5 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Custom Price Range
                      </h5>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[9px] text-gray-500 mb-1 block">
                            Min. Price
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                              ₹
                            </span>
                            <input
                              type="number"
                              value={customMinPrice}
                              onChange={(e) =>
                                setCustomMinPrice(e.target.value)
                              }
                              placeholder="0"
                              className="w-full bg-card border border-white/10 rounded px-3 pl-6 py-2 text-xs text-white focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[9px] text-gray-500 mb-1 block">
                            Max. Price
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                              ₹
                            </span>
                            <input
                              type="number"
                              value={customMaxPrice}
                              onChange={(e) =>
                                setCustomMaxPrice(e.target.value)
                              }
                              placeholder="10000"
                              className="w-full bg-card border border-white/10 rounded px-3 pl-6 py-2 text-xs text-white focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                        <button
                          onClick={applyCustomPrice}
                          className="w-full py-2 bg-primary text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-white transition-colors"
                        >
                          Apply Range
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="w-full py-3 bg-primary text-black font-bold uppercase tracking-wider text-sm rounded-full hover:bg-white transition-colors"
                >
                  Apply Filters
                </button>
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
