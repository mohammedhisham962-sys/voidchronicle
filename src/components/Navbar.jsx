import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldAlert,
  Globe
} from 'lucide-react';

export const Navbar = () => {
  const { 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen, 
    user, 
    currency, 
    setCurrency 
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Track scroll position for backdrop blur and compact header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies = ["USD", "EUR", "GBP", "JPY"];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Editorial Marquee */}
      <div className="bg-[#050505] border-b border-white/10 text-white/70 py-1.5 overflow-hidden select-none">
        <div className="animate-marquee font-mono-tech text-[10px] tracking-widest uppercase flex items-center space-x-8">
          <span>// SEASON 08: NOCTURNAL VOID AVAILABLE NOW</span>
          <span>•</span>
          <span>COMPLIMENTARY GLOBAL EXPRESS SHIPPING ON ORDERS OVER $250</span>
          <span>•</span>
          <span>TOKYO • NEW YORK • PARIS • LONDON ATELIER STORES</span>
          <span>•</span>
          <span>DUTIES & TAXES FULLY INCLUDED WORLDWIDE</span>
          <span>•</span>
          <span>LIMITED ARCHIVAL QUANTITIES • NO RESTOCKS</span>
          <span>•</span>
          <span>USE CODE "VOID20" FOR 20% PRIVILEGE DISCOUNT</span>
          <span>•</span>
          {/* Duplicate for infinite loop */}
          <span>// SEASON 08: NOCTURNAL VOID AVAILABLE NOW</span>
          <span>•</span>
          <span>COMPLIMENTARY GLOBAL EXPRESS SHIPPING ON ORDERS OVER $250</span>
          <span>•</span>
          <span>TOKYO • NEW YORK • PARIS • LONDON ATELIER STORES</span>
          <span>•</span>
          <span>DUTIES & TAXES FULLY INCLUDED WORLDWIDE</span>
          <span>•</span>
          <span>LIMITED ARCHIVAL QUANTITIES • NO RESTOCKS</span>
          <span>•</span>
          <span>USE CODE "VOID20" FOR 20% PRIVILEGE DISCOUNT</span>
        </div>
      </div>

      {/* Main Bar */}
      <div
        className={`px-4 sm:px-8 py-4 transition-all duration-300 border-b border-white/10 flex items-center justify-between ${
          scrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-xl py-3.5 shadow-2xl'
            : 'bg-[#0A0A0A]/90 backdrop-blur-md'
        }`}
      >
        {/* Left Side: Desktop Navigation Links & Mobile Toggle */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1.5 text-white/80 hover:text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono-tech uppercase tracking-widest">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `transition-colors hover:text-white ${isActive ? 'text-white font-bold border-b border-white pb-0.5' : 'text-white/60'}`
              }
            >
              Shop All
            </NavLink>
            <NavLink
              to="/new-arrivals"
              className={({ isActive }) =>
                `transition-colors hover:text-white flex items-center gap-1.5 ${isActive ? 'text-white font-bold border-b border-white pb-0.5' : 'text-white/60'}`
              }
            >
              <span>New Arrivals</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </NavLink>
            <NavLink
              to="/collections"
              className={({ isActive }) =>
                `transition-colors hover:text-white ${isActive ? 'text-white font-bold border-b border-white pb-0.5' : 'text-white/60'}`
              }
            >
              Collections
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition-colors hover:text-white ${isActive ? 'text-white font-bold border-b border-white pb-0.5' : 'text-white/60'}`
              }
            >
              Manifesto
            </NavLink>
          </nav>
        </div>

        {/* Center: Brand Wordmark */}
        <Link to="/" className="text-center group">
          <h1 className="font-display text-xl sm:text-2xl tracking-[0.25em] font-extrabold uppercase text-white group-hover:tracking-[0.28em] transition-all">
            VØID
          </h1>
          <span className="block font-mono-tech text-[8px] uppercase tracking-[0.4em] text-white/40 group-hover:text-white/70 transition-colors">
            ATELIER // TOKYO • NY
          </span>
        </Link>

        {/* Right Side: Utilities (Search, Wishlist, Account, Cart, Currency) */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Currency Switcher */}
          <div className="hidden md:flex items-center gap-1 text-[11px] font-mono-tech text-white/50 border border-white/10 px-2 py-1">
            <Globe className="w-3 h-3 text-white/40" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer uppercase"
            >
              {currencies.map(c => (
                <option key={c} value={c} className="bg-[#121212] text-white">{c}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Search Products (⌘K)"
          >
            <Search className="w-4 h-4" />
            <span className="hidden xl:inline font-mono-tech text-[10px] text-white/40 tracking-wider">
              SEARCH [⌘K]
            </span>
          </button>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="relative p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black font-mono-tech text-[9px] font-bold flex items-center justify-center rounded-none">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Account / Admin Link */}
          <Link
            to={user ? "/account" : "/login"}
            className="relative p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            title={user ? `Account (${user.name})` : "Login / Register"}
          >
            <User className="w-4 h-4" />
            {user && (
              <span className="hidden md:inline font-mono-tech text-[10px] uppercase text-white/70">
                {user.role === 'admin' ? '[ADMIN]' : user.name.split(' ')[0]}
              </span>
            )}
          </Link>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 bg-white text-black hover:bg-[#E5E5E0] transition-colors cursor-pointer flex items-center gap-2"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-mono-tech text-xs font-bold">{cartCount}</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-300">
          {/* Top Row */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <span className="font-display text-xl tracking-[0.2em] font-extrabold uppercase text-white">
                VØID ATELIER
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-8 space-y-5">
            {[
              { path: '/shop', label: '01 // SHOP ALL PIECES' },
              { path: '/new-arrivals', label: '02 // NEW ARRIVALS & DROPS' },
              { path: '/collections', label: '03 // ARCHIVE COLLECTIONS' },
              { path: '/cart', label: `04 // SHOPPING BAG (${cartCount})` },
              { path: '/wishlist', label: `05 // SAVED WISHLIST (${wishlist.length})` },
              { path: '/about', label: '06 // ATELIER MANIFESTO' },
              { path: '/contact', label: '07 // CLIENT CONCIERGE' },
              { path: user ? '/account' : '/login', label: user ? '08 // CLIENT PORTAL & ORDERS' : '08 // SIGN IN / REGISTER' },
              { path: '/admin', label: '09 // ATELIER ADMIN CONSOLE' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between font-display text-lg sm:text-2xl uppercase tracking-wider text-white hover:text-white/60 transition-colors border-b border-white/5 pb-2"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          {/* Footer Info */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-white/50">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" />
              <span>REGION: INTERNATIONAL (USD)</span>
            </div>
            <span>© 2026 VØID ATELIER CORP.</span>
          </div>
        </div>
      )}
    </header>
  );
};
