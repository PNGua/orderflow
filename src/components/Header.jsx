import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Facebook, Instagram, Youtube, ShoppingCart, UserRound, Menu, ChevronDown, Search, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MobileNav from '@/components/MobileNav';
import ServicesMegaMenu from '@/components/ServicesMegaMenu';
import { useCart } from '@/lib/CartContext';

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef(null);
  const menuRefMobile = useRef(null);
  const navigate = useNavigate();
  const { count } = useCart();

  const submitSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery('');
  };

  useEffect(() => {
    function handleClickOutside(e) {
      const insideDesktop = menuRef.current && menuRef.current.contains(e.target);
      const insideMobile = menuRefMobile.current && menuRefMobile.current.contains(e.target);
      if (!insideDesktop && !insideMobile) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-1.5">
        <div className="container mx-auto flex items-center justify-between text-xs px-4 lg:px-8 gap-3">
          {/* Left: socials (desktop) */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a href="#" className="hover:opacity-80"><Facebook className="w-3.5 h-3.5" /></a>
            <a href="#" className="hover:opacity-80"><Instagram className="w-3.5 h-3.5" /></a>
            <a href="#" className="hover:opacity-80"><Youtube className="w-3.5 h-3.5" /></a>
          </div>
          {/* Phone: right on mobile/tablet, left on desktop */}
          <div className="flex items-center gap-3 shrink-0 order-last lg:order-none lg:mr-auto">
            <Phone className="w-3 h-3" />
            <span>+38 073 933 88 95</span>
          </div>
          {/* Desktop: navigation in top bar */}
          <Navbar light className="hidden lg:flex justify-end ml-auto" />
        </div>
      </div>

      {/* Main Bar */}
      <div className="container mx-auto flex flex-wrap items-center py-3 px-4 lg:px-8 gap-3">
        {/* Row 1: logo + Замовити друк(desktop) + search + cabinet/cart/burger */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="https://media.base44.com/images/public/69d39217874c6fe682eac60a/e8922cc81_PNGdruklogohorizontalblack.png"
                alt="PNG druk — фабрика друку та брендування"
                className="h-12 w-auto"
              />
            </Link>
            {/* Desktop & Tablet: Замовити друк button next to logo */}
            <div className="relative shrink-0 hidden md:block" ref={menuRef}>
              <button
                onClick={() => setServicesOpen((v) => !v)}
                className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-colors whitespace-nowrap"
              >
                <Menu className="w-4 h-4 hidden lg:block" />
                <span>Замовити друк</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && <ServicesMegaMenu onClose={() => setServicesOpen(false)} />}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center max-w-md xl:max-w-lg min-w-0">
              {searchOpen && (
                <form onSubmit={submitSearch} className="relative flex items-center mr-1 flex-1 min-w-0">
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Пошук товарів..."
                    className="h-10 w-full px-3 pr-9 rounded-full border border-input bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="absolute right-2 w-6 h-6 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
                    aria-label="Закрити пошук"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors"
                aria-label="Пошук"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            <Link
              to="/cabinet"
              className="flex items-center gap-2 h-10 px-3 rounded-full text-foreground hover:bg-muted transition-colors"
              aria-label="Кабінет"
            >
              <UserRound className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Вхід / Реєстрація</span>
            </Link>
            <Link
              to="/cart"
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors"
              aria-label="Кошик"
            >
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 min-w-4 px-1 flex items-center justify-center font-bold">{count}</span>}
            </Link>
            {/* Mobile burger */}
            <button
              onClick={() => setNavOpen((v) => !v)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors"
              aria-label="Меню"
            >
              {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Row 2 (mobile only <md): Замовити друк — full width */}
        <div className="relative w-full md:hidden" ref={menuRefMobile}>
          <button
            onClick={() => setServicesOpen((v) => !v)}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 rounded-lg font-semibold text-base shadow-sm transition-colors"
          >
            <span>Замовити друк</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
          </button>
          {servicesOpen && <ServicesMegaMenu onClose={() => setServicesOpen(false)} />}
        </div>
      </div>

      {navOpen && <MobileNav onClose={() => setNavOpen(false)} />}
    </header>
  );
}