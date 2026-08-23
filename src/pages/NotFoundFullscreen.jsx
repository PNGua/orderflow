import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, ArrowLeft, Phone } from 'lucide-react';

const LINKS = [
  { label: 'Каталог', to: '/catalog' },
  { label: 'Послуги', to: '/services' },
  { label: 'Технології друку', to: '/technologies' },
  { label: 'Блог', to: '/blog' },
  { label: 'Контакти', to: '/contacts' },
];

export default function NotFoundFullscreen() {
  return (
    <div className="min-h-screen w-full bg-[#f9fafb] flex flex-col overflow-hidden">
      {/* Top strip */}
      <header className="px-4 lg:px-8 py-5">
        <Link to="/" className="inline-flex items-end gap-1.5 text-foreground">
          <span className="text-lg font-bold border border-foreground px-1.5 py-0.5 leading-none">PNG</span>
          <span className="text-base font-bold leading-none">druk</span>
        </Link>
      </header>

      {/* Split content */}
      <main className="flex-1 flex items-center px-4 lg:px-8 py-6 lg:py-10">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">

          {/* Left — text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5">
              <Search className="w-3.5 h-3.5" />
              Помилка 404
            </div>

            <h1 className="text-7xl lg:text-8xl font-bold text-foreground leading-none mb-5">
              404
            </h1>

            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Сторінку не знайдено
            </h2>

            <p className="text-[#6b7280] text-base lg:text-lg leading-relaxed mb-7 max-w-lg">
              Можливо, сторінка була переміщена, видалена або ви ввели неправильну адресу. Поверніться на головну або скористайтеся каталогом послуг.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Home className="w-4 h-4" />
                На головну
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 border border-border bg-card text-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Перейти в каталог
              </Link>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-xs uppercase tracking-wider text-[#6b7280] mb-3">
                Популярні розділи
              </p>
              <div className="flex flex-wrap gap-2">
                {LINKS.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="inline-flex items-center text-sm font-medium text-foreground/80 hover:text-primary bg-[#f3f4f6] hover:bg-primary/10 rounded-full px-3.5 py-1.5 transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right — illustration + contact box */}
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden border bg-gradient-to-br from-slate-100 to-white">
              <img
                src="https://images.unsplash.com/photo-1635776062127-d379b3ba2ee0?w=900&q=85"
                alt="404 — сторінку не знайдено"
                className="w-full h-full object-cover mix-blend-multiply opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur rounded-xl px-4 py-3 shadow-sm">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <p className="text-xs text-[#6b7280] leading-snug">
                  Потрібна допомога? Зателефонуйте: <span className="font-semibold text-foreground">+38 073 933 88 95</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Bottom strip */}
      <footer className="px-4 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#6b7280]">
          <span>© {new Date().getFullYear()} PNG druk — Фабрика друку та брендування</span>
          <a href="tel:+380739338895" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="w-3.5 h-3.5" />
            +38 073 933 88 95
          </a>
        </div>
      </footer>
    </div>
  );
}