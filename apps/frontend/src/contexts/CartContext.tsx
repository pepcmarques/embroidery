'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Product } from '@repo/types';

// Simplified Cart types for frontend-only storage
interface CartItem {
  id: string; // productId
  product: Product;
  quantity: number;
  addedAt: Date;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'embroidery_cart';

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        // Convert addedAt back to Date objects and ensure price is a number
        const cartWithDates = parsedCart.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt),
          product: {
            ...item.product,
            price:
              typeof item.product.price === 'string'
                ? parseFloat(item.product.price)
                : item.product.price,
          },
        }));
        setItems(cartWithDates);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setIsLoading(true);

    try {
      // Ensure price is a number (in case it comes from API as string)
      const normalizedProduct = {
        ...product,
        price:
          typeof product.price === 'string'
            ? parseFloat(product.price)
            : product.price,
      };

      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.id === product.id
        );

        if (existingItem) {
          // Update quantity of existing item
          return currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item
          const newItem: CartItem = {
            id: normalizedProduct.id,
            product: normalizedProduct,
            quantity,
            addedAt: new Date(),
          };
          return [...currentItems, newItem];
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price =
        typeof item.product.price === 'string'
          ? parseFloat(item.product.price)
          : item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
