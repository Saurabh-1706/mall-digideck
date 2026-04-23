// West Edmonton Mall - All Content Data & Constants

export const MALL_STATS = {
  totalArea: "5.3M",
  totalAreaLabel: "Square Feet",
  totalStores: "800+",
  totalStoresLabel: "Retail Stores",
  annualVisitors: "30M+",
  annualVisitorsLabel: "Annual Visitors",
  established: "1981",
  establishedLabel: "Year Established",
  parkingSpaces: "20,000+",
  parkingSpacesLabel: "Parking Spaces",
  attractions: "20+",
  attractionsLabel: "Major Attractions",
};

export const IMAGE_URLS = {
  // WhySection gallery — using a mix of AI generated and high quality photos
  hero: [
    "/images/hero.png",  // AI Generated Mall exterior/hero
    "/images/wem-real-interior.jpg",
    "/images/wem-real-atrium.jpg",
    "/images/wem-real-corridor.jpg",
    "/images/wem-real-retail.jpg",
    "/images/mall-entry.jpg",
  ],
  retail:      "/images/retail.png",
  luxury:      "/images/luxury.png",
  dining:      "/images/dining.png",
  attractions: "/images/attractions.png",
  events:      "/images/events.png",
  cta:         "/images/hero.png",
};

export const FLOATING_IMAGES_RETAIL = [
  "/images/wem-real-retail.jpg",
  "/images/wem-real-luxury.jpg",
  "/images/wem-real-corridor.jpg",
  "/images/wem-real-interior.jpg",
];

export const WEM_ATTRACTIONS_REAL = [
  "/images/wem-real-galaxyland.jpg",  // Galaxyland — indoor amusement rides
  "/images/wem-real-waterpark.jpg",   // World Waterpark — indoor wave pool
  "/images/wem-real-ice-palace.jpg",  // Ice Palace — indoor skating rink
  "/images/wem-real-aquarium.jpg",    // Marine Life — aquarium / sea life
];

export const DINING_IMAGES = [
  "/images/wem-real-dining.jpg",
  "/images/wem-real-luxury.jpg",
  "/images/dining-3.jpg",
  "/images/dining-4.jpg",
  "/images/dining-1.jpg",
  "/images/dining-2.jpg",
];

export const EVENTS_IMAGES = [
  "/images/wem-real-events.jpg",
  "/images/events-activation.jpg",
  "/images/events-corporate.jpg",
  "/images/events-expo.jpg",
];

export const VIDEO_URLS = {
  // Local videos from public/videos
  hero: "/videos/Sequence 03_1.mp4", // Loops on entry screen
  intro: "/videos/Sequence 01.mp4", // Plays once as intro
  retail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  luxury: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  dining: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  attractions: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  events: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  cta: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
};

export const SECTIONS = {
  hero: {
    id: "hero",
    title: "West Edmonton Mall",
    subtitle: "The World's Most Immersive Retail Destination",
  },
  why: {
    id: "why",
    title: "Why West Edmonton Mall",
    subtitle: "A destination that transcends traditional retail",
  },
  retail: {
    id: "retail",
    title: "800+ Brands. Infinite Possibilities.",
    subtitle: "From luxury flagships to emerging brands",
  },
  luxury: {
    id: "luxury",
    title: "Luxury Redefined",
    subtitle: "An elevated experience for discerning brands",
  },
  dining: {
    id: "dining",
    title: "Dining & Lifestyle",
    subtitle: "Culinary experiences that keep visitors engaged",
  },
  attractions: {
    id: "attractions",
    title: "Beyond Shopping",
    subtitle: "World-class attractions that drive foot traffic",
  },
  events: {
    id: "events",
    title: "Events & Activations",
    subtitle: "Your brand on the world's stage",
  },
  cta: {
    id: "cta",
    title: "Be Part of Something Extraordinary",
    subtitle: "Join the world's most immersive retail destination",
  },
};

export const RETAIL_DATA = {
  categories: [
    { name: "Luxury Fashion", count: "50+", examples: ["Gucci", "Louis Vuitton", "Prada"] },
    { name: "Mid-Tier Retail", count: "300+", examples: ["Zara", "H&M", "Uniqlo"] },
    { name: "Electronics & Tech", count: "80+", examples: ["Apple", "Samsung", "Best Buy"] },
    { name: "Food & Beverage", count: "100+", examples: ["Restaurants", "Cafes", "Food Court"] },
    { name: "Entertainment", count: "20+", examples: ["Cinema", "Arcade", "Theme Parks"] },
    { name: "Services", count: "50+", examples: ["Banking", "Salons", "Medical"] },
  ],
  footTraffic: {
    daily: "100,000+",
    peak: "150,000+",
    weekend: "120,000+",
  },
};

export const LUXURY_DATA = {
  title: "The Luxury Collection",
  description: "West Edmonton Mall's luxury wing attracts high-net-worth individuals with an average household income of $150,000+. Our curated luxury environment provides the perfect backdrop for premium brand experiences.",
  stats: [
    { label: "Avg. Household Income", value: "$150K+" },
    { label: "Luxury Wing Foot Traffic", value: "25K/day" },
    { label: "Conversion Rate", value: "18%" },
    { label: "Average Transaction", value: "$850" },
  ],
};

