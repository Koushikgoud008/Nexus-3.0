
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ProductGridErrorProps {
  error: string;
  onRetry: () => void;
}

const ProductGridError = ({ error, onRetry }: ProductGridErrorProps) => {
  return (
    <Alert variant="destructive" className="my-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error}
        <div className="mt-2">
          <Button variant="outline" size="sm" onClick={onRetry} className="flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ProductGridError;
