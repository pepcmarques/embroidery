'use client';

import { ThemeSwitcher } from '@repo/ui';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { IconCopy, IconCheck, IconMenu2 } from '@tabler/icons-react';

export const Header = () => {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('racheltorres.uff@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };
  return (
    <>
      <header className="bg-embroidery-surface opacity-90 border-b border-embroidery-border sticky top-0 z-40">
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
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === '/'
                    ? 'text-embroidery-primary border-b-2 border-embroidery-primary'
                    : 'text-embroidery-secondary hover:text-embroidery-primary'
                }`}
              >
                Products
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === '/about'
                    ? 'text-embroidery-primary border-b-2 border-embroidery-primary'
                    : 'text-embroidery-secondary hover:text-embroidery-primary'
                }`}
              >
                About
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Contact Email - Desktop Only */}
              <div className="hidden lg:flex items-center">
                <button
                  onClick={copyEmail}
                  className="text-sm text-embroidery-secondary hover:text-embroidery-primary transition-colors flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-embroidery-primary/10"
                  title="Click to copy email address"
                >
                  {copied ? (
                    <>
                      <IconCheck className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <IconCopy className="w-4 h-4" />
                      <span>Contact</span>
                    </>
                  )}
                </button>
              </div>{' '}
              {/* Theme Toggle */}
              <ThemeSwitcher />
              {/* Mobile menu button */}
              <button className="md:hidden p-2 text-embroidery-secondary hover:text-embroidery-primary">
                <IconMenu2 className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-embroidery-border py-4">
            <div className="space-y-2">
              <Link
                href="/"
                className={`block px-3 py-2 text-base font-medium ${
                  pathname === '/'
                    ? 'text-embroidery-primary bg-embroidery-primary/10 rounded-md'
                    : 'text-embroidery-secondary hover:text-embroidery-primary'
                }`}
              >
                Products
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 text-base font-medium ${
                  pathname === '/about'
                    ? 'text-embroidery-primary bg-embroidery-primary/10 rounded-md'
                    : 'text-embroidery-secondary hover:text-embroidery-primary'
                }`}
              >
                About
              </Link>

              {/* Contact Email - Mobile */}
              {/* Contact Email - Mobile */}
              <div className="border-t border-embroidery-border pt-3 mt-3">
                <button
                  onClick={copyEmail}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-embroidery-secondary hover:text-embroidery-primary transition-colors w-full text-left rounded-md hover:bg-embroidery-primary/10"
                >
                  {copied ? (
                    <>
                      <IconCheck className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">Email copied!</span>
                    </>
                  ) : (
                    <>
                      <IconCopy className="w-4 h-4" />
                      <span>Copy Email: racheltorres.uff@gmail.com</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
