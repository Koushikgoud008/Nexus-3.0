
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductGridSkeleton = ({ count = 12 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="flex flex-col h-full">
          <Skeleton className="w-full aspect-square rounded-t-lg" />
          <div className="p-4">
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-5 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-6" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
