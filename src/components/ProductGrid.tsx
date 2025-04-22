
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { useProducts } from "@/hooks/useProducts";
import ProductGridSkeleton from "./ProductGridSkeleton";
import ProductGridError from "./ProductGridError";
import ProductGridEmpty from "./ProductGridEmpty";
import ProductPagination from "./ProductPagination";

interface ProductGridProps {
  searchQuery?: string;
  categoryFilter?: string;
  limit?: number;
}

const ProductGrid = ({ 
  searchQuery = "", 
  categoryFilter,
  limit
}: ProductGridProps) => {
  const [sortOption, setSortOption] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<{ min: number | null; max: number | null }>({
    min: null,
    max: null
  });
  const itemsPerPage = limit || 12;

  const {
    products,
    suggestedProducts,
    loading,
    error,
    totalItems,
    fetchProducts
  } = useProducts({
    searchQuery,
    sortOption,
    currentPage,
    priceRange,
    categoryFilter,
    limit
  });

  const handleSortChange = (sortOpt: string) => {
    setSortOption(sortOpt);
    setCurrentPage(1);
  };

  const handlePriceFilterChange = (min: number | null, max: number | null) => {
    setPriceRange({ min, max });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  return (
    <div>
      {!limit && (
        <FilterBar 
          onSortChange={handleSortChange} 
          totalResults={loading ? 0 : products.length} 
          onPriceFilterChange={handlePriceFilterChange}
        />
      )}
      
      {error && (
        <ProductGridError error={error} onRetry={fetchProducts} />
      )}
      
      {loading ? (
        <ProductGridSkeleton count={limit || 12} />
      ) : products.length === 0 && suggestedProducts.length === 0 ? (
        <ProductGridEmpty onRefresh={fetchProducts} />
      ) : (
        <>
          {products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          {products.length === 0 && suggestedProducts.length > 0 && (
            <div>
              <div className="text-center py-6">
                <p className="text-xl text-gray-600 mb-2">No exact matches found</p>
                <p className="text-gray-500 mb-6">
                  Here are some similar products you might be interested in:
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {suggestedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
          
          {!limit && products.length > 0 && totalPages > 1 && (
            <ProductPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;
