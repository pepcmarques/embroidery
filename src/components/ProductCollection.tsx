// src/components/ProductCollection.tsx
'use client';

import { Product } from '../components/ui/product.types';
import Image from 'next/image';
import { Card, CardContent } from '../components/ui/Card';

interface ProductCollectionProps {
  product: Product; // expects a product that has `group` and `groupItems`
  onClick: () => void;
}

export const ProductCollection = ({
  product,
  onClick,
}: ProductCollectionProps) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 border border-embroidery-border hover:border-embroidery-primary">
      <div onClick={onClick}>
        <div className="aspect-square overflow-hidden rounded-t-lg bg-embroidery-accent cursor-pointer">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
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
              {product.group ?? product.name} Collection
            </h3>
            <div className="flex items-center space-x-1 text-sm text-embroidery-muted">
              <span>Open</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
