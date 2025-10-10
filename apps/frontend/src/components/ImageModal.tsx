'use client';

import { useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  isActive: boolean;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const ImageModal = ({ isOpen, onClose, product }: ImageModalProps) => {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product.image) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-75" onClick={onClose} />

      {/* Modal content */}
      <div className="relative max-w-2xl max-h-[70vh] w-full z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-embroidery-surface text-embroidery-neutral hover:text-embroidery-primary rounded-full p-2 shadow-lg transition-colors"
          aria-label="Close modal"
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

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain rounded-lg"
        />

        {/* Image caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white text-xl font-semibold mb-1">
            {product.name}
          </h3>
          <p className="text-gray-200 text-sm">{product.description}</p>
        </div>
      </div>
    </div>
  );
};
