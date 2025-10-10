'use client';

import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@repo/ui';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, itemCount } =
    useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-30 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-embroidery-surface border-l border-embroidery-border shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-embroidery-border">
          <h2 className="text-lg font-semibold text-embroidery-neutral">
            Shopping Cart - {itemCount}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-embroidery-muted hover:text-embroidery-secondary transition-colors"
            aria-label="Close cart"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg
                  className="w-16 h-16 text-embroidery-muted mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H17M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                  />
                </svg>
                <p className="text-embroidery-muted mb-2">Your cart is empty</p>
                <p className="text-sm text-embroidery-secondary">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-3 bg-embroidery-accent rounded-lg"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-16 h-16 bg-embroidery-border rounded-md overflow-hidden">
                      {item.product.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-embroidery-muted">
                          <svg
                            className="w-8 h-8"
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

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-embroidery-neutral truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-embroidery-primary font-semibold">
                        $
                        {(typeof item.product.price === 'string'
                          ? parseFloat(item.product.price)
                          : item.product.price
                        ).toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                          className="w-8 h-8 rounded-full bg-embroidery-border text-embroidery-secondary hover:bg-embroidery-primary hover:text-white transition-colors flex items-center justify-center"
                          disabled={item.quantity <= 1}
                        >
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
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="text-sm font-medium text-embroidery-neutral min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full bg-embroidery-border text-embroidery-secondary hover:bg-embroidery-primary hover:text-white transition-colors flex items-center justify-center"
                        >
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
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-embroidery-muted hover:text-embroidery-danger transition-colors"
                      aria-label="Remove item"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="border-t border-embroidery-border p-4 space-y-4 mb-20">
              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-embroidery-neutral">
                  Total:
                </span>
                <span className="text-lg font-bold text-embroidery-primary">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    onClose();
                    // TODO: Navigate to checkout
                    console.log('Navigate to checkout');
                  }}
                >
                  Checkout
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full mt-2"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
