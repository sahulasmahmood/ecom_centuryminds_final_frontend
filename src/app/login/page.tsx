'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer02 from '@/components/Footer02';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
        <div className="max-w-md mx-auto bg-[#0a0a0a] border border-white/10 rounded-sm p-6 sm:p-10 relative overflow-hidden">
          
           {/* Decorative background glow */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">SkySpark</h2>
            <p className="text-[#FFD700] text-sm font-bold uppercase tracking-widest">Premium Crackers</p>
          </div>
          
          <div className="mb-8 text-center relative z-10">
            <h1 className="text-xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-gray-400 text-sm">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email or Phone</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-sm focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] text-white text-sm transition-colors placeholder-gray-600"
                placeholder="Enter email or phone"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-sm focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] text-white text-sm transition-colors placeholder-gray-600"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded-sm text-[#FFD700] focus:ring-[#FFD700] bg-[#1a1a1a] border-white/20" />
                <span className="text-gray-400">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-[#FFD700] hover:text-white transition-colors text-sm">Forgot Password?</Link>
            </div>
            <button type="submit" className="w-full bg-[#FFD700] text-black py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-colors text-sm">
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <p className="text-gray-500 text-sm">
              New to SkySpark? <Link href="/register" className="text-[#FFD700] font-bold hover:text-white transition-colors">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer02 />
    </div>
  );
}
