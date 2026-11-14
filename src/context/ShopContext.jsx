import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, PROMO_CODES } from '../data/products';

const ShopContext = createContext();

const INITIAL_ORDERS = [
  {
    id: "VD-89241",
    date: "2026-03-28",
    status: "Delivered",
    trackingNumber: "DHL-EX-9928172901",
    carrier: "DHL Express Priority",
    shippingAddress: {
      fullName: "Julian Vance",
      street: "742 Mercer Street, Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10012",
      country: "United States",
      phone: "+1 (212) 555-0199"
    },
    items: [
      {
        product: PRODUCTS[0], // Monolith Hoodie
        selectedColor: "Nocturnal Black",
        selectedSize: "L",
        quantity: 1,
        priceAtPurchase: 260
      },
      {
        product: PRODUCTS[3], // Box Fit Tee
        selectedColor: "Off-White",
        selectedSize: "L",
        quantity: 2,
        priceAtPurchase: 130
      }
    ],
    subtotal: 520,
    discount: 52,
    shippingFee: 0,
    tax: 37.44,
    total: 505.44,
    paymentMethod: "Apple Pay (Mastercard •••• 8821)"
  },
  {
    id: "VD-77319",
    date: "2026-04-10",
    status: "In Transit",
    trackingNumber: "DHL-EX-4419208472",
    carrier: "DHL Express Priority",
    shippingAddress: {
      fullName: "Julian Vance",
      street: "742 Mercer Street, Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10012",
      country: "United States",
      phone: "+1 (212) 555-0199"
    },
    items: [
      {
        product: PRODUCTS[1], // Tactical Cargo
        selectedColor: "Matte Black",
        selectedSize: "32",
        quantity: 1,
        priceAtPurchase: 320
      }
    ],
    subtotal: 320,
    discount: 0,
    shippingFee: 0,
    tax: 25.60,
    total: 345.60,
    paymentMethod: "Visa •••• 4242"
  }
];

