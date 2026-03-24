export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  category: string;
  image: string;
  isFeatured: boolean;
  isActive: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: MenuItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
  type: 'delivery' | 'pickup';
  address?: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  points: number;
  tier: 'Bronze' | 'Silver' | 'Gold';
  createdAt: string;
  role?: 'admin' | 'user';
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  discount: number;
  expiresAt: string;
  image: string;
  isActive: boolean;
}

export type Category = 'Burgers' | 'Chicken' | 'Sides' | 'Drinks' | 'Desserts' | 'Breakfast';
