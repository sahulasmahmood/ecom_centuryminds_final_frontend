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

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pt-16 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 space-y-6 pr-8">
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
              India&apos;s premier destination for premium fireworks. We bring the magic of Sivakasi directly to your doorstep with certified safety and spectacular quality.
            </p>
            <div className="flex gap-4 pt-2">
              {[IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-[#111] rounded-sm flex items-center justify-center text-gray-400 hover:text-black hover:bg-[#FFD700] transition-all duration-300 group">
                  <Icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 1 */}
          <div>
            <h4 className="text-[#FFD700] font-bold text-xs uppercase tracking-[0.15em] mb-6">Discovery</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              {['New Arrivals', 'Best Sellers', 'Kids Special', 'Wedding Collection', 'Gift Boxes'].map((item) => (
                <li key={item}>
                   <Link href="/product" className="hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-[#FFD700]">→</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                   </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-[#FFD700] font-bold text-xs uppercase tracking-[0.15em] mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              {['About Us', 'Contact Us', 'Wholesale', 'Careers', 'Blog'].map((item) => (
                <li key={item}>
                   <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-[#FFD700]">→</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                   </Link>
                </li>
              ))}
            </ul>
          </div>

           {/* Column 3 */}
          <div>
            <h4 className="text-[#FFD700] font-bold text-xs uppercase tracking-[0.15em] mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              {['Order Tracking', 'Shipping Policy', 'Returns & Refunds', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                   <Link href={item === 'Order Tracking' ? '/order-tracking' : item === 'Shipping Policy' ? '/shipping' : item === 'Returns & Refunds' ? '/returns' : item === 'Privacy Policy' ? '/privacy' : '/terms'} className="hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-[#FFD700]">→</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                   </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
