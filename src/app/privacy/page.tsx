import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';

export default function PrivacyPage() {
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
              <span className="text-gray-800 font-medium">Privacy Policy</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-[90rem] mx-auto bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
            <p className="text-gray-500 mb-8">Last updated: December 16, 2024</p>

            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  At Leats, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    When you create an account or make a purchase, we collect:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                    <li>Name and contact information (email, phone number, address)</li>
                    <li>Payment information (UPI, card details, billing address)</li>
                    <li>Account credentials (username, password)</li>
                    <li>Purchase history and preferences</li>
                    <li>Delivery instructions and preferences</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Automatically Collected Information</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    When you visit our website, we automatically collect:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                    <li>IP address and browser type</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited and time spent on site</li>
                    <li>Location data for delivery services</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use your information to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders and account</li>
                  <li>Provide customer support</li>
                  <li>Send promotional offers (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Security</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect your personal data:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rights</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Access: Request a copy of your personal data</li>
                  <li>Correction: Update or correct inaccurate information</li>
                  <li>Deletion: Request deletion of your personal data</li>
                  <li>Opt-out: Unsubscribe from marketing communications</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To exercise these rights, please contact us at privacy@leats.com
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your experience. You can control cookies through your browser settings. For more information, see our <Link href="/cookie" className="text-[#e63946] hover:underline">Cookie Policy</Link>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Policy</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We may update this privacy policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the Last updated date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have questions about this privacy policy:
                </p>
                <ul className="list-none space-y-2 text-gray-600">
                  <li><strong>Email:</strong> privacy@leats.com</li>
                  <li><strong>Phone:</strong> 1800-123-4567</li>
                  <li><strong>Address:</strong> 123 Main Street, Mumbai, Maharashtra 400001</li>
                </ul>
              </section>

              <div className="bg-red-50 border-l-4 border-[#e63946] p-6 mt-8">
                <h3 className="font-bold text-gray-800 mb-2">Your Privacy Matters</h3>
                <p className="text-gray-700">
                  We are committed to protecting your privacy and handling your data responsibly. If you have any concerns or questions, please reach out to us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer01 />
      <Footer02 />
    </>
  );
}
