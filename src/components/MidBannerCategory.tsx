"use client";

import Image from "next/image";
import Link from "next/link";

export default function MidBannerCategory() {
  return (
    <section className="py-12 bg-background border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 tracking-tight">
          Collection Spotlight
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px] md:h-[500px]">
          {/* Main Featured Category (Left) */}
          <Link
            href="/product?category=aerial-shots"
            className="relative group overflow-hidden block h-full bg-card"
          >
            <Image
              src="/assets/images/hero_fireworks.png"
              alt="Aerial Shots"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">
                Premium Series
              </span>
              <h3 className="text-4xl font-bold text-white mb-2">
                Aerial Spectacles
              </h3>
              <p className="text-gray-300 max-w-sm mb-6 text-sm">
                Light up the sky with our professional-grade display shots.
              </p>
              <span className="inline-block border-b border-white pb-1 text-white text-sm font-medium hover:text-primary hover:border-primary transition-colors">
                Explore Collection
              </span>
            </div>
          </Link>

          {/* Side Categories (Right) */}
          <div className="grid grid-rows-2 gap-4 h-full">
            {/* Top Side */}
            <Link
              href="/product?category=sparklers"
              className="relative group overflow-hidden block h-full bg-card"
            >
              <Image
                src="/assets/images/sparklers_box.png"
                alt="Sparklers"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <span className="text-secondary text-xs font-bold tracking-widest uppercase mb-1 block">
                  Kids Safe
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Sparklers & Chakras
                </h3>
              </div>
            </Link>

            {/* Bottom Side */}
            <Link
              href="/product?category=flower-pots"
              className="relative group overflow-hidden block h-full bg-card"
            >
              <Image
                src="/assets/images/flower_pots.png"
                alt="Flower Pots"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <span className="text-success text-xs font-bold tracking-widest uppercase mb-1 block">
                  Best Seller
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Giant Flower Pots
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
