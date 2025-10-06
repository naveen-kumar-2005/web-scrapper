
export enum Platform {
  AMAZON = 'Amazon',
  FLIPKART = 'Flipkart',
  EBAY = 'eBay',
  WALMART = 'Walmart',
}

export interface Product {
  id: string;
  platform: Platform;
  title: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  productUrl: string;
  imageUrl: string;
  isAvailable: boolean;
}

export interface FilterOptions {
  platforms: Platform[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

export interface SortOptions {
  key: keyof Pick<Product, 'price' | 'rating' | 'reviewCount'>;
  direction: 'asc' | 'desc';
}
