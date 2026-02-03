"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer01 from "@/components/Footer01";
import Footer02 from "@/components/Footer02";

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tracking order:", { orderId, email });
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-card border-b border-white/5">
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Link
                href="/"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Home
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white font-medium">Order Tracking</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Order Tracking
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Enter your order details to track your package
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-white/10 rounded-sm p-8"
            >
              <div className="space-y-6">
                {/* Order ID Field */}
                <div>
                  <label
                    htmlFor="orderId"
                    className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
                  >
                    Order ID <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter the order ID"
                    className="w-full px-4 py-3 bg-muted border border-white/10 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white text-sm transition-colors placeholder-gray-600"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
                  >
                    Email <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-muted border border-white/10 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white text-sm transition-colors placeholder-gray-600"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary text-black py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-colors text-sm"
                >
                  Track Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer01 />
      <Footer02 />
    </>
  );
}
