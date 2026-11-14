import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, COLLECTIONS } from '../data/products';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  Grid2X2, 
  LayoutGrid, 
  RotateCcw,
  ChevronDown
} from 'lucide-react';

export const Shop = () => {
  const { products } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const initialCollection = searchParams.get('collection') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState(800);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'
  const [gridMode, setGridMode] = useState('4'); // '2' | '4'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if search params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const col = searchParams.get('collection');
    if (col) setSelectedCollection(col);
  }, [searchParams]);

  // Derived filter options
  const allSizes = useMemo(() => {
    const set = new Set();
    products.forEach(p => p.sizes.forEach(s => set.add(s.name)));
    return Array.from(set);
  }, [products]);

  const allColors = useMemo(() => {
    const set = new Set();
    products.forEach(p => p.colors.forEach(c => set.add(c.name)));
    return Array.from(set);
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Collection
    if (selectedCollection !== 'All') {
      result = result.filter(p => p.collection.toLowerCase() === selectedCollection.toLowerCase());
    }

    // Size
    if (selectedSize !== 'All') {
      result = result.filter(p => p.sizes.some(s => s.name === selectedSize && s.inStock));
    }

    // Color
    if (selectedColor !== 'All') {
      result = result.filter(p => p.colors.some(c => c.name === selectedColor));
    }

    // In Stock Only
    if (inStockOnly) {
      result = result.filter(p => p.stockQuantity > 0);
    }

    // Price
    result = result.filter(p => p.price <= priceRange);

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, selectedCollection, selectedSize, selectedColor, inStockOnly, priceRange, sortBy, searchParams]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedCollection('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setInStockOnly(false);
    setPriceRange(800);
    setSortBy('featured');
    setSearchParams({});
  };

  const activeFiltersCount = (selectedCategory !== 'All' ? 1 : 0) +
    (selectedCollection !== 'All' ? 1 : 0) +
    (selectedSize !== 'All' ? 1 : 0) +
    (selectedColor !== 'All' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (priceRange < 800 ? 1 : 0) +
    (searchParams.get('search') ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Top Banner / Header */}
      <div className="p-6 sm:p-12 border-b border-white/10 bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40 block mb-1">
                ARCHIVE CATALOG // ALL SILHOUETTES
              </span>
              <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-wider font-extrabold text-white">
                {selectedCategory === 'All' ? 'Full Archive' : selectedCategory}
              </h1>
              <p className="font-editorial text-xs sm:text-sm text-white/60 max-w-xl mt-2">
                Engineered with bespoke Japanese loopback cottons, ballistic Cordura, and luxury Italian calfskins. Strictly micro-batch releases.
              </p>
            </div>

            <div className="font-mono-tech text-xs text-white/50">
              DISPLAYING <span className="text-white font-bold">{filteredProducts.length}</span> OF {products.length} PIECES
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Categories, Filters, Grid Toggle, Sorting */}
      <div className="sticky top-[73px] z-30 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Quick Category Buttons */}
          <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono-tech">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 uppercase tracking-wider transition-colors cursor-pointer border ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-white text-black border-white font-semibold'
                    : 'bg-transparent text-white/60 border-transparent hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 border border-white/20 font-mono-tech text-xs uppercase text-white hover:border-white transition-colors cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Refine ({activeFiltersCount})</span>
          </button>

          {/* Right Controls: Sort & Grid Layout */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 font-mono-tech text-xs">
              <span className="text-white/40 uppercase hidden sm:inline">SORT:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#141414] border border-white/20 px-3 py-1.5 text-white font-mono-tech text-xs uppercase focus:outline-none focus:border-white cursor-pointer"
                >
                  <option value="featured">Featured Archive</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Releases</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Grid Switcher (2 Col vs 4 Col) */}
            <div className="hidden sm:flex items-center border border-white/20 p-0.5 bg-[#141414]">
              <button
                onClick={() => setGridMode('2')}
                className={`p-1.5 transition-colors cursor-pointer ${
                  gridMode === '2' ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                }`}
                title="2-Column Editorial View"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridMode('4')}
                className={`p-1.5 transition-colors cursor-pointer ${
                  gridMode === '4' ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                }`}
                title="4-Column Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Pills Bar (if any) */}
      {activeFiltersCount > 0 && (
        <div className="bg-[#111111] border-b border-white/5 px-4 sm:px-8 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 text-xs font-mono-tech">
            <span className="text-white/40 uppercase text-[11px]">Applied Filters:</span>
            
            {searchParams.get('search') && (
              <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white flex items-center gap-1.5">
                Query: "{searchParams.get('search')}"
                <X
                  onClick={() => setSearchParams({})}
                  className="w-3 h-3 hover:text-red-400 cursor-pointer"
                />
              </span>
            )}

            {selectedCategory !== 'All' && (
              <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white flex items-center gap-1.5">
                Category: {selectedCategory}
                <X onClick={() => setSelectedCategory('All')} className="w-3 h-3 hover:text-red-400 cursor-pointer" />
              </span>
            )}

            {selectedCollection !== 'All' && (
              <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white flex items-center gap-1.5">
                Collection: {selectedCollection}
                <X onClick={() => setSelectedCollection('All')} className="w-3 h-3 hover:text-red-400 cursor-pointer" />
              </span>
            )}

            {selectedSize !== 'All' && (
              <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white flex items-center gap-1.5">
                Size: {selectedSize}
                <X onClick={() => setSelectedSize('All')} className="w-3 h-3 hover:text-red-400 cursor-pointer" />
              </span>
            )}

            {selectedColor !== 'All' && (
              <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white flex items-center gap-1.5">
                Color: {selectedColor}
                <X onClick={() => setSelectedColor('All')} className="w-3 h-3 hover:text-red-400 cursor-pointer" />
              </span>
            )}

            {inStockOnly && (
              <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white flex items-center gap-1.5">
                In Stock Only
                <X onClick={() => setInStockOnly(false)} className="w-3 h-3 hover:text-red-400 cursor-pointer" />
              </span>
            )}

            {priceRange < 800 && (
              <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white flex items-center gap-1.5">
                Max ${priceRange}
                <X onClick={() => setPriceRange(800)} className="w-3 h-3 hover:text-red-400 cursor-pointer" />
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-white/50 hover:text-white underline text-[11px] ml-2 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset All
            </button>
          </div>
        </div>
      )}

      {/* Main Content Layout: Sidebar + Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-6 border-r border-white/10">
            {/* Filter Group: Collections */}
            <div>
              <h4 className="font-mono-tech text-xs uppercase tracking-widest text-white/50 mb-3 pb-2 border-b border-white/10">
                ARCHIVE DROP
              </h4>
              <div className="space-y-1.5 font-editorial text-xs">
                <button
                  onClick={() => setSelectedCollection('All')}
                  className={`w-full text-left py-1 hover:text-white transition-colors cursor-pointer ${
                    selectedCollection === 'All' ? 'text-white font-bold' : 'text-white/60'
                  }`}
                >
                  All Archive Drops
                </button>
                {COLLECTIONS.map(col => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedCollection(col.name)}
                    className={`w-full text-left py-1 hover:text-white transition-colors cursor-pointer ${
                      selectedCollection === col.name ? 'text-white font-bold' : 'text-white/60'
                    }`}
                  >
                    {col.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Price Range */}
            <div>
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
                <h4 className="font-mono-tech text-xs uppercase tracking-widest text-white/50">
                  PRICE CEILING
                </h4>
                <span className="font-mono-tech text-xs text-white font-semibold">${priceRange}</span>
              </div>
              <input
                type="range"
                min="100"
                max="800"
                step="20"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-white bg-[#222222] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono-tech text-white/40 mt-1">
                <span>$100</span>
                <span>$800+</span>
              </div>
            </div>

            {/* Filter Group: Sizes */}
            <div>
              <h4 className="font-mono-tech text-xs uppercase tracking-widest text-white/50 mb-3 pb-2 border-b border-white/10">
                SIZE SPEC
              </h4>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setSelectedSize('All')}
                  className={`py-1.5 text-xs font-mono-tech uppercase border transition-colors cursor-pointer ${
                    selectedSize === 'All' ? 'bg-white text-black border-white font-bold' : 'border-white/15 text-white/60 hover:border-white'
                  }`}
                >
                  ALL
                </button>
                {allSizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-1.5 text-xs font-mono-tech uppercase border transition-colors cursor-pointer ${
                      selectedSize === sz ? 'bg-white text-black border-white font-bold' : 'border-white/15 text-white/60 hover:border-white'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Colors */}
            <div>
              <h4 className="font-mono-tech text-xs uppercase tracking-widest text-white/50 mb-3 pb-2 border-b border-white/10">
                TONAL PALETTE
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedColor('All')}
                  className={`px-2.5 py-1 text-xs font-mono-tech uppercase border transition-colors cursor-pointer ${
                    selectedColor === 'All' ? 'bg-white text-black border-white' : 'border-white/15 text-white/60 hover:border-white'
                  }`}
                >
                  ALL TONES
                </button>
                {allColors.map(clr => (
                  <button
                    key={clr}
                    onClick={() => setSelectedColor(clr)}
                    className={`px-2.5 py-1 text-xs font-mono-tech uppercase border transition-colors cursor-pointer ${
                      selectedColor === clr ? 'bg-white text-black border-white' : 'border-white/15 text-white/60 hover:border-white'
                    }`}
                  >
                    {clr}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Availability */}
            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-mono-tech uppercase text-white/70 select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-white rounded-none cursor-pointer"
                />
                <span>In Stock Pieces Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center border border-white/10 bg-[#0E0E0E] p-8">
                <p className="font-display text-2xl uppercase tracking-wider mb-2">No Matching Silhouettes</p>
                <p className="font-editorial text-sm text-white/50 max-w-md mx-auto mb-6">
                  No archive pieces matched your current filter criteria. Try expanding your price range or resetting applied parameters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-white text-black font-mono-tech text-xs uppercase tracking-widest font-bold hover:bg-[#E5E5E0] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  gridMode === '2'
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                }`}
              >
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} priority={idx < 4} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200">
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
              <h3 className="font-display text-lg uppercase tracking-wider">Refine Archive</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Category */}
            <div className="mb-6">
              <h4 className="font-mono-tech text-xs text-white/50 uppercase tracking-widest mb-2">Category</h4>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`py-2 text-xs font-mono-tech uppercase border ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? 'bg-white text-black border-white'
                        : 'border-white/15 text-white/70'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Collections */}
            <div className="mb-6">
              <h4 className="font-mono-tech text-xs text-white/50 uppercase tracking-widest mb-2">Collection</h4>
              <div className="space-y-1.5 font-editorial text-xs">
                <button
                  onClick={() => setSelectedCollection('All')}
                  className={`w-full text-left py-1.5 ${selectedCollection === 'All' ? 'text-white font-bold' : 'text-white/60'}`}
                >
                  All Archive Drops
                </button>
                {COLLECTIONS.map(col => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedCollection(col.name)}
                    className={`w-full text-left py-1.5 ${selectedCollection === col.name ? 'text-white font-bold' : 'text-white/60'}`}
                  >
                    {col.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-mono-tech uppercase mb-2">
                <span className="text-white/50">Max Price</span>
                <span className="text-white font-bold">${priceRange}</span>
              </div>
              <input
                type="range"
                min="100"
                max="800"
                step="20"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-white"
              />
            </div>

            {/* Mobile Size */}
            <div className="mb-6">
              <h4 className="font-mono-tech text-xs text-white/50 uppercase tracking-widest mb-2">Size</h4>
              <div className="grid grid-cols-4 gap-2">
                {allSizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs font-mono-tech uppercase border ${
                      selectedSize === sz ? 'bg-white text-black border-white' : 'border-white/15 text-white/70'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex gap-3">
            <button
              onClick={clearAllFilters}
              className="flex-1 py-3 border border-white/20 text-white font-mono-tech text-xs uppercase"
            >
              Reset
            </button>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="flex-1 py-3 bg-white text-black font-mono-tech text-xs uppercase font-bold"
            >
              View Results ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
