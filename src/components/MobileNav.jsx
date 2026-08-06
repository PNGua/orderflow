import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Головна', to: '/' },
  { label: 'Технології друку', to: '/dtf-print' },
  { label: 'Послуги', to: '/services' },
  { label: 'Блог', to: '/blog' },
  { label: 'Калькулятор', href: '/#calculator' },
  { label: 'Q&A', to: '/qna' },
  { label: 'Оплата і доставка', to: '/delivery' },
  { label: 'Контакти', to: '/contacts' },
];

export default function MobileNav({ onClose }) {
  const linkCls = 'block w-full text-left px-1 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors';
  return (
    <div className="lg:hidden border-t border-border/60 bg-white shadow-sm overflow-hidden">
      <div className="container mx-auto px-4 py-2 flex flex-col">
        {NAV_ITEMS.map((item) =>
          item.href ? (
            <a key={item.label} href={item.href} onClick={onClose} className={linkCls}>
              {item.label}
            </a>
          ) : (
            <Link key={item.to} to={item.to} onClick={onClose} className={linkCls}>
              {item.label}
            </Link>
          )
        )}
      </div>
    </div>
  );
}