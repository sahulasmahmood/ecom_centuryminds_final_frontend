'use client';

import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';
import { IconMinus, IconPlus, IconX, IconShoppingCart, IconHeart } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalSavings, totalItems } = useCart();

  const deliveryFee = totalPrice >= 499 ? 0 : 40;
  const total = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-[#FFD700] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">Shopping Cart</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Shopping Cart</h1>
          <p className="text-gray-400">There are <span className="text-[#FFD700] font-bold">{totalItems}</span> products in your cart</p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-12 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <IconShoppingCart size={48} className="text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Looks like you haven&apos;t added any crackers to your cart yet. Browse our premium collection and light up your celebrations!</p>
            <Link 
              href="/product" 
              className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
                {/* Table Header - Desktop Only */}
                <div className="hidden sm:block bg-[#111] px-6 py-4 border-b border-white/10">
                  <div className="grid grid-cols-12 gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Total</div>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-white/10">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.variantIndex}`} className="p-6">
                      {/* Mobile Layout */}
                      <div className="sm:hidden">
                        <div className="flex gap-4">
                          <div className="relative w-20 h-20 bg-white/5 rounded-sm flex-shrink-0">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <div className="min-w-0">
                                <p className="text-xs text-[#FFD700] font-bold uppercase mb-1">{item.product.brand}</p>
                                <Link href={`/product/${item.product.id}`}>
                                  <h3 className="font-bold text-white text-sm line-clamp-2 hover:text-[#FFD700] transition-colors">
                                    {item.product.name}
                                  </h3>
                                </Link>
                                <p className="text-xs text-gray-400 mt-1">{item.variant.weight}</p>
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.product.id, item.variantIndex)}
                                className="text-gray-500 hover:text-red-500 p-1 flex-shrink-0 transition-colors"
                              >
                                <IconX size={18} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border border-white/20 rounded-sm">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.variantIndex, item.quantity - 1)}
                                  className="p-1.5 text-white hover:bg-white/10 transition-colors"
                                >
                                  <IconMinus size={14} />
                                </button>
                                <span className="px-3 py-1 text-sm bg-white/5 text-white min-w-[32px] text-center font-medium">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.variantIndex, item.quantity + 1)}
                                  className="p-1.5 text-white hover:bg-white/10 transition-colors"
                                >
                                  <IconPlus size={14} />
                                </button>
                              </div>
                              <div className="text-right">
                                <span className="font-bold text-white">₹{item.variant.price * item.quantity}</span>
                                {item.variant.mrp > item.variant.price && (
                                  <span className="block text-xs text-gray-500 line-through decoration-white/20">₹{item.variant.mrp * item.quantity}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                        {/* Product Info */}
                        <div className="col-span-6 flex items-center gap-4">
                          <button 
                            onClick={() => removeFromCart(item.product.id, item.variantIndex)}
                            className="text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <IconX size={20} />
                          </button>
                          <div className="relative w-20 h-20 bg-white/5 rounded-sm p-2">
                             <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <p className="text-xs text-[#FFD700] font-bold uppercase mb-1">{item.product.brand}</p>
                            <Link href={`/product/${item.product.id}`}>
                              <h3 className="font-bold text-white hover:text-[#FFD700] transition-colors">
                                {item.product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-400 mt-1">{item.variant.weight}</p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center">
                          <span className="font-bold text-white">₹{item.variant.price}</span>
                          {item.variant.mrp > item.variant.price && (
                            <span className="block text-xs text-gray-500 line-through decoration-white/20">₹{item.variant.mrp}</span>
                          )}
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 flex justify-center">
                          <div className="flex items-center border border-white/20 rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variantIndex, item.quantity - 1)}
                              className="p-2 text-white hover:bg-white/10 transition-colors"
                            >
                              <IconMinus size={14} />
                            </button>
                            <span className="px-3 py-2 text-sm bg-white/5 text-white min-w-[32px] text-center font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variantIndex, item.quantity + 1)}
                              className="p-2 text-white hover:bg-white/10 transition-colors"
                            >
                              <IconPlus size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="col-span-2 text-center">
                          <span className="font-bold text-[#FFD700]">
                            ₹{item.variant.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Actions */}
                <div className="bg-[#111] px-6 py-4 flex justify-between items-center border-t border-white/10">
                  <Link 
                    href="/product" 
                    className="text-[#FFD700] hover:text-white font-bold text-sm uppercase tracking-wide transition-colors flex items-center gap-2"
                  >
                     <span>←</span> Continue Shopping
                  </Link>
                </div>
              </div>
            </div>


            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b border-white/10 pb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal ({totalItems} items)</span>
                    <span className="font-bold text-white">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-[#E31837] text-sm">
                      <span>Discount</span>
                      <span className="font-bold">-₹{totalSavings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Delivery Fee</span>
                    <span className="font-bold text-white">
                      {deliveryFee === 0 ? <span className="text-[#FFD700]">FREE</span> : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold text-white">Total</span>
                      <span className="text-xl font-bold text-[#FFD700]">₹{total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">Inclusive of all taxes</p>
                  </div>
                </div>

                {/* Shipping Notice */}
                {deliveryFee > 0 && (
                  <div className="bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-sm p-4 mb-4">
                    <p className="text-xs sm:text-sm text-[#FFD700]">
                      Add ₹{(499 - totalPrice).toFixed(2)} more to get free delivery!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <button className="w-full bg-[#FFD700] text-black py-4 rounded-sm hover:bg-white transition-colors font-bold uppercase tracking-widest mb-4">
                  Proceed to Checkout
                </button>

                {/* Additional Actions */}
                <div className="space-y-2">
                  <button className="w-full border border-white/20 text-gray-300 py-3 rounded-sm hover:border-white hover:text-white transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                    <IconHeart size={18} />
                    Save for Later
                  </button>
                </div>

                {/* Payment Methods */}
                <div className="mt-8 text-center border-t border-white/10 pt-6">
                  <p className="text-xs text-gray-500 mb-3 uppercase tracking-widest">We Accept</p>
                  <div className="flex justify-center gap-2 flex-wrap text-gray-400">
                    <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-sm text-xs font-bold">VISA</span>
                    <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-sm text-xs font-bold">Mastercard</span>
                    <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-sm text-xs font-bold">UPI</span>
                    <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-sm text-xs font-bold">COD</span>
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
