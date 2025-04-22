
export interface SearchParams {
  searchTerm: string;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: string;
  sortOrder: string;
  limit: number;
  offset: number;
  category: string | null;
  featured: boolean;
  discounted: boolean;
  topRated: boolean;
}

export interface ProductSource {
  tableName: string;
  transform: (product: any) => any;
}

export interface SearchResult {
  products: any[];
  totalCount: number;
}
