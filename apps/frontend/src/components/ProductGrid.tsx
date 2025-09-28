'use client';

import { useState, useEffect } from 'react';
import { Product, PaginatedProducts } from '@repo/types';
import { ProductCard } from './ProductCard';
import { Button, Input } from '@repo/ui';

interface ProductGridProps {
  initialProducts?: PaginatedProducts;
}

export const ProductGrid = ({ initialProducts }: ProductGridProps) => {
  const [products, setProducts] = useState<PaginatedProducts | null>(
    initialProducts || null
  );
  const [isLoading, setIsLoading] = useState(!initialProducts);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async (page = 1, search = '') => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        ...(search && { search }),
      });

      const response = await fetch(
        `http://localhost:3001/api/v1/products?${params}`
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialProducts) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchProducts(1, searchTerm);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts(page, searchTerm);
  };

  const renderPagination = () => {
    if (!products || products.totalPages <= 1) return null;

    const pages = Array.from({ length: products.totalPages }, (_, i) => i + 1);

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
          disabled={currentPage === products.totalPages}
          variant="outline"
          size="sm"
        >
          Next
        </Button>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Results summary */}
      {products && (
        <div className="mb-6">
          <p className="text-embroidery-secondary">
            Showing {products.products.length} of {products.total} products
            {searchTerm && <span> for "{searchTerm}"</span>}
          </p>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-embroidery-primary"></div>
        </div>
      )}

      {/* Products grid */}
      {products && !isLoading && (
        <>
          {products.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.products.map((product) => (
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
                {searchTerm
                  ? 'Try adjusting your search criteria.'
                  : 'No products available at the moment.'}
              </p>
            </div>
          )}

          {renderPagination()}
        </>
      )}
    </div>
  );
};
