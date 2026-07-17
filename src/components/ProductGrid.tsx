'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../components/ui/product.types';
import { Pagination } from './Pagination';
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

    // Sort products by category
    filteredProducts = filteredProducts.sort((a, b) =>
      a.category.localeCompare(b.category)
    );

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
              {getCurrentPageProducts().map((product, index) => (
                <ProductCard key={index} product={product} />
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

          <Pagination
            currentPage={currentPage}
            totalPages={
              products ? Math.ceil(products.length / productsPerPage) : 0
            }
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
