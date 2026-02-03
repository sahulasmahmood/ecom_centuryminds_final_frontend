"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconShoppingBag } from "@tabler/icons-react";
import { Product } from "@/MockData/ProductData";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const currentVariant = product.variants[selectedVariant];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVariant);
  };

  return (
    <div
      className="group relative bg-transparent hover:bg-card transition-colors duration-300 rounded-sm p-4 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-bold px-2 py-1 z-20 tracking-widest uppercase shadow-lg">
          {product.badge}
        </span>
      )}

      {/* Product Image */}
      <Link
        href={`/product/${product.id}`}
        className="block relative aspect-square mb-4 overflow-hidden rounded-sm bg-white shadow-sm"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
        />

        {/* Quick Add Overlay - Slide Up */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm p-3 transition-transform duration-300 ${isHovered ? "translate-y-0" : "translate-y-full"}`}
        >
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-black font-bold text-xs py-3 uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            <IconShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 flex flex-col text-center">
        <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
          {product.brand}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-white font-medium text-sm leading-snug mb-2 hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg font-bold text-white">
              ₹{currentVariant.price}
            </span>
            {currentVariant.discount > 0 && (
              <span className="text-xs text-gray-500 line-through">
                ₹{currentVariant.mrp}
              </span>
            )}
          </div>

          {/* Variant Selector - Minimal */}
          {product.variants.length > 1 && (
            <div className="flex justify-center flex-wrap gap-1">
              {product.variants.map((v, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariant(i);
                  }}
                  className={`text-[10px] px-2 py-1 border rounded-sm transition-colors ${selectedVariant === i ? "border-primary text-primary" : "border-white/10 text-muted-foreground hover:border-white/30"}`}
                >
                  {v.weight}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
