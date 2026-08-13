import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background mt-12">
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-3">
            <div className="flex flex-col items-start leading-tight">
              <div className="flex items-end gap-1">
                <span className="text-xl font-bold border border-white px-1">PNG</span>
                <span className="text-lg font-bold">druk</span>
              </div>
              <span className="text-[9px] text-white/70 font-medium">Фабрика друку та брендування</span>
              <span className="bg-primary text-white text-[8px] px-1 rounded mt-0.5">PART OF PNG GROUP</span>
            </div>
            <p className="text-sm text-white/70 mt-3">
              Широкоформатний друк, брендування та виготовлення рекламних матеріалів.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/50">Навігація</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/" className="hover:text-primary transition-colors">Головна</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Про нас</Link></li>
              <li><Link to="/dtf-print" className="hover:text-primary transition-colors">ДТФ друк</Link></li>
              <li><Link to="/delivery" className="hover:text-primary transition-colors">Оплата і доставка</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Блог</Link></li>
              <li><Link to="/contacts" className="hover:text-primary transition-colors">Контакти</Link></li>
              <li><Link to="/qna" className="hover:text-primary transition-colors">Q&A</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/50">Контакти</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>+38 073 933 88 95</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>info@pngdruk.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>м. Львів, вул. Городоцька 242</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>м. Київ, вул. Машинобудівна 44</span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/50">Графік роботи</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex justify-between"><span>Пн – Пт</span><span>09:00 – 18:00</span></li>
              <li className="flex justify-between"><span>Субота</span><span>10:00 – 15:00</span></li>
              <li className="flex justify-between"><span>Неділя</span><span>Вихідний</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} PNG Druk. Усі права захищені.
        </div>
      </div>
    </footer>
  );
}