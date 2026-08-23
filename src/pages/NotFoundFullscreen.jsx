import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Phone, Printer } from 'lucide-react';

const LINKS = [
  { label: 'Каталог', to: '/catalog' },
  { label: 'Послуги', to: '/services' },
  { label: 'Технології друку', to: '/technologies' },
  { label: 'Блог', to: '/blog' },
  { label: 'Контакти', to: '/contacts' },
];

export default function NotFoundFullscreen() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[560px] h-[560px] rounded-full bg-accent/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Top strip */}
      <header className="px-4 lg:px-8 py-5">
        <Link to="/" className="inline-flex items-end gap-1.5">
          <span className="text-lg font-bold border border-foreground px-1.5 py-0.5 leading-none">PNG</span>
          <span className="text-base font-bold leading-none">druk</span>
        </Link>
      </header>

      {/* Center content */}
      <main className="flex-1 flex items-center justify-center px-4 lg:px-8 py-10">
        <div className="w-full max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-8">
            <Printer className="w-3.5 h-3.5" />
            Сторінку не надруковано
          </div>

          <div className="relative inline-block mb-6">
            <h1 className="text-[120px] sm:text-[160px] lg:text-[220px] font-bold leading-none tracking-tighter text-foreground">
              404
            </h1>
            <span className="absolute inset-0 -z-10 flex items-center justify-center text-[120px] sm:text-[160px] lg:text-[220px] font-bold leading-none tracking-tighter text-primary/10 blur-2xl select-none">
              404
            </span>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold mb-3">
            Схоже, цей аркуш загубився в друкарні
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg max-w-xl mx-auto mb-9">
            Можливо, сторінку перемістили або ви неправильно ввели адресу. Поверніться на головну або скористайтеся каталогом друку.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Home className="w-4 h-4" />
              На головну
            </Link>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 border border-border bg-card text-foreground font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Перейти в каталог
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 border border-border bg-card text-foreground font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-muted transition-colors"
            >
              <Search className="w-4 h-4" />
              Пошук товарів
            </Link>
          </div>

          <div className="border-t border-border pt-6 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Популярні розділи</p>
            <div className="flex flex-wrap justify-center gap-2">
              {LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="inline-flex items-center text-sm font-medium text-foreground/80 hover:text-primary bg-muted/60 hover:bg-primary/10 rounded-full px-4 py-2 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom strip */}
      <footer className="px-4 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
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