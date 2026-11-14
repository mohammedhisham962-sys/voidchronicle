import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Plus } from 'lucide-react';

export const ProductCard = ({ product, priority = false }) => {
  const { toggleWishlist, isWishlisted, setQuickViewProduct, addToCart, formatPrice } = useShop();
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];
  const wish = isWishlisted(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.colors[0];
    const defaultSize = product.sizes.find(s => s.inStock)?.name || product.sizes[0]?.name;
    addToCart(product, defaultColor, defaultSize, 1);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="group relative flex flex-col bg-[#0E0E0E] border border-white/10 hover:border-white/30 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Area */}
      <Link to={`/product/${product.id}`} className="relative aspect-[3/4] w-full overflow-hidden bg-[#161616] block">
        {/* Main Image */}
        <img
          src={primaryImage}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            isHovered && secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Hover Image */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternative look`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-white text-black font-mono-tech text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 shadow-sm">
              NEW DROP
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-[#1C1C1C] border border-white/20 text-white font-mono-tech text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5">
              ARCHIVE SALE
            </span>
          )}
          {product.stockQuantity <= 5 && (
            <span className="bg-red-950/80 border border-red-500/40 text-red-200 font-mono-tech text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5">
              ONLY {product.stockQuantity} LEFT
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-20 p-2.5 backdrop-blur-md border transition-all duration-300 cursor-pointer ${
            wish
              ? 'bg-white text-black border-white'
              : 'bg-black/60 border-white/20 text-white/70 hover:text-white hover:border-white'
          }`}
          title={wish ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${wish ? 'fill-black' : ''}`} />
        </button>

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-20 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2.5 bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono-tech text-[11px] uppercase tracking-wider hover:bg-white hover:text-black hover:border-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
          <button
            onClick={handleQuickAdd}
            className="p-2.5 bg-white text-black hover:bg-[#E5E5E0] transition-colors flex items-center justify-center cursor-pointer shadow-lg"
            title="Instant Add (Default Size)"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </Link>

      {/* Product Metadata Info */}
      <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono-tech uppercase tracking-widest text-white/40 mb-1">
            <span>{product.sku}</span>
            <span>{product.category}</span>
          </div>

          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-display text-sm tracking-wide uppercase text-white group-hover:text-white/80 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="font-editorial text-xs text-white/50 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Bottom row: colors & price */}
        <div className="flex items-end justify-between pt-2 border-t border-white/5">
          {/* Color previews */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-2.5 h-2.5 border border-white/30"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] font-mono-tech text-white/40 ml-1">
              {product.colors.length} COL
            </span>
          </div>

          {/* Price */}
          <div className="text-right font-mono-tech">
            {product.originalPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-semibold text-white">
                  {formatPrice(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-xs font-semibold text-white">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
