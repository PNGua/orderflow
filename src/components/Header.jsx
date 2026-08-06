import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Facebook, Instagram, Youtube, Search, ShoppingCart, User, Menu, ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";
import Navbar from '@/components/Navbar';
import ServicesMegaMenu from '@/components/ServicesMegaMenu';

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const menuRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto flex flex-wrap items-center justify-between text-xs px-4 lg:px-8 gap-2">
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3" />
            <span>+38 073 933 88 95</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <a href="#" className="hover:opacity-80"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:opacity-80"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:opacity-80"><Youtube className="w-3.5 h-3.5" /></a>
            </div>
            <Link to="/calculator" className="px-3 py-1 rounded-full border border-white/60 hover:bg-white/20 transition-colors">Калькулятор</Link>
            <Link to="/qna" className="hover:opacity-80">Q&A</Link>
            <Link to="/delivery" className="hover:opacity-80">Оплата і доставка</Link>
            <Link to="/cabinet" className="flex items-center gap-1 hover:opacity-80">
              <User className="w-3 h-3" />
              Вхід/Реєстрація
            </Link>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6 py-3 px-4 lg:px-8">
        {/* Left: logo + Замовити друк button (with mega-menu) */}
        <div className="flex items-center gap-4 justify-self-start order-1">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="https://media.base44.com/images/public/69d39217874c6fe682eac60a/6122d3bff_PNGdruklogohorizontalblack.png"
              alt="PNG druk — фабрика друку та брендування"
              className="h-14 w-auto"
            />
          </Link>
          <div className="relative shrink-0" ref={menuRef}>
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-colors"
            >
              <Menu className="w-4 h-4" />
              Замовити друк
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesOpen && <ServicesMegaMenu onClose={() => setServicesOpen(false)} />}
          </div>
        </div>

        {/* Middle navigation */}
        <Navbar />

        {/* Search + Cart */}
        <div className="flex items-center justify-end gap-2 justify-self-end order-2 lg:order-3">
          <div className="relative" ref={searchRef}>
            {searchOpen ? (
              <div className="relative animate-in fade-in slide-in-from-right-2 duration-200">
                <Input
                  type="text"
                  autoFocus
                  placeholder="Я шукаю..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                  className="pl-4 pr-10 py-2 rounded-full border border-input w-56 lg:w-72"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors"
                aria-label="Пошук"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors"
            aria-label="Кошик"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}