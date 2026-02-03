"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/MockData/CategoryData";

export default function DealsSection() {
  return (
    <section className="py-4 sm:py-6 md:py-8 bg-background">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Explore Categories */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/product?category=${category.slug}`}
                className="group relative h-40 overflow-hidden bg-card block"
              >
                {/* Background Image */}
                <Image
                  src={category.image || "/assets/images/hero_fireworks.png"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    View Products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
