import Link from 'next/link';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';
import { categories } from '@/MockData/CategoryData';
import { IconSearch } from '@tabler/icons-react';

export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-[#0a0a0a] border-b border-white/5">
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
              <Link href="/" className="text-gray-400 hover:text-[#FFD700] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">About Us</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Content - About Text */}
            <div className="w-full lg:w-[76%]">
              <div className="prose prose-invert max-w-none">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 tracking-tight">Welcome to SkySpark</h1>
                
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                  Welcome to SkySpark, your premier destination for high-quality fireworks and crackers. We are dedicated to lighting up your celebrations with the safest, brightest, and most spectacular pyrotechnics available in the market.
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-4 mt-8 uppercase tracking-wide">Our Story</h2>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                  Born from a passion for festive traditions, SkySpark began as a small family business in Sivakasi, the firework capital of India. Today, we have evolved into a trusted online brand, bringing the joy of celebration directly to your doorstep with a commitment to quality and safety.
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-4 mt-8 uppercase tracking-wide">What We Offer</h2>
                <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 leading-relaxed mb-6 space-y-2 marker:text-[#FFD700]">
                  <li><strong className="text-white">Premium Sky Shots:</strong> Professional-grade aerial displays for maximum impact.</li>
                  <li><strong className="text-white">Sparklers & Flower Pots:</strong> Safe and vibrant classics for families.</li>
                  <li><strong className="text-white">Sound Crackers:</strong> Traditional loud crackers for the authentic festive spirit.</li>
                  <li><strong className="text-white">Gift Boxes:</strong> Curated assortments perfect for gifting during Diwali and New Year.</li>
                  <li><strong className="text-white">Safety Gear:</strong> Essential safety accessories to ensure worry-free celebrations.</li>
                </ul>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-4 mt-8 uppercase tracking-wide">Commitment to Safety</h2>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                  Safety is our top priority. All our products undergo rigorous testing and adhere to the highest safety standards set by the Explosives Department. We promote responsible usage and provide detailed safety instructions with every purchase.
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-4 mt-8 uppercase tracking-wide">Why Choose SkySpark?</h2>
                <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 leading-relaxed mb-6 space-y-2 marker:text-[#FFD700]">
                  <li>Direct from Sivakasi: Authentic quality at factory prices.</li>
                  <li>Wide Variety: The largest collection of crackers online.</li>
                  <li>Fast Delivery: Secure and timely shipping across approved regions.</li>
                  <li>Customer Support: Dedicated team to assist you with your orders.</li>
                </ul>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-[24%]">
              <div className="space-y-6 lg:sticky lg:top-24">
                {/* Search Bar */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      className="w-full px-4 py-3 pr-12 bg-[#1a1a1a] border border-white/10 rounded-sm focus:outline-none focus:border-[#FFD700] text-sm text-white placeholder-gray-600"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FFD700] transition-colors">
                      <IconSearch size={20} />
                    </button>
                  </div>
                </div>


                {/* Categories */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6">
                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">Categories</h3>
                  <div className="w-12 h-1 bg-[#FFD700] mb-6"></div>
                  
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link 
                        key={category.id}
                        href={`/product?category=${category.slug}`} 
                        className="flex items-center justify-between py-2 group border-b border-white/5 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl group-hover:scale-110 transition-transform">{category.icon}</span>
                          <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">{category.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Advertisement */}
                <div className="bg-[#111] border border-white/10 rounded-sm overflow-hidden p-6 relative group">
                   <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <p className="text-xs font-bold text-[#FFD700] uppercase tracking-widest mb-2">Mega Sale</p>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    Up to<br />
                    <span className="text-4xl text-[#FFD700]">50% OFF</span><br />
                    on Bundles
                  </h3>
                  <Link 
                    href="/product"
                    className="inline-flex items-center gap-2 bg-[#FFD700] text-black px-6 py-3 rounded-sm font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors relative z-10"
                  >
                    Shop Now
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer01 />
      <Footer02 />
    </>
  );
}
