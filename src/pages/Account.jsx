import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  Package, 
  MapPin, 
  Heart, 
  LogOut, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight,
  FileText,
  UserCheck
} from 'lucide-react';

export const Account = () => {
  const { user, orders, logout, formatPrice, addToast } = useShop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'addresses'
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState(null);

  if (!user) {
    return (
      <div className="min-h-[70vh] bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-display text-2xl uppercase tracking-wider mb-2">Sign-In Required</h2>
        <p className="font-editorial text-xs text-white/50 mb-6">Please log in to view your orders and archival allocations.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-white text-black font-mono-tech text-xs uppercase font-bold"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Account Hero Banner */}
      <div className="p-6 sm:p-12 border-b border-white/10 bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-white/40">
                PATRON DOSSIER // VERIFIED STATUS
              </span>
              {user.role === 'admin' && (
                <span className="bg-white text-black font-mono-tech text-[9px] uppercase px-1.5 py-0.5 font-bold">
                  DIRECTOR ACCESS
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl sm:text-5xl uppercase tracking-wider font-extrabold">
              {user.name}
            </h1>
            <p className="font-mono-tech text-xs text-white/60">
              {user.email} • ARCHIVE TIER: <span className="text-white font-bold">BLACK VIP LEVEL II</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="px-4 py-2.5 bg-[#222222] border border-white/20 text-white font-mono-tech text-xs uppercase hover:bg-white hover:text-black transition-colors"
              >
                Atelier Admin Console
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 border border-white/20 text-white/70 hover:text-white hover:border-white font-mono-tech text-xs uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/10 bg-[#0A0A0A] sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex gap-2 py-3 font-mono-tech text-xs uppercase">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 border transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders' ? 'bg-white text-black border-white font-bold' : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Order History & Dispatch ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 border transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile' ? 'bg-white text-black border-white font-bold' : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Profile & Addresses</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-16">
        
        {/* TAB 1: ORDER HISTORY */}
        {activeTab === 'orders' && (
          <div className="space-y-8">
            {orders.length === 0 ? (
              <div className="py-20 text-center border border-white/10 bg-[#0E0E0E] p-8">
                <Package className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="font-display text-xl uppercase tracking-wider mb-2">No Order History Found</p>
                <p className="font-editorial text-xs text-white/50 mb-6">You have not finalized any archival allocations yet.</p>
                <Link to="/shop" className="px-6 py-3 bg-white text-black font-mono-tech text-xs uppercase font-bold">
                  Browse Catalog
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="border border-white/15 bg-[#121212] p-6 sm:p-8 space-y-6">
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-white/10 gap-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-base uppercase tracking-wider font-bold text-white">
                          ORDER #{order.id}
                        </span>
                        <span className={`px-2.5 py-0.5 font-mono-tech text-[10px] uppercase font-bold tracking-wider ${
                          order.status === 'Delivered'
                            ? 'bg-green-950/80 text-green-300 border border-green-700/50'
                            : order.status === 'In Transit'
                            ? 'bg-blue-950/80 text-blue-300 border border-blue-700/50'
                            : 'bg-white/10 text-white border border-white/20'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <span className="font-mono-tech text-xs text-white/50 block mt-1">
                        Allocated: {order.date} • Carrier: {order.carrier || 'DHL Express Priority'}
                      </span>
                    </div>

                    <div className="text-right font-mono-tech">
                      <span className="text-xs text-white/50 block">Total Investment</span>
                      <span className="text-base font-bold text-white">{formatPrice(order.total)}</span>
                    </div>
                  </div>

                  {/* Tracking Timeline Simulation */}
                  <div className="p-4 bg-[#181818] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono-tech">
                      <span className="text-white/60 flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-white" />
                        DHL Tracking: <span className="text-white font-semibold">{order.trackingNumber}</span>
                      </span>
                      <button
                        onClick={() => {
                          setSelectedOrderForTracking(selectedOrderForTracking === order.id ? null : order.id);
                        }}
                        className="text-white/70 hover:text-white underline cursor-pointer text-[11px]"
                      >
                        {selectedOrderForTracking === order.id ? 'Hide Timeline' : 'View Dispatch Milestones'}
                      </button>
                    </div>

                    {/* Timeline steps */}
                    {(selectedOrderForTracking === order.id || order.status === 'In Transit') && (
                      <div className="pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-tech text-[11px]">
                        <div className="space-y-1">
                          <span className="text-white font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-400" /> Confirmed
                          </span>
                          <p className="text-white/40 text-[10px]">Atelier Hub Allocated</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-white font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-400" /> Dispatched
                          </span>
                          <p className="text-white/40 text-[10px]">Tokyo Narita Air Facility</p>
                        </div>
                        <div className="space-y-1">
                          <span className={`${order.status === 'Delivered' || order.status === 'In Transit' ? 'text-white font-bold' : 'text-white/40'} flex items-center gap-1`}>
                            <CheckCircle2 className={`w-3 h-3 ${order.status === 'Delivered' || order.status === 'In Transit' ? 'text-green-400' : 'text-white/20'}`} /> Customs Cleared
                          </span>
                          <p className="text-white/40 text-[10px]">Duties Prepaid Handled</p>
                        </div>
                        <div className="space-y-1">
                          <span className={`${order.status === 'Delivered' ? 'text-white font-bold' : 'text-white/40'} flex items-center gap-1`}>
                            <CheckCircle2 className={`w-3 h-3 ${order.status === 'Delivered' ? 'text-green-400' : 'text-white/20'}`} /> Delivered
                          </span>
                          <p className="text-white/40 text-[10px]">Signed by Recipient</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div className="divide-y divide-white/10 border-t border-b border-white/10 py-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-center justify-between font-mono-tech text-xs">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80'}
                            alt={item.product?.name}
                            className="w-14 h-18 object-cover border border-white/10"
                          />
                          <div>
                            <Link to={`/product/${item.product?.id}`} className="font-display text-xs uppercase tracking-wider text-white hover:underline">
                              {item.product?.name}
                            </Link>
                            <p className="text-[10px] text-white/50 mt-1 uppercase">
                              COLOR: {item.selectedColor} • SIZE: {item.selectedSize} • QTY: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-white">
                          {formatPrice((item.priceAtPurchase || item.product?.price) * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Destination & Receipt Simulation */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono-tech text-white/60 gap-4">
                    <div>
                      <span className="text-[10px] uppercase text-white/40 block">Shipping To:</span>
                      <span>{order.shippingAddress?.fullName}, {order.shippingAddress?.street}, {order.shippingAddress?.city}</span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => addToast(`Invoice for ${order.id} downloaded`, 'info')}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white hover:text-black transition-colors uppercase flex items-center gap-1.5 cursor-pointer text-[11px]"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Download Invoice</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: PROFILE & ADDRESSES */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-[#121212] border border-white/15 p-6 sm:p-10 space-y-6">
            <h3 className="font-display text-lg uppercase tracking-wider pb-3 border-b border-white/10">
              Patron Profile Information
            </h3>

            <div className="space-y-4 font-mono-tech text-xs">
              <div>
                <label className="block text-[10px] uppercase text-white/40 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  disabled
                  value={user.name}
                  className="w-full bg-[#1A1A1A] border border-white/15 p-2.5 text-white opacity-80"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-white/40 mb-1">Account Email</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full bg-[#1A1A1A] border border-white/15 p-2.5 text-white opacity-80"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-white/40 mb-1">Primary Courier Destination</label>
                <div className="p-4 bg-[#181818] border border-white/10 space-y-1 text-white/80">
                  <p className="font-bold text-white">{user.name}</p>
                  <p>742 Mercer Street, Apt 4B</p>
                  <p>New York, NY 10012, United States</p>
                  <p className="text-white/50 text-[11px]">+1 (212) 555-0199</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-[10px] uppercase text-white/40 block">VIP Drop Privileges</span>
                <div className="flex items-center gap-2 text-white">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span>Enrolled in 60-Minute Early Drop Access Whitelist</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
