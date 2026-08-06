import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, ArrowRight, Star, Sparkles, FolderOpen, Layers, Printer } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CATEGORIES = [
  { id: 'all', label: 'Усі товари', icon: Layers },
  { id: 'dtf', label: 'ДТФ друк', icon: Printer },
  { id: 'uv_dtf', label: 'УФ ДТФ друк', icon: Sparkles },
  { id: 'samples', label: 'Взірці', icon: FolderOpen },
];

const PRODUCTS = [
  // ДТФ друк
  { id: 1, category: 'dtf', title: 'ДТФ плівка преміум', description: 'Преміальна повноколірна плівка з високою стійкістю до прання та насиченишими кольорами.', price: 175, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', tag: 'Хіт продажів', tone: 'cyan' },
  { id: 2, category: 'dtf', title: 'ДТФ плівка золота фольга', description: 'Ефект золотої фольги для преміум-брендування одягу та мерчу.', price: 240, image: 'https://images.unsplash.com/photo-1606293926249-ed229bb84d48?w=600&q=80', tag: 'Топ', tone: 'gold' },
  { id: 3, category: 'dtf', title: 'ДТФ плівка золото глітер', description: 'Блискуче золоте покриття з ефектом глітеру для святкових та преміум колекцій.', price: 260, image: 'https://images.unsplash.com/photo-1518621736915-f3b1c0a8a6f5?w=600&q=80', tone: 'gold' },
  { id: 4, category: 'dtf', title: 'ДТФ плівка срібло глітер', description: 'Сріблястий блискучий ефект глітер — стильне рішення для сучасного дизайну.', price: 260, image: 'https://images.unsplash.com/photo-1605379399642-870262d3d931?w=600&q=80', tone: 'silver' },
  { id: 5, category: 'dtf', title: 'ДТФ плівка хамелеон/глітер', description: 'Ефект хамелеону зі зміною відтінку та глітер-блиском залежно від кута огляду.', price: 290, image: 'https://images.unsplash.com/photo-1605379399847-8f0a1f2d3c7c?w=600&q=80', tag: 'Новинка', tone: 'purple' },
  { id: 6, category: 'dtf', title: 'ДТФ плівка люмінісцентна', description: 'Свіння в темряві — ідеально для вечірніх подій та рекламних акцентів.', price: 320, image: 'https://images.unsplash.com/photo-1535063406828-3c0a1c9f8f2b?w=600&q=80', tone: 'lime' },
  { id: 7, category: 'dtf', title: 'ДТФ плівка рефлектив', description: 'Відбиває світло — безпека та стильність для робочого одягу та спецформи.', price: 310, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80', tone: 'slate' },
  // УФ ДТФ друк
  { id: 8, category: 'uv_dtf', title: 'Преміум УФ ДТФ плівка', description: 'Преміум УФ-друк з підвищеною стійкістю та яскравістю для твердих поверхонь.', price: 280, image: 'https://images.unsplash.com/photo-1605379399642-870262d3d931?w=600&q=80', tag: 'Преміум', tone: 'cyan' },
  { id: 9, category: 'uv_dtf', title: 'Золота УФ ДТФ плівка', description: 'Золотий ефект з УФ-стійкістю — для пакування, скла та преміум товарів.', price: 340, image: 'https://images.unsplash.com/photo-1606293926249-ed229bb84d48?w=600&q=80', tone: 'gold' },
  { id: 10, category: 'uv_dtf', title: 'Срібна УФ ДТФ плівка', description: 'Срібний металік з міцним покриттям для декору скла, металу та пластику.', price: 340, image: 'https://images.unsplash.com/photo-1605379399847-8f0a1f2d3c7c?w=600&q=80', tone: 'silver' },
  // Взірці
  { id: 11, category: 'samples', title: 'Папка з взірцями DTF та UV DTF', description: 'Готова папка-каталог з фізичними взірцями друку для демонстрації клієнтам.', price: 0, image: 'https://images.unsplash.com/photo-1544816155-12df9643f369?w=600&q=80', tag: 'Безкоштовно', tone: 'cyan' },
  { id: 12, category: 'samples', title: 'Взірці УФ ДТФ друку та плівки', description: 'Набір взірців УФ ДТФ плівок для оцінки якості та матеріалу перед замовленням.', price: 0, image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80', tone: 'silver' },
  { id: 13, category: 'samples', title: 'Взірці DTF друку та плівки', description: 'Набір взірців DTF друку різних плівок — помацати та побачити якість власноруч.', price: 0, image: 'https://images.unsplash.com/photo-1607082348837-13d8a85fe5d2?w=600&q=80', tone: 'gold' },
];

const TONE_STYLES = {
  cyan: 'from-cyan-400/15 to-cyan-500/5 border-cyan-300/30',
  gold: 'from-amber-300/20 to-yellow-500/5 border-amber-300/40',
  silver: 'from-slate-300/20 to-slate-400/5 border-slate-300/40',
  purple: 'from-purple-400/15 to-fuchsia-500/5 border-purple-300/30',
  lime: 'from-lime-400/15 to-green-500/5 border-lime-300/30',
  slate: 'from-slate-400/15 to-slate-600/5 border-slate-400/30',
};

function ProductCard({ product }) {
  return (
    <Link
      to="/dtf-print"
      className="group bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className={`relative overflow-hidden bg-gradient-to-br ${TONE_STYLES[product.tone]} aspect-[4/3]`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover mix-blend-overlay opacity-90 group-hover:scale-110 transition-transform duration-500"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {product.tag}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground text-sm mb-1.5 group-hover:text-primary transition-colors leading-snug">
          {product.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/60">
          {product.price > 0 ? (
            <p className="text-base font-bold text-foreground">
              <span className="text-[11px] font-normal text-muted-foreground mr-1">від</span>
              {product.price} <span className="text-xs font-medium text-muted-foreground">грн</span>
            </p>
          ) : (
            <p className="text-sm font-semibold text-primary">Безкоштовно</p>
          )}
          <span className="text-primary text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all">
            Детальніше <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Catalog() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCat = urlParams.get('cat');
  const validCats = CATEGORIES.map((c) => c.id);
  const [activeCategory, setActiveCategory] = useState(
    initialCat && validCats.includes(initialCat) ? initialCat : 'all'
  );
  const [search, setSearch] = useState(urlParams.get('q') || '');

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
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
          <span className="text-foreground font-medium">Каталог товарів</span>
        </nav>

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Каталог товарів</h1>
          <p className="text-sm text-muted-foreground">Преміальні плівки для друку, технології та взірці продукції</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - categories */}
          <aside className="lg:w-60 shrink-0">
            <div className="lg:sticky lg:top-4 space-y-4">
              <div className="bg-card border rounded-2xl p-3 shadow-sm">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-2">Категорії</h2>
                <div className="flex flex-wrap lg:flex-col gap-1.5">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {cat.label}
                        <span className={`ml-auto text-[11px] px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20' : 'bg-muted text-muted-foreground'
                        }`}>
                          {cat.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat.id).length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Пошук товару..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-10 text-sm"
                />
              </div>

              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-4 text-primary-foreground shadow-sm">
                <Star className="w-5 h-5 mb-2" />
                <p className="text-sm font-semibold leading-snug">Потрібна консультація?</p>
                <p className="text-xs text-primary-foreground/80 mt-1 mb-3">Менеджер допоможе обрати матеріал</p>
                <Link to="/contacts" className="inline-flex items-center gap-1 text-xs font-bold bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-full transition-colors">
                  Зв'язатись <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-4">
              Знайдено: <strong className="text-foreground">{filtered.length}</strong> товарів
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground text-sm border border-dashed rounded-2xl">
                Нічого не знайдено. Спробуйте інший запит або категорію.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}