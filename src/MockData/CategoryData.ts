export interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description?: string;
  image: string;
  subcategories: SubCategory[];
}

export const categories: Category[] = [
  { 
    id: 1, 
    name: 'Premium Firecrackers', 
    slug: 'firecrackers', 
    icon: '🎆',
    description: 'Premium firecrackers for spectacular celebrations',
    image: '/cracker-atom-bomb.jpg',
    subcategories: [
      { id: 101, name: 'Atom Bombs', slug: 'atom-bombs' },
      { id: 102, name: 'Lakshmi Crackers', slug: 'lakshmi-crackers' },
      { id: 103, name: 'Compound Crackers', slug: 'compound-crackers' },
      { id: 104, name: 'Flower Pots', slug: 'flower-pots' },
      { id: 105, name: 'Rockets', slug: 'rockets' },
      { id: 106, name: 'Chakkri', slug: 'chakkri' },
    ]
  },
  { 
    id: 2, 
    name: 'Sparklers & Lights', 
    slug: 'sparklers', 
    icon: '✨',
    description: 'Beautiful sparklers for safe celebrations',
    image: '/cracker-sparklers.jpg',
    subcategories: [
      { id: 201, name: 'Golden Sparklers', slug: 'golden-sparklers' },
      { id: 202, name: 'Colored Sparklers', slug: 'colored-sparklers' },
      { id: 203, name: 'Fancy Lights', slug: 'fancy-lights' },
      { id: 204, name: 'Pencil Sparklers', slug: 'pencil-sparklers' },
      { id: 205, name: 'Eco-Friendly', slug: 'eco-friendly-sparklers' },
      { id: 206, name: 'Garden Safe', slug: 'garden-safe' },
    ]
  },
  { 
    id: 3, 
    name: 'Mega Assortment Packs', 
    slug: 'mega-assortment', 
    icon: '📦',
    description: 'Complete cracker packages for all celebrations',
    image: '/cracker-assortment.jpg',
    subcategories: [
      { id: 301, name: 'Family Packs', slug: 'family-packs' },
      { id: 302, name: 'Festival Combos', slug: 'festival-combos' },
      { id: 303, name: 'Deluxe Collections', slug: 'deluxe-collections' },
      { id: 304, name: 'Mega Bundles', slug: 'mega-bundles' },
      { id: 305, name: 'Premium Assorts', slug: 'premium-assorts' },
    ]
  },
  { 
    id: 4, 
    name: 'Budget Friendly', 
    slug: 'budget-friendly', 
    icon: '💰',
    description: 'Affordable crackers for everyone',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=300&fit=crop',
    subcategories: [
      { id: 401, name: 'Economy Bombs', slug: 'economy-bombs' },
      { id: 402, name: 'Value Sparklers', slug: 'value-sparklers' },
      { id: 403, name: 'Student Special', slug: 'student-special' },
      { id: 404, name: 'Small Packs', slug: 'small-packs' },
    ]
  },
  { 
    id: 5, 
    name: 'Luxury Themed', 
    slug: 'luxury-themed', 
    icon: '👑',
    description: 'Premium luxury cracker collections',
    image: 'https://images.unsplash.com/photo-1576091160550-112173f1f664?w=300&h=300&fit=crop',
    subcategories: [
      { id: 501, name: 'Gold Rush', slug: 'gold-rush' },
      { id: 502, name: 'Magic Sparkle', slug: 'magic-sparkle' },
      { id: 503, name: 'Rainbow Festival', slug: 'rainbow-festival' },
      { id: 504, name: 'Starlight', slug: 'starlight' },
      { id: 505, name: 'Diamond Ring', slug: 'diamond-ring' },
      { id: 506, name: 'Supreme Mix', slug: 'supreme-mix' },
    ]
  },
];

export const getCategoryById = (id: number): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};
