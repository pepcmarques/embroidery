import { ThemeSwitcher } from '@repo/ui';

export const Header = () => {
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
                href="/about"
                className="text-embroidery-secondary hover:text-embroidery-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </a>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeSwitcher />

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
                href="/about"
                className="block text-embroidery-secondary hover:text-embroidery-primary px-3 py-2 text-base font-medium"
              >
                About
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
