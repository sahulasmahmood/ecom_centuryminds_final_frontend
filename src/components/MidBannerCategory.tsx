'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function MidBannerCategory() {
  const banners = [
    {
      title: 'Firecrackers',
      subtitle: 'Atom Bombs & Lakshmi',
      offer: 'UP TO 40% OFF',
      detailedBg: 'bg-[#fef2f2]',
      borderColor: 'border-red-100',
      titleColor: 'text-red-900',
      textColor: 'text-red-700',
      btnColor: 'bg-red-600',
      image: '/cracker-atom-bomb.jpg',
      link: '/category/firecrackers'
    },
    {
      title: 'Sparklers',
      subtitle: 'Golden & Colorful',
      offer: 'STARTING ₹29',
      detailedBg: 'bg-[#fffbeb]',
      borderColor: 'border-amber-100',
      titleColor: 'text-amber-900',
      textColor: 'text-amber-700',
      btnColor: 'bg-amber-600',
      image: '/cracker-sparklers.jpg',
      link: '/category/sparklers'
    },
    {
      title: 'Mega Assorts',
      subtitle: 'Complete Collections',
      offer: 'BUY & SAVE MORE',
      detailedBg: 'bg-[#eff6ff]',
      borderColor: 'border-purple-100',
      titleColor: 'text-purple-900',
      textColor: 'text-purple-700',
      btnColor: 'bg-purple-600',
      image: '/cracker-assortment.jpg',
      link: '/category/mega-assortment'
    },
  ];

  return (
    <section className="py-4 sm:py-6 md:py-8 bg-white">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {banners.map((banner, index) => (
            <Link 
              key={index}
              href={banner.link}
              className={`relative overflow-hidden rounded-lg sm:rounded-xl border ${banner.borderColor} ${banner.detailedBg} group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 block h-32 sm:h-40 md:h-48`}
            >
              <div className="flex h-full relative z-10">
                <div className="w-3/5 p-3 sm:p-4 md:p-6 flex flex-col justify-center">
                  <span className={`text-[10px] sm:text-xs md:text-sm font-semibold mb-1 sm:mb-2 ${banner.textColor} uppercase tracking-wider`}>
                    {banner.subtitle}
                  </span>
                  <h3 className={`text-base sm:text-lg md:text-2xl font-extrabold ${banner.titleColor} mb-1.5 sm:mb-3 leading-tight`}>
                    {banner.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2 sm:mb-4">
                    <span className="text-[10px] sm:text-xs font-bold bg-white/80 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded shadow-sm text-gray-800 border border-gray-100">
                      {banner.offer}
                    </span>
                  </div>
                  <span className={`inline-flex items-center text-[10px] sm:text-xs font-bold ${banner.textColor} group-hover:underline underline-offset-4`}>
                    Show More <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
                
                <div className="w-2/5 relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent"></div>
                </div>
              </div>
              
              {/* Image Positioned Absolute Right */}
              <div className="absolute right-0 top-0 w-2/5 h-full">
                 <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
