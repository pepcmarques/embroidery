// src/components/GroupCarouselModal.tsx
'use client';

import { useState } from 'react';
import { Product } from '../components/ui/product.types';
import { ImageModal } from './ImageModal';

interface GroupCarouselModalProps {
  items: Product[];
  onClose: () => void;
}

export const GroupCarouselModal = ({
  items,
  onClose,
}: GroupCarouselModalProps) => {
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  if (!items || items.length === 0) return null;

  return (
    <>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-75" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-embroidery-surface rounded-lg p-6 max-w-3xl w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold mb-4">
            {items[0].group ?? 'Collection'} Collection
          </h2>
          <div className="overflow-x-auto flex space-x-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="shrink-0 w-64 p-4 border rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(item);
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover mb-2"
                />
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-sm text-embroidery-muted">
                  by {item.artist}
                </p>
              </div>
            ))}
          </div>

          {/* Image modal inside */}
          {selectedItem && (
            <ImageModal
              isOpen={true}
              onClose={() => setSelectedItem(null)}
              imageSrc={selectedItem.image}
              altText={selectedItem.name}
            />
          )}
          <button
            className="mt-4 px-4 py-2 bg-embroidery-primary text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
