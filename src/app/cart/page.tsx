"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer01 from "@/components/Footer01";
import Footer02 from "@/components/Footer02";
import {
  IconMinus,
  IconPlus,
  IconX,
  IconShoppingCart,
  IconArrowRight,
  IconTruck,
  IconShield,
  IconClock,
  IconStar,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalSavings,
    totalItems,
    clearCart,
  } = useCart();
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
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-background via-muted to-background border-b border-white/5">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Shopping Cart
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
                <span>•</span>
                <span className="text-white">Cart</span>
              </div>
            </div>
            {items.length > 0 && (
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {totalItems} Items
                </p>
                <p className="text-sm text-gray-400">Ready to checkout</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          /* Empty Cart - Modern Design */
          <div className="max-w-md mx-auto text-center py-16">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-card border-2 border-dashed border-white/20 rounded-full flex items-center justify-center mx-auto">
                <IconShoppingCart size={32} className="text-gray-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">0</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              Add some fireworks to light up your celebration!
            </p>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-white transition-colors"
            >
              Browse Products <IconArrowRight size={16} />
            </Link>
          </div>
        ) : (
          /* Cart with Items - Card Layout */
          <div className="max-w-6xl mx-auto">
            {/* Progress Bar */}
            <div className="bg-card border border-white/10 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${progressPercent === 100 ? "bg-green-500" : "bg-primary"}`}
                >
                  <IconTruck size={16} className="text-black" />
                </div>
                <div className="flex-1">
                  {progressPercent === 100 ? (
                    <p className="text-green-400 font-semibold text-sm">
                      🎉 Free delivery unlocked!
                    </p>
                  ) : (
                    <p className="text-gray-300 text-sm">
                      Add{" "}
                      <span className="text-primary font-bold">
                        ₹{(deliveryThreshold - totalPrice).toFixed(0)}
                      </span>{" "}
                      more for free delivery
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${progressPercent === 100 ? "bg-green-500" : "bg-primary"}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cart Items - Left Side */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Cart Items
                  </h3>
                  <button
                    onClick={clearCart}
                    className="text-xs text-muted-foreground hover:text-secondary transition-colors uppercase tracking-wider"
                  >
                    Clear All
                  </button>
                </div>

                {/* Items Grid */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.variantIndex}`}
                      className="bg-card border border-white/10 rounded-lg p-4 hover:border-primary/30 transition-all group"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-white/5 rounded-lg flex-shrink-0 overflow-hidden">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-primary text-xs font-semibold uppercase tracking-wider">
                                {item.product.brand}
                              </p>
                              <h4 className="text-white font-medium text-sm truncate group-hover:text-primary transition-colors">
                                {item.product.name}
                              </h4>
                              <p className="text-gray-500 text-xs mt-1">
                                {item.variant.weight}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                removeFromCart(
                                  item.product.id,
                                  item.variantIndex,
                                )
                              }
                              className="text-muted-foreground hover:text-secondary transition-colors p-1"
                            >
                              <IconX size={16} />
                            </button>
                          </div>

                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center bg-muted border border-white/10 rounded-full">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.variantIndex,
                                    item.quantity - 1,
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                              >
                                <IconMinus size={12} />
                              </button>
                              <span className="w-8 text-center text-sm font-semibold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.variantIndex,
                                    item.quantity + 1,
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                              >
                                <IconPlus size={12} />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-bold">
                                ₹{item.variant.price * item.quantity}
                              </p>
                              {item.variant.mrp > item.variant.price && (
                                <p className="text-gray-500 text-xs line-through">
                                  ₹{item.variant.mrp * item.quantity}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary - Right Side */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-white/10 rounded-lg p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-white mb-6">
                    Order Summary
                  </h3>

                  {/* Price Breakdown */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    {totalSavings > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Savings</span>
                        <span>-₹{totalSavings.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-300">
                      <span>Delivery</span>
                      <span
                        className={deliveryFee === 0 ? "text-green-400" : ""}
                      >
                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <hr className="border-white/10" />
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full bg-primary text-black font-bold py-4 rounded-lg mt-6 hover:bg-white transition-colors uppercase tracking-wider text-sm">
                    Proceed to Checkout
                  </button>

                  {/* Trust Badges */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <IconShield size={16} className="text-green-400" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <IconClock size={16} className="text-blue-400" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <IconStar size={16} className="text-yellow-400" />
                      <span>Quality Assured</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
                      Accepted Payments
                    </p>
                    <div className="flex gap-2">
                      {["VISA", "MC", "UPI", "GPay"].map((method) => (
                        <div
                          key={method}
                          className="bg-white/10 px-2 py-1 rounded text-xs font-semibold text-gray-300"
                        >
                          {method}
                        </div>
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
