'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Professional banners with text overlay (Fireworks style)
  const banners = [
    {
      id: 1,
      image: '/assets/images/hero_fireworks.png',
      title: 'Diwali Dhamaka Sale',
      subtitle: 'Light Up Your Celebration',
      description: 'Get flat 50% OFF on all premium crackers combos',
      offer: 'FLAT 50% OFF',
      offerColor: 'bg-gradient-to-r from-red-600 to-orange-600',
      buttonText: 'Shop Crackers',
      buttonColor: 'bg-[#FFD700] text-black hover:bg-yellow-400',
      textPosition: 'left',
      link: '/category/ground-chakkars',
    },
    {
      id: 2,
      image: '/assets/images/sparklers_box.png',
      title: 'Kids Special Box',
      subtitle: 'Safe & Colorful',
      description: 'Sparklers, Pop Pops, and Magic Stones for little ones',
      offer: 'Kids Favorite',
      offerColor: 'bg-gradient-to-r from-purple-600 to-blue-600',
      buttonText: 'Buy Gift Box',
      buttonColor: 'bg-white text-purple-900 hover:bg-gray-100',
      textPosition: 'right',
      link: '/category/kids-special',
    },
    {
      id: 3,
      image: '/assets/images/flower_pots.png',
      title: 'Grand Wedding Shots',
      subtitle: 'Premium Aerial Display',
      description: 'Make your special day unforgettable with our sky shots',
      offer: 'Wedding Special',
      offerColor: 'bg-gradient-to-r from-pink-600 to-rose-600',
      buttonText: 'Order Now',
      buttonColor: 'bg-[#FFD700] text-black hover:bg-yellow-400',
      textPosition: 'left',
      link: '/category/aerial-shots',
    },
    {
      id: 4,
      image: '/assets/images/ground_chakkars.png',
      title: 'Classic Ground Chakkars',
      subtitle: 'Traditional Diwali Fun',
      description: 'Long spinning chakkars and bright flower pots',
      offer: 'Buy 1 Get 1',
      offerColor: 'bg-gradient-to-r from-green-600 to-teal-600',
      buttonText: 'Grab Deal',
      buttonColor: 'bg-[#e63946] text-white hover:bg-[#c1121f]',
      textPosition: 'right',
      link: '/category/flower-pots',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="bg-background relative">
      {/* Full Width Banner Slider */}
      <div className="relative group w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
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
              quality={90}
            />
            
            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
            
            {/* Content Container */}
            <div className="absolute inset-0 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-2xl space-y-6">
                {/* Offer Badge - Minimalist */}
                <span className="inline-block px-3 py-1 bg-[#E31837] text-white text-xs font-bold tracking-[0.2em] uppercase mb-4">
                  {banner.offer}
                </span>
                
                {/* Main Title - Editorial Style */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                  {banner.title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h2>
                
                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-gray-200 font-light tracking-wide max-w-lg border-l-2 border-[#FFD700] pl-4">
                  {banner.subtitle}
                </p>
                
                {/* Description */}
                <p className="text-gray-400 text-sm sm:text-base max-w-md leading-relaxed hidden sm:block">
                  {banner.description}
                </p>
                
                {/* CTA Button - Professional */}
                <div className="pt-4">
                  <Link 
                    href={banner.link}
                    className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold text-sm tracking-widest hover:bg-[#FFD700] transition-colors duration-300"
                  >
                    {banner.buttonText.toUpperCase()}
                    <IconChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation - Minimalist Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
             {/* Slide Counter */}
            <div className="text-white font-mono text-sm">
              <span className="text-[#FFD700]">0{currentSlide + 1}</span>
              <span className="text-gray-500 mx-2">/</span>
              <span className="text-gray-500">0{banners.length}</span>
            </div>

            {/* Arrows */}
            <div className="flex gap-px">
              <button
                onClick={goToPrev}
                className="w-12 h-16 flex items-center justify-center bg-black/20 hover:bg-[#E31837] text-white transition-colors"
              >
                <IconChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className="w-12 h-16 flex items-center justify-center bg-black/20 hover:bg-[#E31837] text-white transition-colors"
                >
                <IconChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}