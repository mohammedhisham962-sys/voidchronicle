import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Shield, Feather, Compass, Globe } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col justify-end p-6 sm:p-16 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=2000&q=85"
            alt="VØID Atelier Tokyo Studio"
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <span className="font-mono-tech text-xs uppercase tracking-widest text-white/50 block">
            ATELIER GENESIS // ESTABLISHED MMXXIV
          </span>
          <h1 className="font-display text-4xl sm:text-7xl uppercase tracking-wider font-extrabold leading-none">
            Architectural Armour for the Modern Nocturne
          </h1>
          <p className="font-editorial text-sm sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            VØID Atelier was founded at the intersection of Japanese industrial textiles, brutalist architectural proportions, and luxury European tailoring.
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="max-w-5xl mx-auto px-6 sm:px-12 py-16 sm:py-24 space-y-16">
        <div className="space-y-6">
          <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40 block">
            01 // THE MANIFESTO
          </span>
          <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight leading-tight">
            "WE DO NOT BUILD FOR A SEASON. WE BUILD TO ENDURE THE DECADE."
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-editorial text-sm sm:text-base text-white/70 leading-relaxed pt-4">
            <p>
              The modern fashion cycle produces hundreds of thousands of low-density, disposable garments designed to disintegrate after twenty washes. VØID Atelier exists as a deliberate counter-insurgency to this planned obsolescence.
            </p>
            <p>
              Every pattern is calculated with cubic geometry: dropped shoulders that maintain sculptural posture, collars that will never sag, and heavy gauge loopback cotton knitted on historic circular looms in Wakayama, Japan.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
          <div className="border border-white/10 p-6 bg-[#0E0E0E] space-y-3">
            <Compass className="w-6 h-6 text-white" />
            <h3 className="font-display text-base uppercase tracking-wider">Uncompromising Density</h3>
            <p className="font-editorial text-xs text-white/60 leading-relaxed">
              We engineer weights starting at 300 GSM for base layers up to 850 GSM for overcoats. Density creates form; form creates presence.
            </p>
          </div>

          <div className="border border-white/10 p-6 bg-[#0E0E0E] space-y-3">
            <Shield className="w-6 h-6 text-white" />
            <h3 className="font-display text-base uppercase tracking-wider">Mechanical Fasteners</h3>
            <p className="font-editorial text-xs text-white/60 leading-relaxed">
              We partner directly with Fidlock in Hannover and RiRi in Mendrisio. Quick-release magnetic buckles and solid brass zippers guaranteed for a lifetime.
            </p>
          </div>

          <div className="border border-white/10 p-6 bg-[#0E0E0E] space-y-3">
            <Feather className="w-6 h-6 text-white" />
            <h3 className="font-display text-base uppercase tracking-wider">Zero Deadstock Policy</h3>
            <p className="font-editorial text-xs text-white/60 leading-relaxed">
              Strict limits of 150 numbered units per edition. No surplus inventory, no landfill emissions, and zero commercial markdown discounting.
            </p>
          </div>
        </div>

        {/* Global Ateliers */}
        <div className="pt-16 border-t border-white/10 space-y-8">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40 block mb-1">
              02 // PHYSICAL PRESENCE
            </span>
            <h2 className="font-display text-3xl uppercase tracking-wider">
              Flagship Ateliers & Showrooms
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono-tech text-xs">
            <div className="border border-white/10 p-5 bg-[#121212] space-y-2">
              <span className="text-[10px] text-white/40 uppercase block">FLAGSHIP 01</span>
              <h4 className="font-display text-sm uppercase text-white font-bold">Tokyo Atelier</h4>
              <p className="text-white/60">5-7-22 Minami-Aoyama, Minato-ku</p>
              <p className="text-[11px] text-white/40">Open Daily: 11:00 - 20:00 JST</p>
            </div>

            <div className="border border-white/10 p-5 bg-[#121212] space-y-2">
              <span className="text-[10px] text-white/40 uppercase block">FLAGSHIP 02</span>
              <h4 className="font-display text-sm uppercase text-white font-bold">New York SoHo</h4>
              <p className="text-white/60">742 Mercer Street, New York</p>
              <p className="text-[11px] text-white/40">Mon - Sat: 11:00 - 19:00 EST</p>
            </div>

            <div className="border border-white/10 p-5 bg-[#121212] space-y-2">
              <span className="text-[10px] text-white/40 uppercase block">FLAGSHIP 03</span>
              <h4 className="font-display text-sm uppercase text-white font-bold">Paris Showroom</h4>
              <p className="text-white/60">14 Rue Saint-Honoré, 75001</p>
              <p className="text-[11px] text-white/40">Mon - Sat: 10:30 - 19:30 CET</p>
            </div>

            <div className="border border-white/10 p-5 bg-[#121212] space-y-2">
              <span className="text-[10px] text-white/40 uppercase block">FLAGSHIP 04</span>
              <h4 className="font-display text-sm uppercase text-white font-bold">London Mayfair</h4>
              <p className="text-white/60">28 Conduit Street, W1S 2XQ</p>
              <p className="text-[11px] text-white/40">Mon - Sat: 10:00 - 18:30 GMT</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-8 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-mono-tech text-xs uppercase font-bold tracking-widest hover:bg-[#E5E5E0] transition-colors"
          >
            <span>Explore The Current Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
