import { useEffect } from 'react';
import { ModalProps } from './types';

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="flex justify-center fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-4 text-center">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="relative inline-block bg-embroidery-surface rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-xs w-full">
          {title && (
            <div className="px-4 py-3 border-b border-embroidery-border bg-embroidery-accent">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-embroidery-neutral mt-2">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="text-embroidery-muted hover:text-embroidery-secondary transition-colors p-1"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
          <div className="px-4 py-5 bg-embroidery-surface">{children}</div>
        </div>
      </div>
    </div>
  );
};
