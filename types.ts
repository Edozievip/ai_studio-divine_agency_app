
export interface Product {
  id: string;
  name: string;
  category: 'Cement' | 'Roofing' | 'Tiles' | 'Reinforcement' | 'Aggregates' | 'Hardware';
  price: number;
  description: string;
  image: string;
  inStock: boolean;
  unit: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  timestamp: number;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'completed';
}

export interface Inquiry {
  id: string;
  timestamp: number;
  name: string;
  phone: string;
  message: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
}
