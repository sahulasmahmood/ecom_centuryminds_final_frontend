'use client';

import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/MockData/CategoryData';

export default function DealsSection() {
  const deals = [
    {
      title: 'Fresh Vegetables',
      discount: 'Up to 40% OFF',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop',
      bgColor: 'bg-green-50',
      link: '/category/fruits-vegetables'
    },
    {
      title: 'Dairy Products',
      discount: 'Starting ₹25',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop',
      bgColor: 'bg-yellow-50',
      link: '/category/dairy-bread-eggs'
    },
    {
      title: 'Atta & Rice',
      discount: 'Up to 20% OFF',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop',
      bgColor: 'bg-orange-50',
      link: '/category/atta-rice-dal'
    },
    {
      title: 'Snacks & Drinks',
      discount: 'Buy 2 Get 1 Free',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=200&fit=crop',
      bgColor: 'bg-purple-50',
      link: '/category/snacks-beverages'
    },
  ];

  return (
    <section className="py-4 sm:py-6 md:py-8 bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Deals Banner */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Today&apos;s Deals</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {deals.map((deal, index) => (
              <Link 
                key={index}
                href={deal.link}
                className={`${deal.bgColor} rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col hover:shadow-md transition-shadow`}
              >
                <div className="relative h-16 sm:h-20 md:h-24 mb-2 sm:mb-3">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">{deal.title}</h3>
                <p className="text-[#e63946] font-medium text-[10px] sm:text-xs md:text-sm">{deal.discount}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Shop by Category */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Shop by Category</h2>
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
            {categories.map((category) => (
              <Link 
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex flex-col items-center p-2 sm:p-3 md:p-4 bg-white rounded-lg sm:rounded-xl hover:shadow-md transition-shadow group"
              >
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-1 sm:mb-2 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-2xl sm:text-3xl md:text-4xl mb-0.5 sm:mb-1">{category.icon}</span>
                <span className="text-[10px] sm:text-xs text-center text-gray-700 font-medium line-clamp-2">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
