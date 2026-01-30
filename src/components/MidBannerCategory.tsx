'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function MidBannerCategory() {
  const banners = [
    {
      title: 'Premium Firecrackers',
      subtitle: 'Luxury Atom Bombs',
      offer: 'UP TO 40% OFF',
      detailedBg: 'bg-[#FFF8F0]',
      borderColor: 'border-[#E8DCC8]',
      titleColor: 'text-[#8B0000]',
      textColor: 'text-[#6B3FA0]',
      btnColor: 'bg-[#8B0000] hover:bg-[#6B0000]',
      image: '/premium-atom-bomb.jpg',
      link: '/category/firecrackers'
    },
    {
      title: 'Golden Sparklers',
      subtitle: 'Premium Collection',
      offer: 'STARTING ₹29',
      detailedBg: 'bg-[#FFF8F0]',
      borderColor: 'border-[#E8DCC8]',
      titleColor: 'text-[#D4AF37]',
      textColor: 'text-[#E67E22]',
      btnColor: 'bg-[#E67E22] hover:bg-[#D46A1F]',
      image: '/premium-sparklers.jpg',
      link: '/category/sparklers'
    },
    {
      title: 'Luxury Assortments',
      subtitle: 'Exclusive Collections',
      offer: 'PREMIUM SELECTION',
      detailedBg: 'bg-[#FFF8F0]',
      borderColor: 'border-[#E8DCC8]',
      titleColor: 'text-[#6B3FA0]',
      textColor: 'text-[#8B0000]',
      btnColor: 'bg-[#6B3FA0] hover:bg-[#5A2F85]',
      image: '/premium-assortment.jpg',
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
