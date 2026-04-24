import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Clock, Star, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SERVICES = [
  {
    title: 'ДТФ друк',
    description: 'Преміальний повноколірний друк на плівці для нанесення на будь-які тканини',
    price: 'від 175 грн',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    link: '/dtf-print',
    tag: 'Хіт',
  },
  {
    title: 'Сублімаційний друк',
    description: 'Яскравий і деталізований друк на синтетичних тканинах, кружках, футболках',
    price: 'від 210 грн',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80',
    link: '/catalog',
    tag: null,
  },
  {
    title: 'Широкоформатний банер',
    description: 'Друк на банерній тканині для зовнішньої реклами будь-яких розмірів',
    price: 'від 180 грн',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80',
    link: '/catalog',
    tag: null,
  },
  {
    title: 'Термоперенос',
    description: 'Класичний термоперенос та флекс для однотонних логотипів і написів',
    price: 'від 45 грн',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80',
    link: '/catalog',
    tag: 'Вигідно',
  },
];

const ADVANTAGES = [
  { icon: Zap, title: 'Швидке виконання', text: 'Стандартний термін — 1–3 робочих дні. Є термінове замовлення.' },
  { icon: CheckCircle2, title: 'Преміум якість', text: 'Використовуємо обладнання провідних світових брендів.' },
  { icon: Star, title: 'Досвід 10+ років', text: 'Понад 50 000 виконаних замовлень по всій Україні.' },
  { icon: Clock, title: 'Зручна доставка', text: 'Нова Пошта, Укрпошта, кур\'єр або самовивіз зі Львова і Києва.' },
];

const STATS = [
  { value: '50 000+', label: 'виконаних замовлень' },
  { value: '10+', label: 'років досвіду' },
  { value: '2', label: 'міста присутності' },
  { value: '98%', label: 'задоволених клієнтів' },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#037291] to-[#025a73] text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-28 max-w-6xl">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
              PART OF PNG GROUP · Фабрика друку
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-5">
              Друк, який<br />
              <span className="text-yellow-300">виділяє вас</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-lg">
              ДТФ, сублімація, банери, термоперенос — швидко, якісно, по всій Україні. Від 175 грн.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/catalog">
                <Button size="lg" className="bg-white text-[#037291] hover:bg-white/90 font-bold px-6 shadow-lg">
                  Переглянути послуги
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/dtf-print">
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 font-semibold px-6">
                  ДТФ друк
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 20C1200 60 900 0 720 20C540 40 240 0 0 20L0 60Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-[#037291]">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* SERVICES */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <div>
              <p className="text-xs text-[#037291] font-semibold uppercase tracking-widest mb-1">Що ми робимо</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Популярні послуги</h2>
            </div>
            <Link to="/catalog" className="text-sm text-[#037291] font-medium hover:underline flex items-center gap-1">
              Всі послуги <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <Link key={s.title} to={s.link} className="group bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
                <div className="relative overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                  {s.tag && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      {s.tag}
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-foreground mb-1 group-hover:text-[#037291] transition-colors">{s.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3">{s.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">{s.price}</span>
                    <span className="text-[#037291] text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Детальніше <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-14 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-xs text-[#037291] font-semibold uppercase tracking-widest mb-1">Чому обирають нас</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Наші переваги</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-card border rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-[#037291]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#037291]" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="bg-gradient-to-r from-[#037291] to-[#025a73] rounded-2xl p-10 text-white text-center shadow-xl">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">Готові замовити друк?</h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto">Залиште заявку або зв'яжіться з нами — менеджер відповість протягом 15 хвилин.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/dtf-print">
                <Button size="lg" className="bg-white text-[#037291] hover:bg-white/90 font-bold px-8 shadow">
                  Замовити зараз
                </Button>
              </Link>
              <a href="tel:+380739338895">
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 font-semibold px-8">
                  <Phone className="w-4 h-4 mr-2" />
                  Зателефонувати
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}