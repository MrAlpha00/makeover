const categories = [
  {
    id: "birthday",
    name: "Birthday",
    slug: "birthday",
    icon: "🎂",
    image: "/assets/categories/birthday.jpg",
    description: "Make their day unforgettable",
    subcategories: [
      { id: "balloon-decoration", name: "Balloon Decoration", slug: "balloon-decoration", image: "/assets/subcategories/balloon-decoration.jpg", description: "Ceiling balloons, room fills, surprise setups" },
      { id: "theme-decor", name: "Theme Decor", slug: "theme-decor", image: "/assets/subcategories/theme-decor.jpg", description: "Jungle, butterfly, superhero and more" },
      { id: "first-birthday", name: "First Birthday", slug: "first-birthday", image: "/assets/subcategories/first-birthday.jpg", description: "Special setups for baby's first year" },
    ]
  },
  {
    id: "anniversary",
    name: "Anniversary",
    slug: "anniversary",
    icon: "💍",
    image: "/assets/categories/anniversary.jpg",
    description: "Celebrate your love story",
    subcategories: [
      { id: "room-decoration", name: "Room Decoration", slug: "room-decoration", image: "/assets/subcategories/room-decoration.jpg", description: "Roses, candles, fairy lights" },
      { id: "candlelight-dinner", name: "Candlelight Dinner", slug: "candlelight-dinner", image: "/assets/subcategories/candlelight-dinner.jpg", description: "Romantic dinner setups" },
    ]
  },
  {
    id: "occasions",
    name: "Occasions",
    slug: "occasions",
    icon: "🎉",
    image: "/assets/categories/occasions.jpg",
    description: "Baby shower, houswarming & more",
    subcategories: [
      { id: "baby-shower", name: "Baby Shower", slug: "baby-shower", image: "/assets/subcategories/baby-shower.jpg", description: "Soft pastel setups for the little one" },
      { id: "house-warming", name: "House Warming", slug: "house-warming", image: "/assets/subcategories/house-warming.jpg", description: "Floral and festive home setups" },
    ]
  },
  {
    id: "corporate",
    name: "Corporate",
    slug: "corporate",
    icon: "🏢",
    image: "/assets/categories/corporate.jpg",
    description: "Professional event decoration",
    subcategories: [
      { id: "corporate-event", name: "Corporate Events", slug: "corporate-event", image: "/assets/subcategories/corporate-event.jpg", description: "Branded backdrops, stage setups" },
    ]
  }
];

module.exports = categories;
