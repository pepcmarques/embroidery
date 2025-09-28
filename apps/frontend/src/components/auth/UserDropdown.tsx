'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@repo/ui';

export const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-embroidery-secondary hover:text-embroidery-neutral focus:outline-none"
      >
        <div className="w-8 h-8 bg-embroidery-primary rounded-full flex items-center justify-center text-white font-medium text-sm">
          {user.name
            ? user.name.charAt(0).toUpperCase()
            : user.email.charAt(0).toUpperCase()}
        </div>
        <span className="hidden md:block">{user.name || user.email}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-embroidery-surface rounded-md shadow-lg py-1 z-50 border border-embroidery-border">
          <div className="px-4 py-2 border-b border-embroidery-border">
            <p className="text-sm font-medium text-embroidery-neutral">
              {user.name}
            </p>
            <p className="text-sm text-embroidery-muted">{user.email}</p>
          </div>

          <a
            href="/orders"
            className="block px-4 py-2 text-sm text-embroidery-secondary hover:bg-embroidery-muted"
            onClick={() => setIsOpen(false)}
          >
            My Orders
          </a>

          {user.is_admin && (
            <a
              href="/admin"
              className="block px-4 py-2 text-sm text-embroidery-secondary hover:bg-embroidery-muted"
              onClick={() => setIsOpen(false)}
            >
              Admin Panel
            </a>
          )}

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-embroidery-danger hover:bg-embroidery-danger/10"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
