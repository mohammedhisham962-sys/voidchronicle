import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, ArrowRight, Check } from 'lucide-react';

export const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatPrice,
    setSizeGuideOpen
  } = useShop();

  const navigate = useNavigate();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const activeColor = selectedColor || product.colors[0];
  const activeSize = selectedSize || product.sizes.find(s => s.inStock)?.name || product.sizes[0]?.name;

  const handleAddToCart = () => {
    addToCart(product, activeColor, activeSize, quantity);
    setQuickViewProduct(null);
  };

  const handleFullDetail = () => {
    setQuickViewProduct(null);
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121212] border border-white/15 w-full max-w-4xl max-h-[90vh] overflow-y-auto text-white grid grid-cols-1 md:grid-cols-2 relative shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-black/60 text-white/70 hover:text-white transition-colors border border-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Column */}
        <div className="bg-[#0c0c0c] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
          <div className="aspect-[3/4] w-full overflow-hidden bg-[#181818] border border-white/10 relative">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-white text-black font-mono-tech text-[10px] uppercase font-bold tracking-widest">
                NEW RELEASE
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-18 overflow-hidden shrink-0 border transition-all cursor-pointer ${
                    selectedImageIndex === idx ? 'border-white' : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tech text-white/50 uppercase tracking-widest mb-1.5">
              <span>{product.sku}</span>
              <span>{product.collection}</span>
            </div>

            <h3 className="font-display text-xl uppercase tracking-wider mb-2">
              {product.name}
            </h3>

            <div className="flex items-center gap-3 font-mono-tech mb-4">
              <span className="text-lg font-bold text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-white/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="font-editorial text-xs text-white/70 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-5">
              <div className="flex justify-between items-center text-xs font-mono-tech uppercase mb-2">
                <span className="text-white/50 tracking-wider">Colorway</span>
                <span className="text-white font-medium">{activeColor.name}</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-7 h-7 rounded-none border transition-all cursor-pointer flex items-center justify-center ${
                      activeColor.name === color.name ? 'border-white ring-1 ring-white' : 'border-white/20 opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {activeColor.name === color.name && (
                      <Check className={`w-3.5 h-3.5 ${color.hex === '#EAE7DF' || color.hex === '#F3F2EC' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-mono-tech uppercase mb-2">
                <span className="text-white/50 tracking-wider">Size Selection</span>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-white/60 hover:text-white underline text-[11px] cursor-pointer"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.name}
                    disabled={!s.inStock}
                    onClick={() => setSelectedSize(s.name)}
                    className={`py-2 text-xs font-mono-tech uppercase tracking-wider border transition-all cursor-pointer ${
                      activeSize === s.name
                        ? 'bg-white text-black border-white font-bold'
                        : s.inStock
                        ? 'border-white/20 text-white/80 hover:border-white'
                        : 'border-white/10 text-white/20 cursor-not-allowed line-through'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-white text-black font-mono-tech text-xs uppercase font-bold tracking-widest hover:bg-[#E5E5E0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Bag
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 border border-white/20 transition-colors cursor-pointer ${
                  isWishlisted(product.id) ? 'bg-white text-black border-white' : 'hover:border-white text-white'
                }`}
                title="Add to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted(product.id) ? 'fill-black' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleFullDetail}
              className="w-full py-2.5 text-center text-xs font-mono-tech uppercase tracking-wider text-white/60 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              Full Specifications & Editorial Runway <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
