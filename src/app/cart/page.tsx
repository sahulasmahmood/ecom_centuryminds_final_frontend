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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4 sm:mb-8">
          <Link href="/" className="hover:text-[#e63946]">Home</Link>
          <span>/</span>
          <span className="text-gray-900">Shopping Cart</span>
        </nav>

        {/* Page Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Shopping Cart</h1>
          <p className="text-sm sm:text-base text-gray-600">There are {totalItems} products in your cart</p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <IconShoppingCart size={32} className="text-gray-400 sm:hidden" />
              <IconShoppingCart size={48} className="text-gray-400 hidden sm:block" />
            </div>
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-4">Your Cart is Empty</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-8">Looks like you have not added any items to your cart yet.</p>
            <Link 
              href="/product" 
              className="inline-block bg-[#e63946] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-[#c1121f] transition-colors text-sm sm:text-base"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Table Header - Desktop Only */}
                <div className="hidden sm:block bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-b">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Total</div>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.variantIndex}`} className="p-3 sm:p-6">
                      {/* Mobile Layout */}
                      <div className="sm:hidden">
                        <div className="flex gap-3">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <div className="min-w-0">
                                <p className="text-xs text-gray-500">{item.product.brand}</p>
                                <Link href={`/product/${item.product.id}`}>
                                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2 hover:text-[#e63946]">
                                    {item.product.name}
                                  </h3>
                                </Link>
                                <p className="text-xs text-gray-500 mt-0.5">{item.variant.weight}</p>
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.product.id, item.variantIndex)}
                                className="text-gray-400 hover:text-red-500 p-1 flex-shrink-0"
                              >
                                <IconX size={18} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center border border-gray-300 rounded">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.variantIndex, item.quantity - 1)}
                                  className="p-1.5 hover:bg-gray-50"
                                >
                                  <IconMinus size={14} />
                                </button>
                                <span className="px-3 py-1 text-sm min-w-[32px] text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.variantIndex, item.quantity + 1)}
                                  className="p-1.5 hover:bg-gray-50"
                                >
                                  <IconPlus size={14} />
                                </button>
                              </div>
                              <div className="text-right">
                                <span className="font-semibold text-[#e63946]">₹{item.variant.price * item.quantity}</span>
                                {item.variant.mrp > item.variant.price && (
                                  <span className="block text-xs text-gray-400 line-through">₹{item.variant.mrp * item.quantity}</span>
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
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <IconX size={20} />
                          </button>
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="rounded-lg"
                          />
                          <div>
                            <p className="text-xs text-gray-500">{item.product.brand}</p>
                            <Link href={`/product/${item.product.id}`}>
                              <h3 className="font-semibold text-gray-900 hover:text-[#e63946] transition-colors">
                                {item.product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">{item.variant.weight}</p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center">
                          <span className="font-semibold text-gray-900">₹{item.variant.price}</span>
                          {item.variant.mrp > item.variant.price && (
                            <span className="block text-xs text-gray-400 line-through">₹{item.variant.mrp}</span>
                          )}
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 flex justify-center">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variantIndex, item.quantity - 1)}
                              className="p-2 hover:bg-gray-50 transition-colors"
                            >
                              <IconMinus size={16} />
                            </button>
                            <span className="px-4 py-2 min-w-[40px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variantIndex, item.quantity + 1)}
                              className="p-2 hover:bg-gray-50 transition-colors"
                            >
                              <IconPlus size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="col-span-2 text-center">
                          <span className="font-semibold text-[#e63946]">
                            ₹{item.variant.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Actions */}
                <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
                  <Link 
                    href="/product" 
                    className="text-[#e63946] hover:underline font-medium text-sm sm:text-base"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>


            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-24">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Order Summary</h3>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-green-600 text-sm sm:text-base">
                      <span>Discount</span>
                      <span className="font-semibold">-₹{totalSavings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">
                      {deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="border-t pt-3 sm:pt-4">
                    <div className="flex justify-between">
                      <span className="text-base sm:text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-base sm:text-lg font-bold text-[#e63946]">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Notice */}
                {deliveryFee > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 sm:p-4 mb-4 sm:mb-6">
                    <p className="text-xs sm:text-sm text-yellow-800">
                      Add ₹{(499 - totalPrice).toFixed(2)} more to get free delivery!
                    </p>
                  </div>
                )}

                {/* Savings Badge */}
                {totalSavings > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3 sm:p-4 mb-4 sm:mb-6">
                    <p className="text-xs sm:text-sm text-green-800 font-medium">
                      🎉 You are saving ₹{totalSavings.toFixed(2)} on this order!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <button className="w-full bg-[#e63946] text-white py-2.5 sm:py-3 rounded-md hover:bg-[#c1121f] transition-colors font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                  Proceed to Checkout
                </button>

                {/* Additional Actions */}
                <div className="space-y-2">
                  <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                    <IconHeart size={16} />
                    Save for Later
                  </button>
                </div>

                {/* Payment Methods */}
                <div className="mt-4 sm:mt-6 text-center">
                  <p className="text-xs text-gray-500 mb-2">We Accept</p>
                  <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">VISA</span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">Mastercard</span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">UPI</span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">COD</span>
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
