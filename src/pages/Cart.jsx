import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Tag, 
  ArrowLeft 
} from 'lucide-react';

export const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
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

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoMsg, setPromoMsg] = useState(null);
  const navigate = useNavigate();

  const freeShippingThreshold = 250;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const res = applyPromoCode(promoCodeInput);
    if (res.success) {
      setPromoMsg({ type: 'success', text: res.message });
      setPromoCodeInput('');
    } else {
      setPromoMsg({ type: 'error', text: res.message });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-none border border-white/20 flex items-center justify-center mb-6 bg-[#121212]">
          <ShoppingBag className="w-8 h-8 text-white/40" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-wider mb-2">
          Your Bag is Empty
        </h1>
        <p className="font-editorial text-sm text-white/50 max-w-md mb-8">
          You haven't allocated any pieces from our seasonal archives yet. Explore our recent drops and signature heavyweight silhouettes.
        </p>
        <Link
          to="/shop"
          className="px-8 py-4 bg-white text-black font-mono-tech text-xs uppercase font-bold tracking-widest hover:bg-[#E5E5E0] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>Explore The Archive</span>
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
              ALLOCATED ORDER SPECS
            </span>
            <h1 className="font-display text-3xl sm:text-5xl uppercase tracking-wider font-extrabold">
              Shopping Bag
            </h1>
          </div>
          <div className="font-mono-tech text-xs text-white/50">
            TOTAL UNITS: <span className="text-white font-bold">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
          </div>
        </div>
      </div>

      {/* Free Shipping Alert Bar */}
      <div className="bg-[#121212] border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center text-xs font-mono-tech uppercase mb-2">
            <span className="text-white/80">
              {isFreeShipping ? (
                <span className="text-green-400 font-semibold flex items-center gap-1.5">
                  ✓ Complimentary Global Express Unlocked (DHL Priority)
                </span>
              ) : (
                <span>
                  Add {formatPrice(amountNeeded)} more for Complimentary Express Worldwide Courier
                </span>
              )}
            </span>
            <span className="text-white/40">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full h-1 bg-white/10">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Cart Items + Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Cart Items Table */}
          <div className="lg:col-span-8 space-y-6">
            <div className="hidden sm:grid grid-cols-12 pb-3 border-b border-white/10 font-mono-tech text-xs uppercase text-white/40 tracking-wider">
              <span className="col-span-6">Archival Piece</span>
              <span className="col-span-2 text-center">Unit Price</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            <div className="divide-y divide-white/10">
              {cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`} className="py-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                  {/* Product Details & Thumbnail */}
                  <div className="sm:col-span-6 flex gap-4 w-full">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="w-24 h-32 bg-[#161616] overflow-hidden shrink-0 border border-white/10 block group"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <span className="font-mono-tech text-[10px] uppercase text-white/40 tracking-wider">
                          {item.product.sku}
                        </span>
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="font-display text-sm uppercase tracking-wider text-white hover:underline mt-0.5">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="font-mono-tech text-xs text-white/60 mt-1 uppercase">
                          COLOR: <span className="text-white font-medium">{item.selectedColor}</span>
                        </p>
                        <p className="font-mono-tech text-xs text-white/60 uppercase">
                          SIZE: <span className="text-white font-medium">{item.selectedSize}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                        className="text-white/40 hover:text-red-400 text-xs font-mono-tech uppercase flex items-center gap-1 mt-2 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="hidden sm:block sm:col-span-2 text-center font-mono-tech text-xs text-white/80">
                    {formatPrice(item.product.price)}
                  </div>

                  {/* Quantity Modifier */}
                  <div className="sm:col-span-2 flex items-center justify-center w-full sm:w-auto">
                    <div className="flex items-center border border-white/20 bg-[#141414]">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, -1)}
                        className="p-2 text-white/60 hover:text-white cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 font-mono-tech text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, 1)}
                        className="p-2 text-white/60 hover:text-white cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="sm:col-span-2 text-right font-mono-tech text-sm font-bold text-white w-full sm:w-auto flex justify-between sm:justify-end">
                    <span className="sm:hidden text-white/50 text-xs font-normal">Line Total:</span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart / Continue link */}
            <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs font-mono-tech">
              <Link to="/shop" className="text-white/60 hover:text-white flex items-center gap-1.5 uppercase">
                <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-white/40 hover:text-red-400 uppercase cursor-pointer"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-[#121212] border border-white/15 p-6 sm:p-8 space-y-6 sticky top-28">
              <h2 className="font-display text-lg uppercase tracking-wider pb-3 border-b border-white/10">
                Order Summary
              </h2>

              {/* Promo input */}
              <div className="space-y-2">
                <label className="font-mono-tech text-[10px] uppercase text-white/50 tracking-wider block">
                  Promotional Archive Code
                </label>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-white/5 border border-white/20 p-3 text-xs font-mono-tech">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-white" />
                      <div>
                        <span className="font-bold text-white block">{appliedPromo.code}</span>
                        <span className="text-[10px] text-white/60">{appliedPromo.description}</span>
                      </div>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-white/40 hover:text-white uppercase text-[10px] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="TRY 'VOID20'"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="flex-1 bg-[#1A1A1A] border border-white/15 px-3 py-2.5 text-xs font-mono-tech uppercase text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                    />
                    <button
                      type="submit"
                      className="bg-white text-black font-mono-tech text-xs uppercase px-4 py-2.5 font-bold hover:bg-[#E5E5E0] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMsg && (
                  <p className={`text-[10px] font-mono-tech ${promoMsg.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                    {promoMsg.text}
                  </p>
                )}
              </div>

              {/* Calculations breakdown */}
              <div className="space-y-2.5 font-mono-tech text-xs pt-2 border-t border-white/10">
                <div className="flex justify-between text-white/70">
                  <span>Archival Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-white font-semibold">
                    <span>VIP Privilege Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-white/70">
                  <span>DHL Express Courier</span>
                  <span>{shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}</span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span>Import Duties & Local Taxes</span>
                  <span>INCLUDED (0.00)</span>
                </div>

                <div className="flex justify-between text-base font-bold text-white pt-4 border-t border-white/10">
                  <span>Estimated Total</span>
                  <span className="font-display text-lg">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 bg-white text-black font-mono-tech text-xs uppercase font-extrabold tracking-widest hover:bg-[#E5E5E0] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Security info */}
              <div className="pt-4 border-t border-white/10 space-y-2 font-mono-tech text-[10px] text-white/40">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-white/60" />
                  <span>256-Bit SSL Encrypted End-to-End</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-white/60" />
                  <span>Dispatches from Tokyo & New York Hubs</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
