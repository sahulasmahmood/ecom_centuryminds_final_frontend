'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';
import { IconMinus, IconPlus, IconX, IconShoppingCart, IconArrowRight, IconTruck } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalSavings, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const deliveryThreshold = 499;
  const deliveryFee = totalPrice >= deliveryThreshold ? 0 : 40;
  const total = totalPrice + deliveryFee;
  const progressPercent = Math.min((totalPrice / deliveryThreshold) * 100, 100);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 uppercase tracking-widest font-bold">
          <Link href="/" className="hover:text-[#FFD700] transition-colors">Home</Link>
          <span className="text-gray-700">/</span>
          <span className="text-white">Cart</span>
        </nav>

        {items.length === 0 ? (
          /* Empty Cart Premium State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-32 h-32 bg-[#111] border border-white/10 rounded-full flex items-center justify-center mb-8 relative group">
              <div className="absolute inset-0 bg-[#FFD700]/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-700"></div>
              <IconShoppingCart size={48} className="text-gray-400 group-hover:text-[#FFD700] transition-colors relative z-10" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Your Cart is Empty</h2>
            <p className="text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
              Looks like you haven&apos;t added any sparks to your celebration yet. Explore our premium collection using the button below.
            </p>
            <Link 
              href="/product" 
              className="inline-flex items-center gap-3 bg-[#FFD700] text-black px-10 py-4 rounded-sm font-bold uppercase tracking-[0.15em] hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]"
            >
              Start Shopping <IconArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 flex flex-col gap-6">
               <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Shopping Cart <span className="text-gray-500 text-lg font-normal ml-2">({totalItems} items)</span></h1>
                  <button className="text-sm font-bold text-[#E31837] uppercase tracking-wider hover:text-white transition-colors underline decoration-white/20 hover:decoration-white">Clear Cart</button>
               </div>

               {/* Free Delivery Bar */}
               <div className="bg-[#111] border border-white/10 rounded-sm p-6 mb-2">
                  <div className="flex items-center gap-3 mb-3">
                     <IconTruck size={20} className={progressPercent === 100 ? "text-[#00E054]" : "text-[#FFD700]"} />
                     <p className="text-sm font-medium text-gray-300">
                        {progressPercent === 100 
                           ? <span className="text-[#00E054] font-bold">You&apos;ve unlocked FREE Delivery!</span> 
                           : <span>Add <span className="text-[#FFD700] font-bold">₹{(deliveryThreshold - totalPrice).toFixed(0)}</span> more for <span className="text-white font-bold">FREE Delivery</span></span>
                        }
                     </p>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                     <div 
                        className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] transition-all duration-1000 ease-out"
                        style={{ width: `${progressPercent}%` }}
                     ></div>
                  </div>
               </div>

               {/* Items */}
               <div className="space-y-4">
                  {items.map((item) => (
                    <div 
                      key={`${item.product.id}-${item.variantIndex}`} 
                      className="group bg-[#0a0a0a] border border-white/10 rounded-sm p-4 sm:p-6 flex gap-4 sm:gap-6 relative overflow-hidden transition-all hover:border-[#FFD700]/30 hover:bg-[#111]"
                    >
                      {/* Remove Button (Absolute top-right) */}
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.variantIndex)}
                        className="absolute top-4 right-4 text-gray-600 hover:text-[#E31837] transition-colors p-1"
                      >
                        <IconX size={18} />
                      </button>

                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-sm flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-2 transition-transform group-hover:scale-110 duration-500"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between pr-8">
                             <div>
                                <p className="text-[10px] sm:text-xs text-[#FFD700] font-bold uppercase tracking-widest mb-1">{item.product.brand}</p>
                                <Link href={`/product/${item.product.id}`} className="block">
                                  <h3 className="font-bold text-white text-base sm:text-lg hover:text-[#FFD700] transition-colors line-clamp-1">{item.product.name}</h3>
                                </Link>
                             </div>
                          </div>
                          <p className="text-sm text-gray-400 mt-1 font-medium">{item.variant.weight}</p>
                        </div>

                        <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
                           {/* Quantity Control */}
                           <div className="flex items-center border border-white/10 rounded-sm bg-black">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.variantIndex, item.quantity - 1)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                              >
                                <IconMinus size={14} />
                              </button>
                              <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.variantIndex, item.quantity + 1)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                              >
                                <IconPlus size={14} />
                              </button>
                           </div>

                           {/* Price */}
                           <div className="text-right">
                              <div className="text-lg sm:text-xl font-bold text-white">₹{item.variant.price * item.quantity}</div>
                              {item.variant.mrp > item.variant.price && (
                                 <div className="text-xs text-gray-500 line-through">₹{item.variant.mrp * item.quantity}</div>
                              )}
                           </div>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-4">
                 <div className="bg-[#111] border border-white/10 rounded-sm p-6 overflow-hidden relative">
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                    
                    <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Order Summary</h3>
                    
                    <div className="space-y-4 text-sm text-gray-300">
                      <div className="flex justify-between">
                         <span>Subtotal</span>
                         <span className="text-white font-bold">₹{totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[#E31837]">
                         <span>Discount</span>
                         <span className="font-bold">-₹{totalSavings.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                         <span>Delivery Fee</span>
                         <span className={deliveryFee === 0 ? "text-[#00E054] font-bold" : "text-white"}>
                            {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                         </span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10">
                       <div className="flex justify-between items-end mb-1">
                          <span className="font-bold text-white">Grand Total</span>
                          <span className="text-2xl font-bold text-[#FFD700]">₹{total.toFixed(2)}</span>
                       </div>
                       <p className="text-[10px] text-gray-500 text-right uppercase tracking-wider">Inclusive of all taxes</p>
                    </div>

                    <button className="w-full bg-[#FFD700] text-black font-bold uppercase tracking-[0.2em] py-4 mt-8 hover:bg-white transition-all transform active:scale-[0.98]">
                       Proceed to Pay
                    </button>
                    
                    <div className="mt-6 flex flex-col items-center gap-3">
                       <p className="text-[10px] text-gray-500 uppercase tracking-widest">We Accept Secure Payment</p>
                       <div className="flex gap-2 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                          {['VISA', 'Mastercard', 'UPI', 'RuPay'].map(m => (
                             <div key={m} className="bg-white px-2 py-1 rounded-[2px] text-[10px] font-bold text-black border border-gray-300">{m}</div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer01 />
      <Footer02 />
    </div>
  );
}
