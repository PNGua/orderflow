import React from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, ShoppingCart } from 'lucide-react';

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

export default function MobileNav({ onClose }) {
  const linkCls = 'block w-full text-left px-1 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors';
  return (
    <div className="lg:hidden border-t border-border/60 bg-white shadow-sm overflow-hidden">
      <div className="container mx-auto px-4 py-2 flex flex-col">
        <Link
          to="/catalog"
          onClick={onClose}
          className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2.5 rounded-lg font-semibold text-sm transition-colors mb-1"
        >
          <MenuIcon className="w-4 h-4" />
          Замовити друк
          <ShoppingCart className="w-4 h-4 ml-auto" />
        </Link>
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