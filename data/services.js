const services = [
  {
    id: "balloon-surprise",
    slug: "balloon-surprise",
    category: "Birthday",
    categorySlug: "birthday",
    subcategorySlug: "balloon-decoration",
    title: "Balloon Surprise Decoration",
    shortDesc: "Fill the room with joy — ceiling-to-floor balloon magic for any birthday.",
    description: "Transform any room into a balloon paradise. Our artists craft stunning balloon arrangements that float, cascade, and create a magical atmosphere for your loved one's special day. Includes foil letter spelling and ribbon accents.",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80",
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80"
    ],
    inclusions: [
      "50 latex balloons (colour of your choice)",
      "Foil 'Happy Birthday' letter balloons",
      "Ribbon & streamer accents",
      "Setup by our decorator (1.5–2 hrs)",
      "Photoshoot-ready backdrop arrangement"
    ],
    addOns: [
      { id: "led-lights", name: "LED fairy lights", price: 299 },
      { id: "flower-bunch", name: "Fresh flower bunch", price: 499 },
      { id: "cake-table", name: "Cake table setup", price: 399 },
      { id: "fog-machine", name: "Fog machine (1 hr)", price: 799 }
    ],
    tags: ["birthday", "balloon", "room decoration", "surprise"],
    featured: true,
    rating: 4.9,
    reviews: 312
  },
  {
    id: "neon-ring-birthday",
    slug: "neon-ring-birthday",
    category: "Birthday",
    categorySlug: "birthday",
    subcategorySlug: "balloon-decoration",
    title: "Neon Light Ring Birthday Setup",
    shortDesc: "Glow up the celebration with our stunning neon ring backdrop.",
    description: "Our signature neon ring creates the most Instagram-worthy birthday setup in Bangalore. Perfect for milestone birthdays, it combines warm fairy lights, a circular LED hoop, balloon garlands, and customised name boards.",
    price: 5499,
    originalPrice: 6499,
    discount: 15,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80"
    ],
    inclusions: [
      "6ft LED neon ring backdrop",
      "Balloon garland on ring",
      "Customised name board",
      "Fairy light drapes",
      "Flower arrangement at base",
      "Setup & breakdown by team"
    ],
    addOns: [
      { id: "cake-table", name: "Cake table setup", price: 399 },
      { id: "fog-machine", name: "Fog machine (1 hr)", price: 799 },
      { id: "photo-booth", name: "Photo booth props kit", price: 349 }
    ],
    tags: ["birthday", "neon", "ring", "light"],
    featured: true,
    rating: 4.8,
    reviews: 189
  },
  {
    id: "lavender-butterfly-theme",
    slug: "lavender-butterfly-theme",
    category: "Theme Decoration",
    categorySlug: "birthday",
    subcategorySlug: "theme-decor",
    title: "Lavender Butterfly Theme",
    shortDesc: "Enchanting lavender & butterfly theme — perfect for girls' birthdays.",
    description: "A dreamy purple and lavender world filled with silver butterflies, metallic balloon garlands, and floral accents. This theme transforms any space into a fairy tale for your little one.",
    price: 12999,
    originalPrice: 14999,
    discount: 13,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80"
    ],
    inclusions: [
      "Full room balloon garland (lavender & silver)",
      "3D butterfly wall cutouts (12 pcs)",
      "Floral centrepiece on cake table",
      "Fairy light curtain backdrop",
      "Welcome board with child's name",
      "Setup by 2-person team"
    ],
    addOns: [
      { id: "candy-bar", name: "Candy bar setup", price: 999 },
      { id: "led-lights", name: "Extra LED strips", price: 299 },
      { id: "photo-booth", name: "Photo booth props kit", price: 349 }
    ],
    tags: ["theme", "butterfly", "lavender", "girls birthday"],
    featured: true,
    rating: 4.9,
    reviews: 97
  },
  {
    id: "soft-jungle-theme",
    slug: "soft-jungle-theme",
    category: "Theme Decoration",
    categorySlug: "birthday",
    subcategorySlug: "first-birthday",
    title: "Soft Jungle Theme Birthday",
    shortDesc: "Wild safari meets soft pastels — perfect for first birthdays.",
    description: "This gentle jungle theme uses sage green, olive, and warm beige tones with adorable safari animal cutouts. Ideal for first birthdays and gender-neutral celebrations.",
    price: 15999,
    originalPrice: 20999,
    discount: 24,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    gallery: [],
    inclusions: [
      "Balloon garland (sage, olive, beige, gold)",
      "Giant number 1 backdrop",
      "Safari animal cutouts (lion, giraffe, elephant)",
      "Cake table with jungle runner",
      "Grass mat floor decoration",
      "Full setup & cleanup"
    ],
    addOns: [
      { id: "candy-bar", name: "Candy bar setup", price: 999 },
      { id: "fog-machine", name: "Fog machine (1 hr)", price: 799 }
    ],
    tags: ["theme", "jungle", "safari", "first birthday"],
    featured: false,
    rating: 4.7,
    reviews: 74
  },
  {
    id: "anniversary-rose-setup",
    slug: "anniversary-rose-setup",
    category: "Anniversary",
    categorySlug: "anniversary",
    subcategorySlug: "room-decoration",
    title: "Anniversary Rose Room Decoration",
    shortDesc: "Romantic rose petals, candles & fairy lights — an evening to remember.",
    description: "Surprise your partner with a beautifully decorated room — red and pink rose petals on the bed, LED candle arrangement, heart-shaped balloon arch, and warm fairy light ambience. Perfect for anniversaries and proposals.",
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80",
    gallery: [],
    inclusions: [
      "500g fresh rose petals (red & pink)",
      "Heart balloon arch (40 balloons)",
      "20 LED tealight candles",
      "Fairy light curtain",
      "Personalised message card",
      "Setup within 90 minutes"
    ],
    addOns: [
      { id: "flower-bunch", name: "Premium flower bouquet", price: 699 },
      { id: "wine-glasses", name: "Champagne flute set (2)", price: 249 },
      { id: "photo-booth", name: "Photo booth props kit", price: 349 }
    ],
    tags: ["anniversary", "romantic", "rose", "candles"],
    featured: true,
    rating: 4.9,
    reviews: 228
  },
  {
    id: "corporate-event-setup",
    slug: "corporate-event-setup",
    category: "Corporate",
    categorySlug: "corporate",
    subcategorySlug: "corporate-event",
    title: "Corporate Event Decoration",
    shortDesc: "Sleek, professional event setups that make your brand shine.",
    description: "From product launches to team celebrations, we handle premium corporate event decoration — branded backdrops, entrance arches, stage setups, and table centrepieces. Customised to your brand colours.",
    price: 18999,
    originalPrice: 22999,
    discount: 17,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    gallery: [],
    inclusions: [
      "Branded backdrop (12ft x 8ft)",
      "Entrance arch with company colours",
      "Stage floral arrangement",
      "Table centrepieces (up to 10 tables)",
      "Welcome signage board",
      "2-person setup team (3–4 hrs)"
    ],
    addOns: [
      { id: "photo-booth", name: "Photo booth with branded frame", price: 1499 },
      { id: "fog-machine", name: "Fog machine (1 hr)", price: 799 }
    ],
    tags: ["corporate", "event", "professional", "office"],
    featured: false,
    rating: 4.8,
    reviews: 56
  },
  {
    id: "baby-shower-decoration",
    slug: "baby-shower-decoration",
    category: "Occasions",
    categorySlug: "occasions",
    subcategorySlug: "baby-shower",
    title: "Baby Shower Decoration",
    shortDesc: "Sweet pastel baby shower setup — celebrate the little one arriving soon.",
    description: "Soft clouds, pastel balloons, and a gorgeous backdrop make your baby shower unforgettable. Choose from blue, pink, or neutral tones. Includes a beautifully styled dessert/gift table.",
    price: 7999,
    originalPrice: 9999,
    discount: 20,
    image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80",
    gallery: [],
    inclusions: [
      "Pastel balloon garland",
      "Cloud & star hanging decorations",
      "Dessert table setup with runner",
      "Baby-themed banner",
      "Gender reveal balloon (optional)",
      "Full setup by team"
    ],
    addOns: [
      { id: "candy-bar", name: "Candy bar setup", price: 999 },
      { id: "photo-booth", name: "Photo booth props kit", price: 349 }
    ],
    tags: ["baby shower", "pastel", "newborn", "occasions"],
    featured: false,
    rating: 4.8,
    reviews: 143
  },
  {
    id: "pink-white-birthday",
    slug: "pink-white-birthday",
    category: "Birthday",
    categorySlug: "birthday",
    subcategorySlug: "balloon-decoration",
    title: "Baby Girl Pink & White Birthday",
    shortDesc: "Classic pink and white — timeless, elegant, and totally adorable.",
    description: "A stunning pink and white balloon setup with butterfly accents, a personalised name banner, and fairy lights. The perfect birthday backdrop for your little princess.",
    price: 3199,
    originalPrice: 4199,
    discount: 24,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&q=80",
    gallery: [],
    inclusions: [
      "Pink & white balloon wall/garland",
      "Butterfly foil cutouts",
      "Personalised name banner",
      "Fairy light accent",
      "Cake table ribbon wrap",
      "Setup within 2 hours"
    ],
    addOns: [
      { id: "led-lights", name: "LED fairy lights", price: 299 },
      { id: "cake-table", name: "Full cake table setup", price: 399 }
    ],
    tags: ["birthday", "pink", "white", "girls"],
    featured: false,
    rating: 4.7,
    reviews: 201
  }
];

module.exports = services;
