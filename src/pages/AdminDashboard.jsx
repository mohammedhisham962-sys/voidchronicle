import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Check, 
  AlertTriangle, 
  RotateCcw,
  Search,
  Truck,
  Eye
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    products, 
    orders, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetProductsToDefault, 
    updateOrderStatus,
    formatPrice, 
    addToast 
  } = useShop();

  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'orders' | 'analytics'
  const [searchCatalogQuery, setSearchCatalogQuery] = useState('');
  
  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    tagline: '',
    category: 'Outerwear',
    collection: 'Season 08: Nocturnal Void',
    price: 320,
    stockQuantity: 15,
    description: '',
    fabric: '100% Japanese Heavyweight Textile',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
    colorName: 'Nocturnal Black',
    colorHex: '#0B0B0B'
  });

  // Calculate High-Level Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'Delivered').length;
  const averageOrderValue = orders.length > 0 ? (totalRevenue / orders.length) : 0;
  const lowStockItems = products.filter(p => p.stockQuantity <= 5);

  const filteredCatalog = products.filter(p => 
    p.name.toLowerCase().includes(searchCatalogQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchCatalogQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchCatalogQuery.toLowerCase())
  );

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.price) {
      addToast('Please fill out all required fields', 'error');
      return;
    }

    const created = {
      name: newProductForm.name.toUpperCase(),
      tagline: newProductForm.tagline,
      category: newProductForm.category,
      collection: newProductForm.collection,
      price: Number(newProductForm.price),
      originalPrice: null,
      stockQuantity: Number(newProductForm.stockQuantity),
      isNew: true,
      isFeatured: false,
      images: [newProductForm.imageUrl],
      colors: [{ name: newProductForm.colorName, hex: newProductForm.colorHex }],
      sizes: [
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true }
      ],
      description: newProductForm.description || 'Constructed with custom heavyweight Japanese fabric for monumental silhouette structure.',
      fabric: newProductForm.fabric,
      fit: 'Oversized boxy architectural fit.',
      details: ['Handcrafted in micro-batches', 'Custom hardware integration']
    };

    addProduct(created);
    setIsAddModalOpen(false);
    setNewProductForm({
      name: '',
      tagline: '',
      category: 'Outerwear',
      collection: 'Season 08: Nocturnal Void',
      price: 320,
      stockQuantity: 15,
      description: '',
      fabric: '100% Japanese Heavyweight Textile',
      imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
      colorName: 'Nocturnal Black',
      colorHex: '#0B0B0B'
    });
  };

  const handleStockDelta = (productId, delta) => {
    const target = products.find(p => p.id === productId);
    if (!target) return;
    const nextQty = Math.max(0, target.stockQuantity + delta);
    updateProduct(productId, { stockQuantity: nextQty });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="p-6 sm:p-12 border-b border-white/10 bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-white/50 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>DIRECTOR ATELIER CONSOLE // ADMIN PRIVILEGES</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl uppercase tracking-wider font-extrabold">
              Control Center
            </h1>
            <p className="font-editorial text-xs sm:text-sm text-white/60 max-w-xl mt-1">
              Real-time monitoring of micro-batch inventory, global order dispatches, client allocations and catalog pricing.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3 bg-white text-black font-mono-tech text-xs uppercase font-bold tracking-widest hover:bg-[#E5E5E0] transition-colors flex items-center gap-2 cursor-pointer shadow-xl"
            >
              <Plus className="w-4 h-4" /> Add Archival Piece
            </button>
            <button
              onClick={resetProductsToDefault}
              className="px-4 py-3 bg-transparent border border-white/20 text-white/70 hover:text-white hover:border-white font-mono-tech text-xs uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset products and stock to factory defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="border-b border-white/10 bg-[#080808] px-4 sm:px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-[#121212] border border-white/10">
            <span className="font-mono-tech text-[10px] uppercase text-white/40 tracking-wider block mb-1">
              TOTAL RECORDED REVENUE
            </span>
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              {formatPrice(totalRevenue)}
            </p>
            <span className="font-mono-tech text-[10px] text-green-400 mt-1 block">
              ↑ 18.4% vs last seasonal capsule
            </span>
          </div>

          <div className="p-5 bg-[#121212] border border-white/10">
            <span className="font-mono-tech text-[10px] uppercase text-white/40 tracking-wider block mb-1">
              ACTIVE DISPATCH ORDERS
            </span>
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              {activeOrdersCount}
            </p>
            <span className="font-mono-tech text-[10px] text-white/50 mt-1 block">
              {orders.length} total historical orders
            </span>
          </div>

          <div className="p-5 bg-[#121212] border border-white/10">
            <span className="font-mono-tech text-[10px] uppercase text-white/40 tracking-wider block mb-1">
              CATALOG INVENTORY UNITS
            </span>
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              {products.reduce((sum, p) => sum + p.stockQuantity, 0)}
            </p>
            <span className="font-mono-tech text-[10px] text-white/50 mt-1 block">
              Across {products.length} registered styles
            </span>
          </div>

          <div className="p-5 bg-[#121212] border border-white/10">
            <span className="font-mono-tech text-[10px] uppercase text-white/40 tracking-wider block mb-1">
              AVG ORDER VALUE (AOV)
            </span>
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              {formatPrice(averageOrderValue)}
            </p>
            <span className="font-mono-tech text-[10px] text-white/50 mt-1 block">
              High-fashion luxury benchmark
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/10 bg-[#0A0A0A] sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex gap-2 py-3 font-mono-tech text-xs uppercase">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 border transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'inventory' ? 'bg-white text-black border-white font-bold' : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Product Catalog & Stock ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 border transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders' ? 'bg-white text-black border-white font-bold' : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Customer Orders & Status ({orders.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Product Inventory Manager */}
      {activeTab === 'inventory' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
          {/* Low Stock Warning Alert if any */}
          {lowStockItems.length > 0 && (
            <div className="p-4 bg-red-950/40 border border-red-500/30 flex items-center justify-between text-xs font-mono-tech">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-200">
                  {lowStockItems.length} styles currently below allocation threshold (≤ 5 units):{' '}
                  <span className="font-bold text-white">
                    {lowStockItems.map(p => p.name).join(', ')}
                  </span>
                </span>
              </div>
            </div>
          )}

          {/* Search Table */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchCatalogQuery}
                onChange={(e) => setSearchCatalogQuery(e.target.value)}
                placeholder="Filter by title, SKU or category..."
                className="w-full bg-[#141414] border border-white/15 pl-9 pr-4 py-2 text-xs font-mono-tech text-white uppercase placeholder:text-white/30 focus:outline-none focus:border-white"
              />
            </div>
            <span className="font-mono-tech text-xs text-white/50">
              Showing {filteredCatalog.length} Pieces
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-white/15 bg-[#111111]">
            <table className="w-full text-left font-mono-tech text-xs">
              <thead className="bg-[#181818] border-b border-white/15 text-white/50 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Piece / SKU</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Collection</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-center">Stock Level</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredCatalog.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors">
                    {/* Item */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-12 object-cover border border-white/10 shrink-0"
                        />
                        <div>
                          <p className="font-display text-xs uppercase font-bold text-white tracking-wide">
                            {product.name}
                          </p>
                          <span className="text-[10px] text-white/40 block">
                            {product.sku}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4 text-white/70">{product.category}</td>

                    {/* Collection */}
                    <td className="p-4 text-white/70">{product.collection}</td>

                    {/* Price */}
                    <td className="p-4 font-bold text-white">
                      {formatPrice(product.price)}
                    </td>

                    {/* Stock level with inline controls */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleStockDelta(product.id, -1)}
                          className="w-6 h-6 border border-white/20 hover:border-white flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                        >
                          -
                        </button>
                        <span className={`w-8 text-center font-bold ${
                          product.stockQuantity <= 5 ? 'text-red-400' : 'text-white'
                        }`}>
                          {product.stockQuantity}
                        </span>
                        <button
                          onClick={() => handleStockDelta(product.id, 1)}
                          className="w-6 h-6 border border-white/20 hover:border-white flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-1.5 text-white/30 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders Management */}
      {activeTab === 'orders' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
          <div className="overflow-x-auto border border-white/15 bg-[#111111]">
            <table className="w-full text-left font-mono-tech text-xs">
              <thead className="bg-[#181818] border-b border-white/15 text-white/50 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Order ID & Date</th>
                  <th className="p-4">Customer Name & Address</th>
                  <th className="p-4">Items Allocated</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Status & Dispatch Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <span className="font-display font-bold text-white block">#{order.id}</span>
                      <span className="text-[10px] text-white/40">{order.date}</span>
                      <span className="text-[10px] text-white/40 block">{order.trackingNumber}</span>
                    </td>

                    <td className="p-4">
                      <p className="font-semibold text-white">{order.shippingAddress?.fullName || 'Julian Vance'}</p>
                      <p className="text-[11px] text-white/50 line-clamp-1">{order.shippingAddress?.street}, {order.shippingAddress?.city}</p>
                      <p className="text-[10px] text-white/40">{order.shippingAddress?.country}</p>
                    </td>

                    <td className="p-4">
                      <div className="space-y-1">
                        {order.items?.map((item, i) => (
                          <div key={i} className="text-[11px] text-white/70">
                            • {item.product?.name} ({item.selectedColor}, {item.selectedSize}) × {item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="p-4 font-bold text-white text-sm">
                      {formatPrice(order.total)}
                    </td>

                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`px-3 py-1.5 border font-mono-tech text-xs uppercase cursor-pointer focus:outline-none ${
                          order.status === 'Delivered'
                            ? 'bg-green-950/80 text-green-300 border-green-700/50'
                            : order.status === 'In Transit'
                            ? 'bg-blue-950/80 text-blue-300 border-blue-700/50'
                            : 'bg-[#181818] text-white border-white/20'
                        }`}
                      >
                        <option value="Processing" className="bg-[#141414] text-white">Processing</option>
                        <option value="In Transit" className="bg-[#141414] text-white">In Transit (Dispatched)</option>
                        <option value="Delivered" className="bg-[#141414] text-white">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#111111] border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-white relative shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="font-mono-tech text-[10px] uppercase text-white/40 block">ATELIER CATALOG ADDITION</span>
                <h3 className="font-display text-xl uppercase tracking-wider font-bold">Add Archival Piece</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 font-mono-tech text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-white/50 mb-1">Piece Title *</label>
                  <input
                    type="text"
                    required
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="E.g. ACID STONE WASH HOODIE"
                    className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-white uppercase"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-white/50 mb-1">Tagline / Fabric Metric</label>
                  <input
                    type="text"
                    value={newProductForm.tagline}
                    onChange={(e) => setNewProductForm(prev => ({ ...prev, tagline: e.target.value }))}
                    placeholder="E.g. 500 GSM Japanese French Terry"
                    className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-white/50 mb-1">Category</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-white cursor-pointer"
                  >
                    <option value="Outerwear">Outerwear</option>
                    <option value="Hoodies & Knits">Hoodies & Knits</option>
                    <option value="Tees">Tees</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-white/50 mb-1">Collection</label>
                  <select
                    value={newProductForm.collection}
                    onChange={(e) => setNewProductForm(prev => ({ ...prev, collection: e.target.value }))}
                    className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-white cursor-pointer"
                  >
                    <option value="Season 08: Nocturnal Void">Season 08: Nocturnal Void</option>
                    <option value="Monolith Core">Monolith Core</option>
                    <option value="Industrial Archive">Industrial Archive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-white/50 mb-1">Price (USD) *</label>
                  <input
                    type="number"
                    required
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-white/50 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={newProductForm.stockQuantity}
                    onChange={(e) => setNewProductForm(prev => ({ ...prev, stockQuantity: e.target.value }))}
                    className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-white/50 mb-1">Image URL (High-Res Unsplash/Direct)</label>
                <input
                  type="url"
                  required
                  value={newProductForm.imageUrl}
                  onChange={(e) => setNewProductForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                  className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-white/50 mb-1">Fabric & Craftsmanship Specification</label>
                <input
                  type="text"
                  value={newProductForm.fabric}
                  onChange={(e) => setNewProductForm(prev => ({ ...prev, fabric: e.target.value }))}
                  className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-white/50 mb-1">Archival Description</label>
                <textarea
                  rows="3"
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Artisanal wash notes, architectural silhouette drape, hardware integration..."
                  className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-white font-editorial"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 border border-white/20 text-white/60 hover:text-white uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-white text-black font-bold uppercase hover:bg-[#E5E5E0] transition-colors cursor-pointer"
                >
                  Publish to Archive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
