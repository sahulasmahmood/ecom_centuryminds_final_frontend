'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconChevronRight, IconMinus, IconPlus, IconHeart, IconShare, IconStarFilled, IconStar, IconTruck, IconShieldCheck, IconRefresh } from '@tabler/icons-react';
import { getProductById, getProductsByCategory } from '@/MockData/ProductData';
import { getCategoryById } from '@/MockData/CategoryData';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  
  const productId = parseInt(id);
  const product = getProductById(productId);
  
  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <Link href="/" className="text-[#e63946] hover:underline">Return to Home</Link>
          </div>
        </div>
        <Footer01 />
        <Footer02 />
      </>
    );
  }

  const category = getCategoryById(product.categoryId);
  const currentVariant = product.variants[selectedVariant];
  const relatedProducts = getProductsByCategory(product.categoryId)
    .filter(p => p.id !== product.id)
    .slice(0, 5);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm overflow-x-auto">
              <Link href="/" className="text-gray-500 hover:text-[#e63946] whitespace-nowrap">Home</Link>
              <IconChevronRight size={14} className="text-gray-400 flex-shrink-0" />
              <Link href={`/category/${category?.slug}`} className="text-gray-500 hover:text-[#e63946] whitespace-nowrap">
                {category?.name}
              </Link>
              <IconChevronRight size={14} className="text-gray-400 flex-shrink-0" />
              <span className="text-gray-800 font-medium truncate">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="bg-white rounded-lg p-3 sm:p-6 mb-4 sm:mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
              {/* Product Image */}
              <div className="relative">
                {product.badge && (
                  <span className={`absolute top-2 left-2 sm:top-4 sm:left-4 ${product.badgeColor} text-white text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full z-10 flex items-center gap-1`}>
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"></span>
                    {product.badge}
                  </span>
                )}
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                  <Image 
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-contain p-4 sm:p-8"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div>
                <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">{product.brand}</p>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 sm:px-2 py-0.5 rounded text-xs sm:text-sm">
                    <span>{product.rating}</span>
                    <IconStarFilled size={10} className="sm:w-3 sm:h-3" />
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm">{product.reviews.toLocaleString()} Ratings</span>
                </div>

                {/* Price */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">₹{currentVariant.price}</span>
                    {currentVariant.discount > 0 && (
                      <>
                        <span className="text-base sm:text-lg text-gray-400 line-through">₹{currentVariant.mrp}</span>
                        <span className="bg-green-100 text-green-700 text-xs sm:text-sm px-2 py-0.5 rounded font-medium">
                          {currentVariant.discount}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">(Inclusive of all taxes)</p>
                </div>

                {/* Weight Variants */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Pack Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedVariant(index)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border-2 text-xs sm:text-sm font-medium transition-colors ${
                          selectedVariant === index
                            ? 'border-[#e63946] bg-red-50 text-[#e63946]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="block">{variant.weight}</span>
                        <span className="block text-[10px] sm:text-xs mt-0.5">₹{variant.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                {(() => {
                  const quantity = getItemQuantity(product.id, selectedVariant);
                  
                  const handleAddToCart = () => {
                    addToCart(product, selectedVariant);
                  };
                  
                  const handleIncrement = () => {
                    updateQuantity(product.id, selectedVariant, quantity + 1);
                  };
                  
                  const handleDecrement = () => {
                    updateQuantity(product.id, selectedVariant, quantity - 1);
                  };
                  
                  return (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      {quantity === 0 ? (
                        <button 
                          onClick={handleAddToCart}
                          className="w-full sm:flex-1 bg-[#e63946] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-[#c1121f] transition-colors text-sm sm:text-base"
                        >
                          Add to Cart - ₹{currentVariant.price}
                        </button>
                      ) : (
                        <>
                          <div className="flex items-center justify-center border-2 border-[#e63946] rounded-lg">
                            <button 
                              onClick={handleDecrement}
                              className="px-3 sm:px-4 py-2 text-[#e63946] hover:bg-red-50 transition-colors"
                            >
                              <IconMinus size={16} className="sm:w-[18px] sm:h-[18px]" />
                            </button>
                            <span className="px-4 sm:px-6 py-2 font-semibold border-x-2 border-[#e63946] text-[#e63946]">{quantity}</span>
                            <button 
                              onClick={handleIncrement}
                              className="px-3 sm:px-4 py-2 text-[#e63946] hover:bg-red-50 transition-colors"
                            >
                              <IconPlus size={16} className="sm:w-[18px] sm:h-[18px]" />
                            </button>
                          </div>
                          <div className="flex-1 bg-green-50 border-2 border-green-500 text-green-700 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-center text-sm sm:text-base">
                            ✓ Added - ₹{currentVariant.price * quantity}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })()}

                {/* Action Buttons */}
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <button className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-[#e63946]">
                    <IconHeart size={18} className="sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">Add to Wishlist</span>
                  </button>
                  <button className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-[#e63946]">
                    <IconShare size={18} className="sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">Share</span>
                  </button>
                </div>

                {/* Delivery Info */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <IconTruck size={20} className="text-[#e63946] flex-shrink-0 sm:w-6 sm:h-6" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium">Free Delivery</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">On orders above ₹499</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <IconShieldCheck size={20} className="text-[#e63946] flex-shrink-0 sm:w-6 sm:h-6" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium">100% Genuine</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">Quality assured</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <IconRefresh size={20} className="text-[#e63946] flex-shrink-0 sm:w-6 sm:h-6" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium">Easy Returns</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">7 days return policy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="bg-white rounded-lg mb-4 sm:mb-6">
            <div className="border-b overflow-x-auto">
              <div className="flex gap-4 sm:gap-8 px-3 sm:px-6">
                {['description', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 sm:py-4 font-medium capitalize whitespace-nowrap text-sm sm:text-base ${
                      activeTab === tab
                        ? 'text-[#e63946] border-b-2 border-[#e63946]'
                        : 'text-gray-600 hover:text-[#e63946]'
                    }`}
                  >
                    {tab === 'reviews' ? `Reviews (${product.reviews})` : tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-3 sm:p-6">
              {activeTab === 'description' && (
                <div>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">{product.description}</p>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Key Features:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>Fresh and high quality product</li>
                    <li>Sourced from trusted suppliers</li>
                    <li>Properly stored and handled</li>
                    <li>Best before: Check package for details</li>
                  </ul>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-gray-800">{product.rating}</div>
                      <div className="flex text-yellow-400 justify-center my-1">
                        {[...Array(5)].map((_, i) => (
                          i < Math.floor(product.rating) 
                            ? <IconStarFilled key={i} size={14} className="sm:w-4 sm:h-4" />
                            : <IconStar key={i} size={14} className="sm:w-4 sm:h-4" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">{product.reviews} reviews</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-center text-sm sm:text-base">Customer reviews will appear here.</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Similar Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer01 />
      <Footer02 />
    </>
  );
}
