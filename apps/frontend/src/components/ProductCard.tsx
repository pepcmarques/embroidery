'use client';

import { useState } from 'react';
import { Product } from '@repo/types';
import { Button, Card, CardContent } from '@repo/ui';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (product.stock <= 0) return;

    setIsAddingToCart(true);
    try {
      await addToCart(product.id, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // TODO: Show toast notification
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-square overflow-hidden rounded-t-lg bg-embroidery-accent">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
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
          {product.category && (
            <p className="text-sm text-embroidery-secondary">
              {product.category.name}
            </p>
          )}
        </div>

        {product.description && (
          <p className="text-sm text-embroidery-secondary mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-embroidery-neutral">
              {formatPrice(product.price)}
            </span>
            <div className="text-sm text-embroidery-secondary">
              {product.stock > 0 ? (
                <span>In stock ({product.stock})</span>
              ) : (
                <span className="text-red-600">Out of stock</span>
              )}
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || isAddingToCart}
            isLoading={isAddingToCart}
            size="sm"
            variant={product.stock > 0 ? 'primary' : 'secondary'}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
