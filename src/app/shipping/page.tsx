import Link from 'next/link';
import { IconChevronRight, IconTruck, IconClock } from '@tabler/icons-react';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';

export default function ShippingPage() {
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
              <span className="text-gray-800 font-medium">Shipping & Delivery</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-[90rem] mx-auto bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Shipping & Delivery</h1>
            <p className="text-gray-500 mb-8">Last updated: December 16, 2024</p>

            <div className="prose max-w-none">
              {/* Delivery Options */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-2 border-[#e63946] rounded-lg p-6 bg-red-50">
                    <div className="flex items-center gap-3 mb-4">
                      <IconClock size={32} className="text-[#e63946]" />
                      <h3 className="text-xl font-bold text-gray-800">10 Minute Delivery</h3>
                    </div>
                    <p className="text-gray-600 mb-3">Lightning fast delivery</p>
                    <p className="text-2xl font-bold text-[#e63946] mb-3">FREE</p>
                    <p className="text-sm text-gray-500">On orders over ₹199</p>
                  </div>

                  <div className="border-2 border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <IconTruck size={32} className="text-gray-600" />
                      <h3 className="text-xl font-bold text-gray-800">Scheduled Delivery</h3>
                    </div>
                    <p className="text-gray-600 mb-3">Choose your time slot</p>
                    <p className="text-2xl font-bold text-gray-800 mb-3">FREE</p>
                    <p className="text-sm text-gray-500">On all orders</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Delivery Areas</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We currently deliver across major cities in India. Our 10-minute delivery is available in select areas with our dark store network.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Processing</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Orders are processed immediately after payment confirmation. For 10-minute delivery, our team starts picking your items right away from our nearest dark store.
                </p>
                <div className="bg-red-50 border-l-4 border-[#e63946] p-4 mb-4">
                  <p className="text-gray-700">
                    Pro Tip: Order during off-peak hours for even faster delivery.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Delivery Charges</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left">Order Value</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Delivery Charge</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">Under ₹199</td>
                        <td className="border border-gray-300 px-4 py-3">₹25</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">₹199 and above</td>
                        <td className="border border-gray-300 px-4 py-3 text-[#e63946] font-bold">FREE</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Tracking</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Track your order in real-time through our app or website. You will receive updates at every step:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Order confirmed</li>
                  <li>Picking in progress</li>
                  <li>Out for delivery</li>
                  <li>Delivered</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Delivery Instructions</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  During checkout, you can provide special delivery instructions such as:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Leave at door</li>
                  <li>Call before delivery</li>
                  <li>Deliver to security</li>
                  <li>Gate codes or access instructions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  For shipping and delivery questions:
                </p>
                <ul className="list-none space-y-2 text-gray-600">
                  <li>Email: support@leats.com</li>
                  <li>Phone: 1800-123-4567</li>
                  <li>Hours: 24/7 Support</li>
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
