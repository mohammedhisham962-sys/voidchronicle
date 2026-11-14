import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { COLLECTIONS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, ArrowUpRight, Camera, Sparkles } from 'lucide-react';

export const Collections = () => {
  const { products } = useShop();
  const [activeCollectionId, setActiveCollectionId] = useState(COLLECTIONS[0].id);

  const activeCollection = COLLECTIONS.find(c => c.id === activeCollectionId) || COLLECTIONS[0];
  const collectionProducts = products.filter(p => p.collection.toLowerCase() === activeCollection.name.toLowerCase());

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Editorial Header */}
      <div className="p-6 sm:p-12 border-b border-white/10 bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40 block mb-2">
            ARCHIVE LOOKBOOKS // EPISODIC RELEASES
          </span>
          <h1 className="font-display text-4xl sm:text-7xl uppercase tracking-wider font-extrabold text-white">
            Seasonal Archives
          </h1>
          <p className="font-editorial text-sm sm:text-base text-white/60 max-w-2xl mt-3">
            Each collection explores a distinct thematic inquiry into modern architectural garments, material density, and urban camouflage.
          </p>
        </div>
      </div>

      {/* Collection Switcher Tabs */}
      <div className="border-b border-white/10 bg-[#0A0A0A] sticky top-[73px] z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex overflow-x-auto gap-2 py-3">
          {COLLECTIONS.map(col => (
            <button
              key={col.id}
              onClick={() => setActiveCollectionId(col.id)}
              className={`px-5 py-2.5 font-mono-tech text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                activeCollectionId === col.id
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-transparent text-white/60 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <span className="text-[10px] text-white/40 mr-2">{col.code}</span>
              {col.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Collection Deep Dive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
        
        {/* Collection Hero Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 aspect-[16/10] overflow-hidden border border-white/10 bg-[#161616]">
            <img
              src={activeCollection.heroImage}
              alt={activeCollection.name}
              className="w-full h-full object-cover filter contrast-110 brightness-90 hover:scale-105 transition-transform duration-1000"
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 font-mono-tech text-xs text-white/50 uppercase tracking-widest">
                <span>{activeCollection.season}</span>
                <span>•</span>
                <span>{activeCollection.code}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wider">
                {activeCollection.name}
              </h2>
              <p className="font-mono-tech text-xs text-white/80 uppercase">
                {activeCollection.tagline}
              </p>
            </div>

            <p className="font-editorial text-sm text-white/70 leading-relaxed">
              {activeCollection.description}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to={`/shop?collection=${encodeURIComponent(activeCollection.name)}`}
                className="px-6 py-3.5 bg-white text-black font-mono-tech text-xs font-bold uppercase tracking-widest hover:bg-[#E5E5E0] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Shop This Capsule ({collectionProducts.length} Pieces)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Lookbook Gallery Reel */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-white/60" />
              <h3 className="font-display text-lg uppercase tracking-wider">
                Runway & Campaign Visuals
              </h3>
            </div>
            <span className="font-mono-tech text-xs text-white/40 uppercase">
              SHOT ON 35MM KODAK DOUBLE-X IN SHIBUYA & SOHO
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {activeCollection.lookbookImages.map((img, i) => (
              <div key={i} className="group relative aspect-[3/4] overflow-hidden border border-white/10 bg-[#161616]">
                <img
                  src={img}
                  alt={`Lookbook Shot ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 font-mono-tech text-[10px] uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  LOOK 0{i + 1} // {activeCollection.code}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Pieces from this Collection */}
        <div className="pt-8">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40 block">
                CATALOG ENUMERATION
              </span>
              <h3 className="font-display text-2xl uppercase tracking-wider mt-1">
                Pieces in {activeCollection.name}
              </h3>
            </div>
            <Link
              to={`/shop?collection=${encodeURIComponent(activeCollection.name)}`}
              className="font-mono-tech text-xs uppercase tracking-wider text-white/60 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>View In Full Grid</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectionProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
