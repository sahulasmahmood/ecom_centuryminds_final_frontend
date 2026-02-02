'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconBrandYoutube, IconMail } from '@tabler/icons-react';

export default function Footer01() {
  return (
    <footer className="bg-[#050505] text-white pt-16 sm:pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Watermark Logo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.02] pointer-events-none translate-x-1/3 -translate-y-1/4">
         <Image 
           src="/assets/images/hero_fireworks.png" 
           alt="Watermark" 
           fill 
           className="object-contain grayscale"
         />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-16 border-b border-white/5">
           <div className="max-w-xl">
              <h3 className="text-3xl font-bold mb-2 tracking-tight">Join the <span className="text-[#FFD700]">SkySpark Club</span></h3>
              <p className="text-gray-400">Get 10% off your first order and exclusive access to new arrivals.</p>
           </div>
           <div className="w-full md:w-auto flex-1 max-w-md">
              <div className="flex relative group">
                 <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FFD700] transition-colors" size={20} />
                 <input 
                   type="email" 
                   placeholder="Enter your email address" 
                   className="w-full bg-[#111] border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
                 />
                 <button className="bg-[#FFD700] text-black px-8 font-bold uppercase tracking-wider hover:bg-white transition-colors">
                    Join
                 </button>
              </div>
           </div>
        </div>

        {/* Links Grid - Organized by Topics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pt-16 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FFD700]">
                <Image 
                  src="/assets/images/hero_fireworks.png"
                  alt="SkySpark"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">SkySpark</span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
              India&apos;s premier destination for premium fireworks. Bringing Sivakasi magic to your celebrations.
            </p>
            <div className="flex gap-4 pt-2">
              {[IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-[#111] rounded-sm flex items-center justify-center text-gray-400 hover:text-black hover:bg-[#FFD700] transition-all duration-300 group">
                  <Icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[#FFD700] font-bold text-sm uppercase tracking-wider mb-6">Categories</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/product?category=ground-chakkars" className="hover:text-white transition-colors">Ground Chakkars</Link></li>
              <li><Link href="/product?category=flower-pots" className="hover:text-white transition-colors">Flower Pots</Link></li>
              <li><Link href="/product?category=sparklers" className="hover:text-white transition-colors">Sparklers</Link></li>
              <li><Link href="/product?category=aerial-shots" className="hover:text-white transition-colors">Aerial Shots</Link></li>
              <li><Link href="/product?category=rockets" className="hover:text-white transition-colors">Rockets</Link></li>
              <li><Link href="/product?category=kids-special" className="hover:text-white transition-colors">Kids Special</Link></li>
              <li><Link href="/product" className="hover:text-white transition-colors">Shop All</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-[#FFD700] font-bold text-sm uppercase tracking-wider mb-6">Account</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Create Account</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">My Cart</Link></li>
              <li><Link href="/order-tracking" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/quick-purchase" className="hover:text-white transition-colors">Quick Purchase</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#FFD700] font-bold text-sm uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info Only */}
          <div>
            <h4 className="text-[#FFD700] font-bold text-sm uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</span>
                <a href="tel:+918148559768" className="hover:text-white transition-colors">+91 8148559768</a>
              </li>
              <li>
                <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Address</span>
                <span className="block leading-relaxed">
                  3/267-A2, Sivakasi – Sattur Rd,<br />
                  near Sri Sangam Mahal,<br />
                  Chinnakarampatti, Sivakasi,<br />
                  Tamil Nadu 626189
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
