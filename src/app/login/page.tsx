'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer02 from '@/components/Footer02';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg p-4 sm:p-8 shadow-sm">
          <div className="text-center mb-4 sm:mb-6">
            <Image src="/logo.jpeg" alt="LEATS" width={80} height={32} className="mx-auto mb-3 sm:mb-4 w-16 sm:w-[100px]" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">Welcome Back!</h1>
            <p className="text-gray-500 text-xs sm:text-sm">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email or Phone</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] text-sm"
                placeholder="Enter email or phone"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] text-sm"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-[#E63946]" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-[#E63946] hover:underline">Forgot Password?</Link>
            </div>
            <button type="submit" className="w-full bg-[#E63946] text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#C62E39] text-sm sm:text-base">
              Sign In
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-gray-600 text-xs sm:text-sm">
              New to LEATS? <Link href="/register" className="text-[#E63946] font-medium hover:underline">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer02 />
    </div>
  );
}
