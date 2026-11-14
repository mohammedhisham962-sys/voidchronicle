import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

export const Wishlist = () => {
  const { wishlist, products, addToCart, toggleWishlist, addToast } = useShop();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    if (wishlistedProducts.length === 0) return;
    wishlistedProducts.forEach(product => {
      const defaultColor = product.colors[0];
      const defaultSize = product.sizes.find(s => s.inStock)?.name || product.sizes[0]?.name;
      addToCart(product, defaultColor, defaultSize, 1);
    });
    addToast('All wishlist pieces moved to shopping bag', 'success');
  };

  if (wishlistedProducts.length === 0) {
    return (
      <div className="min-h-[80vh] bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border border-white/20 flex items-center justify-center mb-6 bg-[#121212]">
          <Heart className="w-8 h-8 text-white/40" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-wider mb-2">
          Your Wishlist is Empty
        </h1>
        <p className="font-editorial text-sm text-white/50 max-w-md mb-8">
          Save your favorite archival silhouettes for later consideration or track inventory changes before release sellouts.
        </p>
        <Link
          to="/shop"
          className="px-8 py-4 bg-white text-black font-mono-tech text-xs uppercase font-bold tracking-widest hover:bg-[#E5E5E0] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>Discover Silhouettes</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="p-6 sm:p-12 border-b border-white/10 bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40 block mb-1">
              SAVED ARCHIVAL PIECES
            </span>
            <h1 className="font-display text-3xl sm:text-5xl uppercase tracking-wider font-extrabold">
              Wishlist ({wishlistedProducts.length})
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleMoveAllToCart}
              className="px-5 py-2.5 bg-white text-black font-mono-tech text-xs uppercase font-bold tracking-widest hover:bg-[#E5E5E0] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Move All to Bag
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
