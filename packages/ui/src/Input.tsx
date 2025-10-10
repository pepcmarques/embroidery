import { forwardRef } from 'react';
import { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-embroidery-secondary mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            block w-full px-3 py-2 border border-embroidery-border rounded-md shadow-sm placeholder-embroidery-muted
            focus:outline-none focus:ring-embroidery-primary focus:border-embroidery-primary
            disabled:bg-embroidery-accent disabled:cursor-not-allowed
            text-embroidery-secondary
            ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
