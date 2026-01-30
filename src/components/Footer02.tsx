'use client';

export default function Footer02() {
  return (
    <div className="bg-black text-gray-400 py-3 sm:py-4 border-t border-white/10">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-center sm:text-left">
            © 2024 SkySpark. All rights reserved.
          </p>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
            <span className="text-xs sm:text-sm">We Accept:</span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="bg-white/5 border border-white/10 text-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm text-[10px] sm:text-xs font-bold">VISA</span>
              <span className="bg-white/5 border border-white/10 text-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm text-[10px] sm:text-xs font-bold">Mastercard</span>
              <span className="bg-white/5 border border-white/10 text-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm text-[10px] sm:text-xs font-bold">UPI</span>
              <span className="bg-white/5 border border-white/10 text-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm text-[10px] sm:text-xs font-bold">COD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
