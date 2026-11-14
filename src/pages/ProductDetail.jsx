import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Heart, 
  ShoppingBag, 
  Ruler, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Plus, 
  Minus, 
  ArrowLeft,
  Maximize2,
  X,
  Share2
} from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    products, 
    addToCart, 
    toggleWishlist, 
    isWishlisted, 
    formatPrice, 
    setSizeGuideOpen, 
    addToast 
  } = useShop();

  const product = products.find(p => p.id === id) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    fabric: true,
    fit: false,
    shipping: false
  });

  // Review Form state
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState(product.reviews || []);

  // Update default states when product id changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(product.colors[0]);
    const firstInStock = product.sizes.find(s => s.inStock)?.name || product.sizes[0]?.name;
    setSelectedSize(firstInStock);
    setQuantity(1);
    setReviewsList(product.reviews || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, product]);

  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast('Please select your preferred size', 'error');
      return;
    }
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      addToast('Please enter your name and review', 'error');
      return;
    }

    const reviewObj = {
      id: `rev-${Date.now()}`,
      user: newReviewName.trim(),
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim()
    };

    setReviewsList(prev => [reviewObj, ...prev]);
    setNewReviewName('');
    setNewReviewComment('');
    addToast('Your review has been submitted to the archive', 'success');
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  const wish = isWishlisted(product.id);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Breadcrumb Bar */}
      <div className="border-b border-white/10 px-4 sm:px-8 py-3 text-xs font-mono-tech text-white/50 bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/shop" className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to Archive
            </Link>
            <span>/</span>
            <span>{product.collection}</span>
            <span>/</span>
            <span className="text-white uppercase">{product.name}</span>
          </div>

          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                addToast('Product archive link copied to clipboard', 'info');
              }
            }}
            className="hidden sm:flex items-center gap-1.5 text-white/50 hover:text-white cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Spec</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
          
          {/* Column 1: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#141414] border border-white/10 group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              />

              {/* Status Tags */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                {product.isNew && (
                  <span className="bg-white text-black font-mono-tech text-xs uppercase font-bold tracking-widest px-3 py-1">
                    NEW DROP
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-[#181818] border border-white/20 text-white font-mono-tech text-xs uppercase px-3 py-1">
                    ARCHIVE PRIVILEGE
                  </span>
                )}
              </div>

              {/* Zoom Trigger */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-4 right-4 p-2.5 bg-black/70 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                title="Fullscreen Lightbox"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-[3/4] overflow-hidden border transition-all cursor-pointer relative bg-[#181818] ${
                      activeImageIndex === idx ? 'border-white ring-1 ring-white' : 'border-white/15 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Specifications, Actions & Buy Box */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              {/* Product SKU & Collection Header */}
              <div className="space-y-2 border-b border-white/10 pb-6">
                <div className="flex items-center justify-between font-mono-tech text-xs uppercase tracking-widest text-white/50">
                  <span>{product.sku}</span>
                  <span>{product.collection}</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-wider font-extrabold text-white">
                  {product.name}
                </h1>

                <p className="font-editorial text-sm text-white/70">
                  {product.tagline}
                </p>

                {/* Price & Rating */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-baseline gap-3 font-mono-tech">
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-white/40 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5 font-mono-tech text-xs text-white/70">
                    <div className="flex text-white">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-white" />
                      ))}
                    </div>
                    <span>({reviewsList.length})</span>
                  </div>
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs font-mono-tech uppercase">
                  <span className="text-white/50 tracking-wider">Colorway Selection</span>
                  <span className="text-white font-semibold">{selectedColor.name}</span>
                </div>
                <div className="flex gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-9 h-9 border transition-all cursor-pointer flex items-center justify-center ${
                        selectedColor.name === c.name
                          ? 'border-white ring-2 ring-white scale-105'
                          : 'border-white/20 opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor.name === c.name && (
                        <Check className={`w-4 h-4 ${c.hex === '#EAE7DF' || c.hex === '#F3F2EC' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs font-mono-tech uppercase">
                  <span className="text-white/50 tracking-wider">Select Size</span>
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-white/70 hover:text-white underline cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>View Measurements</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.name}
                      disabled={!s.inStock}
                      onClick={() => setSelectedSize(s.name)}
                      className={`py-3 text-xs font-mono-tech uppercase tracking-wider border transition-all cursor-pointer ${
                        selectedSize === s.name
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

                {/* Stock remaining notice */}
                <div className="flex items-center gap-2 text-xs font-mono-tech text-white/50 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span>
                    {product.stockQuantity <= 5
                      ? `Urgent: Only ${product.stockQuantity} archival units remaining`
                      : `In Stock — Dispatches within 24 hours`}
                  </span>
                </div>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-white/20 bg-[#161616]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-3 text-white/60 hover:text-white cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-mono-tech text-xs font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-3 text-white/60 hover:text-white cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-4 bg-white text-black font-mono-tech text-xs uppercase font-extrabold tracking-widest hover:bg-[#E5E5E0] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xl"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-4 border transition-colors cursor-pointer ${
                      wish ? 'bg-white text-black border-white' : 'border-white/20 hover:border-white text-white'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${wish ? 'fill-black' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Assurance Quick Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 font-mono-tech text-[11px] text-white/60">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-white" />
                  <span>DHL Express (2-3 Days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>NFC Authenticity Tag</span>
                </div>
              </div>

              {/* Detailed Technical Accordions */}
              <div className="border-t border-white/10 divide-y divide-white/10 pt-2">
                {/* 1. Description */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('description')}
                    className="w-full flex justify-between items-center text-xs font-mono-tech uppercase tracking-widest text-white cursor-pointer"
                  >
                    <span>01 // DESIGN & NARRATIVE</span>
                    {openAccordions.description ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.description && (
                    <div className="mt-3 font-editorial text-xs text-white/70 leading-relaxed space-y-2">
                      <p>{product.description}</p>
                      {product.details && (
                        <ul className="list-disc list-inside space-y-1 font-mono-tech text-[11px] text-white/60 pt-2">
                          {product.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. Fabric & Material */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('fabric')}
                    className="w-full flex justify-between items-center text-xs font-mono-tech uppercase tracking-widest text-white cursor-pointer"
                  >
                    <span>02 // TEXTILE & CRAFTSMANSHIP</span>
                    {openAccordions.fabric ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.fabric && (
                    <div className="mt-3 font-editorial text-xs text-white/70 leading-relaxed space-y-2">
                      <p className="font-semibold text-white">{product.fabric}</p>
                      <p>
                        Spun on vintage Japanese circular loopwheel looms in Wakayama. Cold-dyed using artisan mineral pigments that yield individual tonal character on every piece.
                      </p>
                    </div>
                  )}
                </div>

                {/* 3. Silhouette & Fit */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('fit')}
                    className="w-full flex justify-between items-center text-xs font-mono-tech uppercase tracking-widest text-white cursor-pointer"
                  >
                    <span>03 // SILHOUETTE & FIT SPECS</span>
                    {openAccordions.fit ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.fit && (
                    <div className="mt-3 font-editorial text-xs text-white/70 leading-relaxed space-y-2">
                      <p>{product.fit}</p>
                      <p className="font-mono-tech text-[11px] text-white/50">
                        Editorial Model: Height 188cm / 6'2", Chest 98cm / 38.5", wearing size L.
                      </p>
                    </div>
                  )}
                </div>

                {/* 4. Global Dispatch & Returns */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full flex justify-between items-center text-xs font-mono-tech uppercase tracking-widest text-white cursor-pointer"
                  >
                    <span>04 // DISPATCH, DUTIES & RETURNS</span>
                    {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.shipping && (
                    <div className="mt-3 font-editorial text-xs text-white/70 leading-relaxed space-y-2">
                      <p>
                        All archival orders dispatch within 24 hours via DHL Express Priority. All international import customs, taxes and duties are fully prepaid by VØID Atelier.
                      </p>
                      <p>
                        14-day return and exchange window. Pre-paid return labels included with your delivery.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Client Reviews Section */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40 block mb-1">
                  VERIFIED PATRON REVIEWS
                </span>
                <h3 className="font-display text-2xl uppercase tracking-wider">
                  Client Appraisals ({reviewsList.length})
                </h3>
              </div>
              <div className="flex items-center gap-3 font-mono-tech text-sm">
                <div className="flex text-white">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white" />
                  ))}
                </div>
                <span className="font-bold">5.0 / 5.0 RATING</span>
              </div>
            </div>

            {/* Write a Review Box */}
            <form onSubmit={handleAddReview} className="p-6 bg-[#111111] border border-white/15 space-y-4">
              <h4 className="font-mono-tech text-xs uppercase tracking-widest text-white font-bold">
                Submit an Archival Review
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">
                    Your Name / Handle
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    placeholder="E.g. Julian V."
                    className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono-tech text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono-tech text-white focus:outline-none focus:border-white cursor-pointer"
                  >
                    <option value="5">★★★★★ 5 - Flawless Craft</option>
                    <option value="4">★★★★☆ 4 - Exceptional</option>
                    <option value="3">★★★☆☆ 3 - Standard</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">
                  Your Assessment
                </label>
                <textarea
                  rows="3"
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Detail the fabric weight, drape, hardware and overall silhouette..."
                  className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-editorial text-white focus:outline-none focus:border-white"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-white text-black font-mono-tech text-xs uppercase font-bold tracking-widest hover:bg-[#E5E5E0] transition-colors cursor-pointer"
              >
                Post Review
              </button>
            </form>

            {/* List of Reviews */}
            <div className="space-y-4">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="p-6 bg-[#0E0E0E] border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm uppercase tracking-wide text-white font-bold">
                        {rev.user}
                      </span>
                      <span className="font-mono-tech text-[10px] bg-white/10 text-white/80 px-2 py-0.5 uppercase">
                        Verified Patron
                      </span>
                    </div>
                    <span className="font-mono-tech text-xs text-white/40">{rev.date}</span>
                  </div>
                  <div className="flex text-white py-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-white" />
                    ))}
                  </div>
                  <p className="font-editorial text-xs sm:text-sm text-white/70 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Complete The Silhouette / Related Pieces */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
              <div>
                <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40 block">
                  RUNWAY COORDINATION
                </span>
                <h3 className="font-display text-2xl uppercase tracking-wider mt-1">
                  Complete The Silhouette
                </h3>
              </div>
              <Link
                to="/shop"
                className="font-mono-tech text-xs uppercase tracking-wider text-white/60 hover:text-white"
              >
                View Catalog
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 border border-white/20 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={product.images[activeImageIndex] || product.images[0]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  );
};
