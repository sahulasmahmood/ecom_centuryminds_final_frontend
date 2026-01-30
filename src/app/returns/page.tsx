import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';

export default function ReturnsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-[#0a0a0a] border-b border-white/5">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-[#FFD700] transition-colors">Home</Link>
              <IconChevronRight size={16} className="text-gray-600" />
              <span className="text-white font-medium">Returns & Exchanges</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-[90rem] mx-auto bg-[#0a0a0a] border border-white/10 rounded-sm p-8 sm:p-12">
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Returns & Exchanges Policy</h1>
            <p className="text-gray-500 mb-10">Last updated: December 16, 2024</p>

            <div className="prose prose-invert max-w-none">
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">Our Commitment</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  At SkySpark, we strive to deliver premium quality fireworks. Due to the nature of our products (Explosives Class 1.4/1.3), we have strict safety and return guidelines to ensure the well-being of our customers and logistics partners.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">Return Eligibility</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Fireworks are sensitive goods. We generally <strong className="text-white">do not accept returns</strong> once the package has been opened or used, for safety reasons. However, returns are accepted under the following specific conditions:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-4 marker:text-[#FFD700]">
                  <li>The package was received in a damaged condition (External damage).</li>
                  <li>Incomplete or wrong items were delivered.</li>
                  <li>Items must be returned in their original, unopened safety packaging.</li>
                  <li>Evidence (Photos/Videos) of unboxing must be provided within 24 hours.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">Non-Returnable Items</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  For safety compliance, the following cannot be returned:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-4 marker:text-[#FFD700]">
                  <li>Any firework item that has been lit or attempted to be lit.</li>
                  <li>Loose crackers or sparklers removed from their box.</li>
                  <li>Items damaged due to mishandling or improper storage (e.g., water exposure) by the customer.</li>
                  <li>Gift Boxes that have been opened.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">How to Return an Item</h2>
                <div className="space-y-6">
                  <div className="bg-[#1a1a1a] p-6 border border-white/5 rounded-sm">
                    <h3 className="text-lg font-bold text-[#FFD700] mb-2 uppercase">Step 1: Report Issue</h3>
                    <p className="text-gray-400 text-sm">
                      Contact our support team within 24 hours of delivery. Send photos/videos of the damaged box/item to support@skyspark.com.
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-6 border border-white/5 rounded-sm">
                    <h3 className="text-lg font-bold text-[#FFD700] mb-2 uppercase">Step 2: Verification</h3>
                    <p className="text-gray-400 text-sm">
                      Our quality team will review your claim. Since fireworks cannot be easily shipped back by customers via standard courier, we may offer a refund or replacement without requiring a return shipment, depending on the severity.
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-6 border border-white/5 rounded-sm">
                    <h3 className="text-lg font-bold text-[#FFD700] mb-2 uppercase">Step 3: Resolution</h3>
                    <p className="text-gray-400 text-sm">
                      Approved refunds are processed within 5-7 business days to the original payment method. Replacements are shipped immediately if stock is available.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">Damaged or Defective Items</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If a cracker fails to light (dud), please soak it in water and dispose of it safely. We do not ask customers to return live duds for safety reasons. We will issue a partial refund or coupon code for duds if they exceed 10% of the box quantity.
                </p>
              </section>

              <section className="mb-8 p-6 bg-[#1a1a1a] border border-white/10 rounded-sm">
                <h2 className="text-xl font-bold text-white mb-4">Contact Support</h2>
                <p className="text-gray-400 text-sm mb-4">
                  For return requests:
                </p>
                <ul className="list-none space-y-2 text-gray-300 text-sm">
                  <li><span className="text-[#FFD700] mr-2">✉️</span> support@skyspark.com</li>
                  <li><span className="text-[#FFD700] mr-2">📞</span> 1800-SKY-SPARK</li>
                  <li><span className="text-[#FFD700] mr-2">🕒</span> Mon-Sat, 9AM - 9PM</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer01 />
      <Footer02 />
    </>
  );
}
