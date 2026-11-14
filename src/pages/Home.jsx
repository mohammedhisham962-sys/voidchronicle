import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Layers, 
  Clock 
} from 'lucide-react';

export const Home = () => {
  const { products, formatPrice } = useShop();

  // Countdown timer for next drop
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      
      {/* 01: HERO SECTION */}
      <section className="relative min-h-[92vh] flex flex-col justify-between p-6 sm:p-12 border-b border-white/10 overflow-hidden">
        {/* Background Image with dramatic overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85"
            alt="VØID Atelier Season 08 Runway"
            className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-75 scale-105 animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-black/40" />
          <div className="absolute inset-0 bg-grain pointer-events-none" />
        </div>

        {/* Top Tagline / Coordinates */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs tracking-widest uppercase text-white/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>DROP 08: NOCTURNAL VOID // LIVE NOW</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>ATELIER SPEC 480GSM</span>
            <span>•</span>
            <span>LIMIT 150 PER PIECE</span>
          </div>
        </div>

        {/* Hero Central Typography */}
        <div className="relative z-10 my-auto py-12 max-w-5xl">
          <p className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.3em] text-white/60 mb-3">
            Spring / Summer 2026 Archival Collection
          </p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase font-black tracking-tight leading-[0.9] text-white mb-6">
            THE VOID <br />
            <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '2px #F4F4F0' }}>
              CHRONICLES
            </span>
          </h1>
          <p className="font-editorial text-sm sm:text-base md:text-lg text-white/70 max-w-xl mb-8 leading-relaxed">
            Severe proportions, sculptural memory textiles, and uncompromising heavyweight construction. Designed for the nocturnal urban condition.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="px-8 py-4 bg-white text-black font-mono-tech text-xs font-bold uppercase tracking-widest hover:bg-[#E5E5E0] transition-all flex items-center gap-3 cursor-pointer shadow-2xl group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/collections"
              className="px-8 py-4 bg-black/50 backdrop-blur-md border border-white/20 text-white font-mono-tech text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>View Runway Lookbook</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10 font-mono-tech text-xs text-white/60">
          <div>
            <span className="text-[10px] text-white/40 block">FABRIC ORIGIN</span>
            <span className="text-white font-semibold">Wakayama, Japan</span>
          </div>
          <div>
            <span className="text-[10px] text-white/40 block">CONSTRUCTION</span>
            <span className="text-white font-semibold">480 GSM Loopback Terry</span>
          </div>
          <div>
            <span className="text-[10px] text-white/40 block">HARDWARE</span>
            <span className="text-white font-semibold">RiRi & Fidlock Magnetic</span>
          </div>
          <div>
            <span className="text-[10px] text-white/40 block">GLOBAL DISPATCH</span>
            <span className="text-white font-semibold">24h Priority Courier</span>
          </div>
        </div>
      </section>

      {/* 02: EDITORIAL CATEGORY SHOWCASE */}
      <section className="p-6 sm:p-12 border-b border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40">
              01 // SILHOUETTES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wider mt-1">
              Archival Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="font-mono-tech text-xs uppercase tracking-wider text-white/60 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>View All Garments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "OUTERWEAR",
              desc: "Bombers, Trench & Puffer Coats",
              category: "Outerwear",
              img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
            },
            {
              title: "HOODIES & KNITS",
              desc: "480 GSM Terry & Mohair Intarsia",
              category: "Hoodies & Knits",
              img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
            },
            {
              title: "TECHNICAL BOTTOMS",
              desc: "Parachute Cargos & Pleated Trousers",
              category: "Bottoms",
              img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80"
            },
            {
              title: "FOOTWEAR & GEAR",
              desc: "Vibram Combat Boots & Cordura Rigs",
              category: "Footwear",
              img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
            }
          ].map((cat, idx) => (
            <Link
              key={idx}
              to={`/shop?category=${encodeURIComponent(cat.category)}`}
              className="group relative h-96 overflow-hidden border border-white/10 block bg-[#141414]"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex flex-col justify-end">
                <span className="font-mono-tech text-[10px] uppercase text-white/50 tracking-widest mb-1">
                  0{idx + 1} // ARCHIVE
                </span>
                <h3 className="font-display text-xl uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform">
                  {cat.title}
                </h3>
                <p className="font-editorial text-xs text-white/60 mt-1 line-clamp-1">
                  {cat.desc}
                </p>
                <div className="mt-3 flex items-center gap-1 font-mono-tech text-[11px] uppercase text-white tracking-wider">
                  <span>Enter Archive</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 03: FEATURED CURATION */}
      <section className="p-6 sm:p-12 border-b border-white/10 bg-[#0C0C0C]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40">
              02 // CURATED RUNWAY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wider mt-1">
              Atelier Highlights
            </h2>
          </div>
          <div className="font-mono-tech text-xs text-white/50">
            SHOWCASING {featuredProducts.length} KEY SILHOUETTES
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 04: ASYMMETRIC EDITORIAL MANIFESTO / LOOKBOOK SPLIT */}
      <section className="border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 bg-[#090909]">
        {/* Left Column: Huge High-Contrast Editorial Photo */}
        <div className="lg:col-span-6 relative min-h-[600px] border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85"
            alt="Nocturnal Void Lookbook"
            className="w-full h-full object-cover filter contrast-125 brightness-90 hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          
          {/* Overlay Tag */}
          <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 font-mono-tech text-[10px] uppercase tracking-widest">
            LOOKBOOK SHOT 08 // SHIBUYA OVERPASS
          </div>

          <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#0E0E0E]/90 backdrop-blur-md border border-white/10">
            <span className="font-mono-tech text-[10px] text-white/40 uppercase tracking-widest block">
              FEATURED SILHOUETTE
            </span>
            <p className="font-display text-lg uppercase tracking-wider text-white">
              MONOLITH HOODIE × TACTICAL PARACHUTE CARGO
            </p>
            <p className="font-mono-tech text-xs text-white/60 mt-1">
              Combined Weight: 1,840g • Japanese Custom Textiles
            </p>
          </div>
        </div>

        {/* Right Column: Editorial Manifesto & Craftsmanship Accordion */}
        <div className="lg:col-span-6 p-8 sm:p-16 flex flex-col justify-between space-y-10">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40 block mb-2">
              03 // ATELIER MANIFESTO
            </span>
            <h3 className="font-display text-3xl sm:text-5xl uppercase tracking-tight leading-tight mb-6">
              "WE REJECT DISPOSABLE TRENDS. WE CRAFT MONUMENTAL SILHOUETTES."
            </h3>
            <p className="font-editorial text-sm sm:text-base text-white/70 leading-relaxed mb-6">
              VØID Atelier was founded in 2024 to contest the transient nature of modern fast fashion. Every garment is treated as an architectural commission — engineered with extreme fabric density, brutalist geometries, and bespoke hardware intended to outlive the decade.
            </p>
            <p className="font-editorial text-sm sm:text-base text-white/70 leading-relaxed">
              We produce strictly in micro-batches of 150 pieces per archive edition. Once allocated, pieces are permanently sealed into our retrospective catalog.
            </p>
          </div>

          {/* Pillars */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="border border-white/10 p-4 bg-[#111111]">
              <h4 className="font-display text-sm uppercase tracking-wider text-white flex items-center justify-between">
                <span>01 // DENSITY WITHOUT COLLAPSE</span>
                <span className="font-mono-tech text-xs text-white/40">480 - 850 GSM</span>
              </h4>
              <p className="font-editorial text-xs text-white/60 mt-1.5">
                Our custom knit terry and virgin wools retain their spatial geometry regardless of how they are folded, packed, or worn.
              </p>
            </div>

            <div className="border border-white/10 p-4 bg-[#111111]">
              <h4 className="font-display text-sm uppercase tracking-wider text-white flex items-center justify-between">
                <span>02 // MIL-SPEC MODULAR HARDWARE</span>
                <span className="font-mono-tech text-xs text-white/40">FIDLOCK & RIRI</span>
              </h4>
              <p className="font-editorial text-xs text-white/60 mt-1.5">
                German magnetic fastenings and solid brass Swiss two-way zippers provide tactile satisfaction and fail-safe longevity.
              </p>
            </div>

            <div className="border border-white/10 p-4 bg-[#111111]">
              <h4 className="font-display text-sm uppercase tracking-wider text-white flex items-center justify-between">
                <span>03 // CONSCIOUS ARTISANAL WASHES</span>
                <span className="font-mono-tech text-xs text-white/40">VOLCANIC STONE</span>
              </h4>
              <p className="font-editorial text-xs text-white/60 mt-1.5">
                Cold-water ozone washes and mineral dye recipes ensure natural gradients while conserving 85% of standard industrial water consumption.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-white border-b border-white pb-1 hover:text-white/60 hover:border-white/60 transition-colors"
            >
              <span>Read Full Atelier Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 05: LIMITED DROP COUNTDOWN BANNER */}
      <section className="p-8 sm:p-16 border-b border-white/10 bg-[#0E0E0E] relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs text-white/50 uppercase tracking-widest mb-2">
              <Clock className="w-4 h-4 text-white" />
              <span>NEXT ARCHIVE DROP // CAPSULE 08.2</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-wider">
              CYBERNETIC KNITWEAR
            </h2>
            <p className="font-editorial text-xs sm:text-sm text-white/60 max-w-md mt-2">
              Heavy gauge mohair-wool cardigans and seamless double-knit thermal hoodies releasing worldwide.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="grid grid-cols-4 gap-3 sm:gap-6 font-mono-tech text-center">
            <div className="bg-[#181818] border border-white/15 p-4 sm:p-6 min-w-[70px] sm:min-w-[100px]">
              <span className="font-display text-3xl sm:text-5xl font-black block text-white">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">Days</span>
            </div>
            <div className="bg-[#181818] border border-white/15 p-4 sm:p-6 min-w-[70px] sm:min-w-[100px]">
              <span className="font-display text-3xl sm:text-5xl font-black block text-white">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">Hours</span>
            </div>
            <div className="bg-[#181818] border border-white/15 p-4 sm:p-6 min-w-[70px] sm:min-w-[100px]">
              <span className="font-display text-3xl sm:text-5xl font-black block text-white">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">Mins</span>
            </div>
            <div className="bg-[#181818] border border-white/15 p-4 sm:p-6 min-w-[70px] sm:min-w-[100px]">
              <span className="font-display text-3xl sm:text-5xl font-black block text-white">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">Secs</span>
            </div>
          </div>
        </div>
      </section>

      {/* 06: NEW ARRIVALS GRID */}
      <section className="p-6 sm:p-12 border-b border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40">
              04 // RECENT DISPATCH
            </span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wider mt-1">
              New Releases
            </h2>
          </div>
          <Link
            to="/new-arrivals"
            className="font-mono-tech text-xs uppercase tracking-wider text-white/60 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Explore All New Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 07: CLIENT ASSURANCES */}
      <section className="p-8 sm:p-16 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="border border-white/10 p-6 bg-[#0E0E0E]">
            <Truck className="w-6 h-6 text-white mb-4" />
            <h4 className="font-display text-sm uppercase tracking-wider mb-1">Global Express Shipping</h4>
            <p className="font-editorial text-xs text-white/50 leading-relaxed">
              Dispatched within 24 hours via DHL Express Priority. Full tracking and customs duties prepaid.
            </p>
          </div>

          <div className="border border-white/10 p-6 bg-[#0E0E0E]">
            <ShieldCheck className="w-6 h-6 text-white mb-4" />
            <h4 className="font-display text-sm uppercase tracking-wider mb-1">Authenticity Guaranteed</h4>
            <p className="font-editorial text-xs text-white/50 leading-relaxed">
              Every garment includes an encrypted NFC certificate and debossed serial plaque registered in our archive.
            </p>
          </div>

          <div className="border border-white/10 p-6 bg-[#0E0E0E]">
            <RefreshCw className="w-6 h-6 text-white mb-4" />
            <h4 className="font-display text-sm uppercase tracking-wider mb-1">Complimentary Returns</h4>
            <p className="font-editorial text-xs text-white/50 leading-relaxed">
              14-day hassle-free worldwide return & exchange window. Pre-paid return labels included in all boxes.
            </p>
          </div>

          <div className="border border-white/10 p-6 bg-[#0E0E0E]">
            <Layers className="w-6 h-6 text-white mb-4" />
            <h4 className="font-display text-sm uppercase tracking-wider mb-1">Bespoke Atelier Box</h4>
            <p className="font-editorial text-xs text-white/50 leading-relaxed">
              Packaged in custom heavyweight matte black archival boxes with protective organic cotton garment dust bags.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
