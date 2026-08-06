import React from 'react';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Головна', to: '/' },
  { label: 'Технології друку', to: '/dtf-print' },
  { label: 'Послуги', to: '/services' },
  { label: 'Блог', to: '/blog' },
  { label: 'Контакти', to: '/contacts' },
];

export default function Navbar({ className = '', light = false }) {
  return (
    <nav className={`flex items-center justify-center gap-1 flex-1 overflow-x-auto ${className}`}>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={
            light
              ? 'px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 transition-colors whitespace-nowrap'
              : 'px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors whitespace-nowrap'
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}