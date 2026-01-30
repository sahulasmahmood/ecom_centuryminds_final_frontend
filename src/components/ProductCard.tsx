'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconChevronDown, IconPlus, IconMinus } from '@tabler/icons-react';
import { Product } from '@/MockData/ProductData';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [showVariants, setShowVariants] = useState(false);
  const { addToCart, updateQuantity, getItemQuantity } = useCart();

  const currentVariant = product.variants[selectedVariant];
  const quantity = getItemQuantity(product.id, selectedVariant);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVariant);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, selectedVariant, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, selectedVariant, quantity - 1);
  };

  return (
    <div className="group relative bg-[#121212] border border-white/5 rounded-none hover:border-white/20 transition-all duration-300 flex flex-col h-full">
      {/* Badge - Minimalist */}
      {product.badge && (
        <span className="absolute top-0 left-0 bg-[#E31837] text-white text-[10px] font-bold px-2 py-1 z-10 tracking-widest uppercase">
          {product.badge}
        </span>
      )}

      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block overflow-hidden relative aspect-[4/5] bg-[#0a0a0a]">
        <Image 
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow space-y-3">
        {/* Brand & Name */}
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{product.brand}</p>
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-medium text-white leading-snug hover:text-[#FFD700] transition-colors line-clamp-2 min-h-[2.5em]">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-white">₹{currentVariant.price}</span>
          {currentVariant.discount > 0 && (
            <span className="text-xs text-gray-500 line-through">₹{currentVariant.mrp}</span>
          )}
          {currentVariant.discount > 0 && (
            <span className="text-xs text-[#00E054] font-medium ml-auto">
              {currentVariant.discount}% OFF
            </span>
          )}
        </div>

        {/* Variant Selector - Clean Minimalist */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowVariants(!showVariants);
            }}
            className="w-full flex items-center justify-between text-xs text-gray-400 border-b border-white/10 py-1 hover:text-white hover:border-white/30 transition-colors"
          >
            <span>{currentVariant.weight}</span>
            <IconChevronDown size={14} className={`transition-transform duration-300 ${showVariants ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Dropdown */}
          {showVariants && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-[#1a1a1a] border border-white/10 shadow-xl z-20 max-h-48 overflow-y-auto">
              {product.variants.map((variant, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedVariant(index);
                    setShowVariants(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs hover:bg-white/5 transition-colors flex justify-between items-center ${
                    selectedVariant === index ? 'text-[#FFD700] bg-white/5' : 'text-gray-300'
                  }`}
                >
                  <span>{variant.weight}</span>
                  <span className="font-mono">₹{variant.price}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-2">
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="w-full bg-white text-black font-bold text-xs py-2.5 uppercase tracking-wide hover:bg-[#FFD700] transition-colors duration-300"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between border border-white/20 bg-transparent">
              <button
                onClick={handleDecrement}
                className="px-3 py-2 text-white hover:bg-white hover:text-black transition-colors"
              >
                <IconMinus size={14} />
              </button>
              <span className="font-medium text-white text-sm">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="px-3 py-2 text-white hover:bg-white hover:text-black transition-colors"
              >
                <IconPlus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
