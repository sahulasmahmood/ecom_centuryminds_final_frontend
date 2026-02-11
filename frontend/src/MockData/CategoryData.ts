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
    name: 'Ground Chakkars', 
    slug: 'ground-chakkars', 
    icon: '⚙️',
    description: 'Spinning ground fireworks',
    image: '/assets/images/ground_chakkars.png', // Generated image
    subcategories: [
      { id: 101, name: 'Small Chakkars', slug: 'small-chakkars' },
      { id: 102, name: 'Big Chakkars', slug: 'big-chakkars' },
      { id: 103, name: 'Special Chakkars', slug: 'special-chakkars' },
      { id: 104, name: 'Deluxe Chakkars', slug: 'deluxe-chakkars' },
    ]
  },
  { 
    id: 2, 
    name: 'Flower Pots', 
    slug: 'flower-pots', 
    icon: '🌋',
    description: 'Bright and colorful fountains',
    image: '/assets/images/flower_pots.png', // Generated image
    subcategories: [
      { id: 201, name: 'Small Flower Pots', slug: 'small-flower-pots' },
      { id: 202, name: 'Big Flower Pots', slug: 'big-flower-pots' },
      { id: 203, name: 'Special Flower Pots', slug: 'special-flower-pots' },
      { id: 204, name: 'Giant Flower Pots', slug: 'giant-flower-pots' },
      { id: 205, name: 'Color Koti', slug: 'color-koti' },
    ]
  },
  { 
    id: 3, 
    name: 'Sparklers', 
    slug: 'sparklers', 
    icon: '✨',
    description: 'Safe and colorful sparklers for everyone',
    image: '/assets/images/sparklers_box.png', // Generated image
    subcategories: [
      { id: 301, name: '7cm Sparklers', slug: '7cm-sparklers' },
      { id: 302, name: '10cm Sparklers', slug: '10cm-sparklers' },
      { id: 303, name: '12cm Sparklers', slug: '12cm-sparklers' },
      { id: 304, name: '15cm Sparklers', slug: '15cm-sparklers' },
      { id: 305, name: '30cm Sparklers', slug: '30cm-sparklers' },
      { id: 306, name: 'Colour Sparklers', slug: 'colour-sparklers' },
    ]
  },
  { 
    id: 4, 
    name: 'Aerial Shots', 
    slug: 'aerial-shots', 
    icon: '🎆',
    description: 'Sky lighting spectacular shots',
    image: '/assets/images/hero_fireworks.png',
    subcategories: [
      { id: 401, name: 'Single Shot', slug: 'single-shot' },
      { id: 402, name: 'Multi Shot (12)', slug: 'multi-shot-12' },
      { id: 403, name: 'Multi Shot (30)', slug: 'multi-shot-30' },
      { id: 404, name: 'Multi Shot (60)', slug: 'multi-shot-60' },
      { id: 405, name: 'Multi Shot (120)', slug: 'multi-shot-120' },
      { id: 406, name: 'Multi Shot (240)', slug: 'multi-shot-240' },
    ]
  },
  { 
    id: 5, 
    name: 'Rockets', 
    slug: 'rockets', 
    icon: '🚀',
    description: 'Sky soaring rockets',
    image: '/assets/images/hero_fireworks.png', // Placeholder reuse or generic
    subcategories: [
      { id: 501, name: 'Baby Rockets', slug: 'baby-rockets' },
      { id: 502, name: 'Whistling Rockets', slug: 'whistling-rockets' },
      { id: 503, name: 'Parachute Rockets', slug: 'parachute-rockets' },
    ]
  },
  { 
    id: 6, 
    name: 'Kids Special', 
    slug: 'kids-special', 
    icon: '🧸',
    description: 'Safe fireworks for kids',
    image: '/assets/images/sparklers_box.png',
    subcategories: [
      { id: 601, name: 'Pop Pop', slug: 'pop-pop' },
      { id: 602, name: 'Serpent Eggs', slug: 'serpent-eggs' },
      { id: 603, name: 'Magic Stones', slug: 'magic-stones' },
      { id: 604, name: 'Toy Pistols', slug: 'toy-pistols' },
    ]
  },
  { 
    id: 7, 
    name: 'Atom Bombs', 
    slug: 'atom-bombs', 
    icon: '💣',
    description: 'Loud noise makers',
    image: '/assets/images/ground_chakkars.png',
    subcategories: [
      { id: 701, name: 'Hydrogen Bomb', slug: 'hydrogen-bomb' },
      { id: 702, name: 'Classic Bomb', slug: 'classic-bomb' },
      { id: 703, name: 'Deluxe Bomb', slug: 'deluxe-bomb' },
    ]
  },
  { 
    id: 8, 
    name: 'Gift Boxes', 
    slug: 'gift-boxes', 
    icon: '🎁',
    description: 'Assorted gift packs for Diwali',
    image: '/assets/images/sparklers_box.png',
    subcategories: [
      { id: 801, name: 'Mini Pack', slug: 'mini-pack' },
      { id: 802, name: 'Family Pack', slug: 'family-pack' },
      { id: 803, name: 'Mega Pack', slug: 'mega-pack' },
      { id: 804, name: 'Ultimate Pack', slug: 'ultimate-pack' },
    ]
  },
  { 
    id: 9, 
    name: 'Twinkling Stars', 
    slug: 'twinkling-stars', 
    icon: '⭐',
    description: 'Beautiful twinkling star effects',
    image: '/assets/images/hero_fireworks.png',
    subcategories: [
      { id: 901, name: 'Electric Stars', slug: 'electric-stars' },
      { id: 902, name: 'Crackling Stars', slug: 'crackling-stars' },
      { id: 903, name: 'Color Stars', slug: 'color-stars' },
      { id: 904, name: 'Giant Stars', slug: 'giant-stars' },
    ]
  },
  { 
    id: 10, 
    name: 'Fancy Items', 
    slug: 'fancy-items', 
    icon: '🎪',
    description: 'Unique and fancy fireworks',
    image: '/assets/images/flower_pots.png',
    subcategories: [
      { id: 1001, name: 'Fancy Fountains', slug: 'fancy-fountains' },
      { id: 1002, name: 'Fancy Wheels', slug: 'fancy-wheels' },
      { id: 1003, name: 'Fancy Novelties', slug: 'fancy-novelties' },
      { id: 1004, name: 'Fancy Combos', slug: 'fancy-combos' },
    ]
  },
  { 
    id: 11, 
    name: 'Crackling Items', 
    slug: 'crackling-items', 
    icon: '⚡',
    description: 'Loud crackling sound effects',
    image: '/assets/images/ground_chakkars.png',
    subcategories: [
      { id: 1101, name: 'Crackling Shots', slug: 'crackling-shots' },
      { id: 1102, name: 'Crackling Fountains', slug: 'crackling-fountains' },
      { id: 1103, name: 'Crackling Wheels', slug: 'crackling-wheels' },
      { id: 1104, name: 'Crackling Combos', slug: 'crackling-combos' },
    ]
  },
  { 
    id: 12, 
    name: 'Combo Packs', 
    slug: 'combo-packs', 
    icon: '📦',
    description: 'Value combo packs with variety',
    image: '/assets/images/sparklers_box.png',
    subcategories: [
      { id: 1201, name: 'Budget Combo', slug: 'budget-combo' },
      { id: 1202, name: 'Premium Combo', slug: 'premium-combo' },
      { id: 1203, name: 'Deluxe Combo', slug: 'deluxe-combo' },
      { id: 1204, name: 'Super Combo', slug: 'super-combo' },
    ]
  },
];

export const getCategoryById = (id: number): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};
