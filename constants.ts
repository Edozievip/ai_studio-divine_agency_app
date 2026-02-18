
import { Product, Blog } from './types';

export const WHATSAPP_NUMBER = '2348107189127';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const BUSINESS_LOCATION = 'Anambra State, Nigeria';

export const PRODUCTS: Product[] = [
  {
    id: 'cem-01',
    name: 'Dangote Cement 3X',
    category: 'Cement',
    price: 9500,
    unit: 'bag',
    description: 'Quality 42.5 grade Dangote cement for all construction needs.',
    image: 'https://picsum.photos/seed/cement/600/600',
    inStock: true
  },
  {
    id: 'zinc-01',
    name: 'Aluminum Roofing Sheet',
    category: 'Roofing',
    price: 4500,
    unit: 'meter',
    description: 'Durable 0.45mm aluminum roofing sheets, available in multiple colors.',
    image: 'https://picsum.photos/seed/roof/600/600',
    inStock: true
  },
  {
    id: 'rod-12',
    name: '12mm Reinforcement Rod',
    category: 'Reinforcement',
    price: 12500,
    unit: 'length',
    description: 'High-tensile 12mm TMT steel bars for structural reinforcement.',
    image: 'https://picsum.photos/seed/steel/600/600',
    inStock: true
  },
  {
    id: 'rod-16',
    name: '16mm Reinforcement Rod',
    category: 'Reinforcement',
    price: 18500,
    unit: 'length',
    description: 'Industrial grade 16mm TMT bars for heavy construction.',
    image: 'https://picsum.photos/seed/rod16/600/600',
    inStock: true
  },
  {
    id: 'tile-01',
    name: 'Ceramic Floor Tiles (60x60)',
    category: 'Tiles',
    price: 8500,
    unit: 'carton',
    description: 'Elegant polished ceramic floor tiles for modern interiors.',
    image: 'https://picsum.photos/seed/tiles/600/600',
    inStock: true
  },
  {
    id: 'sand-01',
    name: 'Sharp Sand (Full Tipper)',
    category: 'Aggregates',
    price: 45000,
    unit: 'trip',
    description: 'Clean sharp sand for concrete work and plastering.',
    image: 'https://picsum.photos/seed/sand/600/600',
    inStock: true
  },
  {
    id: 'granite-01',
    name: 'Granite 3/4 (Full Tipper)',
    category: 'Aggregates',
    price: 85000,
    unit: 'trip',
    description: 'Premium crushed granite stones for strong concrete foundations.',
    image: 'https://picsum.photos/seed/granite/600/600',
    inStock: true
  },
  {
    id: 'nail-01',
    name: '3-inch Iron Nails',
    category: 'Hardware',
    price: 15000,
    unit: 'bag',
    description: 'Strong galvanized iron nails for woodworking and roofing.',
    image: 'https://picsum.photos/seed/nails/600/600',
    inStock: true
  }
];

export const BLOG_POSTS: Blog[] = [
  {
    id: 'blog-1',
    title: 'How to Choose the Right Cement for Your Building',
    excerpt: 'Not all cement grades are equal. Learn which one fits your specific structural needs.',
    content: 'Long form content about cement grades...',
    date: 'Oct 12, 2023',
    image: 'https://picsum.photos/seed/blog1/800/400'
  },
  {
    id: 'blog-2',
    title: 'Current Price Updates for Construction Materials in Nigeria',
    excerpt: 'Stay informed with the latest market shifts in Anambra and beyond.',
    content: 'Long form content about market prices...',
    date: 'Oct 15, 2023',
    image: 'https://picsum.photos/seed/blog2/800/400'
  }
];
