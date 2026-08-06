import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Facebook, Instagram, Youtube, ShoppingCart, UserRound, Menu, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ServicesMegaMenu from '@/components/ServicesMegaMenu';

export default function Header() {
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
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-1.5">
        <div className="container mx-auto flex items-center justify-between text-xs px-4 lg:px-8 gap-3">
          {/* Left: phone + socials */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              <span>+38 073 933 88 95</span>
            </div>
            <span className="w-px h-3 bg-white/30 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <a href="#" className="hover:opacity-80"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:opacity-80"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:opacity-80"><Youtube className="w-3.5 h-3.5" /></a>
            </div>
          </div>
          {/* Right: navigation (last item aligns with cart) */}
          <Navbar light className="flex-1 justify-end basis-full sm:basis-0 order-3 sm:order-2 mt-2 sm:mt-0" />
        </div>
      </div>

      {/* Main Bar */}
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 py-3 px-4 lg:px-8">
        {/* Left: logo + Замовити друк (mega-menu) */}
        <div className="flex items-center justify-self-start gap-3 order-1">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="https://media.base44.com/images/public/69d39217874c6fe682eac60a/e8922cc81_PNGdruklogohorizontalblack.png"
              alt="PNG druk — фабрика друку та брендування"
              className="h-12 w-auto"
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

        {/* Right: Cabinet + Cart */}
        <div className="flex items-center justify-end justify-self-end ml-auto order-2 gap-1">
          <Link
            to="/cabinet"
            className="flex items-center gap-2 h-10 px-3 rounded-full text-foreground hover:bg-muted transition-colors"
            aria-label="Кабінет"
          >
            <UserRound className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Вхід / Реєстрація</span>
          </Link>
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