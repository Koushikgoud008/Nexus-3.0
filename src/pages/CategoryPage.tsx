
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ProductGrid from "@/components/ProductGrid";
import CategoryBanner from "@/components/CategoryBanner";
import { useProducts } from "@/hooks/useProducts";

// Category configuration
const categoryConfig = {
  clothing: {
    title: "Clothing Collection",
    description: "Discover the latest trends in fashion",
    image: "/lovable-uploads/b159be6e-4b0d-4f54-be02-c98f08b7a720.png",
    dataset: "fashion_1",
  },
  "top-deals": {
    title: "Top Deals",
    description: "The best prices across all products",
    image: "/lovable-uploads/b159be6e-4b0d-4f54-be02-c98f08b7a720.png",
    dataset: "amazon_products_1",
  },
  skincare: {
    title: "Skincare Essentials",
    description: "Premium products for your skin",
    image: "/lovable-uploads/b159be6e-4b0d-4f54-be02-c98f08b7a720.png",
    dataset: "amazon_product_2",
  },
  "smart-watches": {
    title: "Smart Watches",
    description: "Stay connected with the latest technology",
    image: "/lovable-uploads/b159be6e-4b0d-4f54-be02-c98f08b7a720.png",
    dataset: "flipkart_1",
  },
};

type CategoryKeys = keyof typeof categoryConfig;

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  
  // Get category configuration or default to clothing
  const categoryKey = category as CategoryKeys;
  const categoryData = categoryConfig[categoryKey] || categoryConfig.clothing;
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
  };
  
  // Reset search when changing categories
  useEffect(() => {
    setSearchQuery("");
    setHasSearched(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-beige-50">
      <Header activeCategory={categoryKey} />
      
      <main className="flex-grow">
        {/* Category Banner */}
        {!hasSearched && (
          <CategoryBanner 
            title={categoryData.title} 
            description={categoryData.description}
            image={categoryData.image}
          />
        )}
        
        {/* Search Section */}
        <section className={`bg-beige-200 ${hasSearched ? 'py-8' : 'py-12'}`}>
          <div className="container-custom text-center">
            <SearchBar 
              onSearch={handleSearch} 
              className={hasSearched ? "" : "shadow-lg max-w-3xl mx-auto"}
              placeholder={`Search in ${categoryData.title}...`}
            />
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="py-12">
          <div className="container-custom">
            {hasSearched ? (
              <h2 className="heading-md mb-8">Search Results</h2>
            ) : (
              <h2 className="heading-md mb-8">Featured Products</h2>
            )}
            <ProductGrid 
              searchQuery={searchQuery} 
              categoryFilter={categoryData.dataset}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
