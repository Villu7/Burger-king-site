export const BRAND_COLORS = {
  RED: '#D62300',
  AMBER: '#F5B820',
  BROWN: '#502314',
  CREAM: '#F5EBDC',
  WHITE: '#FFFFFF',
};

export const CATEGORIES: string[] = [
  'Burgers',
  'Chicken',
  'Sides',
  'Drinks',
  'Desserts',
  'Breakfast',
];

export const MOCK_MENU_ITEMS = [
  {
    id: '1',
    name: 'Whopper®',
    description: 'Our signature flame-grilled beef patty topped with tomatoes, lettuce, mayo, ketchup, pickles, and onions.',
    price: 6.49,
    calories: 660,
    category: 'Burgers',
    image: 'https://picsum.photos/seed/whopper/400/300',
    isFeatured: true,
    isActive: true,
  },
  {
    id: '2',
    name: 'Impossible™ Whopper®',
    description: 'A flame-grilled patty made from plants, topped with tomatoes, lettuce, mayo, ketchup, pickles, and onions.',
    price: 7.49,
    calories: 630,
    category: 'Burgers',
    isFeatured: false,
    isActive: true,
    image: 'https://picsum.photos/seed/impossible/400/300',
  },
  {
    id: '3',
    name: 'Chicken Fries',
    description: 'Breaded, crispy white meat chicken in the shape of fries.',
    price: 4.99,
    calories: 280,
    category: 'Chicken',
    isFeatured: true,
    isActive: true,
    image: 'https://picsum.photos/seed/chickenfries/400/300',
  },
  {
    id: '4',
    name: 'Large Fries',
    description: 'Classic salted french fries.',
    price: 3.49,
    calories: 430,
    category: 'Sides',
    isFeatured: false,
    isActive: true,
    image: 'https://picsum.photos/seed/fries/400/300',
  },
];
