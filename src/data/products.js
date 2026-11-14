export const PRODUCTS = [
  {
    id: "vd-01",
    sku: "VD-SS26-0101",
    name: "MONOLITH OVERSIZED HOODIE",
    tagline: "480 GSM Custom Loopback French Terry",
    price: 260,
    originalPrice: 320,
    category: "Hoodies & Knits",
    collection: "Season 08: Nocturnal Void",
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    stockQuantity: 18,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1200&q=85",
    ],
    colors: [
      { name: "Nocturnal Black", hex: "#0E0E0E" },
      { name: "Washed Charcoal", hex: "#2B2B2B" },
      { name: "Bone White", hex: "#EAE7DF" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: false },
      { name: "XXL", inStock: true }
    ],
    rating: 4.9,
    reviewsCount: 42,
    description: "Architectural proportions meet extreme fabric density. Cut from a custom-developed 480 GSM Japanese loopback cotton, the Monolith Hoodie features severely dropped shoulders, an oversized seamless double-layer hood, and cropped waistband for the definitive modern streetwear silhouette.",
    fabric: "100% Ultra-Heavyweight Combed Cotton (480 GSM)",
    fit: "Intentionally oversized and boxy. Drop shoulder construction with relaxed drape. Take your standard size for the intended runway volume, or size down for a conventional relaxed fit.",
    details: [
      "Seamless double-layered sculptural hood (no drawstrings)",
      "Concealed side-seam hand pockets (kangaroo pocket deleted)",
      "Ribbed cuffs and hem with reinforced spandex retention",
      "Garment dyed and pre-shrunk through artisanal wash cycle",
      "Atelier metal barcode plaque at nape"
    ],
    reviews: [
      { id: "r1", user: "Alexander V.", rating: 5, date: "2 days ago", comment: "The weight on this hoodie is unreal. Stood in 4°C weather with just a tee underneath. Silhouette holds its structure even after washing." },
      { id: "r2", user: "Kenzo T.", rating: 5, date: "1 week ago", comment: "Best boxy crop in streetwear right now. Balances high fashion with raw comfort." }
    ]
  },
  {
    id: "vd-02",
    sku: "VD-SS26-0204",
    name: "TACTICAL PARACHUTE CARGO PANT",
    tagline: "Japanese Memory Nylon with Articulated Knees",
    price: 320,
    originalPrice: null,
    category: "Bottoms",
    collection: "Industrial Archive",
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    stockQuantity: 12,
    images: [
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
    ],
    colors: [
      { name: "Matte Black", hex: "#111111" },
      { name: "Concrete Grey", hex: "#4A4D4F" },
      { name: "Olive Slate", hex: "#353833" }
    ],
    sizes: [
      { name: "28", inStock: true },
      { name: "30", inStock: true },
      { name: "32", inStock: true },
      { name: "34", inStock: true },
      { name: "36", inStock: false }
    ],
    rating: 4.8,
    reviewsCount: 38,
    description: "An aggressive reinterpretation of military flight flightsuits. Constructed with water-repellent Japanese memory nylon that naturally holds sculptural folds. Features 8 ergonomic 3D bellowed pockets, reinforced knee darts, and bungee-toggle cuff adjusters to transform from wide-leg to stacked taper.",
    fabric: "100% Japanese Technical High-Density Memory Nylon",
    fit: "Wide-leg relaxed fit with modular bungee adjusters at cuffs to taper over boots or sneakers.",
    details: [
      "Integrated webbed nylon waistband with matte zinc cobra buckle",
      "8 3D bellowed cargo pockets with water-resistant zips",
      "Articulated ergonomic knee darting for unrestricted movement",
      "Custom gunmetal hardware and cord stoppers",
      "DWR (Durable Water Repellent) surface coating"
    ],
    reviews: [
      { id: "r3", user: "Marcus D.", rating: 5, date: "3 days ago", comment: "The hardware and nylon feel like NASA grade gear. Stacking over my high tops is immaculate." }
    ]
  },
  {
    id: "vd-03",
    sku: "VD-FW25-0309",
    name: "ARCHIVE DISTRESSED BOMBER JACKET",
    tagline: "Heavyweight Waxed Canvas with Quilted Satin Lining",
    price: 580,
    originalPrice: 650,
    category: "Outerwear",
    collection: "Industrial Archive",
    isNew: false,
    isFeatured: true,
    isBestseller: true,
    stockQuantity: 7,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Pitch Black", hex: "#0B0B0B" },
      { name: "Faded Tar", hex: "#1F2022" }
    ],
    sizes: [
      { name: "S", inStock: false },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true }
    ],
    rating: 5.0,
    reviewsCount: 29,
    description: "Our statement outerwear piece. Heavyweight 14oz dry-waxed cotton canvas subjected to manual enzyme abrasion for an authentic archival patina. Insulated with 120 GSM Primaloft insulation and wrapped in diamond-quilted cupro satin for frictionless layering.",
    fabric: "Shell: 100% Heavyweight Waxed Cotton Canvas. Lining: 100% Cupro Satin.",
    fit: "Cropped torso with exaggerated dropped shoulders and balloon sleeves. High fashion volume.",
    details: [
      "Heavy-duty two-way brushed RiRi brass front zipper",
      "Utility cigarette pocket on left arm with red woven drop tag",
      "Custom rib-knit wool collar, hem and storm cuffs",
      "Interior concealed chest welt pocket with magnetic snap",
      "Hand-distressed abrasions — each piece uniquely finished"
    ],
    reviews: [
      { id: "r4", user: "Julian R.", rating: 5, date: "2 weeks ago", comment: "The crown jewel of my wardrobe. The distressing looks completely organic and the silhouette is unmatched." }
    ]
  },
  {
    id: "vd-04",
    sku: "VD-SS26-0412",
    name: "HEAVYWEIGHT BOX-FIT GRAPHIC TEE",
    tagline: "300 GSM Combed Cotton with High-Density Gel Print",
    price: 130,
    originalPrice: null,
    category: "Tees",
    collection: "Season 08: Nocturnal Void",
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    stockQuantity: 34,
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Off-White", hex: "#F3F2EC" },
      { name: "Void Black", hex: "#0A0A0A" },
      { name: "Graphite", hex: "#3A3A3A" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
      { name: "XXL", inStock: false }
    ],
    rating: 4.7,
    reviewsCount: 64,
    description: "The daily foundation. Weighing in at an impenetrable 300 GSM, this tee resists draping collapses and retains an architectural cubic frame. Features high-density tonal rubber gel printing of the Nocturnal Void manifesto on the lower back.",
    fabric: "100% Long-Staple Combed Cotton (300 GSM)",
    fit: "Wide shoulders, wide chest, slightly cropped hem. Thick 1.25 inch bound collar that never sags.",
    details: [
      "Reinforced heavy-gauge ribbed collar that holds shape forever",
      "Pre-shrunk silicone enzyme wash for buttery hand-feel",
      "Blind hem stitching on sleeves and hem",
      "Tonal 3D high-density rubber print details"
    ],
    reviews: [
      { id: "r5", user: "Dave K.", rating: 5, date: "4 days ago", comment: "Collars that actually don't bacon after 20 washes. I bought 3 colors." }
    ]
  },
  {
    id: "vd-05",
    sku: "VD-FW25-0520",
    name: "CHUNKY COMBAT VULCANIZED BOOT",
    tagline: "Italian Calfskin Leather with Vibram Lug Outsole",
    price: 490,
    originalPrice: 560,
    category: "Footwear",
    collection: "Monolith Core",
    isNew: false,
    isFeatured: true,
    isBestseller: false,
    stockQuantity: 9,
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Polished Noir", hex: "#0D0D0D" },
      { name: "Distressed Concrete", hex: "#3C3A39" }
    ],
    sizes: [
      { name: "EU 40", inStock: true },
      { name: "EU 41", inStock: true },
      { name: "EU 42", inStock: true },
      { name: "EU 43", inStock: true },
      { name: "EU 44", inStock: false },
      { name: "EU 45", inStock: true }
    ],
    rating: 4.9,
    reviewsCount: 22,
    description: "Handcrafted in Civitanova Marche, Italy. Made from 2.2mm full-grain calfskin leather treated for matte oil resistance. Built atop an exaggerated 55mm custom Vibram combat lug sole with Goodyear welted construction for a lifetime of re-soling.",
    fabric: "Upper: 100% Italian Calf Leather. Sole: 100% Vibram Rubber.",
    fit: "Runs true to European sizing. If between sizes, size down.",
    details: [
      "55mm heel height with aggressive cleat traction",
      "Goodyear-welted weatherproof construction",
      "YKK Excella lateral side zip for effortless on/off",
      "Glove-grade calfskin leather lining with memory foam insole",
      "Speed lacing matte black eyelets"
    ],
    reviews: [
      { id: "r6", user: "Stefan B.", rating: 5, date: "3 weeks ago", comment: "Comfortable right out of the box. Zero break-in blisters and the proportions anchor oversized trousers perfectly." }
    ]
  },
  {
    id: "vd-06",
    sku: "VD-FW25-0601",
    name: "ARCHITECTURAL DOUBLE-BREASTED OVERCOAT",
    tagline: "850 GSM Virgin Wool & Cashmere with Sharp Shoulders",
    price: 720,
    originalPrice: null,
    category: "Outerwear",
    collection: "Monolith Core",
    isNew: false,
    isFeatured: false,
    isBestseller: true,
    stockQuantity: 5,
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Void Black", hex: "#080808" },
      { name: "Heather Charcoal", hex: "#222326" }
    ],
    sizes: [
      { name: "46 / S", inStock: true },
      { name: "48 / M", inStock: true },
      { name: "50 / L", inStock: false },
      { name: "52 / XL", inStock: true }
    ],
    rating: 5.0,
    reviewsCount: 15,
    description: "Couture precision meets modern street tailoring. Sourced from Biella, Italy, this heavy virgin wool and cashmere blend overcoat is constructed with reinforced horsehair canvas floating chest pieces and razor-extended shoulder pads.",
    fabric: "90% Virgin Wool, 10% Cashmere (850 GSM). Lining: 100% Bemberg Cupro.",
    fit: "Oversized, floor-grazing length with high structural shoulder roping.",
    details: [
      "Subtle raw-edge peak lapels with hand pick-stitching",
      "Deep center back walking vent with hidden button tab",
      "Horn buttons etched with serial atelier coordinates",
      "Two deep exterior flap pockets and two interior passport welt pockets"
    ],
    reviews: [
      { id: "r7", user: "Henri L.", rating: 5, date: "1 month ago", comment: "The silhouette when you walk in the wind is straight out of The Matrix. Worth every cent." }
    ]
  },
  {
    id: "vd-07",
    sku: "VD-SS26-0711",
    name: "DISTORTED MONOGRAM MOHAIR KNIT",
    tagline: "Brushed Kid Mohair Blend with Asymmetric Intarsia",
    price: 290,
    originalPrice: null,
    category: "Hoodies & Knits",
    collection: "Season 08: Nocturnal Void",
    isNew: true,
    isFeatured: true,
    isBestseller: false,
    stockQuantity: 14,
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Monochrome Glitch", hex: "#1A1A1A" },
      { name: "Bone & Charcoal", hex: "#DCD8CF" }
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true }
    ],
    rating: 4.8,
    reviewsCount: 19,
    description: "Spun from superfine South African kid mohair and soft wool, manually brushed for a cloud-like tactile halo. Features an oversized, distorted jacquard rendering of the brand's 'VOID 08' sonic frequency waveform.",
    fabric: "42% Kid Mohair, 38% Wool, 20% Polyamide (for shape retention)",
    fit: "Slouchy, draped fit with elongated sleeves that bunch naturally at the wrists.",
    details: [
      "Manually hand-brushed for extreme fluffy depth",
      "Chunky 2x2 ribbing at crewneck, hem and cuffs",
      "Seamless round-knit tubular body construction"
    ],
    reviews: [
      { id: "r8", user: "Tariq M.", rating: 5, date: "5 days ago", comment: "Incredibly soft, not itchy at all against bare skin. The knit texture gets compliments non-stop." }
    ]
  },
  {
    id: "vd-08",
    sku: "VD-SS26-0803",
    name: "BALLISTIC UTILITY CROSSBODY RIG",
    tagline: "1000D Cordura Nylon with German Fidlock Magnetic Buckle",
    price: 180,
    originalPrice: 220,
    category: "Accessories",
    collection: "Industrial Archive",
    isNew: false,
    isFeatured: false,
    isBestseller: true,
    stockQuantity: 25,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Tactical Black", hex: "#0C0C0C" },
      { name: "Charcoal Slate", hex: "#28292B" }
    ],
    sizes: [
      { name: "ONE SIZE", inStock: true }
    ],
    rating: 4.9,
    reviewsCount: 51,
    description: "A streamlined everyday carry rig built for urban resilience. Constructed with abrasion-proof 1000D ballistic nylon and engineered with genuine German Fidlock quick-release magnetic mechanisms.",
    fabric: "100% CORDURA® 1000D Nylon. PU Coated waterproof interior.",
    fit: "Fully adjustable ergonomic 38mm seatbelt-grade webbing strap. Worn crossbody or chest rig.",
    details: [
      "Authentic German Fidlock V-Buckle magnetic snap mechanism",
      "AquaGuard waterproof YKK polyurethane zippers",
      "Concealed anti-theft passport compartment on rear mesh wall",
      "Removable modular key fob with aluminum carabiner"
    ],
    reviews: [
      { id: "r9", user: "Koa W.", rating: 5, date: "1 week ago", comment: "The Fidlock buckle is addictive to open and snap. Fits my camera, wallet, phone, and powerbank." }
    ]
  },
  {
    id: "vd-09",
    sku: "VD-SS26-0914",
    name: "RAW-EDGE ACID WASH HOODIE",
    tagline: "450 GSM Stonewashed Terry with Laser-Distressed Cuffs",
    price: 240,
    originalPrice: null,
    category: "Hoodies & Knits",
    collection: "Season 08: Nocturnal Void",
    isNew: true,
    isFeatured: false,
    isBestseller: false,
    stockQuantity: 16,
    images: [
      "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Mineral Wash", hex: "#323336" },
      { name: "Faded Sand", hex: "#C2BCB0" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true }
    ],
    rating: 4.8,
    reviewsCount: 31,
    description: "Treated with a proprietary volcanic pumice stone mineral wash that reveals nuanced micro-fades along the seams. Finished with raw-cut rolled edges at the hemline and cuffs.",
    fabric: "100% Heavyweight French Terry Cotton (450 GSM)",
    fit: "Slightly shorter boxy crop with wide sleeves.",
    details: [
      "Raw-cut rolled hems and wrist cuffs with stay-stitch reinforcement",
      "Heavy stone mineral enzyme wash",
      "Micro tonal embroidery of serial number on cuff"
    ],
    reviews: [
      { id: "r10", user: "Caleb S.", rating: 5, date: "2 weeks ago", comment: "The mineral wash color gradient is sick. Looks like a vintage piece from 1994." }
    ]
  },
  {
    id: "vd-10",
    sku: "VD-SS26-1025",
    name: "WIDE-LEG PLEATED TAILORED TROUSER",
    tagline: "Tropical Wool Twill with Deep Knife Pleats",
    price: 290,
    originalPrice: null,
    category: "Bottoms",
    collection: "Monolith Core",
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    stockQuantity: 11,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Pitch Charcoal", hex: "#1C1C1E" },
      { name: "Soft Bone", hex: "#E3DFD5" }
    ],
    sizes: [
      { name: "28", inStock: true },
      { name: "30", inStock: true },
      { name: "32", inStock: true },
      { name: "34", inStock: true },
      { name: "36", inStock: true }
    ],
    rating: 4.9,
    reviewsCount: 27,
    description: "The pinnacle of fluid streetwear tailoring. Sourced from Portuguese mills, this four-season wool twill drapes with liquid grace. Engineered with deep double front knife pleats that open into an exaggerated wide hem.",
    fabric: "70% Tropical Wool, 28% Viscose, 2% Elastane",
    fit: "High-waisted, dramatic wide-leg pooling over footwear.",
    details: [
      "Deep double forward-facing knife pleats",
      "Concealed internal grosgrain drawstring for beltless wear",
      "Clean blind-hemmed cuffs ready for custom tailoring if desired",
      "Double back welt pockets with horn buttons"
    ],
    reviews: [
      { id: "r11", user: "Nathan P.", rating: 5, date: "6 days ago", comment: "Drapes like runway couture. Elevates any simple tee or hoodie instantly." }
    ]
  },
  {
    id: "vd-11",
    sku: "VD-FW25-1108",
    name: "MINIMALIST PLATFORM SNEAKER",
    tagline: "Nappa Calf Leather with Geometric Extended Heel Spoiler",
    price: 390,
    originalPrice: 440,
    category: "Footwear",
    collection: "Season 08: Nocturnal Void",
    isNew: false,
    isFeatured: false,
    isBestseller: true,
    stockQuantity: 15,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Triple Black", hex: "#080808" },
      { name: "Chalk / Jet", hex: "#ECE9E2" }
    ],
    sizes: [
      { name: "EU 40", inStock: true },
      { name: "EU 41", inStock: true },
      { name: "EU 42", inStock: true },
      { name: "EU 43", inStock: true },
      { name: "EU 44", inStock: true },
      { name: "EU 45", inStock: false }
    ],
    rating: 4.8,
    reviewsCount: 45,
    description: "Stripped of branding, defined by sculpture. Hand-assembled in Portugal using supple full-grain nappa leather. Features an exaggerated 45mm sculpted rubber sole with a geometric rear spoiler extension.",
    fabric: "100% Nappa Calf Leather. Custom Molded Rubber Cupsole.",
    fit: "Runs true to size. Removable cushioned footbed.",
    details: [
      "45mm platform height with geometric rear protrusion",
      "Waxed tonal cotton flat laces with metal aglets",
      "Calf leather lining and padded collar for all-day comfort",
      "Discreet gold foil atelier stamp on insole"
    ],
    reviews: [
      { id: "r12", user: "Gabriel E.", rating: 5, date: "1 week ago", comment: "Extremely clean profile. The leather quality blows common projects out of the water." }
    ]
  },
  {
    id: "vd-12",
    sku: "VD-FW25-1219",
    name: "METALLIC DOWN PUFFER PARKA",
    tagline: "750 Fill Power Down with High-Shine Ripstop Shell",
    price: 640,
    originalPrice: 750,
    category: "Outerwear",
    collection: "Season 08: Nocturnal Void",
    isNew: false,
    isFeatured: true,
    isBestseller: false,
    stockQuantity: 4,
    images: [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Liquid Charcoal", hex: "#1D1E22" },
      { name: "Obsidian Black", hex: "#090909" }
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: false },
      { name: "XL", inStock: true }
    ],
    rating: 5.0,
    reviewsCount: 18,
    description: "Designed for sub-zero urban expeditions. Filled with 750 fill-power RDS-certified goose down and encased in a featherlight high-shine micro ripstop shell. Features internal backpack carrying harness straps for indoor transit.",
    fabric: "Shell: 100% High-Tenacity Micro Ripstop. Insulation: 90% White Goose Down, 10% Feathers.",
    fit: "Puffy oversized cocoon fit. Insulated stand collar and detachable storm hood.",
    details: [
      "Internal backpack carry straps to wear slung over shoulders indoors",
      "Magnetic storm flap over two-way heavy YKK Vislon zipper",
      "Microfleece-lined deep handwarmer pockets",
      "Elasticated windproof storm cuffs with thumbholes"
    ],
    reviews: [
      { id: "r13", user: "Viktor K.", rating: 5, date: "3 weeks ago", comment: "Survived a Montreal blizzard in this. Warmest coat I've ever owned, yet weighs almost nothing." }
    ]
  },
  {
    id: "vd-13",
    sku: "VD-SS26-1304",
    name: "HEAVYWEIGHT THERMAL WAFFLE LONGSLEEVE",
    tagline: "380 GSM Dual-Knit Cotton with Thumbhole Cuffs",
    price: 160,
    originalPrice: null,
    category: "Tees",
    collection: "Monolith Core",
    isNew: true,
    isFeatured: false,
    isBestseller: false,
    stockQuantity: 28,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Faded Bone", hex: "#D6D1C7" },
      { name: "Washed Noir", hex: "#1E1E1E" }
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true }
    ],
    rating: 4.7,
    reviewsCount: 16,
    description: "A substantial thermal layering piece. Knitted on vintage circular looms with 380 GSM combed cotton waffle stitch. Features extended rib cuffs with integrated ergonomic thumbholes for easy glove layering.",
    fabric: "100% Heavy Combed Cotton (380 GSM)",
    fit: "Relaxed regular fit with elongated scooped hem.",
    details: [
      "Heavy waffle thermal knit structure",
      "Reinforced extended rib cuffs with concealed thumbholes",
      "Flatlock anti-chafing seam construction"
    ],
    reviews: [
      { id: "r14", user: "Dante F.", rating: 5, date: "1 month ago", comment: "Substantial texture. Looks great worn underneath short sleeve tees or open bombers." }
    ]
  },
  {
    id: "vd-14",
    sku: "VD-SS26-1402",
    name: "ANODIZED COBRA HARDWARE LEATHER BELT",
    tagline: "Bridle Leather with Matte Black Quick-Release Buckle",
    price: 140,
    originalPrice: null,
    category: "Accessories",
    collection: "Industrial Archive",
    isNew: true,
    isFeatured: false,
    isBestseller: true,
    stockQuantity: 20,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Matte Black", hex: "#0A0A0A" }
    ],
    sizes: [
      { name: "S/M (28-32)", inStock: true },
      { name: "L/XL (34-38)", inStock: true }
    ],
    rating: 4.9,
    reviewsCount: 33,
    description: "Built to endure decades. Made from 4mm thick English bridle leather that patinas gracefully with wear, anchored with an industrial zinc-alloy Cobra quick-release mechanism.",
    fabric: "100% English Bridle Vegetable-Tanned Leather. Solid Zinc-Alloy Hardware.",
    fit: "38mm width fits standard cargo and denim belt loops.",
    details: [
      "Industrial quick-release mechanism",
      "Hand-burnished and waxed leather edges",
      "Laser-etched coordinate markings on tip"
    ],
    reviews: [
      { id: "r15", user: "Zack B.", rating: 5, date: "2 weeks ago", comment: "The buckle snap is so satisfying. Super tough leather." }
    ]
  }
];

