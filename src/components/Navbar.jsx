import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import ServicesMegaMenu from '@/components/ServicesMegaMenu';

const NAV_ITEMS = [
  { label: 'Головна', to: '/' },
  { label: 'Технології друку', to: '/dtf-print' },
];

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center gap-1">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
        >
          {item.label}
        </Link>
      ))}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setServicesOpen((v) => !v)}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
        >
          Послуги
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
        </button>
        {servicesOpen && <ServicesMegaMenu onClose={() => setServicesOpen(false)} />}
      </div>
    </nav>
  );
}