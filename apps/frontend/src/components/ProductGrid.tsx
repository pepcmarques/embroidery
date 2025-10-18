'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@repo/ui';
import { Button } from '@repo/ui';
import productsData from '../data/products.json';

interface ProductGridProps {
  initialProducts?: Product[];
}

const productsPerPage = 6;

export const ProductGrid = ({ initialProducts }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[] | null>(
    initialProducts || null
  );
  const [isLoading, setIsLoading] = useState(!initialProducts);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredProducts = productsData as Product[];

    // Only show active products
    filteredProducts = filteredProducts.filter((product) => product.isActive);

    setProducts(filteredProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!initialProducts) {
      fetchProducts();
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // No need to fetch products again for client-side pagination
  };

  const renderPagination = () => {
    if (!products) return null;

    const totalPages = Math.ceil(products.length / productsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
        >
          Previous
        </Button>

        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            variant={page === currentPage ? 'primary' : 'outline'}
            size="sm"
          >
            {page}
          </Button>
        ))}

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
        >
          Next
        </Button>
      </div>
    );
  };

  // Get the current page's products
  const getCurrentPageProducts = () => {
    if (!products) return [];

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    return products.slice(startIndex, endIndex);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-embroidery-primary"></div>
        </div>
      )}

      {/* Products grid */}
      {products && !isLoading && (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentPageProducts().map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-embroidery-muted mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m14 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m14 0H6m14 0l-3-3m-3 3l-3-3"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-embroidery-neutral mb-2">
                No products found
              </h3>
              <p className="text-embroidery-secondary">
                No products available at the moment.
              </p>
            </div>
          )}

          {renderPagination()}
        </>
      )}
    </div>
  );
};
