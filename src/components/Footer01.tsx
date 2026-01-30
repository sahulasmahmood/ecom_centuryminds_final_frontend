'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconBrandYoutube } from '@tabler/icons-react';

export default function Footer01() {
  return (
    <footer className="bg-black text-gray-300 pt-8 sm:pt-12 pb-4 sm:pb-6 border-t border-white/10">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#FFD700]">
                <Image 
                  src="/assets/images/hero_fireworks.png"
                  alt="SkySpark Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight hover:text-[#FFD700] transition-colors">SkySpark</span>
            </Link>
            <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-gray-400">
              India&apos;s premium online crackers store. We deliver 100% safe and high-quality fireworks for all your celebrations. 
              Direct from Sivakasi to your doorstep.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-colors active:scale-95 border border-white/10">
                <IconBrandFacebook size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-colors active:scale-95 border border-white/10">
                <IconBrandTwitter size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-colors active:scale-95 border border-white/10">
                <IconBrandInstagram size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-colors active:scale-95 border border-white/10">
                <IconBrandYoutube size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/about" className="hover:text-[#FFD700] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#FFD700] transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-[#FFD700] transition-colors">FAQs</Link></li>
              <li><Link href="/order-tracking" className="hover:text-[#FFD700] transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Customer Service</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/shipping" className="hover:text-[#FFD700] transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-[#FFD700] transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/privacy" className="hover:text-[#FFD700] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#FFD700] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>123 Sivakasi Main Road, Tamil Nadu 626123</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>support@skyspark.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
