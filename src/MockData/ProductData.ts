export interface WeightVariant {
  weight: string;
  unit: string; // e.g. "1 Box", "1 Pkt", "1 Pcs"
  price: number;
  mrp: number;
  discount: number;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  categoryId: number;
  variants: WeightVariant[];
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  badgeColor?: string;
  description?: string;
  inStock: boolean;
  deliveryTime: string;
}

export const products: Product[] = [
  // Ground Chakkars (Id: 1)
  {
    id: 1,
    name: "Ground Chakkar Ashoka",
    brand: "Standard",
    categoryId: 1,
    variants: [
      { weight: "1 Box (10 pcs)", unit: "1 Box", price: 120, mrp: 200, discount: 40 },
      { weight: "5 Box Bundle", unit: "1 Bundle", price: 550, mrp: 1000, discount: 45 },
    ],
    rating: 4.8,
    reviews: 124,
    image: "/assets/images/4 inch gold lakshmi .jpg",
    badge: "Best Seller",
    badgeColor: "bg-yellow-500",
    description: "Classic spinning ground firework with bright sparks.",
    inStock: true,
    deliveryTime: "2-3 Days"
  },
  {
    id: 2,
    name: "Deluxe Ground Chakkar",
    brand: "Cock Brand",
    categoryId: 1,
    variants: [
      { weight: "1 Box (10 pcs)", unit: "1 Box", price: 180, mrp: 250, discount: 28 },
    ],
    rating: 4.5,
    reviews: 89,
    image: "/assets/images/4 inch gold lakshmi .jpg",
    description: "Long lasting spinning chakkars.",
    inStock: true,
    deliveryTime: "2-3 Days"
  },
  
  // Flower Pots (Id: 2)
  {
    id: 3,
    name: "Giant Flower Pot",
    brand: "Standard",
    categoryId: 2,
    variants: [
      { weight: "1 Box (10 pcs)", unit: "1 Box", price: 250, mrp: 400, discount: 37 },
    ],
    rating: 4.9,
    reviews: 210,
    image: "/assets/images/MumbaiBeauty_SivakasiQueen-crackers83.jpg",
    badge: "Must Buy",
    badgeColor: "bg-red-600",
    description: "Large fountain of golden sparks reaching 10ft.",
    inStock: true,
    deliveryTime: "2-3 Days"
  },
  {
    id: 4,
    name: "Color Koti (Color Fountains)",
    brand: "Sony",
    categoryId: 2,
    variants: [
      { weight: "1 Box (5 pcs)", unit: "1 Box", price: 300, mrp: 450, discount: 33 },
    ],
    rating: 4.7,
    reviews: 156,
    image: "/assets/images/98-600x600.jpg",
    description: "Multi-color fountains for a vibrant display.",
    inStock: true,
    deliveryTime: "2-3 Days"
  },

  // Sparklers (Id: 3)
  {
    id: 5,
    name: "10cm Electric Sparklers",
    brand: "Standard",
    categoryId: 3,
    variants: [
      { weight: "1 Box (10 pcs)", unit: "1 Box", price: 50, mrp: 80, discount: 37 },
      { weight: "Bundle (10 Boxes)", unit: "1 Bundle", price: 450, mrp: 800, discount: 43 },
    ],
    rating: 4.6,
    reviews: 542,
    image: "/assets/images/1.5 twin star.jpg",
    description: "Safe electric sparklers for kids.",
    inStock: true,
    deliveryTime: "2-3 Days"
  },
  {
    id: 6,
    name: "30cm Red Sparklers",
    brand: "Standard",
    categoryId: 3,
    variants: [
      { weight: "1 Box (5 pcs)", unit: "1 Box", price: 100, mrp: 150, discount: 33 },
    ],
    rating: 4.8,
    reviews: 320,
    image: "/assets/images/10-Cm-Electric-sparklers-5-Boxes-Crackers .jpg",
    description: "Long burning red colored sparklers.",
    inStock: true,
    deliveryTime: "2-3 Days"
  },

  // Aerial Shots (Id: 4)
  {
    id: 7,
    name: "12 Shot Sky Cruiser",
    brand: "Standard",
    categoryId: 4,
    variants: [
      { weight: "1 Piece", unit: "1 Pcs", price: 450, mrp: 600, discount: 25 },
    ],
    rating: 4.9,
    reviews: 112,
    image: "/assets/images/Crackling-Soda-Crackers.jpg",
    badge: "Premium",
    badgeColor: "bg-purple-600",
    description: "12 multi-color shots in the sky.",
    inStock: true,
    deliveryTime: "2-3 Days"
  },
  {
    id: 8,
    name: "240 Shot Mega Show",
    brand: "Standard",
    categoryId: 4,
    variants: [
      { weight: "1 Huge Box", unit: "1 Box", price: 3500, mrp: 5000, discount: 30 },
    ],
    rating: 5.0,
    reviews: 45,
    image: "/assets/images/Crackling-Soda-Crackers.jpg",
    badge: "Show Stopper",
    badgeColor: "bg-yellow-500",
    description: "Continuous 240 shots for a grand finale.",
    inStock: true,
    deliveryTime: "2-3 Days"
  },

  // Rockets (Id: 5)
  {
    id: 9,
    name: "Whistling Rocket",
    brand: "Cock Brand",
    categoryId: 5,
    variants: [
      { weight: "1 Box (10 pcs)", unit: "1 Box", price: 200, mrp: 300, discount: 33 },
    ],
    rating: 4.5,
    reviews: 78,
    image: "/assets/images/hero_fireworks.png",
    description: "Rockets that whistle as they fly up.",
    inStock: true,
    deliveryTime: "2-3 Days"
  },

  // Kids Special (Id: 6)
  {
    id: 10,
    name: "Pop Pop Snappers",
    brand: "Standard",
    categoryId: 6,
    variants: [
      { weight: "1 Box (50 pcs)", unit: "1 Box", price: 20, mrp: 30, discount: 33 },
    ],
    rating: 4.7,
    reviews: 450,
    image: "/assets/images/sparklers_box.png",
    description: "Safe snap noise makers for kids.",
    inStock: true,
    deliveryTime: "2-3 Days"
  },
  {
    id: 11,
    name: "Serpent Eggs (Snake)",
    brand: "Standard",
    categoryId: 6,
    variants: [
      { weight: "1 Box (10 pcs)", unit: "1 Box", price: 30, mrp: 50, discount: 40 },
    ],
    rating: 4.4,
    reviews: 230,
    image: "/assets/images/sparklers_box.png",
    description: "Tablets that grow into snakes when lit.",
    inStock: true,
    deliveryTime: "2-3 Days"
  },

  // Atom Bombs (Id: 7)
  {
    id: 12,
    name: "Hydrogen Bomb Green",
    brand: "Anil",
    categoryId: 7,
    variants: [
      { weight: "1 Box (10 pcs)", unit: "1 Box", price: 150, mrp: 220, discount: 31 },
    ],
    rating: 4.6,
    reviews: 88,
    image: "/assets/images/ground_chakkars.png",
    description: "Loud bang green sutli bomb.",
    inStock: true,
    deliveryTime: "2-3 Days"
  },

  // Gift Boxes (Id: 8)
  {
    id: 13,
    name: "Family Celebration Pack",
    brand: "Standard",
    categoryId: 8,
    variants: [
      { weight: "1 Pack (30 items)", unit: "1 Pkt", price: 1200, mrp: 2000, discount: 40 },
    ],
    rating: 4.9,
    reviews: 300,
    image: "/assets/images/sparklers_box.png",
    badge: "Value Deal",
    badgeColor: "bg-green-600",
    description: "Assorted fireworks for the whole family.",
    inStock: true,
    deliveryTime: "2-3 Days"
  }
];

// Helper functions
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: number): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductsByBrand = (brand: string): Product[] => {
  return products.filter(product => product.brand.toLowerCase() === brand.toLowerCase());
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery)
  );
};
