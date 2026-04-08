/**
 * Common TypeScript types for the storefront
 */

// Product Types
export interface Product {
  id: number;
  store_id: number;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  sku: string;
  price: number;
  compare_at_price: number | null;
  cost_price: number | null;
  status: 'active' | 'draft' | 'archived';
  is_featured: boolean;
  stock_quantity: number;
  low_stock_threshold: number | null;
  weight: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
  
  // SEO fields
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  
  // Relationships
  categories?: Category[];
  images?: ProductImage[];
  primary_image?: ProductImage;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  store_id: number;
  parent_id: number | null;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  
  // SEO fields
  meta_title: string | null;
  meta_description: string | null;
  
  // Relationships
  parent?: Category;
  children?: Category[];
  products_count?: number;
  
  created_at: string;
  updated_at: string;
}

// Cart Types
export interface CartItem {
  id: string; // Local cart item ID
  product_id: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// Order Types
export interface Order {
  id: number;
  store_id: number;
  customer_id: number;
  order_number: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  fulfillment_status: 'unfulfilled' | 'partially_fulfilled' | 'fulfilled';
  
  // Amounts
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  
  // Customer info (snapshot)
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone: string;
  
  // Addresses
  shipping_address: Address;
  billing_address: Address;
  
  // Relationships
  items?: OrderItem[];
  payments?: Payment[];
  
  // Notes
  customer_notes: string | null;
  admin_notes: string | null;
  
  // Timestamps
  placed_at: string | null;
  confirmed_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number | null;
  
  // Product snapshot
  product_name: string;
  product_sku: string | null;
  product_image: string | null;
  
  quantity: number;
  unit_price: number;
  subtotal: number;
  tax_amount: number;
  total_amount: number;
}

export interface Payment {
  id: number;
  order_id: number;
  payment_method: 'cash_on_delivery' | 'card' | 'upi' | 'net_banking' | 'wallet' | 'other';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  amount: number;
  transaction_id: string | null;
  payment_gateway: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

// Customer Types
export interface Customer {
  id: number;
  store_id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string;
  status: 'active' | 'inactive' | 'banned';
  date_of_birth: string | null;
  
  // Verification
  email_verified_at: string | null;
  phone_verified_at: string | null;
  
  // Relationships
  addresses?: Address[];
  default_address?: Address;
  
  created_at: string;
  updated_at: string;
}

export interface Address {
  id?: number;
  customer_id?: number;
  type: 'billing' | 'shipping' | 'both';
  label: string | null;
  first_name: string;
  last_name: string;
  company: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  phone: string;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
}

// Store Types
export interface Store {
  id: number;
  name: string;
  slug: string;
  domain: string | null;
  logo_url: string | null;
  settings: StoreSettings;
  created_at: string;
  updated_at: string;
}

export interface StoreSettings {
  currency: string;
  timezone: string;
  language: string;
  theme?: Record<string, any>; // Flexible theme structure
  contact?: {
    email: string;
    phone: string;
    address: string;
  };
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

// Filter and Pagination Types
export interface ProductFilters {
  category_id?: number;
  search?: string;
  min_price?: number;
  max_price?: number;
  is_featured?: boolean;
  sort_by?: 'name' | 'price' | 'created_at';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}
