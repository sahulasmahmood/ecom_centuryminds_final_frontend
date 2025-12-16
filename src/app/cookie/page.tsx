import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';

export default function CookiePolicyPage() {
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
              <span className="text-gray-800 font-medium">Cookie Policy</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-[90rem] mx-auto bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Cookie Policy</h1>
            <p className="text-gray-500 mb-8">Last updated: December 16, 2024</p>

            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">What Are Cookies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Cookies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use cookies for several reasons:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>To enable certain functions of the website</li>
                  <li>To provide analytics and track website usage</li>
                  <li>To store your preferences and settings</li>
                  <li>To remember your shopping cart items</li>
                  <li>To keep you logged in during your visit</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Types of Cookies We Use</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Essential Cookies</h3>
                  <p className="text-gray-600 leading-relaxed">
                    These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and shopping cart functionality.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Analytics Cookies</h3>
                  <p className="text-gray-600 leading-relaxed">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Functionality Cookies</h3>
                  <p className="text-gray-600 leading-relaxed">
                    These cookies allow the website to remember choices you make (such as your language or region) and provide enhanced, personalized features.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Managing Cookies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You can control and manage cookies in various ways. Please note that removing or blocking cookies can impact your user experience.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Most browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Updates to This Policy</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices. Please revisit this page regularly to stay informed about our use of cookies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <ul className="list-none space-y-2 text-gray-600">
                  <li>Email: privacy@leats.com</li>
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
