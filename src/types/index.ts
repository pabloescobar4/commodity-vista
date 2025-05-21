
// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'manager' | 'storekeeper';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  price: number;
  views: number;
  revenue: number;
  description?: string;
  tags?: string[];
}

// Dashboard types
export interface StatCard {
  title: string;
  value: string | number;
  trend: number;
  icon?: string;
}

export interface RecentSale {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  amount: number;
  date: string;
}

// Chart types
export interface ChartData {
  name: string;
  value: number;
}
