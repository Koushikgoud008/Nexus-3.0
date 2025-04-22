
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ProductGrid from "@/components/ProductGrid";
import { ShoppingBag, Heart, Clock, Sparkles } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
  };

  // Featured categories
  const categories = [
    {
      id: "clothing",
      name: "Clothing",
      description: "Latest fashion trends",
      icon: <ShoppingBag className="category-icon" />,
      color: "bg-peach-100",
      link: "/category/clothing"
    },
    {
      id: "top-deals",
      name: "Top Deals",
      description: "Best prices on popular items",
      icon: <Sparkles className="category-icon" />,
      color: "bg-blue-100",
      link: "/category/top-deals"
    },
    {
      id: "skincare",
      name: "Skincare",
      description: "Premium beauty products",
      icon: <Heart className="category-icon" />,
      color: "bg-peach-100",
      link: "/category/skincare"
    },
    {
      id: "smart-watches",
      name: "Smart Watches",
      description: "Latest tech wearables",
      icon: <Clock className="category-icon" />,
      color: "bg-blue-100",
      link: "/category/smart-watches"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-beige-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        {!hasSearched && (
          <section className="relative bg-beige-200 overflow-hidden">
            <div className="container-custom py-16 md:py-24 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-left animate-fade-in">
                  <h1 className="heading-xl mb-4 text-black">
                    NEW ARRIVALS
                    <span className="block text-[4rem] md:text-[6rem] font-bold leading-none">JUST</span>
                    <span className="block text-[4rem] md:text-[6rem] font-bold leading-none">FOR</span>
                    <span className="text-peach-600 font-cursive text-5xl md:text-7xl absolute -mt-10 ml-16">you</span>
                  </h1>
                  <div className="mt-12 mb-6">
                    <div className="inline-block bg-black text-white px-6 py-3">
                      FOR ONLINE ORDER
                    </div>
                    <div className="inline-block bg-peach-300 px-6 py-3 font-bold">
                      30% OFF
                    </div>
                  </div>
                  <button className="btn-primary animate-slide-in">Shop Now</button>
                </div>
                
                <div className="flex justify-center md:justify-end">
                  <div className="relative w-full max-w-md aspect-square rounded-full overflow-hidden bg-peach-300 border-8 border-white shadow-xl animate-fade-in">
                    <img 
                      src="/lovable-uploads/b159be6e-4b0d-4f54-be02-c98f08b7a720.png"
                      alt="Woman shopping"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-white rounded-l-full opacity-25"></div>
          </section>
        )}
        
        {/* Search Section */}
        <section className={`bg-beige-200 ${hasSearched ? 'py-8' : 'py-12'}`}>
          <div className="container-custom text-center">
            {!hasSearched && (
              <div className="max-w-2xl mx-auto mb-8">
                <h2 className="heading-md mb-3">Find the Best Deals Across the Web</h2>
                <p className="text-gray-600 text-lg">
                  Compare prices and discover offers from all your favorite stores in one place
                </p>
              </div>
            )}
            <SearchBar 
              onSearch={handleSearch} 
              className={hasSearched ? "" : "shadow-lg max-w-3xl mx-auto"}
            />
          </div>
        </section>

        {/* Product Grid or Categories */}
        {hasSearched ? (
          <section className="py-12">
            <div className="container-custom">
              <h2 className="heading-md mb-8">Search Results</h2>
              <ProductGrid searchQuery={searchQuery} />
            </div>
          </section>
        ) : (
          <>
            {/* Categories Section */}
            <section className="py-16">
              <div className="container-custom">
                <h2 className="heading-md text-center mb-12">Shop by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {categories.map((category, index) => (
                    <Link 
                      to={category.link} 
                      key={category.id}
                      className="category-card group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`rounded-full ${category.color} p-4 inline-flex justify-center items-center mb-4`}>
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-peach-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600">{category.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-white">
              <div className="container-custom">
                <h2 className="heading-md text-center mb-12">Popular Products</h2>
                <ProductGrid limit={8} />
              </div>
            </section>
            
            {/* Features Section */}
            <section className="py-16">
              <div className="container-custom">
                <h2 className="heading-md text-center mb-12">Why Choose Nexus?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="rounded-full bg-peach-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-peach-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M16 12l-4 4-4-4"></path>
                        <path d="M12 8v7"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Save Time</h3>
                    <p className="text-gray-600">
                      Search once and compare prices across all major e-commerce sites instantly.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="rounded-full bg-peach-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-peach-600">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Find Best Deals</h3>
                    <p className="text-gray-600">
                      Discover hidden discounts, promotions, and best offers available online.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="rounded-full bg-peach-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-peach-600">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Shop Smarter</h3>
                    <p className="text-gray-600">
                      Compare prices, reviews, and shipping options to make informed decisions.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
