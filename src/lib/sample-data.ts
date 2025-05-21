
import { Product, RecentSale } from '@/types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Coffee Beans',
    category: 'Food & Beverages',
    thumbnail: '/placeholder.svg',
    price: 24.99,
    views: 1420,
    revenue: 3540.50,
    description: 'High-quality Arabica coffee beans sourced from ethical farms.',
    tags: ['coffee', 'organic', 'premium']
  },
  {
    id: '2',
    name: 'Organic Honey',
    category: 'Food & Beverages',
    thumbnail: '/placeholder.svg',
    price: 12.99,
    views: 987,
    revenue: 2565.75,
    description: 'Pure, unfiltered organic honey from mountain beehives.',
    tags: ['honey', 'organic', 'natural']
  },
  {
    id: '3',
    name: 'Extra Virgin Olive Oil',
    category: 'Food & Beverages',
    thumbnail: '/placeholder.svg',
    price: 18.50,
    views: 756,
    revenue: 1998.25,
    description: 'Cold-pressed olive oil with exceptional flavor profile.',
    tags: ['olive oil', 'gourmet', 'cooking']
  },
  {
    id: '4',
    name: 'Organic Quinoa',
    category: 'Grains',
    thumbnail: '/placeholder.svg',
    price: 9.99,
    views: 645,
    revenue: 1285.30,
    description: 'Nutrient-rich ancient grain, perfect for healthy meals.',
    tags: ['quinoa', 'organic', 'superfood']
  },
  {
    id: '5',
    name: 'Premium Chia Seeds',
    category: 'Superfoods',
    thumbnail: '/placeholder.svg',
    price: 7.50,
    views: 512,
    revenue: 865.75,
    description: 'Omega-rich chia seeds for smoothies and baking.',
    tags: ['chia', 'superfood', 'organic']
  },
  {
    id: '6',
    name: 'Himalayan Pink Salt',
    category: 'Spices',
    thumbnail: '/placeholder.svg',
    price: 6.99,
    views: 435,
    revenue: 645.20,
    description: 'Pure Himalayan salt with essential minerals.',
    tags: ['salt', 'himalayan', 'premium']
  },
  {
    id: '7',
    name: 'Organic Coconut Oil',
    category: 'Oils',
    thumbnail: '/placeholder.svg',
    price: 15.99,
    views: 398,
    revenue: 1275.60,
    description: 'Cold-pressed virgin coconut oil for cooking and skincare.',
    tags: ['coconut', 'oil', 'organic']
  },
  {
    id: '8',
    name: 'Specialty Green Tea',
    category: 'Beverages',
    thumbnail: '/placeholder.svg',
    price: 19.99,
    views: 367,
    revenue: 1379.30,
    description: 'Premium Japanese green tea with antioxidant properties.',
    tags: ['tea', 'green tea', 'japanese']
  },
];

export const sampleRecentSales: RecentSale[] = [
  {
    id: '1',
    customer: {
      name: 'Indra Maulana',
      email: 'indramaulana@gmail.com',
      avatar: '/placeholder.svg'
    },
    amount: 1500.00,
    date: '2023-05-14T08:30:00'
  },
  {
    id: '2',
    customer: {
      name: 'Indra Maulana',
      email: 'indramaulana@gmail.com',
      avatar: '/placeholder.svg'
    },
    amount: 1500.00,
    date: '2023-05-13T14:15:00'
  },
  {
    id: '3',
    customer: {
      name: 'Indra Maulana',
      email: 'indramaulana@gmail.com',
      avatar: '/placeholder.svg'
    },
    amount: 1500.00,
    date: '2023-05-12T11:45:00'
  },
  {
    id: '4',
    customer: {
      name: 'Indra Maulana',
      email: 'indramaulana@gmail.com',
      avatar: '/placeholder.svg'
    },
    amount: 1500.00,
    date: '2023-05-11T09:20:00'
  },
  {
    id: '5',
    customer: {
      name: 'Indra Maulana',
      email: 'indramaulana@gmail.com',
      avatar: '/placeholder.svg'
    },
    amount: 1500.00,
    date: '2023-05-10T16:30:00'
  },
  {
    id: '6',
    customer: {
      name: 'Indra Maulana',
      email: 'indramaulana@gmail.com',
      avatar: '/placeholder.svg'
    },
    amount: 1500.00,
    date: '2023-05-09T13:10:00'
  }
];

export const monthlyEarnings = [
  { name: 'Jan', value: 1500 },
  { name: 'Feb', value: 3800 },
  { name: 'Mar', value: 2500 },
  { name: 'Apr', value: 4200 },
  { name: 'May', value: 3000 },
  { name: 'Jun', value: 5000 },
  { name: 'Jul', value: 3500 },
  { name: 'Aug', value: 4800 },
  { name: 'Sep', value: 2000 },
  { name: 'Oct', value: 3200 },
  { name: 'Nov', value: 2800 },
  { name: 'Dec', value: 4500 },
];

export const productCategories = [
  'Food & Beverages',
  'Grains',
  'Superfoods',
  'Spices',
  'Oils',
  'Beverages',
  'Dairy',
  'Meat',
  'Produce',
  'Bakery',
];
