'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';
import Header from '@/components/Header';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';

const faqCategories = [
  {
    id: 1,
    title: 'Orders & Delivery',
    faqs: [
      { question: 'How fast is delivery?', answer: 'We deliver in just 10 minutes! Our express delivery ensures your groceries reach you fresh and fast.' },
      { question: 'What are the delivery charges?', answer: 'Delivery is FREE on orders above ₹499. For orders below ₹499, a delivery fee of ₹40 applies.' },
      { question: 'Can I track my order?', answer: 'Yes! Once your order is placed, you can track it in real-time through the app or website.' },
    ]
  },
  {
    id: 2,
    title: 'Payment',
    faqs: [
      { question: 'What payment methods do you accept?', answer: 'We accept UPI, Credit/Debit Cards, Net Banking, Wallets (Paytm, PhonePe), and Cash on Delivery.' },
      { question: 'Is online payment safe?', answer: 'Yes, all payments are secured with 256-bit SSL encryption. We never store your card details.' },
    ]
  },
  {
    id: 3,
    title: 'Returns & Refunds',
    faqs: [
      { question: 'What is your return policy?', answer: 'We accept returns for damaged or wrong items. Fresh produce can be returned at the time of delivery.' },
      { question: 'When will I get my refund?', answer: 'Refunds are processed within 2-3 business days and credited to your original payment method.' },
    ]
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleFAQ = (categoryId: number, faqIndex: number) => {
    const key = `${categoryId}-${faqIndex}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="bg-[#0a0a0a] border-b border-white/5">
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Link href="/" className="text-gray-400 hover:text-[#FFD700] transition-colors">Home</Link>
              <span className="text-gray-600">/</span>
              <span className="text-white font-medium">FAQ</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border-b border-white/5 py-10 sm:py-16 relative overflow-hidden">
           <div className="absolute top-0 left-1/2 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="container mx-auto px-3 sm:px-4 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">Frequently Asked Questions</h1>
            <p className="text-gray-400 mb-8 text-sm sm:text-base">Find answers to common questions about your fireworks orders</p>
            <div className="max-w-md mx-auto relative">
              <IconSearch size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-sm focus:outline-none focus:border-[#FFD700] text-sm text-white placeholder-gray-600 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <div className="max-w-2xl mx-auto space-y-4">
            {filteredCategories.map((category) => (
              <div key={category.id} className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6">
                <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wide border-b border-white/5 pb-2">{category.title}</h2>
                <div className="space-y-2">
                  {category.faqs.map((faq, index) => {
                    const key = `${category.id}-${index}`;
                    const isOpen = openItems[key];
                    return (
                      <div key={index} className="border-b border-white/5 last:border-0 pb-2 last:pb-0">
                        <button
                          onClick={() => toggleFAQ(category.id, index)}
                          className="w-full flex items-center justify-between text-left py-3 hover:text-[#FFD700] transition-colors group"
                        >
                          <span className="font-medium text-gray-200 text-sm sm:text-base pr-4 group-hover:text-[#FFD700] transition-colors">{faq.question}</span>
                          <IconChevronDown size={18} className={`text-gray-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-[#FFD700]' : ''}`} />
                        </button>
                        {isOpen && <p className="text-gray-400 text-sm leading-relaxed pb-3">{faq.answer}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto mt-12 bg-[#1a1a1a] border border-dashed border-white/20 rounded-sm p-8 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Still have questions?</h3>
            <p className="mb-6 text-gray-400 text-sm">Our support team is here to help you celebrate safely.</p>
            <Link href="/contact" className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-colors text-sm">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
      <Footer01 />
      <Footer02 />
    </>
  );
}
