
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/components/ProductCard";
import { toast } from "sonner";

interface UseProductsProps {
  searchQuery: string;
  sortOption: string;
  currentPage: number;
  priceRange: {
    min: number | null;
    max: number | null;
  };
  categoryFilter?: string;
  limit?: number;
}

export const useProducts = ({ 
  searchQuery, 
  sortOption, 
  currentPage, 
  priceRange,
  categoryFilter,
  limit
}: UseProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [lastSearchTime, setLastSearchTime] = useState(Date.now());
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchProducts = async () => {
    // Cancel any previous in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    setError(null);
    setLastSearchTime(Date.now());

    try {
      console.log(`Fetching products. Query: "${searchQuery}", Sort: ${sortOption}, Page: ${currentPage}, Price range: ${priceRange.min}-${priceRange.max}, Category: ${categoryFilter || 'all'}`);
      const itemsPerPage = limit || 12;
      const offset = (currentPage - 1) * itemsPerPage;
      
      // Call the Supabase edge function
      const { data, error } = await supabase.functions.invoke('search-products', {
        body: {
          searchTerm: searchQuery,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          sortBy: sortOption,
          sortOrder: sortOption === 'price-high' ? 'desc' : 'asc',
          limit: itemsPerPage,
          offset: offset,
          discounted: false, // Can be made dynamic based on UI filters
          categoryFilter: categoryFilter, // Pass the category filter to the backend
        },
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to fetch products");
      }

      console.log("Edge function response:", data);
      
      if (data.error) {
        console.error("Search API error:", data.error);
        throw new Error(data.error);
      }

      if (data.products) {
        setProducts(data.products);
        setTotalItems(data.total || data.products.length);
      } else {
        setProducts([]);
        setTotalItems(0);
      }

      if (data.suggestedProducts) {
        setSuggestedProducts(data.suggestedProducts);
      } else {
        setSuggestedProducts([]);
      }
      
    } catch (err: any) {
      // Don't set error if it was due to request abortion
      if (err.name !== 'AbortError') {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
        toast.error("Failed to fetch products");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    
    // Clean up previous timer if it exists
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }
    
    // Set up timer to auto-refresh results
    refreshIntervalRef.current = setInterval(() => {
      if (Date.now() - lastSearchTime > 30000) { // 30 seconds
        console.log("Auto-refreshing search results");
        fetchProducts();
      }
    }, 30000); // Check every 30 seconds
    
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchQuery, sortOption, currentPage, priceRange.min, priceRange.max, categoryFilter, limit]);

  return {
    products,
    suggestedProducts,
    loading,
    error,
    totalItems,
    fetchProducts
  };
};
