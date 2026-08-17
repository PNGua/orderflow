import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LINKS = [
  { label: 'Каталог', to: '/catalog' },
  { label: 'Послуги', to: '/services' },
  { label: 'Технології друку', to: '/technologies' },
  { label: 'Блог', to: '/blog' },
  { label: 'Контакти', to: '/contacts' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                <Search className="w-3.5 h-3.5" />
                Помилка 404
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-none mb-5">
                404
              </h1>

              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Сторінку не знайдено
              </h2>

              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-7 max-w-lg">
                Можливо, сторінка була переміщена, видалена або ви ввели
                неправильну адресу. Поверніться на головну або скористайтеся
                каталогом послуг.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-primary/90 transition-colors"
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
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Популярні розділи
                </p>
                <div className="flex flex-wrap gap-2">
                  {LINKS.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="inline-flex items-center text-sm font-medium text-foreground/80 hover:text-primary bg-muted/60 hover:bg-primary/10 rounded-full px-3.5 py-1.5 transition-colors"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted/40 border">
                <img
                  src="https://images.unsplash.com/photo-1635776062127-d379b3ba2ee0?w=900&q=85"
                  alt="404 — сторінку не знайдено"
                  className="w-full h-full object-cover mix-blend-multiply opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur rounded-xl px-4 py-3 shadow-sm">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-xs text-muted-foreground leading-snug">
                    Потрібна допомога? Зателефонуйте: <span className="font-semibold text-foreground">+38 073 933 88 95</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}