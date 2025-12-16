'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Fresh Vegetables',
      subtitle: 'Delivered in 10 Minutes',
      description: 'Get farm-fresh vegetables at your doorstep',
      discount: 'Up to 40% OFF',
      bgColor: 'bg-gradient-to-r from-[#e63946] to-[#c1121f]',
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop',
    },
    {
      id: 2,
      title: 'Daily Essentials',
      subtitle: 'Grocery at Best Prices',
      description: 'Atta, Rice, Dal & more at lowest prices',
      discount: 'Save ₹200 on first order',
      bgColor: 'bg-gradient-to-r from-[#ffc300] to-[#ffb700]',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop',
    },
    {
      id: 3,
      title: 'Fresh Fruits',
      subtitle: 'Handpicked Quality',
      description: 'Premium fruits from trusted farms',
      discount: 'Flat 25% OFF',
      bgColor: 'bg-gradient-to-r from-[#e63946] to-[#c1121f]',
      imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=400&fit=crop',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="py-2 sm:py-4 bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Full Width Main Banner Slider */}
        <div className="relative rounded-lg sm:rounded-xl overflow-hidden h-[180px] sm:h-[250px] md:h-[320px]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className={`${slide.bgColor} h-full flex items-center`}>
                <div className="p-4 sm:p-6 md:p-8 flex-1 z-10">
                  <span className="inline-block bg-white/20 text-white text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mb-1.5 sm:mb-3">
                    {slide.discount}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-0.5 sm:mb-2">{slide.title}</h2>
                  <p className="text-sm sm:text-base md:text-xl text-white/90 mb-0.5 sm:mb-1">{slide.subtitle}</p>
                  <p className="text-xs sm:text-sm md:text-base text-white/80 mb-2 sm:mb-4 hidden sm:block">{slide.description}</p>
                  <Link 
                    href="/product"
                    className="inline-block bg-white text-gray-800 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg text-xs sm:text-sm md:text-base font-medium hover:bg-gray-100 transition-all duration-200 active:scale-95"
                  >
                    Shop Now
                  </Link>
                </div>
                <div className="w-1/3 sm:w-2/5 md:w-1/2 h-full relative">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </div>
            </div>
          ))}
          
          {/* Dots */}
          <div className="absolute bottom-2 sm:bottom-4 left-4 sm:left-8 flex gap-1.5 sm:gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-200 active:scale-95 ${
                  index === currentSlide ? 'bg-white w-4 sm:w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
