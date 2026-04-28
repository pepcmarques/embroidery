'use client';

import Link from 'next/link';

type HeaderMenuProps = {
  pathname: string;
  variant: 'desktop' | 'mobile';
  onLinkClick?: () => void;
};

const menuItems = [
  { href: '/about', label: 'About' },
  { href: '/', label: 'Pieces' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/resources', label: 'Resources' },
];

export const HeaderMenu = ({ pathname, variant, onLinkClick }: HeaderMenuProps) => {
  if (variant === 'desktop') {
    return (
      <nav className="hidden md:flex space-x-8">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              pathname === item.href
                ? 'text-embroidery-primary border-b-2 border-embroidery-primary'
                : 'text-embroidery-secondary hover:text-embroidery-primary'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <div className="space-y-2">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onLinkClick}
          className={`block px-3 py-2 text-base font-medium ${
            pathname === item.href
              ? 'text-embroidery-primary bg-embroidery-primary/10 rounded-md'
              : 'text-embroidery-secondary hover:text-embroidery-primary'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};