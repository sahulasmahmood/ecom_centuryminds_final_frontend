'use client';

import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/MockData/CategoryData';

export default function DealsSection() {
  const deals = [
    {
      title: 'Premium Firecrackers',
      discount: 'Up to 40% OFF',
      image: '/premium-atom-bomb.jpg',
      bgColor: 'bg-[#FFF8F0]',
      link: '/category/firecrackers'
    },
    {
      title: 'Golden Sparklers',
      discount: 'Starting ₹29',
      image: '/premium-sparklers.jpg',
      bgColor: 'bg-[#FFF8F0]',
      link: '/category/sparklers'
    },
    {
      title: 'Luxury Collection',
      discount: 'Premium Selection',
      image: '/premium-assortment.jpg',
      bgColor: 'bg-[#FFF8F0]',
      link: '/category/mega-assortment'
    },
    {
      title: 'Exclusive Themes',
      discount: 'Limited Edition',
      image: '/premium-lakshmi.jpg',
      bgColor: 'bg-[#FFF8F0]',
      link: '/category/luxury-themed'
    },
  ];

  return (
    <section className="py-4 sm:py-6 md:py-8 bg-[#FAFAF8]">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Deals Banner */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1A0F0A] mb-3 sm:mb-4">Premium Offers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {deals.map((deal, index) => (
              <Link 
                key={index}
                href={deal.link}
                className={`${deal.bgColor} rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col hover:shadow-lg hover:border-[#D4AF37] border border-[#E8DCC8] transition-all duration-300`}
              >
                <div className="relative h-16 sm:h-20 md:h-24 mb-2 sm:mb-3">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-semibold text-[#1A0F0A] text-xs sm:text-sm md:text-base">{deal.title}</h3>
                <p className="text-[#8B0000] font-bold text-[10px] sm:text-xs md:text-sm">{deal.discount}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Shop by Category */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1A0F0A] mb-3 sm:mb-4">Shop Categories</h2>
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
            {categories.map((category) => (
              <Link 
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex flex-col items-center p-2 sm:p-3 md:p-4 bg-white rounded-lg sm:rounded-xl border border-[#E8DCC8] hover:shadow-lg hover:border-[#D4AF37] transition-all duration-300 group"
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
                <span className="text-[10px] sm:text-xs text-center text-[#1A0F0A] font-semibold line-clamp-2">
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
