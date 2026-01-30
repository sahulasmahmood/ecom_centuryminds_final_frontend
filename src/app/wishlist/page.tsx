'use client';

import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/MockData/ProductData';
import Link from 'next/link';
import { IconHeart } from '@tabler/icons-react';

export default function WishlistPage() {
  const wishlistProducts = getAllProducts().slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8 tracking-tight border-b border-white/10 pb-4">
          My Wishlist <span className="text-[#FFD700]">({wishlistProducts.length} items)</span>
        </h1>

        {wishlistProducts.length === 0 ? (
          <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-12 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <IconHeart size={40} className="text-gray-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-8">Save your favorite crackers here for later!</p>
            <Link href="/product" className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer01 />
      <Footer02 />
    </div>
  );
}
