
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Search } from "lucide-react";

interface ProductGridEmptyProps {
  onRefresh: () => void;
}

const ProductGridEmpty = ({ onRefresh }: ProductGridEmptyProps) => {
  return (
    <div className="text-center py-10 bg-gray-50 rounded-lg">
      <div className="mb-6">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
      </div>
      <p className="text-xl text-gray-600 mb-2">No products found</p>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        We couldn't find any products matching your criteria. Try adjusting your search terms or filter settings.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRefresh} className="flex items-center">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Results
        </Button>
        <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Search className="mr-2 h-4 w-4" />
          Try a New Search
        </Button>
      </div>
    </div>
  );
};

export default ProductGridEmpty;
