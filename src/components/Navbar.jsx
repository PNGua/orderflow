import React from 'react';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Головна', to: '/' },
  { label: 'Технології друку', to: '/technologies' },
  { label: 'Послуги', to: '/services' },
  { label: 'Блог', to: '/blog' },
  { label: 'Калькулятор', href: '/#calculator' },
  { label: 'Q&A', to: '/qna' },
  { label: 'Оплата і доставка', to: '/delivery' },
  { label: 'Контакти', to: '/contacts' },
];

export default function Navbar({ className = '', light = false }) {
  const links = light
    ? 'rounded-lg font-medium text-white/90 hover:text-white hover:bg-white/15 transition-colors whitespace-nowrap'
    : 'rounded-lg font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors whitespace-nowrap';
  return (
    <nav className={`navbar-nav flex items-center flex-1 overflow-x-auto overflow-y-hidden ${className}`}>
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