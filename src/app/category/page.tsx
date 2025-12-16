'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';
import { categories } from '@/MockData/CategoryData';
import { getProductsByCategory } from '@/MockData/ProductData';

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="text-[#e63946] hover:underline">Home</Link>
              <span>/</span>
              <span className="text-gray-900">All Categories</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const productCount = getProductsByCategory(category.id).length;
              return (
                <Link 
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow group"
                >
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-3xl mb-2 block">{category.icon}</span>
                    <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500">{productCount} Products</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer01 />
      <Footer02 />
    </>
  );
}
