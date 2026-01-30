import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';

export default function TermsPage() {
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
              <span className="text-white font-medium">Terms & Conditions</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-[90rem] mx-auto bg-[#0a0a0a] border border-white/10 rounded-sm p-8 sm:p-12">
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Terms & Conditions</h1>
            <p className="text-gray-500 mb-10">Last updated: December 16, 2024</p>

            <div className="prose prose-invert max-w-none">
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">1. Agreement to Terms</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  By accessing and using SkySpark website and services, you accept and agree to be bound by the terms and provision of this agreement. Purchasing fireworks from our platform implies strict adherence to the Explosives Rules, 2008 of India.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">2. Use of Our Service</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You agree to use our service only for lawful purposes. Specifically concerning fireworks:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-4 marker:text-[#FFD700]">
                  <li>You must be at least 18 years of age to purchase from our store.</li>
                  <li>You agree not to resell these items without a valid explosives license.</li>
                  <li>You assume full responsibility for the safe storage and usage of the products.</li>
                  <li>You agree not to use the service for any illegal activities.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">3. Account Registration</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  To place orders, you may be required to register. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-4 marker:text-[#FFD700]">
                  <li>Provide accurate legal name and contact information.</li>
                  <li>Maintain the confidentiality of your account credentials.</li>
                  <li>Accept responsibility for all activities under your account.</li>
                  <li>Notify us immediately of any unauthorized use.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">4. Products and Pricing</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We sell Class 1.4/1.3 explosives (consumer fireworks). We reserve the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-4 marker:text-[#FFD700]">
                  <li>Limit quantities to ensure compliance with storage regulations.</li>
                  <li>Discontinue any product at any time based on safety audits.</li>
                  <li>Refuse orders to restricted pincodes.</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Prices are in Indian Rupees (₹) and may fluctuate based on raw material costs in Sivakasi.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">5. Orders and Payment</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  By placing an order, you warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-4 marker:text-[#FFD700]">
                  <li>You are legally capable of entering into binding contracts.</li>
                  <li>You have authorization to use the payment method provided.</li>
                  <li>You acknowledge that fireworks contain hazardous materials.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">6. Delivery</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Delivery times are estimates. Unlike standard courier products, fireworks require specialized transport. We are not liable for delays caused by regulatory checks, weather conditions, or interstate transport restrictions.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">7. Intellectual Property</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The service, content, and branding of SkySpark are owned by us and are protected by valid copyright and trademark laws.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">8. Limitation of Liability</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  SkySpark shall not be liable for any injury, damage, or loss resulting from the improper use, storage, or handling of our products. The user assumes all risks associated with the use of fireworks.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">9. Governing Law</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  These Terms shall be governed by the laws of India. Jurisdiction for any disputes shall be with the courts in Sivakasi, Tamil Nadu.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">10. Changes to Terms</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We reserve the right to modify these Terms. Continued use of the service after changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-white/10 pb-2">Contact Information</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <ul className="list-none space-y-2 text-gray-400">
                  <li><strong className="text-[#FFD700]">Email:</strong> legal@skyspark.com</li>
                  <li><strong className="text-[#FFD700]">Phone:</strong> 1800-SKY-SPARK</li>
                  <li><strong className="text-[#FFD700]">Address:</strong> 123 Firework Lane, Sivakasi, Tamil Nadu 626123</li>
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
