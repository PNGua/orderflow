import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, ArrowRight, Star } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CATEGORIES = [
  { id: 'all', label: 'Усі послуги' },
  { id: 'dtf', label: 'ДТФ друк' },
  { id: 'sublimation', label: 'Сублімація' },
  { id: 'thermotransfer', label: 'Термоперенос' },
  { id: 'wide', label: 'Широкоформатний' },
];

const SERVICES = [
  {
    id: 1,
    category: 'dtf',
    title: 'ДТФ плівка преміум',
    description: 'Яскравий повноколірний друк на плівці для нанесення на будь-які тканини. Висока стійкість до прання.',
    price: 175,
    unit: 'від',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    tag: 'Хіт продажів',
    tagColor: 'bg-accent text-accent-foreground',
    link: '/dtf-print',
  },
  {
    id: 2,
    category: 'dtf',
    title: 'ДТФ плівка стандарт',
    description: 'Економ варіант ДТФ плівки для масового виробництва. Відмінне співвідношення ціна/якість.',
    price: 120,
    unit: 'від',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    tag: null,
    link: '/dtf-print',
  },
  {
    id: 3,
    category: 'dtf',
    title: 'ДТФ друк в рулонах',
    description: 'Безперервний рулонний друк для великих тиражів. Ідеально для виробників одягу.',
    price: 95,
    unit: 'від',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    tag: 'Новинка',
    tagColor: 'bg-primary text-primary-foreground',
    link: '/dtf-print',
  },
  {
    id: 4,
    category: 'sublimation',
    title: 'Сублімаційний друк на тканині',
    description: 'Яскравий та деталізований друк безпосередньо на синтетичних тканинах. Стійке зображення.',
    price: 210,
    unit: 'від',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80',
    tag: 'Популярне',
    tagColor: 'bg-green-600 text-white',
    link: '/dtf-print',
  },
  {
    id: 5,
    category: 'sublimation',
    title: 'Сублімація на кружках',
    description: 'Персоналізований друк на керамічних кружках. Відмінний подарунок або корпоративна продукція.',
    price: 85,
    unit: 'від',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80',
    tag: null,
    link: '/dtf-print',
  },
  {
    id: 6,
    category: 'sublimation',
    title: 'Сублімація на футболках',
    description: 'Повноколірний друк по всій площі футболки. Ідеальна якість зображення без обмежень за кольорами.',
    price: 150,
    unit: 'від',
    image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=500&q=80',
    tag: null,
    link: '/dtf-print',
  },
  {
    id: 7,
    category: 'thermotransfer',
    title: 'Термоперенос стандарт',
    description: 'Класичний термоперенос на бавовняні тканини. Чіткі лінії, насичені кольори.',
    price: 65,
    unit: 'від',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&q=80',
    tag: null,
    link: '/dtf-print',
  },
  {
    id: 8,
    category: 'thermotransfer',
    title: 'Флекс термоперенос',
    description: 'Однотонні написи та логотипи із флексу. Еластичний та довговічний матеріал.',
    price: 45,
    unit: 'від',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&q=80',
    tag: 'Вигідно',
    tagColor: 'bg-amber-500 text-white',
    link: '/dtf-print',
  },
  {
    id: 9,
    category: 'wide',
    title: 'Широкоформатний банер',
    description: 'Друк на банерній тканині для зовнішньої реклами. Розміри від А1 до необмежених.',
    price: 180,
    unit: 'від',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&q=80',
    tag: null,
    link: '/dtf-print',
  },
  {
    id: 10,
    category: 'wide',
    title: 'Плотерна різка вінілу',
    description: 'Точна різка вінілових плівок будь-якої форми. Для наклейок, декору, трафаретів.',
    price: 30,
    unit: 'від',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&q=80',
    tag: 'Швидко',
    tagColor: 'bg-primary text-primary-foreground',
    link: '/dtf-print',
  },
];

function ServiceCard({ service }) {
  return (
    <Link
      to={service.link}
      className="group bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
    >
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {service.tag && (
          <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${service.tagColor}`}>
            {service.tag}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3">
          {service.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-sm font-bold text-foreground">
            <span className="text-xs font-normal text-muted-foreground mr-1">{service.unit}</span>
            {service.price} грн
          </p>
          <span className="text-primary text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Детальніше <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return SERVICES.filter((s) => {
      const matchCat = activeCategory === 'all' || s.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 lg:px-8 py-6 max-w-6xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-5">
          <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">Каталог послуг</span>
        </nav>

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-foreground mb-1">Каталог послуг друку</h1>
          <p className="text-sm text-muted-foreground">Знайдіть потрібну послугу за категорією або пошуком</p>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-card text-foreground border-border hover:border-primary/50 hover:text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Пошук послуги..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 w-52 text-sm"
            />
          </div>
        </div>

        {/* Count */}
        <p className="text-xs text-muted-foreground mb-4">
          Знайдено: <strong>{filtered.length}</strong> послуг
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground text-sm">
            Нічого не знайдено. Спробуйте інший запит або категорію.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}