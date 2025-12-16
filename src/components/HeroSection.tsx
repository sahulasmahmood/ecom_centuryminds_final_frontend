'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Professional banners with text overlay (BigBasket style)
  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=500&fit=crop',
      title: 'Fresh Vegetables',
      subtitle: 'Farm Fresh Daily',
      description: 'Get the freshest vegetables delivered to your doorstep',
      offer: 'Up to 40% OFF',
      offerColor: 'bg-green-600',
      buttonText: 'Shop Now',
      buttonColor: 'bg-white text-gray-800 hover:bg-gray-100',
      textPosition: 'left',
      link: '/category/fruits-vegetables',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=1600&h=500&fit=crop',
      title: 'Daily Essentials',
      subtitle: 'Grocery at Best Prices',
      description: 'Atta, Rice, Dal & more at unbeatable prices',
      offer: 'Save ₹200',
      offerColor: 'bg-orange-600',
      buttonText: 'Explore',
      buttonColor: 'bg-[#e63946] text-white hover:bg-[#c1121f]',
      textPosition: 'right',
      link: '/category/atta-rice-dal',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600&h=500&fit=crop',
      title: 'Premium Fruits',
      subtitle: 'Handpicked Quality',
      description: 'Sweet, juicy fruits from the best orchards',
      offer: 'Flat 25% OFF',
      offerColor: 'bg-red-600',
      buttonText: 'Order Now',
      buttonColor: 'bg-white text-gray-800 hover:bg-gray-100',
      textPosition: 'left',
      link: '/category/fruits-vegetables',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1600&h=500&fit=crop',
      title: 'Dairy Fresh',
      subtitle: 'Pure & Natural',
      description: 'Fresh milk, paneer, curd delivered daily',
      offer: 'Starting ₹25',
      offerColor: 'bg-blue-600',
      buttonText: 'Buy Now',
      buttonColor: 'bg-[#e63946] text-white hover:bg-[#c1121f]',
      textPosition: 'right',
      link: '/category/dairy-bread-eggs',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="bg-gray-100">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-4">
        {/* Main Banner Slider */}
        <div className="relative rounded-lg sm:rounded-xl overflow-hidden group shadow-lg">
          {/* Banner Container */}
          <div className="relative w-full h-[180px] sm:h-[250px] md:h-[320px] lg:h-[380px] xl:h-[420px]">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {/* Background Image */}
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1400px"
                />
                
                {/* Dark Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Text Content Overlay */}
                <div className={`absolute inset-0 flex items-center z-10 ${
                  banner.textPosition === 'right' ? 'justify-end' : 'justify-start'
                }`}>
                  <div className={`p-4 sm:p-6 md:p-8 lg:p-12 max-w-lg ${
                    banner.textPosition === 'right' ? 'text-right' : 'text-left'
                  }`}>
                    {/* Offer Badge */}
                    <div className={`inline-flex items-center gap-2 ${banner.offerColor} text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3 shadow-lg`}>
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      {banner.offer}
                    </div>
                    
                    {/* Main Title */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">
                      {banner.title}
                    </h2>
                    
                    {/* Subtitle */}
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-medium mb-2 sm:mb-3 drop-shadow-md">
                      {banner.subtitle}
                    </p>
                    
                    {/* Description */}
                    <p className="text-xs sm:text-sm md:text-base text-white/80 mb-3 sm:mb-4 md:mb-6 drop-shadow-md hidden sm:block">
                      {banner.description}
                    </p>
                    
                    {/* CTA Button */}
                    <Link 
                      href={banner.link}
                      className={`inline-flex items-center gap-2 ${banner.buttonColor} px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95`}
                    >
                      {banner.buttonText}
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <IconChevronLeft size={20} className="text-gray-700 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <IconChevronRight size={20} className="text-gray-700 sm:w-6 sm:h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-[#e63946] w-6 sm:w-8 shadow-lg' 
                    : 'bg-white/70 hover:bg-white w-1.5 sm:w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
            {currentSlide + 1} / {banners.length}
          </div>
        </div>
      </div>
    </section>
  );
}