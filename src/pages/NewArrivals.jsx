import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, Flame, Clock, Bell, ArrowRight } from 'lucide-react';

export const NewArrivals = () => {
  const { products, addToast } = useShop();
  const [phone, setPhone] = useState('');
  const [notified, setNotified] = useState(false);

  // New products
  const newProducts = products.filter(p => p.isNew);

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (!phone) return;
    setNotified(true);
    addToast('SMS Alert enrolled for upcoming limited drops', 'success');
    setPhone('');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Banner */}
      <div className="p-6 sm:p-12 border-b border-white/10 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs text-white/50 uppercase tracking-widest mb-2">
              <Flame className="w-4 h-4 text-white" />
              <span>OFFICIAL ATELIER DISPATCH // SPRING 2026</span>
            </div>
            <h1 className="font-display text-4xl sm:text-7xl uppercase tracking-wider font-black text-white">
              New Arrivals
            </h1>
            <p className="font-editorial text-sm sm:text-base text-white/60 max-w-xl mt-3">
              The newest archival iterations. Engineered in limited batches of 150 pieces worldwide. Once depleted, patterns are locked and will never be reproduced.
            </p>
          </div>

          <div className="border border-white/15 p-4 bg-[#141414] font-mono-tech text-xs space-y-1">
            <span className="text-white/40 uppercase block">DROP STATUS</span>
            <span className="text-white font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              ALLOCATION ACTIVE
            </span>
            <p className="text-[11px] text-white/50">Average sellout rate: 72 hours</p>
          </div>
        </div>
      </div>

      {/* Grid of New Releases */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10 font-mono-tech text-xs">
          <span className="uppercase text-white/50">
            SHOWING {newProducts.length} LIMITED NEW SILHOUETTES
          </span>
          <span className="text-white/40 uppercase hidden sm:inline">
            DISPATCH GUARANTEE: WITHIN 24 HOURS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 4} />
          ))}
        </div>
      </div>

      {/* SMS Whitelist Notification Callout */}
      <div className="border-t border-white/10 bg-[#0B0B0B] p-8 sm:p-16">
        <div className="max-w-4xl mx-auto border border-white/15 p-8 sm:p-12 bg-[#121212] relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="font-mono-tech text-xs uppercase tracking-widest text-white/50 flex items-center justify-center md:justify-start gap-1.5">
                <Bell className="w-3.5 h-3.5 text-white" />
                <span>DROP WHITELIST SMS</span>
              </span>
              <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wider">
                Never Miss An Archival Drop
              </h3>
              <p className="font-editorial text-xs sm:text-sm text-white/60 max-w-md">
                Enter your mobile number to receive encrypted direct SMS links 15 minutes before public drop launch.
              </p>
            </div>

            <div className="w-full md:w-auto">
              {notified ? (
                <div className="font-mono-tech text-xs uppercase text-white bg-white/10 border border-white/20 px-6 py-4">
                  ✓ Priority Notification Active
                </div>
              ) : (
                <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-[#1C1C1C] border border-white/20 px-4 py-3 text-xs font-mono-tech uppercase text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-black font-mono-tech text-xs uppercase font-bold tracking-widest hover:bg-[#E5E5E0] transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