export const DINING_DATA = {
  categories: [
    {
      name: "Fine Dining",
      description: "Upscale restaurants with premium ambiance",
      dwellTime: "90-120 min",
      count: "25+",
    },
    {
      name: "Casual Restaurants",
      description: "Family-friendly dining experiences",
      dwellTime: "60-90 min",
      count: "40+",
    },
    {
      name: "Food Court",
      description: "Quick service with diverse options",
      dwellTime: "30-45 min",
      count: "50+",
    },
    {
      name: "Specialty Cafes",
      description: "Artisan coffee and desserts",
      dwellTime: "45-60 min",
      count: "30+",
    },
  ],
  totalFBOppportunities: "100+",
  averageDailyDiners: "50,000+",
};

export const ATTRACTIONS_DATA = {
  main: [
    {
      name: "Galaxyland",
      type: "Indoor Amusement Park",
      description: "World's largest indoor amusement park with 27 rides and attractions",
      annualVisitors: "2M+",
      icon: "🎢",
    },
    {
      name: "World Waterpark",
      type: "Indoor Waterpark",
      description: "Largest indoor wave pool in the world, year-round tropical paradise",
      annualVisitors: "1.5M+",
      icon: "🌊",
    },
    {
      name: "Ice Palace",
      type: "Ice Skating Rink",
      description: "Full-size ice rink hosting hockey games and public skating",
      annualVisitors: "500K+",
      icon: "⛸️",
    },
    {
      name: "Marine Life",
      type: "Indoor Aquarium",
      description: "Sea lions, tropical fish, and interactive marine experiences",
      annualVisitors: "800K+",
      icon: "🐠",
    },
  ],
  totalAttractions: "20+",
  combinedAnnualVisitors: "5M+",
};

export const EVENTS_DATA = {
  types: [
    {
      name: "Concerts & Live Shows",
      capacity: "15,000",
      count: "50+/year",
      description: "Major arena hosting international artists",
    },
    {
      name: "Brand Activations",
      capacity: "5,000-10,000",
      count: "100+/year",
      description: "Product launches, pop-ups, experiential marketing",
    },
    {
      name: "Corporate Events",
      capacity: "2,000-5,000",
      count: "75+/year",
      description: "Conferences, galas, team building events",
    },
    {
      name: "Conventions & Expos",
      capacity: "20,000+",
      count: "30+/year",
      description: "Trade shows, exhibitions, consumer expos",
    },
  ],
  stats: {
    totalEventsPerYear: "250+",
    averageAttendance: "8,500",
    mediaReach: "50M+",
    sponsorshipROI: "320%",
  },
};

export const LEASING_PATHS = [
  {
    category: "Luxury Retail",
    description: "Premium spaces in our exclusive luxury wing",
    avgSpace: "3,000-8,000 sq ft",
    footTraffic: "25K+ daily",
    idealFor: "High-end fashion, jewelry, luxury goods",
  },
  {
    category: "Mid-Tier Fashion",
    description: "High-visibility locations in main concourses",
    avgSpace: "1,500-4,000 sq ft",
    footTraffic: "100K+ daily",
    idealFor: "Contemporary brands, lifestyle retailers",
  },
  {
    category: "Food & Beverage",
    description: "Prime dining destinations with built-in traffic",
    avgSpace: "1,000-5,000 sq ft",
    footTraffic: "50K+ daily diners",
    idealFor: "Restaurants, cafes, quick service",
  },
  {
    category: "Pop-Up / Short-Term",
    description: "Flexible spaces for seasonal or trial periods",
    avgSpace: "500-2,000 sq ft",
    footTraffic: "100K+ daily",
    idealFor: "Emerging brands, seasonal retailers, testing markets",
  },
];

export const SPONSORSHIP_TIERS = [
  {
    tier: "Title Sponsor",
    price: "$500K+",
    benefits: [
      "Exclusive naming rights",
      "Year-round brand integration",
      "VIP event access (100 tickets)",
      "Dedicated activation space",
      "Social media features (50M+ reach)",
      "Quarterly ROI reports",
    ],
  },
  {
    tier: "Platinum Partner",
    price: "$250K-$500K",
    benefits: [
      "Co-branding opportunities",
      "Priority event placement",
      "VIP event access (50 tickets)",
      "Activation space (prime locations)",
      "Social media features (25M+ reach)",
      "Bi-annual ROI reports",
    ],
  },
  {
    tier: "Gold Partner",
    price: "$100K-$250K",
    benefits: [
      "Event-specific branding",
      "Standard event placement",
      "VIP event access (25 tickets)",
      "Activation space (standard locations)",
      "Social media mentions (10M+ reach)",
      "Annual ROI report",
    ],
  },
  {
    tier: "Activation Partner",
    price: "$25K-$100K",
    benefits: [
      "Single event activation",
      "Branded booth/display",
      "Event access (10 tickets)",
      "Limited activation space",
      "Social media mentions",
      "Post-event summary",
    ],
  },
];

export const CONTACT_INFO = {
  leasing: {
    email: "leasing@wem.ca",
    phone: "+1 (780) 444-5200",
    title: "Leasing Inquiries",
  },
  sponsorship: {
    email: "partnerships@wem.ca",
    phone: "+1 (780) 444-5201",
    title: "Sponsorship & Partnerships",
  },
  events: {
    email: "events@wem.ca",
    phone: "+1 (780) 444-5202",
    title: "Event Bookings",
  },
  address: "8882 170 St NW, Edmonton, AB T5T 4J2, Canada",
};
