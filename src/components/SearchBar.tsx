
import React, { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchBar = ({
  onSearch,
  className = "",
  placeholder = "Search for products..."
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (onSearch && debouncedQuery.trim()) {
      console.log("Searching for:", debouncedQuery);
      onSearch(debouncedQuery.trim());
    }
  }, [debouncedQuery, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      console.log("Manual search for:", query);
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full max-w-3xl mx-auto ${className}`}
    >
      <div className="relative flex-grow">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pr-10 rounded-r-none h-12 text-lg"
        />
      </div>
      <Button 
        type="submit" 
        className="h-12 px-6 rounded-l-none bg-peach-600 hover:bg-peach-700"
      >
        <Search className="h-5 w-5 mr-2" />
        <span>Search</span>
      </Button>
    </form>
  );
};

export default SearchBar;
