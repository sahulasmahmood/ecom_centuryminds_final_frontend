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
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <Link href="/" className="text-[#FFD700] hover:underline">Return to Home</Link>
        </div>
        <Footer01 />
        <Footer02 />
      </div>
    );
  }

  const category = getCategoryById(product.categoryId);
  const currentVariant = product.variants[selectedVariant];
  const relatedProducts = getProductsByCategory(product.categoryId)
    .filter(p => p.id !== product.id)
    .slice(0, 5);

  const quantity = getItemQuantity(product.id, selectedVariant);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Cinematic Breadcrumb - Floating */}
        <div className="absolute top-24 left-0 right-0 z-10 pointer-events-none">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="inline-flex items-center gap-2 text-xs text-white/50 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full pointer-events-auto">
                <Link href="/" className="hover:text-[#FFD700] transition-colors">Home</Link>
                <IconChevronRight size={12} />
                <Link href={`/category/${category?.slug}`} className="hover:text-[#FFD700] transition-colors">{category?.name}</Link>
                <IconChevronRight size={12} />
                <span className="text-white">{product.name}</span>
             </div>
          </div>
        </div>

        <div className="lg:flex min-h-screen">
          
          {/* Left Column: Immersive Image Gallery (Sticky) */}
          <div className="w-full lg:w-[55%] lg:h-screen lg:sticky lg:top-0 bg-[#050505] flex items-center justify-center relative overflow-hidden group">
             {/* Dynamic Ambient Background */}
             <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-black opacity-50"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#FFD700]/5 rounded-full blur-[100px] pointer-events-none"></div>

             {/* Main Image */}
             <div className="relative w-[80%] h-[80%] max-w-xl transition-transform duration-700 group-hover:scale-105">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
             </div>

             {/* Badge */}
             {product.badge && (
                <div className="absolute top-24 left-8 text-white z-20">
                   <span className="bg-[#E31837] px-4 py-2 font-bold uppercase tracking-widest text-xs shadow-lg mb-2 inline-block">
                      {product.badge}
                   </span>
                </div>
             )}
          </div>

          {/* Right Column: Product Details (Scrollable) */}
          <div className="w-full lg:w-[45%] bg-background border-l border-white/5 relative z-10">
             <div className="px-6 py-24 sm:px-12 sm:py-32 max-w-2xl mx-auto">
                
                {/* Brand & Title */}
                <div className="mb-8">
                   <p className="text-[#FFD700] text-sm font-bold uppercase tracking-[0.2em] mb-4">{product.brand}</p>
                   <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">{product.name}</h1>
                   <div className="flex items-center gap-4 text-sm">
                      <div className="flex text-[#FFD700]">
                         <IconStarFilled size={16} />
                         <span className="ml-2 font-bold text-white">{product.rating}</span>
                      </div>
                      <span className="text-gray-500">|</span>
                      <span className="text-gray-400">{product.reviews} Reviews</span>
                   </div>
                </div>

                {/* Price */}
                <div className="mb-10 py-6 border-y border-white/5 flex items-center gap-6">
                   <span className="text-5xl font-bold text-white">₹{currentVariant.price}</span>
                   <div className="flex flex-col">
                      <span className="text-gray-500 line-through text-lg">₹{currentVariant.mrp}</span>
                      <span className="text-[#00E054] font-bold uppercase tracking-wider text-sm">Save {currentVariant.discount}%</span>
                   </div>
                </div>

                {/* Variant Selector */}
                <div className="mb-10">
                   <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">Pack Size</p>
                   <div className="flex flex-wrap gap-3">
                      {product.variants.map((v, i) => (
                         <button
                           key={i}
                           onClick={() => setSelectedVariant(i)}
                           className={`px-6 py-3 border text-sm font-bold transition-all min-w-[100px] ${
                              selectedVariant === i 
                                 ? 'border-[#FFD700] text-[#FFD700] bg-[#FFD700]/10' 
                                 : 'border-white/10 text-gray-400 hover:border-white/30'
                           }`}
                         >
                            {v.weight}
                         </button>
                      ))}
                   </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mb-16">
                   <div className="flex items-center border border-white/10 h-14">
                      <button 
                        onClick={() => quantity > 0 && updateQuantity(product.id, selectedVariant, quantity - 1)}
                        className="w-12 h-full flex items-center justify-center text-white hover:bg-white/5 transition-colors"
                        disabled={quantity === 0}
                      >
                         <IconMinus size={18} />
                      </button>
                      <span className="w-12 text-center font-bold text-white">{quantity}</span>
                      <button 
                        onClick={() => updateQuantity(product.id, selectedVariant, quantity + 1)}
                        className="w-12 h-full flex items-center justify-center text-white hover:bg-white/5 transition-colors"
                      >
                         <IconPlus size={18} />
                      </button>
                   </div>
                   
                   <button 
                     onClick={() => addToCart(product, selectedVariant)}
                     className="flex-1 bg-white text-black h-14 font-bold uppercase tracking-widest hover:bg-[#FFD700] transition-colors flex items-center justify-center gap-3"
                   >
                     {quantity > 0 ? 'Update Cart' : 'Add to Cart'}
                   </button>
                   
                   <button className="w-14 h-14 border border-white/10 flex items-center justify-center text-white hover:text-[#E31837] hover:border-[#E31837] transition-colors">
                      <IconHeart size={20} />
                   </button>
                </div>

                {/* Description Features */}
                <div className="space-y-8">
                   <div>
                      <h3 className="text-white font-bold uppercase tracking-wider mb-4">Description</h3>
                      <p className="text-gray-400 leading-relaxed text-sm lg:text-base">{product.description}</p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#111] p-4 border border-white/5">
                         <IconTruck className="text-[#FFD700] mb-3" />
                         <p className="text-white font-bold text-sm">Express Shipping</p>
                         <p className="text-xs text-gray-500 mt-1">Safe & Secure Delivery</p>
                      </div>
                      <div className="bg-[#111] p-4 border border-white/5">
                         <IconShieldCheck className="text-[#FFD700] mb-3" />
                         <p className="text-white font-bold text-sm">Quality Assured</p>
                         <p className="text-xs text-gray-500 mt-1">Factory Direct</p>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {relatedProducts.length > 0 && (
           <div className="bg-[#0a0a0a] border-t border-white/5 py-24">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="flex items-center justify-between mb-12">
                     <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">You May Also Like</h2>
                     <Link href="/product" className="text-[#FFD700] text-sm font-bold uppercase tracking-widest hover:underline">View All</Link>
                 </div>
                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {relatedProducts.map(p => (
                       <ProductCard key={p.id} product={p} />
                    ))}
                 </div>
              </div>
           </div>
        )}

        <Footer01 />
        <Footer02 />
      </main>
    </>
  );
}
