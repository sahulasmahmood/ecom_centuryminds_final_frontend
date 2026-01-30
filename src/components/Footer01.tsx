'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconBrandYoutube } from '@tabler/icons-react';

export default function Footer01() {
  return (
    <footer style={{ backgroundColor: 'var(--color-gray-900)', borderTopColor: 'var(--color-gray-300)' }} className="text-gray-300 pt-8 sm:pt-12 pb-4 sm:pb-6 border-t">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white">
                <Image 
                  src="/logo.jpeg"
                  alt="Crackers Central Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white">Crackers Central</span>
            </Link>
            <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-gray-400">
              Your ultimate destination for premium crackers and fireworks. We deliver quality celebrations 
              and festive joy right to your doorstep, with the best prices on Diwali products.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a href="#" style={{ backgroundColor: 'var(--color-gray-800)' }} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 active:scale-95" onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-primary-red)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-gray-800)'; }}>
                <IconBrandFacebook size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="#" style={{ backgroundColor: 'var(--color-gray-800)' }} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 active:scale-95" onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-bright-yellow)'; e.currentTarget.style.color = 'black'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-gray-800)'; e.currentTarget.style.color = 'white'; }}>
                <IconBrandTwitter size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="#" style={{ backgroundColor: 'var(--color-gray-800)' }} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 active:scale-95" onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-primary-red)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-gray-800)'; }}>
                <IconBrandInstagram size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="#" style={{ backgroundColor: 'var(--color-gray-800)' }} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 active:scale-95" onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-bright-yellow)'; e.currentTarget.style.color = 'black'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-gray-800)'; e.currentTarget.style.color = 'white'; }}>
                <IconBrandYoutube size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/about" style={{ color: 'var(--color-gray-300)' }} className="hover:text-[color:var(--color-bright-yellow)] transition-colors">About Us</Link></li>
              <li><Link href="/contact" style={{ color: 'var(--color-gray-300)' }} className="hover:text-[color:var(--color-bright-yellow)] transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" style={{ color: 'var(--color-gray-300)' }} className="hover:text-[color:var(--color-bright-yellow)] transition-colors">FAQs</Link></li>
              <li><Link href="/order-tracking" style={{ color: 'var(--color-gray-300)' }} className="hover:text-[color:var(--color-bright-yellow)] transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Customer Service</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/shipping" style={{ color: 'var(--color-gray-300)' }} className="hover:text-[color:var(--color-bright-yellow)] transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" style={{ color: 'var(--color-gray-300)' }} className="hover:text-[color:var(--color-bright-yellow)] transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/privacy" style={{ color: 'var(--color-gray-300)' }} className="hover:text-[color:var(--color-bright-yellow)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" style={{ color: 'var(--color-gray-300)' }} className="hover:text-[color:var(--color-bright-yellow)] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>123 Main Street, Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>1800-123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>support@leats.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
