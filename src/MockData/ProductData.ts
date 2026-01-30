export interface WeightVariant {
  weight: string;
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
  // Premium Firecrackers (categoryId: 1)
  {
    id: 1,
    name: "Atom Bombs - Premium Pack",
    brand: "Crackers Central",
    categoryId: 1,
    variants: [
      { weight: "1 Box (50 pcs)", price: 249, mrp: 349, discount: 29 },
      { weight: "2 Boxes (100 pcs)", price: 479, mrp: 698, discount: 31 },
    ],
    rating: 4.6,
    reviews: 2847,
    image: "/cracker-atom-bomb.jpg",
    badge: "BESTSELLER",
    badgeColor: "bg-red-600",
    description: "Premium atom bombs firecrackers, loud and exciting for Diwali celebrations",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 2,
    name: "Lakshmi Gold Crackers",
    brand: "Lakshmi",
    categoryId: 1,
    variants: [
      { weight: "1 Pack (40 pcs)", price: 299, mrp: 399, discount: 25 },
      { weight: "2 Packs (80 pcs)", price: 579, mrp: 798, discount: 27 },
      { weight: "Super Pack (200 pcs)", price: 1299, mrp: 1800, discount: 28 },
    ],
    rating: 4.8,
    reviews: 5123,
    image: "/cracker-lakshmi.jpg",
    badge: "BESTSELLER",
    badgeColor: "bg-yellow-600",
    description: "Premium Lakshmi brand crackers, traditional Diwali favorite",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 3,
    name: "Compound Crackers Mix",
    brand: "Crackers Central",
    categoryId: 1,
    variants: [
      { weight: "1 Box", price: 199, mrp: 299, discount: 33 },
    ],
    rating: 4.3,
    reviews: 1523,
    image: "/cracker-compound.jpg",
    badge: "LIMITED",
    badgeColor: "bg-purple-600",
    description: "Multi-color compound crackers for festive celebrations",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 4,
    name: "Flower Pot Crackers",
    brand: "Festival",
    categoryId: 1,
    variants: [
      { weight: "1 Box (30 pcs)", price: 149, mrp: 199, discount: 25 },
      { weight: "2 Boxes (60 pcs)", price: 279, mrp: 398, discount: 30 },
    ],
    rating: 4.2,
    reviews: 1876,
    image: "/cracker-flower-pot.jpg",
    badge: "FAMILY PACK",
    badgeColor: "bg-green-600",
    description: "Safe flower pot crackers with beautiful colors, perfect for families",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 5,
    name: "Firecracker Rockets Pack",
    brand: "Crackers Central",
    categoryId: 1,
    variants: [
      { weight: "1 Pack (60 pcs)", price: 199, mrp: 279, discount: 29 },
      { weight: "2 Packs (120 pcs)", price: 379, mrp: 558, discount: 32 },
    ],
    rating: 4.4,
    reviews: 3421,
    image: "/cracker-rockets.jpg",
    badge: "FLYING",
    badgeColor: "bg-orange-600",
    description: "Flying rocket crackers for exciting Diwali celebrations",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 6,
    name: "Chakkri Spinning Crackers",
    brand: "Festival",
    categoryId: 1,
    variants: [
      { weight: "1 Box (20 pcs)", price: 99, mrp: 149, discount: 34 },
      { weight: "2 Boxes (40 pcs)", price: 189, mrp: 298, discount: 37 },
    ],
    rating: 4.1,
    reviews: 876,
    image: "/cracker-chakkri.jpg",
    description: "Spinning chakkri crackers with colorful effects",
    inStock: true,
    deliveryTime: "Same Day"
  },
  // Sparklers & Light Crackers (categoryId: 2)
  {
    id: 7,
    name: "Premium Golden Sparklers",
    brand: "Crackers Central",
    categoryId: 2,
    variants: [
      { weight: "10 pcs (5 inch)", price: 89, mrp: 129, discount: 31 },
      { weight: "25 pcs (5 inch)", price: 199, mrp: 299, discount: 33 },
      { weight: "50 pcs (5 inch)", price: 379, mrp: 599, discount: 37 },
    ],
    rating: 4.7,
    reviews: 8934,
    image: "/cracker-sparklers.jpg",
    badge: "SAFEST",
    badgeColor: "bg-green-600",
    description: "Premium golden sparklers, safe for all ages during Diwali",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 8,
    name: "Colored Pencil Sparklers",
    brand: "Festival",
    categoryId: 2,
    variants: [
      { weight: "12 pcs (Rainbow)", price: 129, mrp: 179, discount: 28 },
      { weight: "24 pcs (Rainbow)", price: 249, mrp: 359, discount: 31 },
    ],
    rating: 4.5,
    reviews: 4532,
    image: "https://images.unsplash.com/photo-1545559710-7d82b8b1371e?w=300&h=300&fit=crop",
    badge: "COLORFUL",
    badgeColor: "bg-purple-600",
    description: "Colorful pencil sparklers for beautiful Diwali celebrations",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 9,
    name: "Fancy Light Sparklers",
    brand: "Crackers Central",
    categoryId: 2,
    variants: [
      { weight: "8 pcs (Fancy)", price: 149, mrp: 219, discount: 32 },
      { weight: "16 pcs (Fancy)", price: 279, mrp: 439, discount: 36 },
    ],
    rating: 4.6,
    reviews: 2134,
    image: "https://images.unsplash.com/photo-1545559710-7d82b8b1371e?w=300&h=300&fit=crop",
    description: "Fancy light effects sparklers for magical Diwali moments",
    inStock: true,
    deliveryTime: "Same Day"
  },
  // Mega Assortment Packs (categoryId: 3)
  {
    id: 10,
    name: "Diwali Assortment - Standard",
    brand: "Crackers Central",
    categoryId: 3,
    variants: [
      { weight: "Mixed 150 pcs", price: 599, mrp: 899, discount: 33 },
      { weight: "Mixed 300 pcs", price: 1099, mrp: 1799, discount: 39 },
    ],
    rating: 4.5,
    reviews: 12453,
    image: "/cracker-assortment.jpg",
    badge: "MEGA PACK",
    badgeColor: "bg-red-600",
    description: "Complete Diwali assortment with all cracker types",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 11,
    name: "Festival Special Combo",
    brand: "Festival",
    categoryId: 3,
    variants: [
      { weight: "Family Pack (200 pcs)", price: 799, mrp: 1199, discount: 33 },
      { weight: "Grand Pack (500 pcs)", price: 1799, mrp: 2999, discount: 40 },
    ],
    rating: 4.4,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    badge: "ECONOMY",
    badgeColor: "bg-yellow-500",
    description: "Best value festival combo with variety of crackers",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 12,
    name: "Premium Celebration Pack",
    brand: "Crackers Central",
    categoryId: 3,
    variants: [
      { weight: "Deluxe Mix (250 pcs)", price: 1299, mrp: 1899, discount: 32 },
      { weight: "Supreme Pack (600 pcs)", price: 2299, mrp: 3799, discount: 40 },
    ],
    rating: 4.6,
    reviews: 6789,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    badge: "PREMIUM",
    badgeColor: "bg-purple-600",
    description: "Premium celebration pack with finest selection of crackers",
    inStock: true,
    deliveryTime: "Same Day"
  },
  // Budget Friendly (categoryId: 4)
  {
    id: 13,
    name: "Budget Bomb Pack",
    brand: "Economy",
    categoryId: 4,
    variants: [
      { weight: "Small Box (25 pcs)", price: 49, mrp: 79, discount: 38 },
      { weight: "Medium Box (50 pcs)", price: 89, mrp: 149, discount: 40 },
    ],
    rating: 4.1,
    reviews: 4532,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=300&fit=crop",
    badge: "BUDGET",
    badgeColor: "bg-green-600",
    description: "Affordable bomb crackers for budget-conscious celebrations",
    inStock: true,
    deliveryTime: "Next Day"
  },
  {
    id: 14,
    name: "Value Pack Sparklers",
    brand: "Economy",
    categoryId: 4,
    variants: [
      { weight: "6 pcs", price: 29, mrp: 49, discount: 41 },
      { weight: "12 pcs", price: 49, mrp: 99, discount: 51 },
    ],
    rating: 4.0,
    reviews: 2876,
    image: "https://images.unsplash.com/photo-1545559710-7d82b8b1371e?w=300&h=300&fit=crop",
    badge: "ECONOMY",
    badgeColor: "bg-yellow-500",
    description: "Economy sparklers for everyday Diwali fun",
    inStock: true,
    deliveryTime: "Next Day"
  },
  {
    id: 15,
    name: "Student Special Mix",
    brand: "Economy",
    categoryId: 4,
    variants: [
      { weight: "80 pcs Mixed", price: 199, mrp: 349, discount: 43 },
      { weight: "160 pcs Mixed", price: 349, mrp: 699, discount: 50 },
    ],
    rating: 4.2,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=300&fit=crop",
    description: "Value-for-money mixed crackers for students and families",
    inStock: true,
    deliveryTime: "Next Day"
  },
  // Special Themed Packs (categoryId: 5)
  {
    id: 16,
    name: "Gold Rush Luxury Collection",
    brand: "Crackers Central",
    categoryId: 5,
    variants: [
      { weight: "Premium Selection (100 pcs)", price: 899, mrp: 1299, discount: 31 },
    ],
    rating: 4.8,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1576091160550-112173f1f664?w=300&h=300&fit=crop",
    badge: "LUXURY",
    badgeColor: "bg-yellow-600",
    description: "Luxurious gold-themed crackers for premium celebrations",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 17,
    name: "Magic Sparkle Supreme",
    brand: "Festival",
    categoryId: 5,
    variants: [
      { weight: "Deluxe Pack (120 pcs)", price: 649, mrp: 999, discount: 35 },
    ],
    rating: 4.7,
    reviews: 789,
    image: "https://images.unsplash.com/photo-1576091160550-112173f1f664?w=300&h=300&fit=crop",
    badge: "MAGICAL",
    badgeColor: "bg-purple-600",
    description: "Magical effects crackers with premium quality assurance",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 18,
    name: "Rainbow Festival Bundle",
    brand: "Crackers Central",
    categoryId: 5,
    variants: [
      { weight: "Complete Bundle (180 pcs)", price: 799, mrp: 1199, discount: 33 },
    ],
    rating: 4.6,
    reviews: 432,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    badge: "COLORFUL",
    badgeColor: "bg-pink-600",
    description: "Rainbow-themed cracker bundle for vibrant celebrations",
    inStock: true,
    deliveryTime: "Same Day"
  },
  // Additional Premium Items
  {
    id: 19,
    name: "Thunder Mega Cracker",
    brand: "Festival",
    categoryId: 1,
    variants: [
      { weight: "1 Box (30 pcs)", price: 299, mrp: 449, discount: 33 },
      { weight: "2 Boxes (60 pcs)", price: 549, mrp: 898, discount: 39 },
    ],
    rating: 4.5,
    reviews: 1987,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=300&fit=crop",
    badge: "POWERFUL",
    badgeColor: "bg-red-600",
    description: "Powerful thunder crackers for maximum impact celebrations",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 20,
    name: "Eco-Friendly Green Sparklers",
    brand: "Eco Crackers",
    categoryId: 2,
    variants: [
      { weight: "15 pcs", price: 149, mrp: 199, discount: 25 },
      { weight: "30 pcs", price: 279, mrp: 399, discount: 30 },
    ],
    rating: 4.7,
    reviews: 2345,
    image: "https://images.unsplash.com/photo-1545559710-7d82b8b1371e?w=300&h=300&fit=crop",
    badge: "ECO",
    badgeColor: "bg-green-600",
    description: "Environment-friendly green sparklers for conscious celebrations",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 21,
    name: "Diamond Ring Crackers",
    brand: "Crackers Central",
    categoryId: 1,
    variants: [
      { weight: "1 Pack (35 pcs)", price: 179, mrp: 259, discount: 31 },
      { weight: "2 Packs (70 pcs)", price: 329, mrp: 518, discount: 37 },
    ],
    rating: 4.3,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=300&fit=crop",
    description: "Ring-shaped crackers with sparkling effects",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 22,
    name: "Supreme Mix 1000pcs Bundle",
    brand: "Crackers Central",
    categoryId: 3,
    variants: [
      { weight: "Mega Bundle (1000 pcs)", price: 3999, mrp: 6999, discount: 43 },
    ],
    rating: 4.7,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    badge: "MEGA",
    badgeColor: "bg-red-600",
    description: "Ultimate mega bundle with 1000 pieces of assorted crackers",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 23,
    name: "Party Pop Crackers",
    brand: "Festival",
    categoryId: 1,
    variants: [
      { weight: "1 Box (40 pcs)", price: 129, mrp: 189, discount: 32 },
      { weight: "2 Boxes (80 pcs)", price: 239, mrp: 378, discount: 37 },
    ],
    rating: 4.2,
    reviews: 543,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=300&fit=crop",
    badge: "PARTY",
    badgeColor: "bg-purple-600",
    description: "Fun party pop crackers for celebration enthusiasts",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 24,
    name: "Starlight Premium Assort",
    brand: "Crackers Central",
    categoryId: 3,
    variants: [
      { weight: "Elite Pack (280 pcs)", price: 1299, mrp: 1999, discount: 35 },
      { weight: "Royal Pack (450 pcs)", price: 1899, mrp: 3099, discount: 39 },
    ],
    rating: 4.6,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    badge: "STARLIGHT",
    badgeColor: "bg-yellow-600",
    description: "Starlight premium assortment for unforgettable celebrations",
    inStock: true,
    deliveryTime: "Same Day"
  },
  {
    id: 25,
    name: "Festival Garden Sparkler Set",
    brand: "Festival",
    categoryId: 2,
    variants: [
      { weight: "20 pcs Mixed", price: 199, mrp: 299, discount: 33 },
      { weight: "40 pcs Mixed", price: 379, mrp: 599, discount: 37 },
    ],
    rating: 4.4,
    reviews: 654,
    image: "https://images.unsplash.com/photo-1545559710-7d82b8b1371e?w=300&h=300&fit=crop",
    badge: "GARDEN",
    badgeColor: "bg-green-600",
    description: "Garden-safe sparkler set for family celebrations",
    inStock: true,
    deliveryTime: "Same Day"
  },
];

export const getAllProducts = (): Product[] => {
  return products;
};
