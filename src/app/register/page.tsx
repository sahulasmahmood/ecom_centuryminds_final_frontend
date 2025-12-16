'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer02 from '@/components/Footer02';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg p-4 sm:p-8 shadow-sm">
          <div className="text-center mb-4 sm:mb-6">
            <Image src="/logo.jpeg" alt="LEATS" width={80} height={32} className="mx-auto mb-3 sm:mb-4 w-16 sm:w-[100px]" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-500 text-xs sm:text-sm">Join LEATS for fresh groceries</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] text-sm"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] text-sm"
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] text-sm"
                placeholder="Enter phone number"
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
                placeholder="Create password"
                required
              />
            </div>
            <button type="submit" className="w-full bg-[#E63946] text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#C62E39] text-sm sm:text-base">
              Create Account
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-gray-600 text-xs sm:text-sm">
              Already have an account? <Link href="/login" className="text-[#E63946] font-medium hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer02 />
    </div>
  );
}
