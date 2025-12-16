import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-[#e63946]">Home</Link>
              <IconChevronRight size={16} className="text-gray-400" />
              <span className="text-gray-800 font-medium">Terms & Conditions</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-[90rem] mx-auto bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms & Conditions</h1>
            <p className="text-gray-500 mb-8">Last updated: December 16, 2024</p>

            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  By accessing and using Leats website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Use of Our Service</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Use the service in any way that violates any applicable law or regulation</li>
                  <li>Engage in any conduct that restricts or inhibits use of the service</li>
                  <li>Impersonate or attempt to impersonate the company, employees, or users</li>
                  <li>Use any automated system to access the service</li>
                  <li>Attempt to gain unauthorized access to any portion of the service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Account Registration</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To access certain features of our service, you may be required to register for an account. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Products and Pricing</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  All products are subject to availability. We reserve the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Limit quantities of any products or services</li>
                  <li>Discontinue any product at any time</li>
                  <li>Refuse any order placed with us</li>
                  <li>Correct pricing errors on our website</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Prices are in Indian Rupees (₹) and are subject to change without notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Orders and Payment</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  By placing an order, you warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>You are legally capable of entering into binding contracts</li>
                  <li>All information you provide is accurate and complete</li>
                  <li>You have authorization to use the payment method provided</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Delivery</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Delivery times are estimates and not guaranteed. We strive to deliver within 10 minutes in serviceable areas. We are not liable for any delays in delivery due to unforeseen circumstances.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Intellectual Property</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The service and its original content, features, and functionality are owned by Leats and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To the maximum extent permitted by law, Leats shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Governing Law</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We reserve the right to modify or replace these Terms at any time. Continued use of the service after changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <ul className="list-none space-y-2 text-gray-600">
                  <li>Email: legal@leats.com</li>
                  <li>Phone: 1800-123-4567</li>
                  <li>Address: 123 Main Street, Mumbai, Maharashtra 400001</li>
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
