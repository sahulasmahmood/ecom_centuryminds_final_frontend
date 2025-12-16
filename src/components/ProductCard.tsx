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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group relative h-full flex flex-col">
      {/* Badge */}
      {product.badge && (
        <span className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 ${product.badgeColor} text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full z-10 flex items-center gap-0.5 sm:gap-1`}>
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"></span>
          {product.badge}
        </span>
      )}

      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square bg-gray-50 p-2 sm:p-4">
          <Image 
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-1 sm:p-2"
          />
        </div>
      </Link>

      {/* Product Info - Flex grow to fill space */}
      <div className="p-2 sm:p-3 flex flex-col flex-grow">
        {/* Brand */}
        <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">{product.brand}</p>
        
        {/* Product Name - Fixed height */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-2 line-clamp-2 h-8 sm:h-10 hover:text-[#e63946] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Weight Selector - Fixed height */}
        <div className="relative mb-2 sm:mb-3 h-8 sm:h-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowVariants(!showVariants);
            }}
            className="w-full h-full flex items-center justify-between px-2 sm:px-3 bg-gray-100 rounded text-xs sm:text-sm text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <span className="truncate pr-1 sm:pr-2">{currentVariant.weight}</span>
            <IconChevronDown size={14} className={`flex-shrink-0 transition-transform sm:w-4 sm:h-4 ${showVariants ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Variants Dropdown */}
          {showVariants && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
              {product.variants.map((variant, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedVariant(index);
                    setShowVariants(false);
                  }}
                  className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-left hover:bg-gray-50 flex items-center justify-between ${selectedVariant === index ? 'bg-red-50' : ''}`}
                >
                  <div>
                    <p className="text-xs sm:text-sm font-medium">{variant.weight}</p>
                    <div className="flex items-center gap-1 sm:gap-2">
                      {variant.discount > 0 && (
                        <span className="text-[10px] sm:text-xs text-green-600 font-medium">{variant.discount}% OFF</span>
                      )}
                      <span className="text-xs sm:text-sm font-bold">₹{variant.price}</span>
                      {variant.discount > 0 && (
                        <span className="text-[10px] sm:text-xs text-gray-400 line-through">₹{variant.mrp}</span>
                      )}
                    </div>
                  </div>
                  {selectedVariant === index && (
                    <span className="text-[#e63946]">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price - Fixed height */}
        <div className="flex items-center gap-1 sm:gap-2 h-6 sm:h-7 mb-1 sm:mb-2">
          <span className="text-sm sm:text-lg font-bold text-gray-900">₹{currentVariant.price}</span>
          {currentVariant.discount > 0 && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">₹{currentVariant.mrp}</span>
          )}
        </div>

        {/* Discount Tag - Fixed height with placeholder */}
        <div className="h-5 sm:h-7 mb-2 sm:mb-3">
          {currentVariant.discount > 0 && (
            <span className="inline-flex items-center gap-0.5 sm:gap-1 bg-green-100 text-green-700 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
              <span className="font-medium">Har Din Sasta!</span>
              <IconChevronDown size={10} className="sm:w-3 sm:h-3" />
            </span>
          )}
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* Add to Cart Button - Always at bottom */}
        <div className="flex items-center gap-2 mt-auto">
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="flex-1 py-1.5 sm:py-2 px-2 sm:px-4 border-2 border-[#e63946] text-[#e63946] rounded font-medium hover:bg-[#e63946] hover:text-white transition-all duration-200 active:scale-95 text-xs sm:text-sm"
            >
              Add
            </button>
          ) : (
            <div className="flex-1 flex items-center justify-between border-2 border-[#e63946] rounded overflow-hidden">
              <button
                onClick={handleDecrement}
                className="px-2 sm:px-3 py-1.5 sm:py-2 text-[#e63946] hover:bg-[#e63946] hover:text-white transition-all duration-200 active:scale-95"
              >
                <IconMinus size={14} className="sm:w-4 sm:h-4" />
              </button>
              <span className="font-medium text-[#e63946] text-xs sm:text-sm">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="px-2 sm:px-3 py-1.5 sm:py-2 text-[#e63946] hover:bg-[#e63946] hover:text-white transition-all duration-200 active:scale-95"
              >
                <IconPlus size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
