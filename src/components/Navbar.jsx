import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Головна', to: '/' },
  { label: 'Технології друку', to: '/technologies' },
  { label: 'Послуги', to: '/services' },
  { label: 'Блог', to: '/blog' },
  { label: 'Калькулятор', section: 'calculator' },
  { label: 'Q&A', to: '/qna' },
  { label: 'Оплата і доставка', to: '/delivery' },
  { label: 'Контакти', to: '/contacts' },
];

export default function Navbar({ className = '', light = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSection = (e, section) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 120);
    }
  };

  const links = light
    ? 'rounded-lg font-medium text-white/90 hover:text-white hover:bg-white/15 transition-colors whitespace-nowrap'
    : 'rounded-lg font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors whitespace-nowrap';

  return (
    <nav className={`navbar-nav flex items-center flex-1 overflow-x-auto overflow-y-hidden ${className}`}>
      {NAV_ITEMS.map((item) =>
        item.section ? (
          <a
            key={item.label}
            href="/#calculator"
            onClick={(e) => handleSection(e, item.section)}
            className={links}
          >
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