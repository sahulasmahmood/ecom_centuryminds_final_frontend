'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconChevronRight, IconMinus, IconPlus, IconHeart, IconStarFilled, IconTruck, IconShieldCheck, IconRefresh } from '@tabler/icons-react';
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
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-[#0a0a0a] border-b border-white/5">
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm overflow-x-auto">
              <Link href="/" className="text-gray-400 hover:text-[#FFD700] whitespace-nowrap transition-colors">Home</Link>
              <IconChevronRight size={14} className="text-gray-600 flex-shrink-0" />
              <Link href={`/category/${category?.slug}`} className="text-gray-400 hover:text-[#FFD700] whitespace-nowrap transition-colors">
                {category?.name}
              </Link>
              <IconChevronRight size={14} className="text-gray-600 flex-shrink-0" />
              <span className="text-white font-medium truncate">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-[#111] border border-white/10 rounded-sm mb-8 sm:mb-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Product Image */}
              <div className="relative bg-[#0a0a0a] border-r border-white/10 p-8 sm:p-12 flex items-center justify-center">
                {product.badge && (
                  <span className={`absolute top-6 left-6 ${product.badgeColor === 'bg-yellow-500' ? 'bg-[#FFD700] text-black' : 'bg-[#E31837] text-white'} text-xs font-bold px-3 py-1 uppercase tracking-wider z-10`}>
                    {product.badge}
                  </span>
                )}
                <div className="relative w-full max-w-md aspect-square">
                  {/* Decorative faint glow behind image */}
                   <div className="absolute inset-0 bg-[#FFD700]/5 rounded-full blur-3xl scale-75"></div>
                   
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain relative z-10 p-4"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 sm:p-10 lg:p-12">
                <div className="mb-6">
                  <span className="text-[#FFD700] font-bold text-xs uppercase tracking-widest mb-2 block">{product.brand}</span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">{product.name}</h1>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-1 text-[#FFD700]">
                      <IconStarFilled size={18} />
                      <span className="font-bold text-white text-lg">{product.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm border-l border-white/10 pl-3">{product.reviews.toLocaleString()} Reviews</span>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                     <div className="flex items-baseline gap-4">
                      <span className="text-4xl sm:text-5xl font-bold text-white">₹{currentVariant.price}</span>
                      {currentVariant.discount > 0 && (
                        <>
                          <span className="text-xl text-gray-500 line-through decoration-white/20">₹{currentVariant.mrp}</span>
                          <span className="text-[#E31837] text-sm font-bold uppercase tracking-wide">
                            {currentVariant.discount}% OFF
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">Inclusive of all taxes</p>
                  </div>
                </div>

                {/* Weight Variants */}
                <div className="mb-8">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Select Pack Size</p>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedVariant(index)}
                        className={`px-6 py-3 border text-sm font-bold transition-all min-w-[120px] text-center ${
                          selectedVariant === index
                            ? 'border-[#FFD700] bg-[#FFD700] text-black'
                            : 'border-white/10 bg-transparent text-gray-300 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        <span className="block text-base mb-1">{variant.weight}</span>
                        <span className="block text-xs opacity-70">₹{variant.price}</span>
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
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                      {quantity === 0 ? (
                        <button 
                          onClick={handleAddToCart}
                          className="w-full sm:w-auto flex-1 bg-white text-black py-4 px-8 font-bold uppercase tracking-widest hover:bg-[#FFD700] transition-colors border-none"
                        >
                          Add to Cart — ₹{currentVariant.price}
                        </button>
                      ) : (
                        <>
                          <div className="flex items-center bg-[#0a0a0a] border border-white/10">
                            <button 
                              onClick={handleDecrement}
                              className="px-5 py-4 text-white hover:text-[#FFD700] transition-colors"
                            >
                              <IconMinus size={18} />
                            </button>
                            <span className="px-4 py-4 font-bold text-white min-w-[3rem] text-center bg-white/5">{quantity}</span>
                            <button 
                              onClick={handleIncrement}
                              className="px-5 py-4 text-white hover:text-[#FFD700] transition-colors"
                            >
                              <IconPlus size={18} />
                            </button>
                          </div>
                          <div className="flex-1 bg-[#0a0a0a] border border-[#FFD700] text-[#FFD700] py-4 px-8 font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2">
                             <span>Added to Cart</span>
                             <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full"></span>
                             <span>₹{currentVariant.price * quantity}</span>
                          </div>
                        </>
                      )}
                      
                      <button className="p-4 border border-white/10 text-white hover:text-[#FFD700] hover:border-[#FFD700] transition-colors bg-[#0a0a0a]">
                        <IconHeart size={24} />
                      </button>
                    </div>
                  );
                })()}

                {/* Delivery Info */}
                <div className="border-t border-white/10 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                      <IconTruck size={24} className="text-[#FFD700] flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-white">Free Delivery</p>
                        <p className="text-xs text-gray-500 mt-0.5">Orders &gt; ₹499</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <IconShieldCheck size={24} className="text-[#FFD700] flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-white">100% Genuine</p>
                        <p className="text-xs text-gray-500 mt-0.5">Quality assured</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <IconRefresh size={24} className="text-[#FFD700] flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-white">Easy Returns</p>
                        <p className="text-xs text-gray-500 mt-0.5">7 days policy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="bg-[#111] border border-white/10 rounded-sm mb-12">
            <div className="border-b border-white/10">
              <div className="flex gap-8 px-6 sm:px-10">
                {['description', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-6 font-bold uppercase tracking-widest text-sm transition-all relative ${
                      activeTab === tab
                        ? 'text-[#FFD700]'
                        : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {tab === 'reviews' ? `Reviews (${product.reviews})` : tab}
                     {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFD700]"></span>
                     )}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6 sm:p-10">
              {activeTab === 'description' && (
                <div className="max-w-3xl">
                  <p className="text-gray-300 mb-8 leading-relaxed text-lg">{product.description}</p>
                  <h4 className="font-bold text-white mb-4 text-lg">Key Features</h4>
                  <ul className="space-y-3">
                    {[
                      "Premium quality explosive compounds for vibrant colors",
                      "Safety tested and certified by standard authorities",
                      "Reduced strict pollution and smoke emission",
                      "Long-lasting display duration",
                      "Moisture-resistant packaging for longevity"
                    ].map((feature, i) => (
                       <li key={i} className="flex items-start gap-3 text-gray-400">
                          <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full mt-2 flex-shrink-0"></span>
                          <span>{feature}</span>
                       </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-[#FFD700] mb-4">
                     <IconStarFilled size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Customer Reviews</h3>
                  <p className="text-gray-500 mb-6">Be the first to review this product</p>
                  <button className="px-6 py-2 border border-white/20 text-white hover:border-[#FFD700] hover:text-[#FFD700] transition-colors font-bold uppercase text-sm tracking-wide">
                     Write a Review
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                 <h2 className="text-2xl font-bold text-white tracking-tight">You May Also Like</h2>
                 <Link href={`/category/${category?.slug}`} className="text-sm font-bold text-[#FFD700] hover:text-white transition-colors uppercase tracking-wider">
                    View All
                 </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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
