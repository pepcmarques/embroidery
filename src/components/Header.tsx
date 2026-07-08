'use client';

import { ThemeSwitcher } from '../components/ui/ThemeToggle';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IconCopy, IconCheck, IconMenu2, IconMail } from '@tabler/icons-react';
import { HeaderMenu } from './HeaderMenu';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('racheltorres.uff@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((open) => !open);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-embroidery-surface opacity-90 border-b border-embroidery-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="shrink-0 relative">
              <a
                href="/"
                className="text-lg font-bold text-embroidery-primary"
              >
                <div className="flex flex-col">
                  <span>Embroidering Words</span>
                  
                </div>
              </a>
            </div>

            {/* Navigation - Desktop */}
            <HeaderMenu pathname={pathname} variant="desktop" />

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Subscribe - Desktop Only */}
              <div className="hidden lg:flex items-center">
                <button
                  onClick={() => router.push('/subscribe')}
                  className="text-sm text-embroidery-secondary hover:text-embroidery-primary transition-colors flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-embroidery-primary/10"
                  title="Go to subscribe page"
                >
                  <>
                    <IconMail className="w-8 h-8" />
                    <div className="flex flex-col text-left">
                      <span>Want to know about </span>
                      <span>our next workshops?</span>
                    </div>
                  </>
                </button>
              </div>
              {/* Theme Toggle */}
              <ThemeSwitcher />
              {/* Mobile menu button */}
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-embroidery-secondary hover:text-embroidery-primary"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                <IconMenu2 className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-embroidery-border py-4">
              <HeaderMenu
                pathname={pathname}
                variant="mobile"
                onLinkClick={closeMobileMenu}
              />

              {/* Contact Email - Mobile */}
              <div className="border-t border-embroidery-border pt-3 mt-3">
                <button
                  onClick={copyEmail}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-embroidery-secondary hover:text-embroidery-primary transition-colors w-full text-left rounded-md hover:bg-embroidery-primary/10"
                >
                  {copied ? (
                    <>
                      <IconCheck className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <IconCopy className="w-4 h-4" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
                {/* Subscribe - Desktop Only */}
                <button
                  onClick={() => router.push('/subscribe')}
                  className="text-sm text-embroidery-secondary hover:text-embroidery-primary transition-colors flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-embroidery-primary/10"
                  title="Go to subscribe page"
                >
                  <>
                    <IconMail className="w-4 h-4" />
                    <span>Want to know about next workshops?</span>
                  </>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
