import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle, 
  ArrowLeft, 
  Lock, 
  Copy, 
  Check, 
  ShoppingBag,
  ExternalLink,
  Smartphone
} from 'lucide-react';

export const Checkout = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartTotal, 
    discountAmount, 
    shippingFee, 
    tax, 
    appliedPromo, 
    createOrder, 
    formatPrice, 
    user 
  } = useShop();

  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    email: user?.email || 'julian@voidatelier.com',
    firstName: user?.name ? user.name.split(' ')[0] : 'Julian',
    lastName: user?.name ? user.name.split(' ')[1] || 'Vance' : 'Vance',
    street: user?.addresses?.[0]?.street || '742 Mercer Street, Apt 4B',
    city: user?.addresses?.[0]?.city || 'New York',
    state: user?.addresses?.[0]?.state || 'NY',
    postalCode: user?.addresses?.[0]?.postalCode || '10012',
    country: user?.addresses?.[0]?.country || 'United States',
    phone: user?.addresses?.[0]?.phone || '+1 (212) 555-0199',
    shippingMethod: 'dhl-express',
    paymentMethod: 'card' // 'card' | 'apple-pay' | 'cod'
  });

  // Card details
  const [cardDetails, setCardDetails] = useState({
    number: '4242 4242 4242 4242',
    holder: 'JULIAN VANCE',
    expiry: '12/28',
    cvv: '882'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  // If cart is empty and no order completed, redirect
  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="min-h-[70vh] bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-display text-2xl uppercase tracking-wider mb-2">Your Bag is Empty</h2>
        <p className="font-editorial text-xs text-white/50 mb-6">Add pieces to your bag before proceeding to checkout.</p>
        <Link to="/shop" className="px-6 py-3 bg-white text-black font-mono-tech text-xs uppercase font-bold">
          Explore Archive
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardDetails(prev => ({ ...prev, number: val }));
  };

  const fillTestCard = () => {
    setCardDetails({
      number: '4242 4242 4242 4242',
      holder: `${formData.firstName.toUpperCase()} ${formData.lastName.toUpperCase()}`,
      expiry: '12/28',
      cvv: '882'
    });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderData = {
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone
        },
        paymentMethod: formData.paymentMethod === 'apple-pay'
          ? 'Apple Pay (Touch ID Verified)'
          : formData.paymentMethod === 'cod'
          ? 'Atelier Cash on Delivery'
          : `Visa (•••• ${cardDetails.number.slice(-4)})`,
        carrier: 'DHL Express Priority'
      };

      const newOrder = createOrder(orderData);
      setCompletedOrder(newOrder);
      setIsProcessing(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#888888', '#222222']
        });
      } catch (err) {
        // ignore if not loaded
      }
    }, 1800);
  };

  const copyTracking = () => {
    if (completedOrder?.trackingNumber && navigator.clipboard) {
      navigator.clipboard.writeText(completedOrder.trackingNumber);
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 2000);
    }
  };

  // ORDER SUCCESS CONFIRMATION SCREEN
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white py-12 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto border border-white/20 bg-[#111111] p-6 sm:p-12 shadow-2xl relative">
          
          {/* Top Status */}
          <div className="text-center space-y-3 pb-8 border-b border-white/10">
            <div className="w-14 h-14 bg-white text-black flex items-center justify-center mx-auto mb-2">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <span className="font-mono-tech text-xs uppercase tracking-widest text-green-400 font-bold block">
              TRANSACTION CONFIRMED // ALLOCATED TO ATELIER
            </span>
            <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-wider font-extrabold">
              Thank You For Your Order
            </h1>
            <p className="font-editorial text-xs sm:text-sm text-white/60 max-w-md mx-auto">
              Your garments have been assigned serial codes and are being packed in custom archival boxes at our logistics hub.
            </p>
          </div>

          {/* Order Details Grid */}
          <div className="py-6 border-b border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-tech text-xs">
            <div>
              <span className="text-white/40 text-[10px] uppercase block">Order Reference</span>
              <span className="text-white font-bold">{completedOrder.id}</span>
            </div>
            <div>
              <span className="text-white/40 text-[10px] uppercase block">Order Date</span>
              <span className="text-white">{completedOrder.date}</span>
            </div>
            <div>
              <span className="text-white/40 text-[10px] uppercase block">Total Amount</span>
              <span className="text-white font-bold">{formatPrice(completedOrder.total)}</span>
            </div>
            <div>
              <span className="text-white/40 text-[10px] uppercase block">Dispatch Carrier</span>
              <span className="text-white">DHL Express Priority</span>
            </div>
          </div>

          {/* Tracking Bar */}
          <div className="my-6 p-4 bg-[#181818] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-white" />
              <div>
                <span className="font-mono-tech text-[10px] text-white/40 uppercase block">Tracking Reference Number</span>
                <span className="font-mono-tech text-xs text-white font-semibold">{completedOrder.trackingNumber}</span>
              </div>
            </div>
            <button
              onClick={copyTracking}
              className="px-3 py-1.5 bg-white/10 hover:bg-white hover:text-black transition-colors font-mono-tech text-[11px] uppercase flex items-center gap-1.5 cursor-pointer"
            >
              {copiedTracking ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTracking ? 'Copied' : 'Copy Tracking'}</span>
            </button>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-4 py-4">
            <h3 className="font-mono-tech text-xs uppercase tracking-widest text-white/50">
              Allocated Garment Specs ({completedOrder.items.length})
            </h3>
            <div className="divide-y divide-white/10 border-t border-b border-white/10">
              {completedOrder.items.map((item, i) => (
                <div key={i} className="py-3 flex items-center justify-between font-mono-tech text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-14 object-cover border border-white/10" />
                    <div>
                      <p className="font-display text-xs uppercase tracking-wider text-white">{item.product.name}</p>
                      <p className="text-[10px] text-white/50">{item.selectedColor} • SIZE: {item.selectedSize} (QTY: {item.quantity})</p>
                    </div>
                  </div>
                  <span className="font-bold">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address & Payment Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4 font-mono-tech text-xs text-white/70">
            <div>
              <span className="text-[10px] uppercase text-white/40 block mb-1">Destination</span>
              <p className="text-white font-semibold">{completedOrder.shippingAddress.fullName}</p>
              <p>{completedOrder.shippingAddress.street}</p>
              <p>{completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} {completedOrder.shippingAddress.postalCode}</p>
              <p>{completedOrder.shippingAddress.country}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-white/40 block mb-1">Payment Authorized</span>
              <p className="text-white">{completedOrder.paymentMethod}</p>
              <p className="text-[10px] text-white/40 mt-1">Duties & Customs Guaranteed Prepaid</p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/account')}
              className="flex-1 py-3.5 bg-white text-black font-mono-tech text-xs uppercase font-bold tracking-widest hover:bg-[#E5E5E0] transition-colors cursor-pointer text-center"
            >
              View In Order History & Live Tracking
            </button>
            <button
              onClick={() => navigate('/shop')}
              className="flex-1 py-3.5 border border-white/20 text-white font-mono-tech text-xs uppercase tracking-widest hover:border-white transition-colors cursor-pointer text-center"
            >
              Return to Catalog
            </button>
          </div>

        </div>
      </div>
    );
  }

  // CHECKOUT FORM SCREEN
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="p-6 sm:p-10 border-b border-white/10 bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/cart" className="flex items-center gap-1.5 font-mono-tech text-xs uppercase text-white/60 hover:text-white">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Bag
          </Link>
          <div className="flex items-center gap-2 font-mono-tech text-xs text-white/50">
            <Lock className="w-3.5 h-3.5 text-white/70" />
            <span>256-BIT ENCRYPTED CHECKOUT</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-16">
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact, Shipping & Payment Form */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* 01: Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h2 className="font-display text-lg uppercase tracking-wider flex items-center gap-2">
                  <span>01 // CLIENT IDENTIFICATION</span>
                </h2>
                <span className="font-mono-tech text-xs text-white/40">STEP 1 OF 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">
                    Email Address (For Tracking & Invoice)
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs font-mono-tech text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">
                    Mobile Phone (For Courier Delivery)
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs font-mono-tech text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>

            {/* 02: Shipping Destination */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h2 className="font-display text-lg uppercase tracking-wider">
                  02 // DISPATCH DESTINATION
                </h2>
                <span className="font-mono-tech text-xs text-white/40">STEP 2 OF 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs font-mono-tech text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs font-mono-tech text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs font-mono-tech text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">City</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs font-mono-tech text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">State / Province</label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs font-mono-tech text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs font-mono-tech text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs font-mono-tech text-white focus:outline-none focus:border-white cursor-pointer"
                >
                  <option value="United States">United States</option>
                  <option value="Japan">Japan</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            {/* 03: Shipping Method */}
            <div className="space-y-4">
              <h2 className="font-display text-sm uppercase tracking-wider text-white/70">
                COURIER SPEED
              </h2>
              <div className="space-y-2">
                <label className="border border-white/20 p-4 bg-[#141414] flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="dhl-express"
                      checked={formData.shippingMethod === 'dhl-express'}
                      onChange={handleInputChange}
                      className="accent-white"
                    />
                    <div>
                      <p className="font-mono-tech text-xs uppercase font-bold text-white">DHL Express Priority (2-3 Business Days)</p>
                      <p className="text-[10px] text-white/50">Air courier with signature confirmation & live flight tracking</p>
                    </div>
                  </div>
                  <span className="font-mono-tech text-xs font-bold text-white">
                    {shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}
                  </span>
                </label>
              </div>
            </div>

            {/* 04: Payment Method (Test Mode) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h2 className="font-display text-lg uppercase tracking-wider">
                  03 // PAYMENT AUTHORIZATION
                </h2>
                <span className="font-mono-tech text-xs text-white/40">TEST PAYMENT MODE</span>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                  className={`p-3 border font-mono-tech text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                    formData.paymentMethod === 'card' ? 'bg-white text-black border-white font-bold' : 'border-white/15 text-white/60 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" /> Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'apple-pay' }))}
                  className={`p-3 border font-mono-tech text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                    formData.paymentMethod === 'apple-pay' ? 'bg-white text-black border-white font-bold' : 'border-white/15 text-white/60 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                  className={`p-3 border font-mono-tech text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                    formData.paymentMethod === 'cod' ? 'bg-white text-black border-white font-bold' : 'border-white/15 text-white/60 hover:text-white'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" /> Atelier COD
                </button>
              </div>

              {/* Card Inputs */}
              {formData.paymentMethod === 'card' && (
                <div className="p-5 bg-[#141414] border border-white/15 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono-tech text-[10px] uppercase text-white/50 tracking-wider">
                      Simulated Test Card
                    </span>
                    <button
                      type="button"
                      onClick={fillTestCard}
                      className="text-[10px] font-mono-tech text-white underline hover:text-white/70 cursor-pointer"
                    >
                      Fill Demo Credentials
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={cardDetails.number}
                      onChange={handleCardNumberChange}
                      placeholder="4242 4242 4242 4242"
                      className="w-full bg-[#1C1C1C] border border-white/15 px-3 py-2 text-xs font-mono-tech text-white focus:outline-none focus:border-white tracking-widest"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">
                        Expires (MM/YY)
                      </label>
                      <input
                        type="text"
                        required
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                        placeholder="12/28"
                        className="w-full bg-[#1C1C1C] border border-white/15 px-3 py-2 text-xs font-mono-tech text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">
                        Security Code (CVC)
                      </label>
                      <input
                        type="text"
                        required
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                        placeholder="882"
                        className="w-full bg-[#1C1C1C] border border-white/15 px-3 py-2 text-xs font-mono-tech text-white focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Apple Pay Simulator View */}
              {formData.paymentMethod === 'apple-pay' && (
                <div className="p-6 bg-[#141414] border border-white/15 text-center space-y-3">
                  <Smartphone className="w-8 h-8 text-white mx-auto" />
                  <p className="font-display text-sm uppercase tracking-wider">Simulated Apple Pay & Touch ID</p>
                  <p className="font-editorial text-xs text-white/50 max-w-sm mx-auto">
                    Biometric authorization simulation ready. Pressing "Authorize & Place Order" will authenticate with demo token.
                  </p>
                </div>
              )}

              {/* COD View */}
              {formData.paymentMethod === 'cod' && (
                <div className="p-6 bg-[#141414] border border-white/15 text-center space-y-3">
                  <Truck className="w-8 h-8 text-white mx-auto" />
                  <p className="font-display text-sm uppercase tracking-wider">Atelier White Glove Delivery</p>
                  <p className="font-editorial text-xs text-white/50 max-w-sm mx-auto">
                    Pay securely in cash or via mobile terminal to our certified atelier courier upon signature inspection.
                  </p>
                </div>
              )}
            </div>

            {/* Final Action Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-white text-black font-mono-tech text-xs uppercase font-extrabold tracking-widest hover:bg-[#E5E5E0] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xl disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Encrypting & Authorizing Transaction...
                  </span>
                ) : (
                  <span>Authorize & Place Order • {formatPrice(cartTotal)}</span>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-[#121212] border border-white/15 p-6 sm:p-8 space-y-6 sticky top-28">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <h3 className="font-display text-base uppercase tracking-wider">
                  Bag Summary ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h3>
                <Link to="/cart" className="text-white/40 hover:text-white font-mono-tech text-[10px] uppercase">
                  Edit Bag
                </Link>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1 divide-y divide-white/5">
                {cart.map((item, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 flex gap-3.5 items-center">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-18 object-cover border border-white/10 shrink-0" />
                    <div className="flex-1 font-mono-tech text-xs">
                      <h4 className="font-display text-xs uppercase tracking-wide text-white line-clamp-1">{item.product.name}</h4>
                      <p className="text-[10px] text-white/50 mt-0.5">{item.selectedColor} • SIZE {item.selectedSize} × {item.quantity}</p>
                      <p className="text-white font-semibold mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 pt-4 border-t border-white/10 font-mono-tech text-xs">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-white font-semibold">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/70">
                  <span>Courier Dispatch</span>
                  <span>{shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Duties & Customs</span>
                  <span>GUARANTEED (0.00)</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/10">
                  <span>Final Total</span>
                  <span className="font-display text-lg">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 text-[10px] font-mono-tech text-white/60 space-y-1">
                <p className="text-white font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  VØID Atelier Direct Guarantee
                </p>
                <p>Authenticity NFC certificate and 14-day hassle-free return window included in every parcel.</p>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
