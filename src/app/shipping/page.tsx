import Link from 'next/link';
import { IconChevronRight, IconTruck, IconClock } from '@tabler/icons-react';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';

export default function ShippingPage() {
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
              <span className="text-white font-medium">Shipping & Delivery</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-[90rem] mx-auto bg-[#0a0a0a] border border-white/10 rounded-sm p-8 sm:p-12">
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Shipping & Delivery</h1>
            <p className="text-gray-500 mb-10">Last updated: December 16, 2024</p>

            <div className="prose prose-invert max-w-none">
              {/* Delivery Options */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">Delivery Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-[#FFD700] rounded-sm p-6 bg-[#FFD700]/5 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <IconClock size={32} className="text-[#FFD700]" />
                      <h3 className="text-xl font-bold text-white mb-0">Express Safe Delivery</h3>
                    </div>
                    <p className="text-gray-400 mb-3 relative z-10">Only available in Sivakasi & nearby regions</p>
                    <p className="text-2xl font-bold text-[#FFD700] mb-3 relative z-10">FREE</p>
                    <p className="text-sm text-gray-500 relative z-10">On orders over ₹999</p>
                  </div>

                  <div className="border border-white/10 rounded-sm p-6 bg-[#1a1a1a]">
                    <div className="flex items-center gap-3 mb-4">
                      <IconTruck size={32} className="text-gray-400" />
                      <h3 className="text-xl font-bold text-white mb-0">Standard Shipping</h3>
                    </div>
                    <p className="text-gray-400 mb-3">Reliable transport via approved carriers</p>
                    <p className="text-2xl font-bold text-white mb-3">Flat Rates</p>
                    <p className="text-sm text-gray-500">Apply based on location</p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">Delivery Areas</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We currently deliver fireworks to approved districts across Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, and Telengana. Please check your pincode availability on the product page before placing an order.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">Order Processing</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Orders are processed within 24 hours of payment tracking. All firework packages are packed in safety-compliant boxes.
                </p>
                <div className="bg-[#1a1a1a] border-l-4 border-[#FFD700] p-4 mb-4">
                  <p className="text-gray-300">
                    <strong className="text-[#FFD700]">Note:</strong> Deliveries may be delayed during peak Diwali season due to high demand. Order early to ensure timely arrival.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">Delivery Charges</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10">
                    <thead>
                      <tr className="bg-[#1a1a1a]">
                        <th className="border border-white/10 px-6 py-4 text-left text-white font-bold uppercase tracking-wider text-sm">Order Value</th>
                        <th className="border border-white/10 px-6 py-4 text-left text-white font-bold uppercase tracking-wider text-sm">Delivery Charge</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 px-6 py-4 text-gray-300">Under ₹999</td>
                        <td className="border border-white/10 px-6 py-4 text-gray-300">₹150</td>
                      </tr>
                      <tr className="bg-[#1a1a1a]/50">
                        <td className="border border-white/10 px-6 py-4 text-gray-300">₹999 and above</td>
                        <td className="border border-white/10 px-6 py-4 text-[#FFD700] font-bold">FREE (Select Areas)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">Order Tracking</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Track your parcel using the Order ID sent to your email/SMS. Our logistics partners provide real-time updates for interstate shipments.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-4 marker:text-[#FFD700]">
                  <li>Order confirmed & Packed</li>
                  <li>Dispatched from Sivakasi</li>
                  <li>In Transit (Hub-to-Hub)</li>
                  <li>Out for Delivery</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">Safety & Instructions</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Fireworks are hazardous goods. Deliveries cannot be left unattended. An adult (18+) must be present to sign for the package.
                </p>
              </section>

              <section className="mb-8 p-6 bg-[#1a1a1a] border border-white/10 rounded-sm">
                <h2 className="text-xl font-bold text-white mb-4">Contact Logistics Support</h2>
                <p className="text-gray-400 text-sm mb-4">
                  For shipping queries or delays:
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
