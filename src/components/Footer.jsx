import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Check, ShieldCheck, Mail } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useShop();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    addToast('You have been added to the VIP Archival Drop List', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 pt-16 pb-12 overflow-hidden relative">
      {/* Newsletter / Drop Access Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-2">
            <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40 block">
              // ATELIER SUBSCRIBER LIST
            </span>
            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wider">
              Secure Priority Access To Seasonal Drops
            </h3>
            <p className="font-editorial text-sm text-white/60 max-w-lg">
              Seasonal collections are limited to 150 units worldwide with zero re-issues. Enter your contact to receive secret passcodes 60 minutes before general release.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="bg-white/5 border border-white/20 p-4 flex items-center gap-3">
                <Check className="w-5 h-5 text-white" />
                <div>
                  <p className="font-mono-tech text-xs uppercase text-white font-bold tracking-wider">Access Granted</p>
                  <p className="text-xs text-white/60">You will receive drop notifications directly from the atelier.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL FOR DROP CODES..."
                    className="w-full bg-[#111111] border border-white/20 pl-10 pr-4 py-3 text-xs font-mono-tech uppercase text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black font-mono-tech text-xs uppercase tracking-widest font-bold hover:bg-[#E5E5E0] transition-colors cursor-pointer shrink-0"
                >
                  Join List
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 font-editorial text-xs border-b border-white/10">
        {/* Col 1 */}
        <div className="space-y-4">
          <p className="font-mono-tech uppercase text-[11px] tracking-widest text-white/40">
            01 // ARCHIVE COLLECTIONS
          </p>
          <ul className="space-y-2.5 text-white/70">
            <li>
              <Link to="/collections" className="hover:text-white transition-colors">
                Season 08: Nocturnal Void
              </Link>
            </li>
            <li>
              <Link to="/collections" className="hover:text-white transition-colors">
                Monolith Core Essentials
              </Link>
            </li>
            <li>
              <Link to="/collections" className="hover:text-white transition-colors">
                Industrial Archive Techwear
              </Link>
            </li>
            <li>
              <Link to="/new-arrivals" className="hover:text-white transition-colors">
                Latest Limited Drops
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-white transition-colors">
                Full Archival Catalog
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 2 */}
        <div className="space-y-4">
          <p className="font-mono-tech uppercase text-[11px] tracking-widest text-white/40">
            02 // CLIENT CONCIERGE
          </p>
          <ul className="space-y-2.5 text-white/70">
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                Concierge Inquiries
              </Link>
            </li>
            <li>
              <Link to="/account" className="hover:text-white transition-colors">
                Order Tracking & Dispatch
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                Returns & Global Exchange
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                Sizing & Silhouette Guide
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                Frequently Asked Questions
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-4">
          <p className="font-mono-tech uppercase text-[11px] tracking-widest text-white/40">
            03 // PHYSICAL ATELIERS
          </p>
          <ul className="space-y-2.5 text-white/70">
            <li>
              <span className="font-semibold text-white">Tokyo Flagship</span>
              <p className="text-[11px] text-white/50 font-mono-tech">5-7-22 Minami-Aoyama, Minato-ku</p>
            </li>
            <li>
              <span className="font-semibold text-white">New York Atelier</span>
              <p className="text-[11px] text-white/50 font-mono-tech">742 Mercer Street, SoHo</p>
            </li>
            <li>
              <span className="font-semibold text-white">Paris Showroom</span>
              <p className="text-[11px] text-white/50 font-mono-tech">14 Rue Saint-Honoré, 75001</p>
            </li>
            <li>
              <span className="font-semibold text-white">London Pop-Up</span>
              <p className="text-[11px] text-white/50 font-mono-tech">28 Conduit Street, Mayfair</p>
            </li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-4">
          <p className="font-mono-tech uppercase text-[11px] tracking-widest text-white/40">
            04 // CORPORATE & LEGAL
          </p>
          <ul className="space-y-2.5 text-white/70">
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                Craftsmanship & Sustainability
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                Japanese Textile Sourcing
              </Link>
            </li>
            <li>
              <Link to="/admin" className="text-white/40 hover:text-white transition-colors font-mono-tech">
                [Atelier Admin Portal]
              </Link>
            </li>
            <li>
              <span className="text-white/40">Duties & Customs Guaranteed</span>
            </li>
            <li>
              <span className="text-white/40">Terms of Bespoke Sale</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Massive Brand Watermark Typography */}
      <div className="py-10 select-none overflow-hidden text-center opacity-10 hover:opacity-20 transition-opacity">
        <h2 className="font-display text-[14vw] leading-none uppercase tracking-[0.15em] font-black text-white whitespace-nowrap">
          VØID ATELIER
        </h2>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[10px] text-white/40">
        <div>
          <span>VØID ARCHIVE LABS LTD. // ALL RIGHTS RESERVED 2026.</span>
        </div>
        <div className="flex items-center gap-6">
          <span>LAT 40.7128° N, LON 74.0060° W</span>
          <span>EST. MMXXIV</span>
          <span className="text-white/60">MADE FOR PERFECTION</span>
        </div>
      </div>
    </footer>
  );
};
