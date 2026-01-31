'use client';

export default function Footer02() {
  return (
    <div className="bg-[#050505] border-t border-white/5 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} SkySpark Fireworks. All rights reserved.</p>
        <div className="flex gap-4">
           {['Visa', 'Mastercard', 'UPI', 'NetBanking'].map(method => (
              <span key={method} className="bg-white/5 px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider text-gray-400">
                {method}
              </span>
           ))}
        </div>
      </div>
    </div>
  );
}
