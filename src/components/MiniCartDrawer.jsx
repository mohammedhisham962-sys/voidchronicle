import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

export const MiniCartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartTotal,
    discountAmount,
    shippingFee,
    isFreeShipping,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    formatPrice
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState(null);
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 250;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoMsg({ type: 'success', text: res.message });
      setPromoInput('');
    } else {
      setPromoMsg({ type: 'error', text: res.message });
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F0F0F] border-l border-white/10 text-white flex flex-col shadow-2xl relative">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#141414]">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4 text-white/70" />
              <h2 className="font-display text-sm tracking-wider uppercase">
                Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#181818] px-6 py-3 border-b border-white/5">
            <div className="flex justify-between items-center text-[11px] font-mono-tech uppercase mb-1.5">
              <span className="text-white/60">
                {isFreeShipping
                  ? '✓ Complimentary Global Express Unlocked'
                  : `Add ${formatPrice(amountNeeded)} more for Free Express Delivery`}
              </span>
              <span className="text-white/40">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full h-1 bg-white/10 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/10">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <ShoppingBag className="w-12 h-12 text-white/20 mb-4 stroke-1" />
                <p className="font-display text-base uppercase tracking-wider mb-2">Your Bag is Empty</p>
                <p className="font-editorial text-xs text-white/40 max-w-xs mb-6">
                  Explore our latest seasonal drop and archival pieces engineered for high-fashion utility.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-3 bg-white text-black font-mono-tech text-xs uppercase tracking-widest font-semibold hover:bg-[#E5E5E0] transition-colors cursor-pointer"
                >
                  Explore The Archive
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`} className="py-4 flex gap-4 group">
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate(`/product/${item.product.id}`);
                    }}
                    className="w-20 h-24 bg-[#1C1C1C] overflow-hidden shrink-0 border border-white/10 cursor-pointer"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            navigate(`/product/${item.product.id}`);
                          }}
                          className="font-display text-xs uppercase tracking-wider hover:underline cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                          className="text-white/30 hover:text-red-400 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="font-mono-tech text-[10px] text-white/50 tracking-wider uppercase mt-1">
                        COLOR: <span className="text-white/80">{item.selectedColor}</span> | SIZE: <span className="text-white/80">{item.selectedSize}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty Modifier */}
                      <div className="flex items-center border border-white/20 bg-[#161616]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, -1)}
                          className="p-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 font-mono-tech text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, 1)}
                          className="p-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <p className="font-mono-tech text-xs font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="border-t border-white/10 bg-[#121212] px-6 py-5 space-y-4">
              {/* Promo input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-white/5 border border-white/15 px-3 py-2 text-xs font-mono-tech">
                    <span className="flex items-center gap-1.5 text-white">
                      <Tag className="w-3.5 h-3.5 text-white/70" />
                      {appliedPromo.code} ({appliedPromo.description})
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-white/40 hover:text-white text-[10px] uppercase cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. VOID20)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-[#1A1A1A] border border-white/15 px-3 py-2 text-xs font-mono-tech uppercase text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                    />
                    <button
                      type="submit"
                      className="bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white font-mono-tech text-xs uppercase px-3 py-2 transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMsg && (
                  <p className={`text-[10px] font-mono-tech mt-1 ${promoMsg.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                    {promoMsg.text}
                  </p>
                )}
              </div>

              {/* Subtotals */}
              <div className="space-y-1.5 font-mono-tech text-xs pt-1">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-white">
                    <span>Archive Privilege</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/60">
                  <span>Express Courier</span>
                  <span>{shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Estimated Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-white text-black font-mono-tech text-xs font-bold uppercase tracking-widest hover:bg-[#E5E5E0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 bg-transparent border border-white/20 text-white font-mono-tech text-xs uppercase tracking-widest hover:border-white transition-colors cursor-pointer text-center block"
                >
                  View Full Bag & Specs
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono-tech text-white/40 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
