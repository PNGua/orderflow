import React from 'react';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Головна', to: '/' },
  { label: 'Технології друку', to: '/dtf-print' },
  { label: 'Послуги', to: '/services' },
  { label: 'Блог', to: '/blog' },
  { label: 'Контакти', to: '/contacts' },
  { label: 'Калькулятор', href: '/#calculator' },
  { label: 'Q&A', to: '/qna' },
  { label: 'Оплата і доставка', to: '/delivery' },
];

export default function Navbar({ className = '', light = false }) {
  const links = light
    ? 'px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 transition-colors whitespace-nowrap'
    : 'px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors whitespace-nowrap';
  return (
    <nav className={`flex items-center justify-center gap-1 flex-1 overflow-x-auto ${className}`}>
      {NAV_ITEMS.map((item) =>
        item.href ? (
          <a key={item.label} href={item.href} className={links}>
            {item.label}
          </a>
        ) : (
          <Link key={item.to} to={item.to} className={links}>
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}