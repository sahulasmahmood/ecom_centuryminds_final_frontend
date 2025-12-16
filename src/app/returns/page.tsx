import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';

export default function ReturnsPage() {
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
              <span className="text-gray-800 font-medium">Returns & Exchanges</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-[90rem] mx-auto bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Returns & Exchanges Policy</h1>
            <p className="text-gray-500 mb-8">Last updated: December 16, 2024</p>

            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Commitment</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  At Leats, we want you to be completely satisfied with your purchase. If you are not happy with your order, we are here to help with returns and exchanges.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Easy Returns</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We offer hassle-free returns on most items. To be eligible for a return:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Items must be unused and in the same condition as received</li>
                  <li>Items must be in original packaging</li>
                  <li>You must provide proof of purchase (receipt or order confirmation)</li>
                  <li>Items must not be past their expiration date</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Non-Returnable Items</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  For health and safety reasons, the following items cannot be returned:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Fresh produce (fruits, vegetables)</li>
                  <li>Fresh meat, poultry, and seafood</li>
                  <li>Dairy products that have been opened</li>
                  <li>Bakery items</li>
                  <li>Prepared foods</li>
                  <li>Personal care items that have been opened</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Return an Item</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 1: Initiate Return</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Log into your account, go to My Orders, select the item you want to return, and click Request Return.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 2: Schedule Pickup</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Once your return request is approved, we will schedule a pickup from your address.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 3: Get Refund</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Once we receive and inspect the item, your refund will be processed within 5 to 7 business days.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Damaged or Defective Items</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you receive a damaged or defective item:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Contact us within 48 hours of delivery</li>
                  <li>Provide photos of the damaged item</li>
                  <li>We will arrange for a replacement or full refund</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  For questions about returns and exchanges:
                </p>
                <ul className="list-none space-y-2 text-gray-600">
                  <li>Email: support@leats.com</li>
                  <li>Phone: 1800-123-4567</li>
                  <li>Hours: Monday to Saturday, 10:00 AM to 6:00 PM</li>
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
