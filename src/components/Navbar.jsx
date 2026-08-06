import React from 'react';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Головна', to: '/' },
  { label: 'Технології друку', to: '/dtf-print' },
  { label: 'Послуги', to: '/services' },
  { label: 'Блог', to: '/blog' },
  { label: 'Контакти', to: '/contacts' },
];

export default function Navbar() {
  return (
    <nav className="flex items-center gap-1">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors whitespace-nowrap"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}