'use client';

import { useState } from 'react';
import { Button, ThemeToggle } from '@repo/ui';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { AuthModal } from './auth/AuthModal';
import { UserDropdown } from './auth/UserDropdown';

export const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user } = useAuth();
  const { itemCount } = useCart();

  const openLoginModal = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="bg-embroidery-surface border-b border-embroidery-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="text-2xl font-bold text-embroidery-primary"
              >
                Embroidery
              </a>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="/"
                className="text-embroidery-secondary hover:text-embroidery-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Products
              </a>
              <a
                href="/categories"
                className="text-embroidery-secondary hover:text-embroidery-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Categories
              </a>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Cart */}
              <button
                className="relative p-2 text-embroidery-secondary hover:text-embroidery-primary transition-colors"
                onClick={() => {
                  /* TODO: Open cart drawer */
                }}
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H17M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-embroidery-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Auth */}
              {user ? (
                <UserDropdown />
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="md" onClick={openLoginModal}>
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={openRegisterModal}
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <button className="md:hidden p-2 text-embroidery-secondary hover:text-embroidery-primary">
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-embroidery-border py-4">
            <div className="space-y-2">
              <a
                href="/"
                className="block text-embroidery-secondary hover:text-embroidery-primary px-3 py-2 text-base font-medium"
              >
                Products
              </a>
              <a
                href="/categories"
                className="block text-embroidery-secondary hover:text-embroidery-primary px-3 py-2 text-base font-medium"
              >
                Categories
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};