export const ShopProvider = ({ children }) => {
  // Products state (persisted)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('void_atelier_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('void_atelier_cart');
    return saved ? JSON.parse(saved) : [
      {
        product: PRODUCTS[0],
        selectedColor: "Nocturnal Black",
        selectedSize: "L",
        quantity: 1
      }
    ];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('void_atelier_wishlist');
    return saved ? JSON.parse(saved) : ["vd-01", "vd-03"];
  });

  // User Authentication state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('void_atelier_user');
    return saved ? JSON.parse(saved) : {
      id: "usr-01",
      name: "Julian Vance",
      email: "julian@voidatelier.com",
      role: "customer",
      addresses: [
        {
          id: "addr-1",
          fullName: "Julian Vance",
          street: "742 Mercer Street, Apt 4B",
          city: "New York",
          state: "NY",
          postalCode: "10012",
          country: "United States",
          phone: "+1 (212) 555-0199",
          isDefault: true
        }
      ]
    };
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('void_atelier_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Currency
  const [currency, setCurrency] = useState("USD");

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState(null);

  // UI Drawer & Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('void_atelier_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('void_atelier_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('void_atelier_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('void_atelier_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('void_atelier_orders', JSON.stringify(orders));
  }, [orders]);

  // Toast notifier
  const addToast = (message, type = "success") => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Currency Formatter
  const formatPrice = (amount) => {
    const num = Number(amount) || 0;
    switch (currency) {
      case "EUR":
        return `€${(num * 0.92).toFixed(0)}`;
      case "GBP":
        return `£${(num * 0.79).toFixed(0)}`;
      case "JPY":
        return `¥${(num * 155).toFixed(0)}`;
      default:
        return `$${num.toFixed(0)}`;
    }
  };

  // Cart Management
  const addToCart = (product, selectedColor, selectedSize, quantity = 1) => {
    setCart(prev => {
      const colorName = typeof selectedColor === 'object' ? selectedColor.name : selectedColor;
      const sizeName = typeof selectedSize === 'object' ? selectedSize.name : selectedSize;

      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedColor === colorName && 
        item.selectedSize === sizeName
      );

      if (existingIndex > -1) {
        const nextCart = [...prev];
        nextCart[existingIndex] = {
          ...nextCart[existingIndex],
          quantity: nextCart[existingIndex].quantity + quantity
        };
        return nextCart;
      } else {
        return [
          ...prev,
          {
            product,
            selectedColor: colorName,
            selectedSize: sizeName,
            quantity
          }
        ];
      }
    });

    addToast(`Added "${product.name}" to your bag`, "success");
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, colorName, sizeName) => {
    setCart(prev => prev.filter(item => 
      !(item.product.id === productId && item.selectedColor === colorName && item.selectedSize === sizeName)
    ));
    addToast("Item removed from bag", "info");
  };

  const updateCartQuantity = (productId, colorName, sizeName, delta) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedColor === colorName && item.selectedSize === sizeName) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Management
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast("Removed piece from wishlist", "info");
        return prev.filter(id => id !== productId);
      } else {
        addToast("Saved piece to your atelier wishlist", "success");
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Promo Code
  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (PROMO_CODES[clean]) {
      setAppliedPromo({ code: clean, ...PROMO_CODES[clean] });
      addToast(`Promo code "${clean}" applied successfully!`, "success");
      return { success: true, message: PROMO_CODES[clean].description };
    } else {
      addToast("Invalid or expired promotional archive code", "error");
      return { success: false, message: "Invalid promotional code" };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    addToast("Promo code removed", "info");
  };

  // Order Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === "percent") {
      discountAmount = cartSubtotal * appliedPromo.discount;
    } else if (appliedPromo.type === "fixed") {
      discountAmount = Math.min(cartSubtotal, appliedPromo.discount);
    }
  }

  // Free shipping over $250 or if promo is FREESHIP
  const isFreeShipping = cartSubtotal >= 250 || (appliedPromo && appliedPromo.type === "shipping");
  const shippingFee = cartSubtotal === 0 ? 0 : (isFreeShipping ? 0 : 25);
  const tax = cartSubtotal === 0 ? 0 : (cartSubtotal - discountAmount) * 0.08;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee + tax);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Orders Management
  const createOrder = (orderData) => {
    const newOrderId = `VD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTracking = `DHL-EX-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    
    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      status: "Processing",
      trackingNumber: newTracking,
      carrier: "DHL Express Priority",
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingFee,
      tax,
      total: cartTotal,
      appliedPromo: appliedPromo ? appliedPromo.code : null,
      ...orderData
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedPromo(null);
    addToast(`Order ${newOrderId} placed successfully!`, "success");
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    addToast(`Order #${orderId} status updated to ${newStatus}`, "info");
  };

  // User Auth & Profiles
  const login = (email, password) => {
    if (email.toLowerCase().includes("admin")) {
      const adminUser = {
        id: "usr-admin",
        name: "Atelier Director",
        email: "director@voidatelier.com",
        role: "admin"
      };
      setUser(adminUser);
      addToast("Signed in as Atelier Administrator", "success");
      return true;
    } else {
      const customerUser = {
        id: "usr-01",
        name: email.split('@')[0].toUpperCase(),
        email: email,
        role: "customer"
      };
      setUser(customerUser);
      addToast(`Welcome back, ${customerUser.name}`, "success");
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    addToast("Logged out of session", "info");
  };

  const register = (name, email, password) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: "customer"
    };
    setUser(newUser);
    addToast(`Welcome to the VØID Atelier archive, ${name}`, "success");
    return true;
  };

  const loginDemoCustomer = () => {
    const demo = {
      id: "usr-01",
      name: "Julian Vance",
      email: "julian@voidatelier.com",
      role: "customer",
      addresses: [
        {
          id: "addr-1",
          fullName: "Julian Vance",
          street: "742 Mercer Street, Apt 4B",
          city: "New York",
          state: "NY",
          postalCode: "10012",
          country: "United States",
          phone: "+1 (212) 555-0199",
          isDefault: true
        }
      ]
    };
    setUser(demo);
    addToast("Logged in with Demo Customer Account", "success");
  };

  const loginDemoAdmin = () => {
    const admin = {
      id: "usr-admin",
      name: "Atelier Director",
      email: "director@voidatelier.com",
      role: "admin"
    };
    setUser(admin);
    addToast("Logged in with Atelier Admin Account", "success");
  };

  // Admin Catalog Management
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: `vd-${Date.now().toString().slice(-4)}`,
      sku: `VD-ARCH-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 5.0,
      reviewsCount: 1,
      reviews: []
    };
    setProducts(prev => [productWithId, ...prev]);
    addToast(`Piece "${newProduct.name}" added to archive catalog`, "success");
    return productWithId;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    addToast("Product updated in catalog", "success");
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast("Piece removed from catalog", "info");
  };

  const resetProductsToDefault = () => {
    setProducts(PRODUCTS);
    localStorage.removeItem('void_atelier_products');
    addToast("Catalog reset to atelier defaults", "info");
  };

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      wishlist,
      user,
      orders,
      currency,
      setCurrency,
      formatPrice,
      isCartOpen,
      setIsCartOpen,
      isSearchOpen,
      setIsSearchOpen,
      searchQuery,
      setSearchQuery,
      quickViewProduct,
      setQuickViewProduct,
      sizeGuideOpen,
      setSizeGuideOpen,
      toasts,
      addToast,
      removeToast,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartCount,
      cartSubtotal,
      cartTotal,
      discountAmount,
      shippingFee,
      isFreeShipping,
      tax,
      appliedPromo,
      applyPromoCode,
      removePromoCode,
      toggleWishlist,
      isWishlisted,
      createOrder,
      updateOrderStatus,
      login,
      logout,
      register,
      loginDemoCustomer,
      loginDemoAdmin,
      addProduct,
      updateProduct,
      deleteProduct,
      resetProductsToDefault
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
