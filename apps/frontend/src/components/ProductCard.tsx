'use client';

import { useState } from 'react';
import { Product } from '@repo/ui';
import { Card, CardContent } from '@repo/ui';
import { ImageModal } from './ImageModal';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(numericPrice);
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-shadow duration-200 border border-embroidery-border hover:border-embroidery-primary">
        <div
          className="aspect-square overflow-hidden rounded-t-lg bg-embroidery-accent cursor-pointer"
          onClick={() => product.image && setIsImageModalOpen(true)}
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-embroidery-muted">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-embroidery-neutral line-clamp-2">
              {product.name}
            </h3>
          </div>

          {/* 
          <p className="text-sm text-embroidery-muted mb-3 line-clamp-2">
            {product.description}
          </p>
          */}
        </CardContent>
      </Card>

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        product={product}
      />
    </>
  );
};
