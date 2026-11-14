import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, products, formatPrice } = useShop();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = searchQuery.trim() === ''
    ? []
    : products.filter(p => {
        const query = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.collection.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query)
        );
      }).slice(0, 6);

  const popularSearches = ["Hoodies", "Cargo", "Boots", "Mohair", "Bomber", "Acid Wash"];

  const handleProductClick = (productId) => {
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="bg-[#111111] border border-white/15 w-full max-w-3xl overflow-hidden shadow-2xl relative text-white">
        {/* Search input header */}
        <form onSubmit={handleSearchSubmit} className="flex items-center px-6 py-5 border-b border-white/10 gap-4">
          <Search className="w-5 h-5 text-white/50 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search archive, categories, textiles (e.g. 480 GSM, Cargo, Mohair)..."
            className="w-full bg-transparent text-sm md:text-base font-editorial placeholder:text-white/30 focus:outline-none text-white tracking-wide"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-white/40 hover:text-white transition-colors cursor-pointer text-xs font-mono-tech uppercase"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Popular Tags */}
        <div className="px-6 py-3.5 bg-[#161616] border-b border-white/5 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono-tech text-white/40 uppercase tracking-widest text-[10px]">Trending:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="px-2.5 py-1 bg-white/5 hover:bg-white hover:text-black border border-white/10 text-white/70 transition-all font-mono-tech text-[11px] uppercase cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-6 divide-y divide-white/10">
          {searchQuery.trim() === '' ? (
            <div className="py-8 text-center text-white/40 font-mono-tech text-xs tracking-wider uppercase">
              Enter a search term or browse the curated collection
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-3">
              <p className="font-mono-tech text-xs uppercase tracking-widest text-white/40 mb-3">
                Matching Archive Pieces ({filteredProducts.length})
              </p>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="flex items-center justify-between p-3 hover:bg-white/5 transition-colors cursor-pointer group border border-transparent hover:border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-16 bg-[#1f1f1f] overflow-hidden shrink-0 border border-white/10">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <span className="font-mono-tech text-[10px] text-white/40 tracking-wider uppercase block">
                        {product.sku} • {product.category}
                      </span>
                      <h4 className="font-display text-sm tracking-wide text-white uppercase group-hover:translate-x-0.5 transition-transform">
                        {product.name}
                      </h4>
                      <p className="text-xs text-white/50 font-editorial line-clamp-1">
                        {product.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono-tech text-sm font-semibold text-white">
                      {formatPrice(product.price)}
                    </p>
                    <span className="text-[10px] text-white/40 font-mono-tech uppercase flex items-center justify-end gap-1 group-hover:text-white transition-colors">
                      View <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="font-editorial text-base text-white/80 mb-2">No archive items matched "{searchQuery}"</p>
              <p className="text-xs text-white/40 font-mono-tech">Try searching for "hoodie", "cargo", "boot", or "outerwear".</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-6 py-3 bg-[#0d0d0d] border-t border-white/10 flex items-center justify-between text-[11px] font-mono-tech text-white/40">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/20 text-white rounded text-[9px]">ESC</kbd> to close
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/20 text-white rounded text-[9px]">ENTER</kbd> to search all
            </span>
          </div>
          <span>VØID ARCHIVE v8.2</span>
        </div>
      </div>
    </div>
  );
};