export const CATEGORIES = [
  "All",
  "Outerwear",
  "Hoodies & Knits",
  "Tees",
  "Bottoms",
  "Footwear",
  "Accessories"
];

export const COLLECTIONS = [
  {
    id: "season-08",
    name: "Season 08: Nocturnal Void",
    tagline: "The Dichotomy of Form and Subversion",
    season: "Spring / Summer 2026",
    code: "DROP_08",
    description: "Explores the tension between oversized architectural drape and heavy minimalist utility. Dark matter textures, volcanic washes, and sculpted silhouettes engineered for nocturnal metropolitan landscapes.",
    heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85",
    itemsCount: 6,
    lookbookImages: [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85"
    ]
  },
  {
    id: "monolith-core",
    name: "Monolith Core",
    tagline: "Permanent High-Weight Foundations",
    season: "Perennial Archive",
    code: "PERM_CORE",
    description: "Uncompromised daily uniform. Bespoke 480 GSM French terry, custom Italian wool suiting, and Goodyear-welted footwear crafted without seasonal expiry.",
    heroImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1600&q=85",
    itemsCount: 5,
    lookbookImages: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85"
    ]
  },
  {
    id: "industrial-archive",
    name: "Industrial Archive",
    tagline: "Technical Modular Hardware & Memory Textiles",
    season: "Capsule Drop",
    code: "IND_MOD",
    description: "Inspired by ballistic aerospace uniforms and brutalist Tokyo infrastructure. Featuring German Fidlock magnetic fasteners, Japanese memory textiles, and convertible modular utility systems.",
    heroImage: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1600&q=85",
    itemsCount: 4,
    lookbookImages: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=85"
    ]
  }
];

export const PROMO_CODES = {
  "VOID20": { discount: 0.20, type: "percent", description: "20% Off VIP Early Access" },
  "ARCHIVE10": { discount: 10, type: "fixed", description: "$10 Off Any Archival Piece" },
  "FREESHIP": { discount: 0, type: "shipping", description: "Complimentary Global Express Courier" },
  "STREETWEAR": { discount: 0.15, type: "percent", description: "15% Off First Atelier Order" }
};
