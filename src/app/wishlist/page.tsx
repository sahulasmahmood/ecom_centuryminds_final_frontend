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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">My Wishlist ({wishlistProducts.length} items)</h1>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-lg p-8 sm:p-12 text-center">
            <IconHeart size={36} className="text-gray-300 mx-auto mb-3 sm:mb-4 sm:w-12 sm:h-12" />
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-sm text-gray-500 mb-4">Save items you love</p>
            <Link href="/product" className="inline-block bg-[#E63946] text-white px-5 sm:px-6 py-2 rounded-lg font-medium text-sm">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
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
