# VØID ATELIER // THE VOID CHRONICLES
> International Contemporary Luxury Streetwear & High-Fashion Archival E-Commerce Platform

Inspired by modern international urban fashion houses (Fear of God, Off-White, Balenciaga, Represent, Rick Owens, and Kith). Engineered with brutalist typography, monochrome color palettes, asymmetric editorial layouts, and micro-batch release flows.

---

## ✨ Features & Architecture

### 1. Visual & Editorial Identity
- **Monochrome Brutalist Aesthetic**: Deep obsidian black (`#0A0A0A`), washed charcoal, and bone off-white (`#F4F4F0`).
- **Typography**: Google Fonts pairing of **Syne** (900 extra bold for oversized brutalist titles), **Space Grotesk** (editorial headlines), **Inter** (precision interface copy), and **JetBrains Mono** (technical fabric metrics, SKUs, and coordinates).
- **Asymmetric Editorial Layouts**: Lookbook campaign splits, continuous announcement marquee banners, and image zoom hover effects.

### 2. Complete Storefront & Shopping Journey
- **Homepage**: Drop headline hero, live announcement marquee, category showcase, runway campaign manifesto, limited drop countdown clock, and VIP drop access whitelist.
- **Shop Catalog (`/shop`)**: Multi-faceted filtering by Category, Collection, Size, Colorway, Price slider, and In-Stock toggle. Sorting by featured, price (asc/desc), newest, and rating. 2-column editorial vs. 4-column catalog view toggle.
- **Collections & Lookbook (`/collections`)**: Deep dives into seasonal capsules (*"Season 08: Nocturnal Void"*, *"Monolith Core"*, *"Industrial Archive"*) with 35mm campaign visuals.
- **New Arrivals (`/new-arrivals`)**: Urgency drop badges, real-time inventory indicators, and SMS drop alerts.
- **Product Details (`/product/:id`)**: Multi-angle gallery with fullscreen lightbox inspection, color swatches, size selection with real-time stock counters, **Interactive Size Guide Modal** (with live CM & INCHES toggle across tops, bottoms, and footwear), expandable technical accordions, and customer reviews with live review submission.
- **Shopping Bag (`/cart`)**: Detailed items breakdown, quantity modifiers, free DHL shipping progress bar ($250 threshold), test promo code engine (`VOID20` for 20% off, `ARCHIVE10`, `FREESHIP`), and cost calculations.
- **Wishlist (`/wishlist`)**: Persistent wishlist storage with "Move All to Bag" bulk actions.
- **Checkout & Test Payment (`/checkout`)**: Multi-step checkout with contact info, shipping address, courier options, and **Test Payment Modes** (Credit Card simulator with 1-click test fill, Apple Pay simulator, and Atelier COD). Order confirmation screen with generated order numbers, itemized receipts, and DHL tracking numbers.
- **Customer Portal & Live Tracking (`/account`)**: Patron profile with order history and interactive 4-stage DHL dispatch milestone timeline (Confirmed → Dispatched from Tokyo → Customs Cleared → Delivered).
- **Client Authentication (`/login`)**: Customer and Admin login with **1-Click Demo Logins** (*Demo Patron* & *Director Admin*).
- **Admin Control Center (`/admin`)**: Executive KPIs (Gross Revenue, Active Dispatches, Catalog Units, AOV), inventory stock adjustment (`+`/`-`), delete product, "Add Archival Piece" modal, and order status manager (`Processing` → `In Transit` → `Delivered`).
- **Atelier Manifesto & Concierge (`/about`, `/contact`)**: Brand craftsmanship narrative, Japanese loopwheel fabric disclosures (Wakayama), physical flagship stores (Tokyo, NY, Paris, London), client concierge transmission form, and interactive FAQs.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **State Management**: React Context API with LocalStorage Persistence

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/mohammedhisham962-sys/voidchronicle.git
cd voidchronicle

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔑 Demo Scenarios

- **Privilege Promo Code**: Enter `VOID20` in the Mini-Cart, Cart, or Checkout for 20% off.
- **Instant Patron Login**: Click Account $\rightarrow$ click **"Demo Patron"** to log in as Julian Vance.
- **Instant Admin Login**: Click Account $\rightarrow$ click **"Director Admin"** or go directly to `/admin`.
- **Test Checkout**: In Checkout, click **"Fill Demo Credentials"** $\rightarrow$ **"Authorize & Place Order"**.

---

© 2026 VØID ATELIER CORP. All rights reserved.
